--- 
name: my-first-sproutcore-patch-accepted-and
layout: ../layouts/OldPostLayout.astro
title: My First SproutCore Patch Accepted and Released
time: 2008-07-01 12:13:00.004000 Z
categories: 
- Programming
- SproutCore
- OpenSocial
---
I have been digging deeper into <a href="http://www.sproutcore.com">SproutCore</a> lately and I have especially worked on using SproutCore for OpenSocial applications. It actually works and I'll write up a tutorial about it very soon. So yesterday I wrote and submitted <a href="http://sproutit.lighthouseapp.com/projects/11697/tickets/46-patch-option-to-use-import-in-stylesheets_for_client">my first SproutCore patch</a>. It lets you choose between including your CSS files with the &lt;link&gt; tag or the @import directive in a &lt;style&gt; tag. In OpenSocial applications, you can't contribute anything to the &lt;head&gt; section of your page and the &lt;link&gt; tag is only allowed within &lt;head>. So now with the support for @import you can use SproutCore apps that require external CSS files within OpenSocial. The cool thing is this: I submitted the patch last night and today SproutCore 0.9.12 was released with my patch included and mentioned in the <a href="http://www.sproutcore.com/2008/07/01/sproutcore-0912-hung-jury-release/">release blog post</a>. That's only a few hours from submit to release: Nice :)
