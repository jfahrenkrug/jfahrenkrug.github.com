---
name: basic-cappuccino-tutorial

title: Basic Cappuccino Tutorial
time: 2010-02-02 15:42:00 Z
categories:
  - Programming
  - Cappuccino
  - Tutorials
  - Cocoa
---

<span class="Apple-style-span" style="font-family: 'Lucida Grande'; font-size: small;"><span class="Apple-style-span" style="font-size: 11px;"><br />
</span></span>I tried to give a lunchtime talk at NSConference today and it turned out to be a disaster :) All the stuff I wanted to show didn't work right, I wasn't prepared well enough, the projector was too dark and the resolution was too low. Oh well. So I'll just write down what I wanted to show:<br />
<br />
I won't tell you how to set up the Cappuccino tools. Just <a href="http://www.icoretech.org/2009/10/cappuccino-the-jake-branch/">look here and you'll be up and running</a>.<br />
<br />
Ok, first we want to do a simple NibApplication. You can actually design your Cappuccino UI in Interface Builder. So, run<br />
<br />
capp gen --template NibApplication basicCapp<br />
cd basicCapp<br />
<br />
Then turn the xib file into a cib file that Cappuccino understands:<br />
<br />
nib2cib Resources/MainMenu.xib Resources/MainMenu.cib<br />
<br />
Now open index.html and you should see this:<br />

