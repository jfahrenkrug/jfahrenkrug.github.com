---
name: find-unused-and-invalid-radiant-snippets

title: Find unused and invalid Radiant Snippets
time: 2013-01-29 11:02:00.006000 Z
categories:
  - Programming
  - Ruby
  - rails
---

<p>When using the Ruby on Rails based Radiant CMS system, you might find yourself wondering which snippets are unused or which non-existent snippets are referenced in a page, a layout or another snippet. I've created a small script that finds both unused as well as invalid snippets:<p>
  <script src="http://gist.github.com/4664843.js"></script>
<p>Just run it like so:</p>
<p><code>bundle exec ./script/runner dead_snippets.rb</code></p>
<p>Enjoy!</p>
