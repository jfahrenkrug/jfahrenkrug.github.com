---
name: speicherzugriffsfehleresen-97

title: Speicherzugriffsfehleresen... 97%
time: 2008-05-06 11:49:00.003000 Z
categories:
  - Tutorials
  - Debian
---

OK, Debian is strange. I just added a new package source to my sources.list which now looks like this:

<pre class="prettyprint">
deb http://ftp2.de.debian.org/debian etch main contrib non-free
deb http://ftp.de.debian.org/debian testing main contrib non-free
</pre>

Then I added this to /etc/apt/apt.conf

<pre class="prettyprint">
APT::Default-Release "stable";
</pre>

Now I naively thought I could just run apt-get update. ERRR. Wrong! Right at the end I was greeted with this:

<pre class="prettyprint">
Speicherzugriffsfehleresen... 97%
</pre>

What a charming misspelled useless cryptic error message, just the way I like them. After some research I found out that this message seems to read

<pre class="prettyprint">
Segmentation faultsts ... x%
</pre>

on English systems.
Some more research <a href="http://www.debianhelp.org/node/1972">brought me here</a>. Possibly some good tips there, but none of them helped.

What did help was this: Increase the cache limit for apt-get! Add this to your apt.conf:

<pre class="prettyprint">
APT::Cache-Limit "20000000";
</pre>

If it still doesn't work, you might have to increase it even more. It would have saved me a lot of time if apt-get would just tell me "Your cache size is too small for the selected number of package sources. Increase the cache limit by setting the APT::Cache-Limit in your apt.conf file, for example APT::Cache-Limit "20000000";"

Oh well.
<br/><hr/><h3>Comments</h3>

<div class="swcomment"><h4><a href="http://www.goodhealthsarticle.com">goodhealth</a> said...</h4>
<p style="margin-left: 30px">did not work for me either on RHEL4<BR/>please help</p>
<em class="swlightgray" style="margin-left: 30px">December 18, 2008 10:02 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/10828147804350064032">Chronos</a> said...</h4>
<p style="margin-left: 30px">Just gave the nail on the head!<BR/>6 month later, this is still not fixed...<BR/>Thank you!!</p>
<em class="swlightgray" style="margin-left: 30px">October 24, 2008 08:10 PM</em></div>
<div class="swcomment"><h4><a href="">Anonymous</a> said...</h4>
<p style="margin-left: 30px">It works, thank you!<BR/>Schorsch</p>
<em class="swlightgray" style="margin-left: 30px">May 13, 2008 12:49 PM</em></div>