<div class="separator" style="clear: both; text-align: left;"><a href="http://4.bp.blogspot.com/_-dK4R3d1lbc/S2g9jEtdVAI/AAAAAAAAA5g/Md1GgCoghAw/s1600-h/Screen+shot+2010-02-02+at+15.57.24.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="242" src="/assets/archived_posts/Screen+shot+2010-02-02+at+15.57.24_689541dd.png" width="320" /></a></div><div class="separator" style="clear: both; text-align: left;">Let's make the UI a little more interesting. Open MainMenu.xib in Interface Builder. Remove the slider and add a button to make it look like this:</div><div class="separator" style="clear: both; text-align: left;"><br />
</div><a href="http://4.bp.blogspot.com/_-dK4R3d1lbc/S2g_T1SqzXI/AAAAAAAAA5o/nu-xIcp6jIo/s1600-h/Screen+shot+2010-02-02+at+16.05.19.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="/assets/archived_posts/Screen+shot+2010-02-02+at+16.05.19_867aaa65.png" /></a><br />
<div class="separator" style="clear: both; text-align: left;">In the Library Classes tab, add on outlet for the text field to the AppController and a "sayHi:" action to it:</div><div class="separator" style="clear: both; text-align: left;"><a href="http://2.bp.blogspot.com/_-dK4R3d1lbc/S2g_8BNzymI/AAAAAAAAA5w/GG79x89Xz6A/s1600-h/Screen+shot+2010-02-02+at+16.07.00.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"></a><a href="http://3.bp.blogspot.com/_-dK4R3d1lbc/S2hACSbbt2I/AAAAAAAAA54/w7kpfJae0w8/s1600-h/Screen+shot+2010-02-02+at+16.07.17.png" imageanchor="1" style="clear: right; float: right; margin-bottom: 1em; margin-left: 1em;"><img border="0" src="/assets/archived_posts/Screen+shot+2010-02-02+at+16.07.17_42a10d26.png" /></a><img border="0" src="/assets/archived_posts/Screen+shot+2010-02-02+at+16.07.00_6a55d1a5.png" /><span class="Apple-style-span" style="-webkit-text-decorations-in-effect: none; color: black;"></span></div>Connect the nameTextField outlet to the text field and the button's action to the sayHi: action. Save the file.<br />
<br />
Open the AppController.j file in the basicCapp directory and add the outlet and the action to make it look like this:<br />
<script src="http://gist.github.com/292731.js">
</script><br />
<br />
Now run nib2cib again:<br />
nib2cib Resources/MainMenu.xib Resources/MainMenu.cib<br />
<br />
And open index.html. You should be able to enter a name and click "Say Hi" and should be greeted by an ugly JavaScript alert box. Hurray!<br />
<br />
Let's add some more stuff to the Nib. Open it again in Interface Builder and add another window to it. Set it to be visible at launch. Add a split view to it, set the resizing mask and add a text field to the left view and a webview to the right one. Connect the "takeStringURLFrom:" action of the text field to the webview. It should look something like this:<br />
<div class="separator" style="clear: both; text-align: center;"><a href="http://4.bp.blogspot.com/_-dK4R3d1lbc/S2hDABsNR6I/AAAAAAAAA6A/0a_QoZNarLY/s1600-h/Screen+shot+2010-02-02+at+16.20.42.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="/assets/archived_posts/Screen+shot+2010-02-02+at+16.20.42_9a46777d.png" /></a><a href="http://4.bp.blogspot.com/_-dK4R3d1lbc/S2hDABsNR6I/AAAAAAAAA6A/0a_QoZNarLY/s1600-h/Screen+shot+2010-02-02+at+16.20.42.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><br />
</a></div><div style="clear: both;"></div>Run nib2cib again and open index.html. You should see 2 windows and be able to enter a URL in the textfield and have it load when you press enter:<br />
<div class="separator" style="clear: both; text-align: center;"><a href="http://1.bp.blogspot.com/_-dK4R3d1lbc/S2hDwIHaXmI/AAAAAAAAA6I/RChHBN13ysA/s1600-h/Screen+shot+2010-02-02+at+16.24.01.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="/assets/archived_posts/Screen+shot+2010-02-02+at+16.24.01_7e628d9d.png" /></a><a href="http://1.bp.blogspot.com/_-dK4R3d1lbc/S2hDwIHaXmI/AAAAAAAAA6I/RChHBN13ysA/s1600-h/Screen+shot+2010-02-02+at+16.24.01.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><br />
</a></div><div style="clear: both;"></div>Great! Now let's add a custom Framework and add it. Open MainMenu.xib in Interface Builder again and add yet another window to it. Add a text field and a custom view to it so it looks like this:<br />
<br />
<div class="separator" style="clear: both; text-align: center;"><a href="http://4.bp.blogspot.com/_-dK4R3d1lbc/S2hFP_02K_I/AAAAAAAAA6Q/BDuGuMYImqw/s1600-h/Screen+shot+2010-02-02+at+16.30.23.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" src="/assets/archived_posts/Screen+shot+2010-02-02+at+16.30.23_db01633e.png" /></a></div><br />
Add a "customView" outlet of type "NSView" to the AppController (in IB) and another action called "setLocation:" (don't forget the colon!). Connect it all up (AppController's customView outlet to the custom view and the text field's action to AppController's setLocation:). Save it and run nib2cib again.<br />
Now get MapKit from github and copy it to the Frameworks directory inside the basicCapp dir:<br />
cd basicCapp/Frameworks<br />
git clone&nbsp;http://github.com/jfahrenkrug/MapKit.git<br />
<br />
Now make AppController.j look like this:<br />
<br />
<script src="http://gist.github.com/292748.js?file=AppController.j">
</script><br />
<br />
Now you should have a 3rd window when you open index.html again. It should look like this and should let you add markers for locations that you search for:<br />
<div class="separator" style="clear: both; text-align: center;"><a href="http://4.bp.blogspot.com/_-dK4R3d1lbc/S2hHvQw4l4I/AAAAAAAAA6Y/VsHieVQ5LNk/s1600-h/Screen+shot+2010-02-02+at+16.39.34.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" src="/assets/archived_posts/Screen+shot+2010-02-02+at+16.39.34_bbbf0896.png" /></a><a href="http://4.bp.blogspot.com/_-dK4R3d1lbc/S2hHvQw4l4I/AAAAAAAAA6Y/VsHieVQ5LNk/s1600-h/Screen+shot+2010-02-02+at+16.39.34.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><br />
</a></div><br />
<div style="clear: both;"></div><br />
See? It's all pretty easy! Now go ahead and build something great :)
<br/><hr/><h3>Comments</h3>
<div class="swcomment"><h4><a href="http://www.tablepadscustom.com/">table pads</a> said...</h4>
<p style="margin-left: 30px">In this case, there&#39;s not much there anyway, I&#39;d be happy to help with anything if you can&#39;t duplicate what I did.BETTER than heroes, but its not HORRIBLE. It has multi touch which 1.6 doesn&#39;t. and battery life was INSANE with 1.5.1. i got 4 days once without charging it, and i was on my phone a lot, i couldn&#39;t believe it.</p>
<em class="swlightgray" style="margin-left: 30px">February 15, 2010 11:13 AM</em></div>
