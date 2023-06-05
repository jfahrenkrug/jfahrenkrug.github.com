--- 
name: rails-time-travel-revisited
layout: ../layouts/OldPostLayout.astro
title: "Rails Time Travel Revisited: Manipulating Time.now for Specs"
time: 2008-10-14 10:06:00.005000 Z
categories: 
- Programming
- Ruby
- rails
---
<img style="margin: 0pt 10px 10px 0pt; cursor: pointer; width: 584px; height: 380px;" src="http://upload.wikimedia.org/wikipedia/commons/a/af/Worm3.jpg" alt="" border="0" /></a>

A few month ago I wrote about how to <a href="http://blog.springenwerk.com/2008/05/rails-time-travel-manipulating-timenow.html">manipulate Time.now for your Rails Test::Unit tests</a>. I've switched to using RSpec since then and had the same problem again: I have code that uses Time.now and I want to test it. It was fairly easy to move the code from Test::Unit to RSpec:

<ol><li>Copy the following code into spec/time_spec_helper.rb
<pre class="prettyprint">
unless Time.respond_to? :real_now   # prevent the error: stack level too deep (SystemStackError)
# &lt;b&gt;Test Helper: used only in testing!&lt;/b&gt;
#
# Extend the  Time  class so that we can offset the time that  now
# returns. This should allow us to effectively time warp for functional
# tests that require limits per hour, what not.
#
# Example usage:
#   require File.expand_path(File.dirname(__FILE__)   '/../spec_helper')
#   require File.expand_path(File.dirname(__FILE__)   '/../time_spec_helper')
#
#   describe YourModel do
# 
#     before(:each) do
#       pretend_now_is(Time.local(1999, 8, 1))  # position *all* tests back in time!
#     end
# 
#     after(:each) do
#       Time.reset    # jump back to the present
#     end
#
#     it "should be 1999" do
#       Time.now.year.should == 1999
#     end
#
#     # If one particular spec needs some time jumping of its own...
#     it "should jump to decades" do
#       pretend_now_is(Time.local(1960)) do
#         Time.now.year.should == 1960
#       end
#
#       pretend_now_is(Time.local(1970)) do
#         Time.now.year.should == 1970
#       end
#     end
#     # ...
#   end
#
#
# &lt;em&gt;&lt;tt&gt;(see reference http://snippets.dzone.com/posts/show/1738)&lt;/tt&gt;&lt;/em&gt;
class Time
  class &lt;&lt;self
    attr_reader :offset
    alias_method :real_now, :now
    def now
      @offset = 0 if @offset.nil?
      real_now - @offset
    end
    alias_method :new, :now

    # Warp to an absolute  time  in the past or future, making sure it takes
    # the present as the reference starting point when making the jump.
    def set(time)
      reset
      @offset = now - time
    end

    # Jump back to present.
    def reset
      @offset = 0
    end
  end
end
end
  
# Time warp to the specified  time . If given a block, it applies only for the
# duration of the passed block.
def pretend_now_is(time)
Time.set(time)
if block_given?
  begin
    yield
  ensure
    Time.reset
  end
end
end</pre></li><li>Require it in your spec:
<pre class="prettyprint">
require File.expand_path(File.dirname(__FILE__) + '/../time_spec_helper')</pre></li><li>Travel through time in your specs:
<pre class="prettyprint">before(:each) do
  pretend_now_is(Time.local(1999, 8, 1))  # position *all* tests back in time!
end

after(:each) do
  Time.reset    # jump back to the present
end

it "should be 1999" do
  Time.now.year.should == 1999
end

# If one particular spec needs some time jumping of its own...
it "should jump to decades" do
  pretend_now_is(Time.local(1960)) do
    Time.now.year.should == 1960
  end

  pretend_now_is(Time.local(1970)) do
    Time.now.year.should == 1970
  end
end</pre></li><li>Enjoy.</li></ol>Please note that this code is based on <a href="http://snippets.dzone.com/posts/show/1738#comment-1101">this highly useful piece of code</a>.
<p>If this was useful for you, please take a minute and recommend me:
<a href="http://workingwithrails.com/recommendation/new/person/11816-johannes-fahrenkrug"><img alt="Recommend Me" src="http://workingwithrails.com/images/tools/compact-small-button.jpg" /></a>
Thank you!</p>
<br/><hr/><h3>Comments</h3>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">That's a great idea, Rick!<BR/>I'd still keep the "pretend_now_is" method, though, since it's so nice and readable, but changing the implementation to take advantage of stubbing will basically bring it down to a one-liner. Nice!</p>
<em class="swlightgray" style="margin-left: 30px">October 17, 2008 08:31 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/03660411461311718839">rick</a> said...</h4>
<p style="margin-left: 30px">Why not just use your stubbing library of choice?  <BR/><BR/>Time.stub!(:now).and_return(Time.utc(....))</p>
<em class="swlightgray" style="margin-left: 30px">October 16, 2008 06:35 PM</em></div>
