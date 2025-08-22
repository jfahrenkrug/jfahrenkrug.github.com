---
name: check-if-remote-file-or-directory

title: Check If a Remote File or Directory Exists with Capistrano
time: 2008-07-15 14:36:00.002000 Z
categories:
  - Programming
  - Ruby
  - rails
---

I have a Rails app that can have custom logos for different deployments. I wanted to make it easy and simply drop the custom images into a shared/images directory and have Capistrano copy them to current/public/images but only when the shared/images directory exists. Naively I tried this:

<pre class="prettyprint">
if File.directory? "#{shared_path}/images"
  run "cp #{shared_path}/images/* #{release_path}/public/images/"
end
</pre>

Haha, cute. This does not work, since it checks for the LOCAL file, not for the file on the remote machine. Others had a <a href="http://groups.google.com/group/capistrano/browse_thread/thread/66a21c5a10206c6a">similar problem</a>.
So what's the solution? For me it was to realize that there are other languages besides Ruby to do the job, namely shell scripting. So to conditionally copy files only if a certain directory exists on the remote machine, use this one liner:

<pre class="prettyprint">
  # if the shared/images directory exists, copy all images from there to the current/public/images directory
  # to replace logos and stuff like that
  run "if [[ -d #{shared_path}/images ]]; then cp #{shared_path}/images/* #{release_path}/public/images/; fi"
</pre>

Enjoy!
<br/><hr/><h3>Comments</h3>

<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hey John,<BR/><BR/>Thank you so much for your comment, those are some very helpful tips! <BR/>You know in my case, I don't really depend on the shared/images dir to exists, it's just an optional way to customize the standard logos. That's why the symlink would also only make sense if that optional directory exists, but it's a good tip for the future. Btw, I can also never remember which comes first in ln -s ;-)<BR/><BR/>- Johannes</p>
<em class="swlightgray" style="margin-left: 30px">July 16, 2008 06:12 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/15028520303674964427">John Trupiano</a> said...</h4>
<p style="margin-left: 30px">Hey Johannes, there are a couple of things that I can think of to help you.<BR/><BR/>1) Capistrano has basic dependency checking.  For instance, I can ensure that a certain file or directory exists on the remote server:<BR/><BR/>depend(:directory, "#{shared_path}/images")<BR/><BR/>depend(:file, "#{shared_path}/some_config.xml"<BR/><BR/>The deploy:check recipe will run through all of your dependencies and let you know if they're satisfied.<BR/><BR/>2) What I do with assets like you suggest (most notably user-uploaded assets handled by the file_column plugin) is hook onto the deploy:update task, e.g.<BR/><BR/>after :update_code, :symlink_assets<BR/><BR/>task :symlink_assets do <BR/>  run("ln -s #{shared_path}/images #{current_path}/public/images")<BR/>end<BR/><BR/>I might have the ln arguments backwards...I always forget which goes first, but the idea is that your images folder is actually a symlink up into the shared directory.<BR/><BR/>I've written some helper functions in my <A HREF="http://github.com/jtrupiano/capistrano-extensions" REL="nofollow">capistrano-extensions gem</A> (see create_shared_file_column_dirs).  You may find it a useful starting point.<BR/><BR/>-John</p>
<em class="swlightgray" style="margin-left: 30px">July 16, 2008 12:06 AM</em></div>
