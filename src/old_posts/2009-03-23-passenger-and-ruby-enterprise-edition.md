--- 
name: passenger-and-ruby-enterprise-edition
layout: ../layouts/OldPostLayout.astro
title: Passenger and Ruby Enterprise Edition on Solaris 10
time: 2009-03-23 15:49:00.007000 Z
categories: 
- Tutorials
- Ruby
- rails
- Solaris
---
<img style="float:left; margin:0 10px 10px 0;cursor:pointer; cursor:hand;width: 240px; height: 240px;" src="http://1.bp.blogspot.com/_-dK4R3d1lbc/Scex57XYHQI/AAAAAAAAA2c/oW63jOz0Qps/s320/solaris_logo.jpg" border="0" />
I recently had the pleasure of setting up REE and Passenger on Solaris 10. I set the server up using the ibm_db gem for the IBM DB/2 database. I'm not covering this part in this tutorial and I also haven't replaced it with instructions for MySQL. I'm sure you'll figure out how to set up MySQL on Solaris.<div>Before you start, some important notes: You can replace "myapp" with - well - your app. Also note that this is a little rough. Please leave suggestions or improvements in the comments. Also one very important tip (this took us quite a while to find): First start your app in development mode my setting the Passenger RailsEnv development directive. In production mode, Rails buffers the logger. If will only write stuff to the log file once it has 1000 bytes. Sometimes something fails right away and those 1000 bytes are never reached and hence nothing is ever written to the log file. So do yourself a favor and run in development mode first. So here we go:</div><div>

<ol>
<li>Create httpd.conf:
  <pre class="prettyprint">cp /etc/apache2/httpd.conf-example /etc/apache2/httpd.conf</pre>
</li>
<li>Start Apache: 
  <pre class="prettyprint">sudo svcadm enable http:apache2</pre>
  <a href="http://www.sun.com/software/solaris/howtoguides/servicemgmthowto.jsp">More info here</a>.
