---
name: jquery-ui-accordion-callback-and

title: jQuery UI Accordion Callback and Dynamic Content Height
time: 2008-07-03 11:02:00.003000 Z
categories:
  - JavaScript
  - Programming
  - jquery
---

This is just a quick note. I'm using jQuery (via the <a href="http://code.google.com/apis/ajaxlibs/">Google Ajax Libraries API</a>) and <a href="http://docs.jquery.com/UI/Accordion">jQuery UI Accordion</a> in an OpenSocial application. I need to know which accordion page is about to show and I need the accordion to dynamically change height according to the new contents. So this is how you do it:
First your HTML markup...

<pre class="prettyprint">
&lt;div id="accordion"&gt;
 &lt;ul id="files-accordion" class="ui-accordion-container" style="padding-top: 10px; width: 550px; clear: both;"&gt;
   &lt;li&gt;&lt;a href="javascript: void(0)" class="ui-accordion-link"&gt;Images&lt;/a&gt;
     &lt;div id="files-Image"&gt;Loading...&lt;/div&gt;
   &lt;/li&gt;
   &lt;li&gt;&lt;a href="javascript: void(0)" class="ui-accordion-link"&gt;Videos&lt;/a&gt;
     &lt;div id="files-Video"&gt;Loading...&lt;/div&gt;
   &lt;/li&gt;
   &lt;li&gt;&lt;a href="javascript: void(0)" class="ui-accordion-link"&gt;Files&lt;/a&gt;
     &lt;div id="files-File"&gt;Loading...&lt;/div&gt;
   &lt;/li&gt;
 &lt;/ul&gt;
&lt;/div&gt;
</pre>

And this is how you'd turn it into a nice accordion:

<pre class="prettyprint">
$('#accordion > ul').accordion({
  clearStyle: true,
  autoHeight: false
}).bind("accordionchange", function(event, something, ui) {
  console.dir(ui.newHeader); // jQuery, activated header
  console.log(ui.newHeader[0].id); //this has the id attribute of the header that was clicked
  doSomething(ui.newHeader[0].id);
});
</pre>

Note that "ui" is the 3rd, not the 2nd parameter of the event callback. Within that callback you can call some function that will dynamically load content into the selected accordion pane, maybe like this:

<pre class="prettyprint">
var doSomething = function(paneId) {
  $('#' + paneId).html('My dog\'s breath smells like dog food');
};
</pre>

You can basically put any attribute you want into the &lt;a&gt; tag within the &lt;li&gt; element and access it via the dot notation in your callback (ie ui.newHeader[0].someAttributeOfMyChoice). Enjoy!
<br/><hr/><h3>Comments</h3>

<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">That's good to know, Richard, thank you! It would be worth pointing that out in the docs, I guess ;-)</p>
<em class="swlightgray" style="margin-left: 30px">July 03, 2008 03:02 PM</em></div>
<div class="swcomment"><h4><a href="http://rdworth.org/">Richard D. Worth</a> said...</h4>
<p style="margin-left: 30px">Great article.<BR/><BR/>Re: "Note that "ui" is the 3rd, not the 2nd parameter of the event callback."<BR/><BR/>This was a regression in 1.5.1. Just letting you know it should change (be fixed) to be the 2nd parameter in the next release.</p>
<em class="swlightgray" style="margin-left: 30px">July 03, 2008 02:56 PM</em></div>
