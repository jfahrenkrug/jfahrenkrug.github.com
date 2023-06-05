--- 
name: sproutcore-javascript-on-rails-drinking
layout: ../layouts/OldPostLayout.astro
title: "SproutCore: JavaScript On Rails, Drinking Cocoa"
time: 2008-06-19 08:56:00.004000 Z
categories: 
- JavaScript
- Programming
- WWDC
- Cocoa
---
<img style="display:block; margin:0px auto 10px; text-align:center;cursor:pointer; cursor:hand;width: 400px;" src="http://www.sproutcore.com/wp-content/themes/sproutcore/images/logo.png" border="0" alt="" /></a>
<b>&lt;update&gt;</b> Two things: Since version 0.9.10 SproutCore doesn't "break" Rails or conflict with it anymore. And about SproutCore and Ruby On Rails: SproutCore is a framework for developing client-side desktop-like JavaScript applications and it is backend agnostic. That means you can write your beautiful SproutCore application that runs in the user's browser and have it talk to a webserver that is built using your framework of choice, be it Ruby On Rails, Apache Wicket, JSP, PHP, you name it.  Your SproutCore application and the web application are two different parts, just like an email client and a mail server.<b>&lt;/update&gt;</b><br/>
The first session I attended on the last day of this year's WWDC was about SproutCore.
<a href="http://sproutcore.com">SproutCore</a> is the JavaScript framework that Apple's <a href="http://www.apple.com/mobileme/">mobileme</a> service is built with. "Big deal" you might think, "yet another JavaScript framework". But thou shalt not judge too hastily! SproutCore is not just another framework that lets you access page elements with a dollar sign, slides divs up and down or lets you display modal windows. SproutCore is a framework at a much deeper and lower level. From the <a href="http://www.sproutcore.com/about/">website</a>:
<blockquote>SproutCore is a totally new way of building applications on the web. Instead of following the typical web-driven model where most interesting things happen in the server, SproutCore applications split the load. A SproutCore application is a JavaScript application that runs entirely in the web browser. It can often run on its own, without even needing support for a web server except when it makes sense for the application. This frees the server developer to focus on the things the server can do very well such as saving, restoring and aggregating data and performing expensive operations. Meanwhile the “thick” client running in the web browser can handle the task of presenting the user with a friendly interface that is fast and intuitive.

SproutCore includes visual widgets such as list views, button views, and forms - just like other JavaScript frameworks. But it also provides other functions such as an in-memory database (that can integrate with client-side offline storage), bindings, property observing, and controllers. The code you write with SproutCore will resemble a desktop app written in Cocoa more than it will a web application written in Rails.</blockquote>
This is revolutionary! Normally even Ajax applications - although they don't load completely new pages with each request - do transfer html markup to the client upon every user action (I know, I know, not all of them, some just transfer JSON in some cases). But there are close to none Ajax applications that load an MVC application in the user's browser once and then only make server roundtrips when data has to be exchanged, just like a desktop application. And there certainly has not been a framework that enables us developers to easily build something like that. 
Check out the <a href="http://www.sproutcore.com/demos/">demos</a> to see how cool and snappy it is. The other revolutionary thing about it are the Rails-like build tools that are an essential part of SproutCore. They let you generate models, views and controllers using Ruby. These will be served by the webserver, but they'll run on the client since they are pure JavaScript, CSS and HTML. And there's one more thing: tests. SproutCore comes with amazing test support for your JavaScript applications so you can easily run your test suits in different browsers and make sure everything works. Such extensive test support for JavaScript code and applications is really sweet!
So what are you waiting for? <a href="http://www.sproutcore.com/documentation/hello-world-tutorial/">Get started now!
</a>
