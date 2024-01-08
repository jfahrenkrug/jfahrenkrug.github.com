---
name: dashcode-and-xmlhttprequest-trouble

title: Dashcode and XMLHttpRequest Trouble
time: 2007-08-13 06:57:00.001000 Z
categories:
  - Programming
  - Apple
---

<img src="http://developer.apple.com/tools/images/dashcodeicon.jpg" style="margin: 10px 10px 0pt 0pt; float: left; width: 61px; height: 61px;" title="" />I was playing around with Apple's <a href="http://developer.apple.com/tools/dashcode/">Dashcode</a> widget development tool. It's really neat. But one thing almost drove me nuts: XMLHttpRequest. I tried to pull the episode listings of a given show from <a href="http://www.epguides.com">epguides.com</a>.
I got back a readyState of 4 but the request.status was always undefined.
Well, the solution to the problem is easy: You have to allow the widget to access the network. Just check the appropriate checkbox in the "Widget Attributes" section. D'oh!
<br/><hr/><h3>Comments</h3>

<div class="swcomment"><h4><a href="http://www.blogger.com/profile/01754749508965695044">Admin</a> said...</h4>
<p style="margin-left: 30px">Bwahahah thanks for posting this, solved my problem.</p>
<em class="swlightgray" style="margin-left: 30px">January 24, 2010 02:45 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">When I actually find the chocolate in the mail, you'll be mine, too! (this is a lie)</p>
<em class="swlightgray" style="margin-left: 30px">October 28, 2008 02:52 PM</em></div>
<div class="swcomment"><h4><a href="">Anonymous</a> said...</h4>
<p style="margin-left: 30px">You're my best friend now. The chocolate is in the mail.</p>
<em class="swlightgray" style="margin-left: 30px">October 28, 2008 02:49 PM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/13668799547352259386">Chris Miles</a> said...</h4>
<p style="margin-left: 30px">Thank you!!  So obvious when pointed out, but this was driving me nuts all night.</p>
<em class="swlightgray" style="margin-left: 30px">September 24, 2008 01:24 PM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/09435787870477086649">Arno</a> said...</h4>
<p style="margin-left: 30px">Thanks! Pretty ridiculous how buried that is.</p>
<em class="swlightgray" style="margin-left: 30px">May 10, 2008 02:35 AM</em></div>
