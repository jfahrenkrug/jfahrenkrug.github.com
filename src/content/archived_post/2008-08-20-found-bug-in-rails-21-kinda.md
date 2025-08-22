---
name: found-bug-in-rails-21-kinda

title: Found a Bug in Rails 2.1... kinda
time: 2008-08-20 07:14:00.003000 Z
categories:
  - Ruby
  - rails
---

Yesterday I've encountered some strange behavior in Rails 2.1. When I called build on an association that was empty (i.e. customer.orders.build) and then passed that association as a collection to a partial, nothing got displayed. When I called length or each {} on that association right after the call to build, however, it worked. So I sort of needed to "commit" the build call by calling length right after.
I <a href="http://groups.google.com/group/rubyonrails-core/browse_thread/thread/15d2917c8fe02bec">posted it to the Ruby On Rails Core</a> group and it turned out that it was indeed a bug. It had been fixed in edge already, though.
So if you're not using edge, but the actual Rails 2.1 release, make sure to call length (i.e. customer.orders.length) after you call build on an empty association until the fixed version gets released.
