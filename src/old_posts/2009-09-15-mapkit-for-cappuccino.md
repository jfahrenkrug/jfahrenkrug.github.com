--- 
name: mapkit-for-cappuccino
layout: ../layouts/OldPostLayout.astro
title: MapKit for Cappuccino
time: 2009-09-15 09:02:00.001000 Z
categories: 
- Programming
- Cappuccino
- Cocoa
---
<div class="separator" style="clear: both; text-align: center;"></div><div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/_-dK4R3d1lbc/Sq9V5CpFbvI/AAAAAAAAA4E/SIfDYRJyBRE/s1600-h/googlemaps-left.png" imageanchor="1" style="clear: right; float: right; margin-bottom: 1em; margin-left: 1em;"><img border="0" style="border: 0px" src="http://3.bp.blogspot.com/_-dK4R3d1lbc/Sq9V5CpFbvI/AAAAAAAAA4E/SIfDYRJyBRE/s200/googlemaps-left.png" /></a></div><a href="http://2.bp.blogspot.com/_-dK4R3d1lbc/Sq9Vu6NxCII/AAAAAAAAA38/2JU22jW5bi4/s1600-h/cappuccino-right.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" style="border: 0px" src="http://2.bp.blogspot.com/_-dK4R3d1lbc/Sq9Vu6NxCII/AAAAAAAAA38/2JU22jW5bi4/s200/cappuccino-right.png" /></a><br />
A very nice individual by the name of <a href="http://github.com/Ratty">Ratty</a>&nbsp;has done some work integrating GoogleMaps with the fantastic <a href="http://cappuccino.org/">Cappuccino</a> framework. I have used it <a href="http://blog.springenwerk.com/2009/09/my-first-cappuccino-app.html">in a project of mine</a>&nbsp;but found out that some things don't work right, <a href="http://groups.google.com/group/objectivej/browse_thread/thread/a45f2419405068bd">especially draggable GoogleMaps markers</a>. So I <a href="http://github.com/jfahrenkrug/MapKit">forked the MapKit project</a> and have basically gutted and re-wired it.<br />
Now it is not div-based anymore but renders the GoogleMap in an iFrame using CPWebView. This works much better. Check out the <a href="http://github.com/jfahrenkrug/MapKit/blob/master/README.textile">Readme on the github page</a> to see how you can add spiffy GoogleMaps to your Cappuccino project!<br />
The code will also help you if you have issues with resizing CPWebViews since that was an issue I also had to solve.
<br/><hr/><h3>Comments</h3>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hi Mic,<br /><br />it&#39;s fixed now! If you clone the repo again, everything should work. Thanks again for pointing this out!<br /><br />- Johannes</p>
<em class="swlightgray" style="margin-left: 30px">September 17, 2009 05:55 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hi Mic,<br /><br />absolutely my fault! I&#39;ll fix this tomorrow and then post a comment here. Thanks for pointing out my lack of git-fu ;)<br /><br />- Johannes</p>
<em class="swlightgray" style="margin-left: 30px">September 16, 2009 08:02 PM</em></div>
<div class="swcomment"><h4><a href="">Mic Pringle</a> said...</h4>
<p style="margin-left: 30px">Hi Johannes<br /><br />It seems as though the Locations project doesn&#39;t include the MapKit framework in the repository either, so I did an extra clone of just that and then copied it into the project folder. This now loads fine :-)<br /><br />However, whenever I click on either of the two locations on the left, the error console reports <br /><br />&#39;ReferenceError: Can&#39;t find variable: GLatLng&#39;<br /><br />Which I think may have something to do with the gmNamespace but I&#39;m not sure. Any ideas?<br /><br />Thanks<br /><br />-Mic</p>
<em class="swlightgray" style="margin-left: 30px">September 16, 2009 07:32 PM</em></div>
<div class="swcomment"><h4><a href="">Mic Pringle</a> said...</h4>
<p style="margin-left: 30px">Hi Johannes<br /><br />I think I may have figured out whats gone wrong here.<br /><br />Instead of cloning the git repo for the Locations project, I just downloaded the tar file from the github page.<br /><br />When I&#39;ve inspected it, is seems that it doesn&#39;t include the mapkit framework, just an empty file named mapkit.<br /><br />I&#39;m going to try cloning the repo via git now I&#39;ve got it installed to see if that make a difference, but github is down at the moment so I&#39;ll have to wait until it&#39;s back up.<br /><br />Will let you know how I get on.<br /><br />Thanks<br /><br />-Mic</p>
<em class="swlightgray" style="margin-left: 30px">September 16, 2009 07:14 PM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hi Mic,<br /><br />Thanks for your nice words.<br />Did you load the Locations project with the Webkit console or Firebug open? That will most likely give you/us some clues.<br /><br />- Johannes</p>
<em class="swlightgray" style="margin-left: 30px">September 16, 2009 05:19 AM</em></div>
<div class="swcomment"><h4><a href="">Mic Pringle</a> said...</h4>
<p style="margin-left: 30px">Hi Johannes<br /><br />Great work on this framework.<br /><br />One thing though, I can&#39;t get the more substantial CappuccinoLocations example to work. The page never seems to finish loading. Any ideas ?<br /><br />The &#39;Hello World&#39; example works fine.<br /><br />Thanks<br /><br />-Mic</p>
<em class="swlightgray" style="margin-left: 30px">September 15, 2009 07:42 PM</em></div>
