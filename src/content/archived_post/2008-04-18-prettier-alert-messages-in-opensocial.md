---
name: prettier-alert-messages-in-opensocial

title: Prettier Alert Messages in OpenSocial Apps
time: 2008-04-18 06:08:00.004000 Z
categories:
  - orkut
  - JavaScript
  - Programming
  - jquery
  - OpenSocial
---

Google has posted the <a href="http://code.google.com/apis/orkut/docs/orkutdevguidelines.html">Orkut Developer Guidelines</a> for developers who build OpenSocial applications for the platform. These seem do be very good guidelines in general, not just for OpenSocial and not just for Orkut (although some are very specific to the platform). The first "MUST" item in the user experience section reads:

<blockquote>Always include error handling routines to generate a user-friendly message. HTML alert boxes are strongly discouraged as they're interruptive.</blockquote>
Makes sense. Alert boxes are horrible. So I came up with an easy way to include non-interruptive error messages in my OpenSocial application. This is no rocket science at all and there are lots of different and most likely better ways to do this, but I want to share this with you anyway because it might be helpful to someone.
So here we go:
<ol><li>I use <a href="http://docs.jquery.com/Downloading_jQuery">jQuery</a> for some JavaScript luxury. Include the libraries in the html section of your gadget xml:
<pre class="prettyprint">
&lt;script src="http://YOURSERVER/jquery/jquery-1.2.3.min.js" type="text/javascript"&gt;&lt;/script&gt;
</pre></li><li>Include this somewhere in the html section of your gadget xml where you want the error messages to appear:
<pre class="prettyprint">
&lt;div style="text-align: center; width: 80%;"&gt;
&lt;div id="error-msg-box" style="display: none;"&gt;
&lt;p&gt;&lt;!-- msg goes here -->&lt;/p&gt;
&lt;input onclick="dismissError()" value="OK" type="button"&gt;
&lt;/div&gt;
&lt;/div&gt;
</pre>Style it to your liking. I'm not a designer, so please don't ask me ;-). This is the style I used for the inner error-msg-box:
<pre class="prettyprint">
padding: 3px; border: 2px solid #BB0000; color: #BB0000; width: 100%; text-align: center;</pre>
See what I mean?</li><li>Now just add these two functions to your JavaScript:
<pre class="prettyprint">
/**
  Shows an error on the top of the page
  @see #dismissError
*/
function showError(msg) {
  $('#error-msg-box > p').html(msg);
  $('#error-msg-box').show('normal', function() {gadgets.window.adjustHeight();});
}

/\*_
Dismisses the error on the top of the page
@see #showError
_/
function dismissError() {
$('#error-msg-box').hide('normal', function() {gadgets.window.adjustHeight();});
}

</pre></li><li>That's it. Now you can call
<pre class="prettyprint">
showError('Something went wrong!');
</pre>
From anywhere in your code and the user can click Dismiss to dismiss the message. You can also dismiss the message programatically by calling
<pre class="prettyprint">
dismissError();
</pre>
from your code.
</li></ol>This even honors the second "MUST" of the User Experience section:
<blockquote>Always call the <code>gadgets.window.adjustHeight()</code> method when the application's content changes to prevent scrollbars from appearing.</blockquote>Enjoy.
