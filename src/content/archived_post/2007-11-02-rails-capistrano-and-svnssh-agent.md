---
name: rails-capistrano-and-svnssh-agent

title: Rails, Capistrano and svn+ssh agent forwarding
time: 2007-11-02 15:51:00.002000 Z
categories:
  - Programming
  - Ruby
  - rails
---

I was working on deploying a <a href="http://www.rubyonrails.org/">Rails</a> application using <a href="http://www.capify.org/">Capistrano</a> today. I ran into a few problems because my SVN server uses svn+ssh authentication. I will not go into all the details of using Mongrel and Capistrano, I'll just touch on the points that are important for using it with svn+ssh.
The problem is this: Capistrano logs in to your deployment server and wants to check out your Rails project from your SVN server. If that SVN server uses svn+ssh authentication, you need to enter a password, but since Capistrano is issuing the command, you can't enter that password and everything fails. You'll see something like this:

<pre class="prettyprint">** [out :: 192.168.0.200] subversion is asking for a password</pre>

The solution I used was to use SSH public key authentication instead. Here's a <a href="http://sial.org/howto/openssh/publickey-auth/">great tutorial</a>.
Once that's done, you only need your private key on your client and the public key on your SVN server.
Now you either keep following the tutorial to set up ssh agent forwarding or you take the easy way and download <a href="http://www.sshkeychain.org/">SSHKeychain</a> for your Mac.
Install it using <a href="http://trac.sshkeychain.org/cgi-bin/trac.cgi/wiki/INSTALL">these instructions</a> (don't forget to enable "Manage global environment variables" in SSHKeychain's Preferences), add it to your Mac's Login Items, log out of your Mac session, and log in again.

If everything with the keys is set up correctly, you should be able to log in to your SVN server through Terminal.app without being asked for a password.

Ok, now you have to tell Capistrano that it should use ssh agent forwarding. That is required for Capistrano to be able to log in to your SVN server using your key and not requiring a password.

So open up deploy.rb and add this line to the SSH OPTIONS section:

<pre class="prettyprint">ssh_options[:forward_agent] = true</pre>

If cap cold_deploy works now: great. In my case, it threw a strange exception like this one:

<pre class="prettyprint">Net::SSH::Transport::Session: [:forward_agent] (ArgumentError)</pre>

That means your net-ssh ruby gem is too old. I think it has to be at least version 1.1.1. So after running

<pre class="prettyprint">gem update net-ssh</pre>

cap cold_deploy worked like a charm!

This <a href="http://blog.codahale.com/2006/06/19/time-for-a-grown-up-server-rails-mongrel-apache-capistrano-and-you/">great tutorial</a> also helped me a lot.
<br/><hr/><h3>Comments</h3>

<div class="swcomment"><h4><a href="http://codesnik.livejournal.com/">codesnik</a> said...</h4>
<p style="margin-left: 30px">thank you very much, your post helped me a lot.<BR/><BR/>I still wonder why default net/ssh &quot;:config =&gt; true&quot; option doesn&#39;t take into account ForwardAgent value in my .ssh/config <BR/><BR/>maybe some bug in net/ssh. I&#39;m going to look deeply into code tomorrow.</p>
<em class="swlightgray" style="margin-left: 30px">August 13, 2008 08:09 PM</em></div>
<div class="swcomment"><h4><a href="namedia.net">Wilson</a> said...</h4>
<p style="margin-left: 30px">Thanks!  This was a huge help for me this evening and something that's not obvious for everyone.</p>
<em class="swlightgray" style="margin-left: 30px">May 18, 2008 03:52 AM</em></div>
