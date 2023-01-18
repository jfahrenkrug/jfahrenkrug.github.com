--- 
name: unit-testing-with-actsasferret
layout: ../layouts/OldPostLayout.astro
title: Unit Testing with acts_as_ferret
time: 2008-06-19 11:48:00.003000 Z
categories: 
- Programming
- Ruby
- rails
---
<img style="float:left; margin:0 10px 10px 0;cursor:pointer; cursor:hand;width: 200px;" src="http://ferret.davebalmain.com/logo.png" border="0" alt="" />
I'm using <a href="http://projects.jkraemer.net/acts_as_ferret/">acts_as_ferret</a> for full text search in a Rails app I'm building. It works great and of course I want to unit test the full text search in my models. So I added an extremely simple test (I have two fixtures that have the matching string "bla" in on of their indexed fields):
<pre class="prettyprint">
def test_find_by_contents
  assert_equal 2, MyModel.find_by_contents('bla').total_hits
end
</pre>
This is great, except for one small problem: it almost always fails! The total_hits are sometimes 1, sometimes 0 and hardly ever 2. Why? Because the data from the fixtures is rebuilt before every test case so ferret can't keep it's index up to date quickly enough. 
A very crude but simple solution is to rebuild the index before ferret-related tests:
<pre class="prettyprint">
def test_find_by_contents
  MyModel.rebuild_index
  assert_equal 2, MyModel.find_by_contents('bla').total_hits
end
</pre>
Now it works as expected. This will affect performance, though. So if you have a huge test suite, you might want to consider using the <a href="http://www.elctech.com/2007/5/31/preloading-fixtures">preload fixtures plugin</a> from ELC Technologies. I haven't tried this, but it most likely will also eliminate the need to rebuild the index before ferret related tests since the fixtures are not constantly dumped and rebuilt.

If this was useful for you, please take a minute and recommend me:<br><a href="http://workingwithrails.com/recommendation/new/person/11816-johannes-fahrenkrug"><img alt="Recommend Me" src="http://workingwithrails.com/images/tools/compact-small-button.jpg"></a><br>Thank you!
<br/><hr/><h3>Comments</h3>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/07627225095848131967">Gene Tani</a> said...</h4>
<p style="margin-left: 30px">see also<BR/><BR/>http://bugs.omdb.org/browser/trunk/test/unit/movie_ferret_index_test.rb<BR/><BR/>http://bugs.omdb.org/browser/trunk/test/unit/person_ferret_test.rb</p>
<em class="swlightgray" style="margin-left: 30px">September 07, 2008 07:17 PM</em></div>
