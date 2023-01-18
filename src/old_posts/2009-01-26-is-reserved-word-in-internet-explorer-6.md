--- 
name: is-reserved-word-in-internet-explorer-6
layout: ../layouts/OldPostLayout.astro
title: "\"item\" is a Reserved Word in Internet Explorer 6 and 7"
time: 2009-01-26 10:17:00 Z
categories: 
- JavaScript
- Programming
---
<p>Arg! I know every web developer hates the IE. But sometimes the reasons why we hate it so much become so painfully obvious again. Like today. I've been working on an OpenSocial application and while testing it in IE, I got this strange message:</p>
<blockquote>
  <p>"Object doesn't support this action"</p>
</blockquote>
<p>Then a line number, no script name and just an unselectable, unclickable, uncopiable (I know, I just made all those words up) URL. How helpful.</p>
<p>So first I needed some sort of JS debugging in IE. I went with <a href="http://www.my-debugbar.com/wiki/CompanionJS/HomePage" title="Companion.JS">Companion.JS</a>. It's pretty useful, but of course no comparison with Firebug. I first tried using <a href="http://getfirebug.com/lite.html" title="Firebug Lite">Firebug Lite</a>, which is really cool, but it didn't work on MySpace (where I had to test my OpenSocial app). By the way, the <a href="http://www.microsoft.com/downloads/details.aspx?familyid=2f465be0-94fd-4569-b3c4-dffdf19ccd99&amp;displaylang=en">Microsoft Script Debugger</a> - which is needed by Companion.JS - doesn't install on Vista, of course. It did work on Windows XP, though.</p>
<p>So equipped with a JavaScript debugger, I investigated the error again and actually got a filename and a line number that was useful. This was the offending code:</p>
<pre class="prettyprint">
for (var i = 0; i &lt; json.items.length; i++) {
item = json.items[i]; // more code...
}
</pre>It turns out that "item" is a reserved keyword in Internet Explorer. Entering
<pre class="prettyprint">
javascript:alert(item);
</pre>in the IE address bar greets you with an [object] alert. <a href="http://www.railsonwave.com/railsonwave/2007/11/19/item-javascript-and-ie6">This blog post by Sandro</a> confirms this. So all I had to do was rename all instances of "item" to something else.

<br/><hr/><h3>Comments</h3>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hi Tammo,<BR/><BR/>Thank you for your comment! You're absolutely right. Not using var was a Bad Thing (tm) :)<BR/>I was wondering if IE would choke on it even with var, but alas! it doesn't. <BR/>javascript:function itemtest(){var item="test"; alert(item);};itemtest();<BR/>presents an ugly "test" alert box. Who would have thought? ;-)</p>
<em class="swlightgray" style="margin-left: 30px">January 28, 2009 02:24 PM</em></div>
<div class="swcomment"><h4><a href="http://tammofreese.de">Tammo Freese</a> said...</h4>
<p style="margin-left: 30px">Hello Johannes, just use <B>var item</B> instead of <B>item</B>. Without <B>var</B>, you set the value globally, which is not what you want to do (at least I hope so :))</p>
<em class="swlightgray" style="margin-left: 30px">January 28, 2009 12:40 PM</em></div>
