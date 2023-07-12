---
name: ibm-db2-on-mac-with-ruby-rails-and

title: IBM DB2 on the Mac with Ruby, Rails and Radiant
time: 2009-01-13 11:02:00.006000 Z
categories:
  - DB2
  - Programming
  - Tutorials
  - Ruby
  - rails
---

instructions in this blog post</a> to install the IBM DB2 Ruby Gem.</li></ol><div>Those are the big steps. But I ran into a few minor problems on my machine. So in case you run into them as well, here's how to solve them.</div><div>

</div><div><span class="Apple-style-span"  style="font-size:large;"><span class="Apple-style-span" style="font-weight: bold;">Problem #1 - Error SQL1205N when running db2sampl</span></span></div><div><span class="Apple-style-span"  style="font-size:medium;">When I tried to create the SAMPLE database with the db2sampl command, I got this error:</span></div><div><blockquote>Attempt to create the database “SAMPLE” failed.
SQL1205N The code page “1208″ and/or territory code “0″ that has been specified is not valid.
</blockquote>Obviously this had to do with my code page. Adding these two lines to my .profile file solved the problem:</div><div>
</div><div><blockquote>export LC_ALL=en_EN.UTF-8
export LANG=en_EN.UTF-8</blockquote>Don't forget to source your .profile file and you'll be good to go.</div><div>
</div><div><span class="Apple-style-span"  style=" font-weight: bold;font-size:large;">Problem #2 - SQL30082N - ROOT CAPABILITY REQUIRED</span></div><div><span class="Apple-style-span"  style="font-size:medium;">I got this error when I tried to run the sample Ruby app from the blog post that tries to connect to the SAMPLE database via the ibm_db Ruby Gem. This is what it spat out:</span></div><div><blockquote>Connection error: [IBM][CLI Driver] SQL30082N  Security processing failed with reason "42" ("ROOT CAPABILITY REQUIRED").  SQLSTATE=08001 SQLCODE=-30082</blockquote>The solution: Stop the DB2 server with the db2stop command and restart it with </div><div><span class="Apple-style-span" style="font-weight: bold;">sudo db2start</span></div><div>Since DB2 uses OS authentication and the DB2 server is started without superuser privileges right after the installation, it can't authenticate other users. So you'll have to run it as a superuser.</div><div>
</div><div>So now we can get to what I actually wanted to try: Running the <a href="http://radiantcms.org/">Radiant CMS</a> on a DB2 database. These are the steps:</div><div><ol><li>sudo gem install radiant    (it's version 0.6.9 as of this writing)</li><li>Create a new radiant app:
<pre class="prettyprint">radiant mygreatapp</pre></li><li>Edit config/database.yml
We'll only edit the development section. Make it look like this:
<pre class="prettyprint">development:
adapter:     ibm_db
username:    your_username
password:    your_password
database:    db2_dev</pre></li><li>Create the database (note: it's name cannot be longer than 8 chars!)
<pre class="prettyprint">db2 create database db2_dev</pre></li><li>Freeze Radiant to the vendor dir (we'll have to edit it):
<pre class="prettyprint">rake radiant:freeze:gems</pre></li><li>OK, when the ibm_db gem can't rename columns. So we'll have to use this really ugly hack:
Delete all the 21 migrations in the vendor/radiant/db/migrate directory and place this single migration file in there:
<script src="http://gist.github.com/46433.js"></script></li><li>Now run rake db:bootstrap</li><li>Start the app with ruby script/server</li><li>Go to http://localhost:3000/admin and login with admin/radiant</li><li>You should be able to use your Radiant CMS now, running on DB2!</li></ol><div>This is still pretty raw and I'll post this to the Radiant mailing list, so we can get better DB2 support built right in.</div></div></div>
<br/><hr/><h3>Comments</h3>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Your .profile is directly in your home directory. If not, you can simply create it.</p>
<em class="swlightgray" style="margin-left: 30px">December 23, 2009 11:48 AM</em></div>
<div class="swcomment"><h4><a href="">Anonymous</a> said...</h4>
<p style="margin-left: 30px">where is my .profile???</p>
<em class="swlightgray" style="margin-left: 30px">December 22, 2009 06:16 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Thank you for that, Ian, that was very thoughtful.</p>
<em class="swlightgray" style="margin-left: 30px">January 15, 2009 06:34 AM</em></div>
<div class="swcomment"><h4><a href="http://twitter.com/idbjorh">Ian Bjorhovde</a> said...</h4>
<p style="margin-left: 30px">Johannes,<BR/><BR/>I added the comment so that (hopefully) other RoR developers (who aren't familiar with DB2) don't start trying to run their DB2 instances as root...<BR/><BR/>Cheers,</p>
<em class="swlightgray" style="margin-left: 30px">January 15, 2009 01:35 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hi Ian,<BR/><BR/>Thank you for the tip! In my special setup I'm not concerned about security: It's just my development laptop and I just wanted to get DB2 up and running with Ruby, Rails und Radiant as a proof that it works. This post is by no means meant to be a description of a production setup.<BR/><BR/>- Johannes</p>
<em class="swlightgray" style="margin-left: 30px">January 14, 2009 06:36 AM</em></div>
<div class="swcomment"><h4><a href="http://twitter.com/idbjorh">Ian Bjorhovde</a> said...</h4>
<p style="margin-left: 30px">Hello.<BR/><BR/>Good post, but you don't want to start db2 using 'sudo db2start'.  Running your entire DB2 instance as root is not a great idea for security reasons.<BR/><BR/>There are a few SUID root binaries in a typical DB2 instance that handle specific tasks like authentication.<BR/><BR/>To avoid the authentication errors, you have two options:<BR/><BR/>1)  Install DB2 as root (sudo db2setup)<BR/>2)  Use the 'db2rfe' tool to enable the instance; however, please note that with the current beta db2rfe does not work.<BR/><BR/><BR/>Good luck</p>
<em class="swlightgray" style="margin-left: 30px">January 13, 2009 09:41 PM</em></div>
