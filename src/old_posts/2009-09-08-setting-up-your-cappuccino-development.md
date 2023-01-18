--- 
name: setting-up-your-cappuccino-development
layout: ../layouts/OldPostLayout.astro
title: Setting up your Cappuccino development environment
time: 2009-09-08 06:47:00.007000 Z
categories: 
- Cappuccino
- Tutorials
- Cocoa
---
official instructions</a> and don't aim to replace them, but possibly make them a little easier to follow. Here we go:<div></div><div><ol><li>Get the source: <pre><code>git clone git://github.com/280north/cappuccino.git</code></pre></li>
<li>Make a directory for the built products, for example I did: <pre><code>mkdir /Users/johannes/Code/capp_build</code></pre></li>
<li>Add $CAPP_BUILD to your .profile (or whatever you use) I did: <pre><code>export CAPP_BUILD=/Users/johannes/Code/capp_build</code></pre></li>
<li>Source it: <pre><code>source ~/.profile</code></pre></li>
<li>Build and install cappuccino: <pre><code>cd cappuccino &amp;&amp; sudo rake install</code></pre></li>
<li>That's it!</li>
</ol><div></div><div>To update to the latest version, you can later just change into the cappuccino directory and run <pre><code>git pull</code></pre>and then <pre><code>sudo rake clobber-all install</code></pre></div></div><div>And if you use TextMate, you'll want to install the TextMate Objective-J bundle like so (in the cappuccino directory): <pre><code>open ./Build/Cappuccino/Tools/Editors/TextMate/JavaScript\ Objective-J.tmbundle</code></pre>One more optional thing you should do is set up your name in capp (the tool you'll use to generate new applications): <pre><code>capp config user.name "Your Name"</code></pre>You can also <a href="http://groups.google.com/group/objectivej/browse_thread/thread/75b268a8543b5258/884aeef09e2a4979">set up additional values</a>.  So now you're all set to start your first Cappuccino project. </div>
<br/><hr/><h3>Comments</h3>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Thanks, ncho!<br />[cheesy]I had as much fun writing them as you had reading them[/cheesy] ;-)</p>
<em class="swlightgray" style="margin-left: 30px">September 12, 2009 10:18 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/13888271911652976677">ncho</a> said...</h4>
<p style="margin-left: 30px">Johannes -- thanks for these Cappucinno tutorials.  This is great!  Also, good to see someone pushing the Radiant envelope -- excellent CMS.</p>
<em class="swlightgray" style="margin-left: 30px">September 11, 2009 06:41 PM</em></div>
