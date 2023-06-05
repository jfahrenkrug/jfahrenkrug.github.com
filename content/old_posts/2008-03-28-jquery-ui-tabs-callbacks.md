--- 
name: jquery-ui-tabs-callbacks
layout: ../layouts/OldPostLayout.astro
title: jQuery UI Tabs Callbacks
time: 2008-03-28 15:11:00.002000 Z
categories: 
- JavaScript
- Programming
- jquery
---
Somehow the jquery ui tabs callbacks <a href="http://docs.jquery.com/UI/Tabs">as described on the website</a> (and as <a href="http://stilbuero.de/jquery/tabs_3/">described here</a>) don't seem to work for me. So I took a look at the source code and this is how I got them to work:

 <pre class="prettyprint">
$("#tabbook &gt; ul").tabs().bind("show.ui-tabs", 
    function(event, ui) {
        console.log(ui);
        console.log('show tab');
         if (ui.panel.id == 'id-of-some-tab-page') {
               console.log('It is showing!');
          }
    }
);
</pre>

These are the events you can register callbacks for:
<ul><li>load.ui-tabs</li><li>show.ui-tabs</li><li>select.ui-tabs</li><li>add.ui-tabs</li><li>remove.ui-tabs</li><li>enable.ui-tabs</li><li>disable.ui-tabs</li></ul>The "ui" object that's passed into the callback function has lots of interesting properties (just dump it with Firebug's console.log or console.dir) but you'll probably be most interested in 'ui.panel.id' since that will hold the id of the tab page that the event has been triggered for.
<br/><hr/><h3>Comments</h3>
<div class="swcomment"><h4><a href="">Anonymous</a> said...</h4>
<p style="margin-left: 30px">Great work-around, worked for me!<BR/><BR/>However, I noticed just shortly after that the method described on the website refers to *version 3* of the jQuery Tabs, and I still had an older package. Now that I downloaded the new version, the other method works as well. (There are a few other differences, so it's worth watching out for the version!)</p>
<em class="swlightgray" style="margin-left: 30px">April 17, 2008 12:05 AM</em></div>
