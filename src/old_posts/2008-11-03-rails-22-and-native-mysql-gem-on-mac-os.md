--- 
name: rails-22-and-native-mysql-gem-on-mac-os
layout: ../layouts/OldPostLayout.astro
title: Rails 2.2 and the Native MySQL Gem on Mac OS X Leopard
time: 2008-11-03 08:34:00.002000 Z
categories: 
- Mac
- Tutorials
- Ruby
- rails
---
I'm trying out the new Rails 2.2 RC1 for a new project. Rails 2.2 doesn't come with the pure Ruby MySQL client anymore, but depends on the native MySQL gem. To make a long story short, this is how to do it on an Intel Mac:<div><ol><li>Install mysql5-devel with MacPorts:
<pre>sudo port install mysql5-devel</pre></li><li>Install the native MySQL gem like so:
<pre>sudo bash -c "ARCHFLAGS='-arch i386' sudo gem install mysql -- --with-mysql-include=/opt/local/include/mysql5/mysql/ --with-mysql-lib=/opt/local/lib/mysql5/mysql/ --with-mysql-config=/opt/local/bin/mysql_config5"</pre></li><li>Done</li></ol><div><a href="http://pjforpresident.com/2008/06/20/compiling-mysql-native-bindings-on-os-x-macports">This great article</a> immensely helped me with this.</div>
<p>If this was useful for you, please take a minute and recommend me:<br /><a href="http://workingwithrails.com/recommendation/new/person/11816-johannes-fahrenkrug"><img alt="Recommend Me" src="http://workingwithrails.com/images/tools/compact-small-button.jpg" /></a><br />Thank you!</p></div>
<br/><hr/><h3>Comments</h3>
<div class="swcomment"><h4><a href="">Anonymous</a> said...</h4>
<p style="margin-left: 30px">Thank you a lot for your blog post, you helped me a lot!</p>
<em class="swlightgray" style="margin-left: 30px">December 19, 2008 12:59 PM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hi Bryan,<BR/><BR/>thank you, if that works: great!<BR/>I just read in some places that specifying the ARCHFLAGS might help as well. But the other two args really do seem obsolete if you specify with-mysql-config.<BR/><BR/>- Johannes</p>
<em class="swlightgray" style="margin-left: 30px">November 03, 2008 01:01 PM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/13982445713632074640">bryanl</a> said...</h4>
<p style="margin-left: 30px">Why not just:<BR/><BR/><I>sudo gem install mysql -- --with-mysql-config=/opt/local/bin/mysql_config5</I><BR/><BR/>mysql_config will give you everything else you need</p>
<em class="swlightgray" style="margin-left: 30px">November 03, 2008 12:47 PM</em></div>
