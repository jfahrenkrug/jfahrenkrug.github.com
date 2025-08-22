---
name: rake-no-such-file-to-load-although-it

title: 'Rake: "no such file to load" although it exists'
time: 2009-05-26 10:54:00.002000 Z
categories:
  - Programming
  - Ruby
---

I'm working on a search extension for the <a href="http://radiantcms.org/">Radiant CMS</a> that uses <a href="http://xapian.org/">Xapian</a> at the moment. I ran into a weird issue where rake complained about not being able to load a file although it existed. It listed the full - and correct - path of the rake file I wanted to include in another rake file and aborted with "no such file to load". Lies! All lies! Reading the <a href="http://rake.rubyforge.org/files/doc/rakefile_rdoc.html">RDoc of Rake</a> revealed that dependencies loaded with "require" are loaded before the Rake targets are evaluated. So alternatively you can use the "<b>import</b>" statement instead of "require". That's what solved my problem. The "no such file to load" error is quite misleading, though.
