---
name: rails-21-killed-my-mysql-foreign-keys

title: Rails 2.1 Killed My MySql Foreign Keys
time: 2008-07-02 05:51:00.003000 Z
categories:
  - Programming
  - Ruby
  - rails
---

<img style="float:left; margin:0 10px 10px 0;cursor:pointer; cursor:hand;width: 100px;" src="http://tell.fll.purdue.edu/JapanProj/FLClipart/Medical/vomit.s.gif" border="0" alt="" />
I'm porting a big Rails 1.2.x application to Rails 2.1 at the moment. Everything went smoothly so far, I used the <a href="http://www.slashdotdash.net/articles/2007/12/03/rails-2-upgrade-notes">rake deprecated task</a> and watched out for <a href="http://giantrobots.thoughtbot.com/2008/6/19/gotchas-when-upgrading-to-rails-2-1">gotchas</a>, and replaced Rails 1.2.x pagination with <a href="http://errtheblog.com/posts/56-im-paginating-again">will_paginate</a>.
When I tried to run my test suite, though, it threw up all over my terminal:
<pre class="prettyprint">
Mysql::Error: #HY000Can't create table './coresales_test/#sql-1702c_b.frm' (errno: 150): ALTER TABLE agents ADD CONSTRAINT agents_ibfk_1 FOREIGN KEY (location_id) REFERENCES locations (id)
</pre>
It took me a bit to find the solution for this, but alas! I eventually did. To make a <a href="http://rails.lighthouseapp.com/projects/8994-ruby-on-rails/tickets/463">long story</a> short: Rails 2.1 doesn't handle integer columns without a :limit attribute correctly by assuming a default limit of 11 and then turning that - not into int(11) - but into bigint(11). Foreign keys have to be of the same data type, though. So MySql rightly complains about it.
The solution? Either use edge rails or use the monkey patch suggested in this <a href="http://blog.smartlogicsolutions.com/2008/06/24/rails-21-broke-my-mysql-foreign-keys/">extensive blog post about the problem</a>.
This was really quite annoying, but I'm glad that there are nice people out there providing patches and nice write-ups about such problems.
<br>If this was useful for you, please take a minute and recommend me:<br><a href="http://workingwithrails.com/recommendation/new/person/11816-johannes-fahrenkrug"><img alt="Recommend Me" src="http://workingwithrails.com/images/tools/compact-small-button.jpg"></a><br>Thank you!
<br/><hr/><h3>Comments</h3>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/15028520303674964427">John Trupiano</a> said...</h4>
<p style="margin-left: 30px">Hey, thanks for the link back to my blog post!  I'm always ecstatic when I'm able to help someone else out.<BR/><BR/>Happy coding.</p>
<em class="swlightgray" style="margin-left: 30px">July 07, 2008 05:24 PM</em></div>
