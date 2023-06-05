--- 
name: using-cookies-with-firefox-extensions
layout: ../layouts/OldPostLayout.astro
title: Using Cookies with Firefox Extensions and JavaScript
time: 2007-07-10 10:08:00 Z
categories: 
- JavaScript
- Programming
- Firefox Extensions
---
I'm working on a Firefox Extension at the moment and I had to read and write cookies with that extension. To make a long story short, this is how you do it (in the JavaScript code of your extension):
<blockquote>
<pre>
var ios = Components
  .classes["@mozilla.org/network/io-service;1"]
  .getService(Components.interfaces.nsIIOService);
var cookieUri = ios
  .newURI("http://www.uri_of_the_cookies.com/", 
  null, null);
var cookieSvc = Components
  .classes["@mozilla.org/cookieService;1"]
  .getService(Components.interfaces.nsICookieService);

var cookie = cookieSvc.getCookieString(cookieUri, null);

if (cookie == null || cookie.length < 1) {
  //no cookie set for this uri
} else {
  var cookieArray = cookie.split("; ");
    
  //loop through the different cookies 
  //(key/value pairs) for this URI
  for (var i = 0; i < cookieArray.length; i++) {
    var kvPair = cookieArray[i].split("="); 
 
    if (kvPair.length > 1 && 
      kvPair[0] == "NameOfTheCookieImLookingFor" && 
      kvPair[1].length > 0) {
        //the value is in kvPair[1]    
        
        break;
    }
  }
}
</pre>
</blockquote>
This MDN page helped a lot: <a href="http://developer.mozilla.org/en/docs/Code_snippets:Cookies">Code Snippets: Cookies</a>.

So what about writing cookies? Easy:
<blockquote>
<pre>
var ios = Components
  .classes["@mozilla.org/network/io-service;1"]
  .getService(Components.interfaces.nsIIOService);
var cookieUri = ios
  .newURI("http://www.uri_of_the_cookies.com/", 
  null, null);
var cookieSvc = Components
  .classes["@mozilla.org/cookieService;1"]
  .getService(Components.interfaces.nsICookieService);

cookieSvc.setCookieString(cookieUri, null, 
  "key=value", null);
</pre>
</blockquote>
For this I got a very helpful hint from the <a href="http://www.koders.com/javascript/fidFFFEE19A9EC29C342C5F8F4768ED521CED7BBCC2.aspx">Mozilla Sessionmanager source code</a> (just search for setCookieString). There's lot of other interesting stuff in there, I'm sure.

And last but not least: What about removing cookies? Quite easy as well:
<blockquote>
<pre>
Components.classes["@mozilla.org/cookiemanager;1"]
  .getService(Components.interfaces.nsICookieManager)
  .remove(".mydomain.com", //the domain
          "nameOfCookie",  //the name of the cookie
          "/path",         //the path of the cookie, ie "/"
          false);          //should cookies from this host 
                           //be blocked permanently?
</pre>
</blockquote>
To remove all the cookies in the browser:
<blockquote>
<pre>
Components.classes["@mozilla.org/cookiemanager;1"]
  .getService(Components.interfaces.nsICookieManager)
  .removeAll();
</pre>
</blockquote>
For this, the <a href="http://lxr.mozilla.org/mozilla/source/netwerk/cookie/public/nsICookieManager.idl">nsICookieManager source</a> was insightful.
Well, so much for cookies and Firefox Extensions, I hope this was useful to someone.
<br/><hr/><h3>Comments</h3>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/10839181233788000095">Phil Crosby</a> said...</h4>
<p style="margin-left: 30px">Excellent, thank you Johannes!</p>
<em class="swlightgray" style="margin-left: 30px">February 09, 2008 01:01 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06711068470845831246">vartika</a> said...</h4>
<p style="margin-left: 30px">This is quite useful. Thanks for posting such useful document</p>
<em class="swlightgray" style="margin-left: 30px">January 30, 2008 12:49 PM</em></div>
