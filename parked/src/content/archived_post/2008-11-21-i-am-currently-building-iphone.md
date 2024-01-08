---
name: i-am-currently-building-iphone

title: HTTP Basic Authentication "Logout" with NSURLConnection
time: 2008-11-21 10:46:00.007000 Z
categories:
  - Programming
  - iPhone
  - Cocoa
---

<a href="http://flickr.com/photos/mollivan_jon/904691290/">
<img style="width: 397px; height: 477px;" src="http://farm2.static.flickr.com/1152/904691290_336dfa59de.jpg?v=0" alt="Cattle, No Exit by Mollivan Jon." title="" onload="show_notes_initially();" class="reflect" /></a>

I am currently building an iPhone application which has to communicate with a RESTful web service. It uses HTTP Basic authentication to log into the system. All that works just fine. But! The trouble begins when you want to change the user while the application is running. How so? Well, with HTTP Basic authentication, you <a href="http://httpd.apache.org/docs/1.3/howto/auth.html#basicfaq">simply can't logout</a>!
Well, actually, that's not entirely true. The restrictions that Apache describes in their FAQ should only apply to browsers and are only present because browsers don't allow you to "forget" the HTTP Basic authentication credentials.
Cocoa Touch provides you as a programmer with with all kinds of functionality to handle HTTP credentials. The problem is, that even when you remove these credentials the system somehow still remembers them. I could find no way to make it effectively forget the stored credentials. So how was I able to solve this problem? You probably won't believe it, but the solution was a hash. Yes, a simple # symbol!
Let me explain this in a little more detail. When you set up an NSURLConnection, it's delegate receives different messages, for example <a href="http://developer.apple.com/documentation/Cocoa/Conceptual/URLLoadingSystem/Tasks/UsingNSURLConnection.html#//apple_ref/doc/uid/20001836-160393">connection:didReceiveAuthenticationChallenge:</a>.
This delegate method is called when the server you're talking to requests HTTP authentication. You simply provide the credentials and everyone is happy:

<pre class="prettyprint">
- (void)connection:(NSURLConnection *)connection didReceiveAuthenticationChallenge:(NSURLAuthenticationChallenge *)challenge {
NSLog(@"got auth challange");

if ([challenge previousFailureCount] == 0) {
  [[challenge sender]  useCredential:[NSURLCredential credentialWithUser:[usernameTextField text] password:[passwordTextField text] persistence:NSURLCredentialPersistenceForSession] forAuthenticationChallenge:challenge];
} else {
  [[challenge sender] cancelAuthenticationChallenge:challenge];
}
}
</pre>The persistence argument of the NSURLCredential constructor tells the system how to persist the credentials (D'uh!). NSURLCredentialPersistenceForSession means for the whole session, NSURLCredentialPersistencePermanent means permanently (will be saved in the keychain, but <a href="https://devforums.apple.com/message/11408#11408">doesn't work in the iPhone simulator</a>) and NSURLCredentialPersistenceNone SHOULD mean not at all. The problem is: it doesn't.

When you specify NSURLCredentialPersistenceForSession the credentials are stored in [[NSURLCredentialStorage sharedCredentialStorage] allCredentials]. Naive as I am, I figured removing the credentials should prompt the connection:didReceiveAuthenticationChallenge: delegate method to be called again upon the next request:

<pre class="prettyprint">
// reset the credentials cache...
NSDictionary *credentialsDict = [[NSURLCredentialStorage sharedCredentialStorage] allCredentials];

if ([credentialsDict count] > 0) {
// the credentialsDict has NSURLProtectionSpace objs as keys and dicts of userName =&gt; NSURLCredential
NSEnumerator *protectionSpaceEnumerator = [credentialsDict keyEnumerator];
id urlProtectionSpace;

// iterate over all NSURLProtectionSpaces
while (urlProtectionSpace = [protectionSpaceEnumerator nextObject]) {
  NSEnumerator *userNameEnumerator = [[credentialsDict objectForKey:urlProtectionSpace] keyEnumerator];
  id userName;

  // iterate over all usernames for this protectionspace, which are the keys for the actual NSURLCredentials
  while (userName = [userNameEnumerator nextObject]) {
    NSURLCredential *cred = [[credentialsDict objectForKey:urlProtectionSpace] objectForKey:userName];
    NSLog(@"cred to be removed: %@", cred);
    [[NSURLCredentialStorage sharedCredentialStorage] removeCredential:cred forProtectionSpace:urlProtectionSpace];
  }
}
}
</pre>Of course, it didn't. I also tried setting the Authentication header directly on the request and setting up false default credentials in the hope that it would prompt another authentication challenge. All to no avail.

So my last resort was this: I thought maybe adding a random different anchor to the end of the url on each request would prompt a new authentication challenge since it would always be a "different" URL. Turns out that I didn't even have to go that far: adding just a single "#" to the end of the URL did the trick!
So instead of saying

