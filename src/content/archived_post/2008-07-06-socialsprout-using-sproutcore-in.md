---
name: socialsprout-using-sproutcore-in

title: "SocialSprout: Using SproutCore in OpenSocial Apps Step by Step"
time: 2008-07-06 15:00:00.022000 Z
categories:
  - JavaScript
  - Programming
  - SproutCore
  - OpenSocial
---

SproutCore Google Group</a>.<br /></div>
<br/><hr/><h3>Comments</h3>

<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hi Mark,<br /><br />I haven&#39;t kept up with SproutCore for a while. You might want to ask you question on their mailing list. Sorry :(<br /><br />- Johannes</p>
<em class="swlightgray" style="margin-left: 30px">March 01, 2010 06:16 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/12508625405809778726">Mark Jaffe</a> said...</h4>
<p style="margin-left: 30px">Johannes,<br /><br />Thanks for all the effort here. I tried this today and got a negative experience :-(<br /><br />NoMethodError at /socialsprout<br />undefined method `view&#39; for #<br /><br />Ruby /Library/Ruby/Gems/1.8/gems/sproutcore-1.0.1046/lib/sproutcore/helpers/capture_helper.rb: in content_for, line 24<br />Web GET localhost/socialsprout<br />Jump to:<br /> GET POST Cookies ENV<br />Traceback (innermost first)<br /><br />/Library/Ruby/Gems/1.8/gems/sproutcore-1.0.1046/lib/sproutcore/helpers/capture_helper.rb: in content_for<br />        eval &quot;@content_for_#{name} = (@content_for_#{name} || &#39;&#39;) + (capture(&amp;block) || &#39;&#39;)&quot;...<br />  When I installed sproutcore, I got version 1.0.1046 and my disk layout is different from what you show after doing sc-init step. For example, there is no english.lproj directory.</p>
<em class="swlightgray" style="margin-left: 30px">January 24, 2010 02:43 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Thank you, man! I&#39;m glad you find the site useful :)</p>
<em class="swlightgray" style="margin-left: 30px">December 25, 2009 07:21 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/02904264061540036226">Dr Boolean</a> said...</h4>
<p style="margin-left: 30px">Hi Johannes,<br /><br />I hate to be &quot;that guy&quot;, but i&#39;m really tossing and turning over the decision to learn objective-c(j) and use cappuccino or try to crack this sproutcore nut.<br /><br />I see you work with cappuccino.  Is there a reason you chose this over sproutcore?<br /><br />I feel like i have to learn cocoa to grasp sproutcore anyway.<br /><br />One other thing, have you found a rest implementation for cappuccino yet?  Since sproutcore does it for you i thought i&#39;d save tons of code in the long run.  I might fork jester to work with json as a solution.<br /><br />Anyway, great tutorial!  I can&#39;t find hardly any others out there.</p>
<em class="swlightgray" style="margin-left: 30px">October 10, 2009 06:42 PM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hi Ashish,<BR/><BR/>Thank you for your comment! I'm not sure how to render files from your local disk. That will definitely not work when you try to run your OS app on Orkut or MySpace.<BR/><BR/>- Johannes</p>
<em class="swlightgray" style="margin-left: 30px">March 17, 2009 06:40 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/13260058694630964297">Ashish Rai</a> said...</h4>
<p style="margin-left: 30px">Hi Johannes,<BR/><BR/>I tried with you this example step by step, its very nice example. I am also trying to access images on my local system, i gave the file URL in friend_icon.js but its not working. can you suggest me some way to render a images from my local system?<BR/><BR/>Thanks<BR/>Ashish</p>
<em class="swlightgray" style="margin-left: 30px">March 17, 2009 06:29 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hey william,<BR/><BR/>sorry for the late reply. Well, I'm not exactly sure what you mean. If you are talking about running sproutcore within facebook: I doubt that's possible since facebook took the "our own markup language" path instead of allowing full javascript applications. If you are talking about building a SproutCore app that communicates with facebook, then yes, the REST API would be the way to go, imho.<BR/><BR/>- Johannes</p>
<em class="swlightgray" style="margin-left: 30px">August 06, 2008 12:33 PM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/09937601482665534375">william</a> said...</h4>
<p style="margin-left: 30px">what would the easiest way to implement facebook calls? The rest API? Thanks in advance.</p>
<em class="swlightgray" style="margin-left: 30px">August 03, 2008 06:45 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/04234225040295479700">Enric</a> said...</h4>
<p style="margin-left: 30px">One problem I discovered is that for master.js:<BR/><BR/>Socialsprout.masterController = SC.ArrayController.create<BR/><BR/>there's a extra comma (,) at the end of the object properties.  This works fine in FireFox and Safari.  But fails in IE.  So the extra comma at the end should be removed.</p>
<em class="swlightgray" style="margin-left: 30px">July 11, 2008 06:56 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/10798151792121888081">Danny Brewer</a> said...</h4>
<p style="margin-left: 30px">Nice job.<BR/><BR/>I'm also trying to help the cause, by putting together a forum at www.sproutcoredev.com.<BR/><BR/>Feel free to come by and chip in.</p>
<em class="swlightgray" style="margin-left: 30px">July 09, 2008 11:03 PM</em></div>