</li>
<li>Install Ruby Enterprise Edition:
<pre class="prettyprint">wget http://rubyforge.org/frs/download.php/51100/ruby-enterprise-1.8.6-20090201.tar.gz</pre>
<li>Install GNU Tar (needed for Capistrano, if you use the copy strategy. If not, you don't need it.):
  <pre class="prettyprint">sudo pkg-get install gtar</pre>
</li>
<li>If you do use the Capistrano copy strategy, you also need a link from tar to gtar:
<pre class="prettyprint">cd /home/myapp
mkdir capistrano-links
cd capistrano-links
ln -s /opt/csw/bin/gtar tar</pre>
</li>
<li>Unpack Ruby Enterprise Edition:
  <pre class="prettyprint">gtar -xvzf ruby-enterprise-1.8.6-20090201.tar
cd ruby-enterprise-1.8.6-20090201/source</pre>
</li>
<li>Configure:
  <pre class="prettyprint">./configure --with-openssl-dir=/opt/csw --with-readline-dir=/opt/csw --with-iconv-dir=/opt/csw --prefix=/opt/rubyenterprise --enable-pthread</pre>
  More info at <a href="http://www.darkaslight.com/blog/entry/38-Compiling-Ruby-Enterprise-Edition-on-Solaris-10">Dark As Light</a> and at <a href="http://wiki.joyent.com/accelerators:apache_passenger_ree">Joyent</a>.
</li>
<li>Install REE:
  <pre class="prettyprint">make
make install</pre>
</li>
<li>Edit your profile:
  <pre class="prettyprint">vi ~/.profile</pre>
  Then add this:</br>
  <pre class="prettyprint">export PATH=/opt/rubyenterprise/bin:/opt/rubyenterprise/lib/gems/bin:$PATH
export GEM_HOME=/opt/rubyenterprise/lib/gems
export RUBYLIB=/opt/rubyenterprise/lib
export RUBYOPT=rubygems</pre>
  Save and source it:
  <pre class="prettyprint">source ~/.profile</pre>
</li> 
<li>Install RubyGems:
  <pre class="prettyprint">wget http://rubyforge.org/frs/download.php/45905/rubygems-1.3.1.tgz
gtar -xvzf rubygems-1.3.1.tgz
cd rubygems-1.3.1
/opt/rubyenterprise/bin/ruby setup.rb install --prefix=/opt/rubyenterprise/</pre>
</li>
<li>Install some gems:
  <pre class="prettyprint">gem install daemons fastthread gem_plugin rake tzinfo rack passenger</pre>
</li>
<li>Set some environment variables you that you will need for the passenger installation:
  <pre class="prettyprint">export APXS2=/usr/apache2/bin/apxs
export APR_CONFIG=/usr/apache2/bin/apr-config</pre> 
  <a href="http://www.darkaslight.com/blog/tag/passenger">More info here</a>.
</li>
<li>Install Passenger:
  <pre class="prettyprint">passenger-install-apache2-module</pre>
</li>
<li>Create a wrapper script for ruby that sets some environment variables:
<pre class="prettyprint">cd /home/myapp
vi ruby_with_env</pre>
Then enter this:<br/>
<pre class="prettyprint">
#!/bin/sh
export PATH=/opt/rubyenterprise/bin:/opt/rubyenterprise/lib/gems/bin:$PATH
export GEM_HOME=/opt/rubyenterprise/lib/gems
export RUBYLIB=/opt/rubyenterprise/lib
export RUBYOPT=rubygems
exec "/opt/rubyenterprise/bin/ruby" "$@"</pre>
I know that this is a bit hackish and not very elegant. More elegant and working solutions and warmly welcomed.
</li>
<li>Put the Passenger stuff into the Apache config:
  <pre class="prettyprint">vi /etc/apache2/httpd.conf</pre>Add these lines:
  <pre class="prettyprint">LoadModule passenger_module /opt/rubyenterprise/lib/gems/gems/passenger-2.1.2/ext/apache2/mod_passenger.so
PassengerRoot /opt/rubyenterprise/lib/gems/gems/passenger-2.1.2
PassengerRuby /home/myapp/ruby_with_env</pre>
</li>
<li>Also add this:
<pre class="prettyprint">
&lt;VirtualHost *:80&gt;
   ServerName myapp.mycompany.com
   DocumentRoot /opt/myapp/current/public
&lt;/VirtualHost&gt;</pre>
Also change Group to myapp and User to myapp.
<li>Create a directory for your rails app:
<pre class="prettyprint">mkdir /opt/myapp</pre>
</li>
<li>Restart Apache:
  <pre class="prettyprint">sudo svcadm restart http:apache2</pre>
  Check that it's online:
  <pre class="prettyprint">svcs apache2</pre>
</li>
<li>Add this to the bottom of /etc/ssh/sshd_config:
  <pre class="prettyprint"># for capistrano
PermitUserEnvironment yes</pre>
</li>
<li>Install Rails:
  <pre class="prettyprint">gem install rails</pre>
</li>
<li>Change to the shared/config directory:
  <pre class="prettyprint">mkdir /opt/myapp/shared/config</pre>
</li>
<li>Copy your database.yml to /opt/myapp/shared/config/database.yml.production and enter your production values.
IMPORTANT: remove all other entries, that might use a different database adapter! This prevented Passenger from working for me.
</li>
<li>Deploy:
(I assume that you have capified your project)
  On your client machine, in your project directory, run this:
<pre class="prettyprint">cap staging deploy:setup
cap staging deploy:cold</pre>
</li>
<li>That's it!</li>
</ol>
<br/>If this was useful for you, please take a minute and recommend me:<br/><a href="http://workingwithrails.com/recommendation/new/person/11816-johannes-fahrenkrug"><img alt="Recommend Me" src="http://workingwithrails.com/images/tools/compact-small-button.jpg"></a><br>Thank you!</p>
</div>
<br/><hr/><h3>Comments</h3>
<div class="swcomment"><h4><a href="http://darkaslight.com/">Sam Freiberg</a> said...</h4>
<p style="margin-left: 30px">Nice write up. By the way I recently spent some time getting RMagick compiled against the new version of ImageMagick (from OpenCSW) if you need it. :)</p>
<em class="swlightgray" style="margin-left: 30px">May 01, 2009 11:28 PM</em></div>
<div class="swcomment"><h4><a href="http://www.munichconsulting.de">Sylvain Gibier</a> said...</h4>
<p style="margin-left: 30px">Excellent post ! I've been looking for these steps for a while.<br /><br />Cheers - Sylvain</p>
<em class="swlightgray" style="margin-left: 30px">April 14, 2009 01:51 PM</em></div>