<pre class="prettyprint">[NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://localhost:3000/something.json"]]</pre>

you say

<pre class="prettyprint">[NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://localhost:3000/something.json#"]]</pre>

Then it behaves exactly the way you want it to. With NSURLCredentialPersistenceNone it really calls the connection:didReceiveAuthenticationChallenge: on every request and with NSURLCredentialPersistenceForSession it stores it until you remove the credentials with the code posted above!
So now HTTP Basic "logout" with NSURLConnection actually works!
You can find the sample code here: <a href="http://gist.github.com/27421">http://gist.github.com/27421</a>.<div><span class="Apple-style-span" style="font-weight: bold;">Update (02/06/2009):</span> You can find the <a href="http://github.com/jfahrenkrug/fahrenkrug-s-hash/tree/master">sample XCode project that I've built for the Apple bug report</a> here on Github. </div><div><b>Update (04/08/2009)</b>: VERY IMPORTANT: You have to add the # to EVERY AUTHENTICATED REQUEST! Every. Single. One. If you forget it once, the credentials will be cached again, no matter how many hashes you add to subsequent URLs. Add it all the time.
Enjoy and share!</div>
<br/><hr/><h3>Comments</h3>

<div class="swcomment"><h4><a href="http://www.blogger.com/profile/09008044734103933016">Trevor</a> said...</h4>
<p style="margin-left: 30px">It looks like your bug report did the trick! In iPhone 3.0 you can now use:<br /><br />[NSURLCredential credentialWithUser:[usernameTextField text] password:[passwordTextField text] persistence:NSURLCredentialPersistenceNone] forAuthenticationChallenge:challenge]<br /><br />Trevor</p>
<em class="swlightgray" style="margin-left: 30px">October 02, 2009 04:59 PM</em></div>
<div class="swcomment"><h4><a href="http://www.canaryapp.com">macsphere</a> said...</h4>
<p style="margin-left: 30px">Excellent work, man! Thanks for sharing!<br /><br />Nick</p>
<em class="swlightgray" style="margin-left: 30px">April 26, 2009 10:45 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Yeah, I know it's crazy. It's definitely a bug and I've filed a bug report with Apple already. Glad it saved you from going berzerk :)</p>
<em class="swlightgray" style="margin-left: 30px">January 16, 2009 06:49 AM</em></div>
<div class="swcomment"><h4><a href="">Anonymous</a> said...</h4>
<p style="margin-left: 30px">Wow, you just saved me so much time. Everything you tried, I had tried, scratching my head each time it didn't work. Somehow that little # makes my headaches go away. Crazy. Thanks for the assist!</p>
<em class="swlightgray" style="margin-left: 30px">January 15, 2009 09:20 PM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hello "L",<BR/><BR/>I'm glad you enjoyed the article. Well, I'm sure there's an easy explanation for your problem: You are loading the data asynchronously, meaning your program doesn't block until NSURLConnection has finished. That's a Good Thing (tm). If you want your program to continue only when NSURLConnection is done, then wait for the connectionDidFinishLoading: delegate method to be called and carry on initializing your program.<BR/><BR/>- Johannes</p>
<em class="swlightgray" style="margin-left: 30px">November 28, 2008 10:31 AM</em></div>
<div class="swcomment"><h4><a href="http://lawrenceleach.myopenid.com/">Evil Doer</a> said...</h4>
<p style="margin-left: 30px">GREAT post. I really appreciated it. I too am trying to access a RESTful datasource. There in lies my problem.<BR/>I've put my NSURLConnection functionality into a custom routine that I've built that gets called at the start of the program. However, the method: didReceiveAuthenticationChallenge<BR/>and the other NSURLConnection methods get called AFTER my program has gone on to the rest of my program. I'm just a little stumped as to what I'm doing wrong. (sorry if this is WAY off topic.)<BR/><BR/>Thank you,<BR/><BR/>L.</p>
<em class="swlightgray" style="margin-left: 30px">November 28, 2008 10:10 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hey Jerry,<BR/><BR/>that's great that you can confirm that this works. Yes, I'm filed a bug already, but it might not hurt for you to file another one and attach the demo project and possibly point to this article.<BR/>It must be a bug in nsurlconnection.<BR/><BR/>- Johannes</p>
<em class="swlightgray" style="margin-left: 30px">November 24, 2008 06:45 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/11820939596901586596">Jerry Krinock</a> said...</h4>
<p style="margin-left: 30px">Great work, Johannes.  I have confirmed your result using the test project which I put together when I discovered this same problem myself about 6 months ago.  Appending Fahrenkrug's # makes it work as expected.<BR/><BR/>In my previous work, I was not sure if the bug was in NSURLConnection or in the server I am contacting, del.icio.us.  But I see that you've reproduced the problem on localhost.  So I'd say it's definitely a bug in NSURLConnection.<BR/><BR/>Have you reported this bug to Apple?  I have a demo project I should submit with the bug report.<BR/><BR/>Thanks,<BR/><BR/>Jerry Krinock</p>
<em class="swlightgray" style="margin-left: 30px">November 24, 2008 06:08 AM</em></div>
