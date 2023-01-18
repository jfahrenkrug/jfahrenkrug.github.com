--- 
name: introducing-vertexhelper-for-box2d
layout: ../layouts/OldPostLayout.astro
title: Introducing VertexHelper for Box2D & Chipmunk Vertices
time: 2010-02-26 05:52:00 Z
categories: 
- Programming
- iPhone
- Cocoa
---
<p><b>Update: VertexHelper Pro (with Undo/Redo and the option to save and load your work) is now available on the Mac AppStore.</b> <a href="http://itunes.apple.com/us/app/vertexhelper-pro/id411684411?mt=12">Get VertexHelpre Pro here (iTunes Link)</a> and you'll do a good deed to help me put bread on the table and continue developing VertexHelper. Thanks!</p>
I found it extremely tedious to define the vertices of sprites for the Box2D or Chipmunk physics engines. Maybe I was just not using the right tool. So I wrote my own. It's called VertexHelper and it lets you graphically define vertices of sprites for Box2D and Chipmunk bodies/shapes. You can <a href="http://github.com/jfahrenkrug/VertexHelper">find it on github</a>.<br />
This video shows you what it does and how it works:<br />
<object width="640" height="505"><param name="movie" value="http://www.youtube.com/v/oigdrgh286E&hl=en_US&fs=1&"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/oigdrgh286E&hl=en_US&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="505"></embed></object><br />
Enjoy!
<br/><hr/><h3>Comments</h3>
<div class="swcomment"><h4><a href="http://davidcann.com/">davidcann</a> said...</h4>
<p style="margin-left: 30px">This is great!  Thanks!</p>
<em class="swlightgray" style="margin-left: 30px">March 17, 2010 07:21 PM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Thanks for noticing that, Robustus. I&#39;ll take care of it!</p>
<em class="swlightgray" style="margin-left: 30px">March 03, 2010 04:19 PM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06755286794448766703">Robustus</a> said...</h4>
<p style="margin-left: 30px">Very appreciate that you built such an app for free.<br /><br />Just to mention that you may need to do some conversions between CGRect and NSRect, CGPoint and NSPoint.<br /><br />eg in your code:<br />-(CALayer *)hitTest:(NSPoint)aPoint<br /><br />NSPointInRect(aPoint,[self bounds])<br /><br />is better to use the following<br /><br />NSPointInRect(aPoint,NSRectFromCGRect([self bounds]))<br /><br />Nice app!! I like it a lot!!</p>
<em class="swlightgray" style="margin-left: 30px">March 03, 2010 10:12 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/18340499315254385758">Ben</a> said...</h4>
<p style="margin-left: 30px">This is great (I just wish it had been around a couple months ago). Well done!</p>
<em class="swlightgray" style="margin-left: 30px">February 26, 2010 03:57 PM</em></div>
