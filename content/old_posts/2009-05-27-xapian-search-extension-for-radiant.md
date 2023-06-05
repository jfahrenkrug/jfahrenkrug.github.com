--- 
name: xapian-search-extension-for-radiant
layout: ../layouts/OldPostLayout.astro
title: Xapian Search Extension for Radiant
time: 2009-05-27 11:27:00.003000 Z
categories: 
- Programming
- Ruby
- rails
---
<img style="display:block; margin:0px auto 10px; text-align:center;cursor:pointer; cursor:hand;width: 400px; height: 100px;" src="http://xapian.org/xapian-logo.png" border="0" alt="" /></a>
I'm working on a project involving the <a href="http://radiantcms.org/">Radiant CMS</a> and a legacy DB2 database. We need full-text search and initially I would have liked to use <a href="http://kpumuk.info/projects/ror-plugins/sphinx/">Sphinx</a> (because <a href="http://www.ruby-forum.com/topic/137629">Ferret is too unstable</a>) but the available Rails plugins for Sphinx only work with MySql or Postgres. So I came across a little-known search engine called <a href="http://www.xapian.org/">Xapian</a>. It's very fast, it's used by <a href="http://gmane.org/">Gmane</a> to index millions of entries every day and (alas!) it works with every DB that Rails works with (which includes DB2). <div>So in order to use it with Radiant, I built a small extension that makes Radiant pages full-text-indexable. You can <a href="http://github.com/jfahrenkrug/radiant-xapian-search-extension/tree/master">check it out on Github</a>. It's still very basic and has lots of room for improvement, but it's a start.</div>
