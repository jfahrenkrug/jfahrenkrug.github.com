---
name: real-life-cappuccino-tutorial-part-1

title: Real Life Cappuccino Tutorial - Part 1
time: 2009-09-08 13:49:00.015000 Z
categories:
  - Programming
  - Cappuccino
  - Tutorials
  - Cocoa
---

<b><span class="Apple-style-span" style="font-weight: normal;"><b>Update(09/21/09)</b>: Updated the tutorial to use the newest MapKit version (new version of MapKit in the github repository and some changes in MapController.j).</span></b><br />
<b><br />
</b><br />
<b>Update(09/17/09)</b>: The MapKit files were missing in the github repository. It's fixed now! Thanks to Mic Pringle for pointing it out. I'm lacking some serious git-fu!<br />
<br />
In this tutorial we'll build a real life <a href="http://cappuccino.org/">Cappuccino</a> application, complete with models, views and controllers, key-value-observing, delegates, JSON, a Ruby on Rails backend and even (gasp!) Google Maps. The purpose of this application will be to add locations to a list, add geo-coordinates to that location and ultimately draw the route on a Google Map. I assume you've <a href="http://blog.springenwerk.com/2009/09/setting-up-your-cappuccino-development.html">set up your development environment</a>, and I also assume that you've either played around with Cappuccino or Cocoa before and I won't explain every little detail. Also, you'll need some images that you'll have to copy to your project's Resources folder. You can <a href="http://github.com/jfahrenkrug/CappuccinoLocations1/tree/master">find them here on github</a>. So let's get started!<br />
<span style="font-size: x-large;">Part 1 - Basic Functionality</span><br />

<div><br />
<span style="font-size: large;">1.1 - Skeletor and the Model</span>  <br />
First you'll have to generate a new Application skeleton by running <b><i>capp gen Locations</i></b>. Change into the Locations directory and make sure it works by opening index.html in your browser. You should see a very familiar greeting.<br />
<img alt="" border="0" id="BLOGGER_PHOTO_ID_5379101862128203714" src="http://4.bp.blogspot.com/_-dK4R3d1lbc/SqZopNbLN8I/AAAAAAAAA3E/QM9vvC3q5vg/s400/Picture+1.png" style="cursor: hand; cursor: pointer; display: block; height: 127px; margin: 0px auto 10px; text-align: center; width: 259px;" />  <br />
Since Cappuccino uses the MVC pattern, we should first build the model class for the location. Fire up your favorite editor and add a file right inside the Locations directory called "Location.j". The file should look like this:<br />
<script src="http://gist.github.com/182927.js">
</script>  <span style="font-size: large;">1.2 - The LocationsController and Demo Data</span><br />
Next we will need some demo data to work with and we'll need a controller for the locations. Add a new file called "DemoData.j" and set this contents:<br />
<script src="http://gist.github.com/182929.js">
</script>  <br />
Finally we need the controller for the locations. Add "LocationsController.j" and make it look like this:<br />
<script src="http://gist.github.com/182930.js">
</script>  <br />
Let's see if all this works in the next step!<br />
<span style="font-size: large;">1.3 - Basic Layout</span><br />
Next we'll test if the controller works and we'll prepare the "stage" for our UI. Open up AppController.j. You'll notice the applicationDidFinishLaunching method. I'm sure you can guess when it will be called. Make the whole file look like this:<br />
<script src="http://gist.github.com/182931.js">
</script>  <br />
Notice the CPShadowView: it adds(!) a shadow around an existing view. So you do not want to subclass CPShadowView in order to create a view with a shadow. Instead, you want to build your normal CPView (or a subclass of it) and then add a CPShadowView to it with setFrameForContentFrame.<br />
At the bottom of the method, we initialize the LocationsController, load the sample data, and show 2 alerts to make sure we got the data. When you reload index.html you should see an alert saying "2" and one saying "Corner of Twelfth and Vine".<br />
<img alt="" border="0" id="BLOGGER_PHOTO_ID_5379102078391881458" src="http://1.bp.blogspot.com/_-dK4R3d1lbc/SqZo1zEdDvI/AAAAAAAAA3M/7HzniB1yCy4/s400/Picture+2.png" style="cursor: hand; cursor: pointer; display: block; height: 186px; margin: 0px auto 10px; text-align: center; width: 400px;" />  <br />
Great! It works!<br />
<span style="font-size: large;">1.4 - The LocationListView</span><br />
How about displaying the Locations? That would be pretty nice! Add a new file called "LocationListView.j". It should look like this:<br />
<script src="http://gist.github.com/182932.js">
</script>  <br />
Next, we'll have to tell the AppController about our new view. We'll do that by importing it at the top of AppController.j: <br />
<pre><code>@import "LocationListView.j"</code></pre>and we want to keep it as an ivar, so add this between the curly braces right after "LocationsControllor locationsController;":<br />
<pre><code>LocationListView    locationListView;</code></pre>Then, at the bottom of applicationDidFinishLaunching, remove the two alert calls and add this instead:<br />
<script src="http://gist.github.com/182933.js">
</script>  <br />
When you now reload index.html, you should see our 2 demo locations and you should also be able to select them (click on them).<br />
<img alt="" border="0" id="BLOGGER_PHOTO_ID_5379102284555008674" src="http://4.bp.blogspot.com/_-dK4R3d1lbc/SqZpBzFkuqI/AAAAAAAAA3U/orNS0B5AXQc/s400/Picture+3.png" style="cursor: hand; cursor: pointer; display: block; height: 135px; margin: 0px auto 10px; text-align: center; width: 245px;" />  <span style="font-size: large;">1.5 Google Maps</span><br />
What good are the geo locations if we can't display them on a map? Let's fix that! Get my fork of Ratty's MapKit here: <a href="http://github.com/jfahrenkrug/MapKit/tree/master">http://github.com/jfahrenkrug/MapKit/tree/master</a> and put the MapKit folder inside your Locations/Frameworks directory. Then add a new file called "MapController.j". It will - you guessed it - control the map!<br />
<script src="http://gist.github.com/182934.js">
</script>  <br />
Now import MapController.j at the top of AppController.j and add these ivars (in the curly braces):<br />
<pre><code>
MapController       mapController;
MKMapView           mapView;
CPTextField         coordinatesLabel;
</code></pre>Let's set all of this up. Add this at the end of applicationDidFinishLaunching, but before "[theWindow orderFront:self];":<br />
<script src="http://gist.github.com/182936.js">
</script>  <br />
Good. Next we want the map to display the location we've selected. To do that in an elegant way, we'll have a do a few things. First our LocationsController needs to know about the LocationListView. That means we have to @import the LocationListView in the LocationsController and we need to add an ivar to the controller called "locationListView" like so:<br />
<pre><code>
LocationListView locationListView @accessors;
</code></pre>That "@accessors" bit tells Objective-J to automagically add the "locationListView" and "setLocationListView" accessor methods. Next, add this method to the LocationsController:<br />
<pre><code>
- (Location)selectedLocation {
 return [locations objectAtIndex:[[locationListView selectionIndexes] firstIndex]];
}
</code></pre>Your LocationsController should now look like this:<br />
<script src="http://gist.github.com/182937.js">
</script>  <br />
Back in the AppController, we have to set the LocationListView's delegate. We want the AppController to be notified when something in the LocationListView changes. To do that, replace the line that reads "//1: we'll add something later" with this:<br />
<pre><code>
[locationListView setDelegate:self];
[locationsController setLocationListView:locationListView];
</code></pre>Finally, we have to implement the delegate method that gets called when the selection of the listview changes. Add this method to the AppController:<br />
<script src="http://gist.github.com/182939.js">
</script>  <br />
If you now reload index.html, you should be able to click back and forth between the two demo locations and the map should jump to the corresponding spot on the globe.<br />
<img alt="" border="0" id="BLOGGER_PHOTO_ID_5379102470717158162" src="http://4.bp.blogspot.com/_-dK4R3d1lbc/SqZpMomFsxI/AAAAAAAAA3c/HsAhTAic2Rw/s400/Picture+4.png" style="cursor: hand; cursor: pointer; display: block; height: 191px; margin: 0px auto 10px; text-align: center; width: 400px;" />  <span style="font-size: large;">1.6 - Adding and Deleting Locations</span><br />
Switching back and forth between only two locations can become boring after a few hours. If it hasn't gotten boring for you yet, I'll wait here until you're done. That was a lie, I'll just keep going. Next it would be nice to add and edit locations. For that we'll need a couple of things. First we want a plus and minus sign underneath the LocationListView so we have a way to add and remove locations. Add a new file called "LocationsToolbar.j". It should look like this:<br />
<script src="http://gist.github.com/182940.js">
</script>  <br />
You know the deal by now: import it in AppController and add an ivar called "locationsToolbar". Add this to applicationDidFinishLaunching:<br />
<script src="http://gist.github.com/182941.js">
</script>  <br />
As you can see, we've set the toolbar's delegate to be the locationsController. So we need to implement the delegate methods in LocationsController.j:<br />
<script src="http://gist.github.com/182942.js">
</script>  <br />
If you now reload index.html, you should be able to add and remove locations (although the map will not like the empty coordinates).<br />
<img alt="" border="0" id="BLOGGER_PHOTO_ID_5379103178086929810" src="http://3.bp.blogspot.com/_-dK4R3d1lbc/SqZp1zwL1ZI/AAAAAAAAA3s/464wO-treXo/s400/Picture+6.png" style="cursor: hand; cursor: pointer; display: block; height: 400px; margin: 0px auto 10px; text-align: center; width: 219px;" />  <span style="font-size: large;">1.7 - Editing Locations</span>  <br />
Let's add another view, the "LocationDetailView.j":<br />
<script src="http://gist.github.com/182943.js">
</script>  <br />
Import it in AppController and add an ivar.<br />
Add yet another controller, called "LocationDetailController.j":<br />
<script src="http://gist.github.com/182944.js">
</script>  <br />
Also import it in AppController and add an ivar. Now let's hook it all up in AppController. Add this to applicationDidFinishLaunching:<br />
<script src="http://gist.github.com/182945.js">
</script>  <br />
Also import the LocationDetailController in the LocationsController and add an ivar with the @accessors directive. Then, in the AppController, change the delegate of the locationListView from "self" to the locationsController like so:<br />
<pre><code>
[locationListView setDelegate:locationsController];
</code></pre>Next remove the "collectionViewDidChangeSelection" method from AppController and add this one to LocationsController instead:<br />
<script src="http://gist.github.com/182946.js">
</script>  <br />
When you now reload index.html, you should be able to edit the test locations and even see the name change in the listview as you type, thanks to KVO.<br />
But one important part is still missing: finding locations! Let's do that next.<br />
<div><span style="font-size: large;">1.8 - Finding Locations</span><br />
We need a searchfield and a button. Add this ivar to AppController:<br />
<pre><code>
CPTextField         searchField;
</code></pre>Next, add this to applicationDidFinishLaunching:<br />
<script src="http://gist.github.com/182947.js">
</script>  <br />
And finally add these two methods to AppController:<br />
<script src="http://gist.github.com/182948.js">
</script>  <br />
Now when you reload index.html, you'll be able to search, edit, add and remove locations and find them on the map.<br />
<img alt="" border="0" id="BLOGGER_PHOTO_ID_5379103563306755554" src="http://4.bp.blogspot.com/_-dK4R3d1lbc/SqZqMOzv5eI/AAAAAAAAA30/fjZyD6JqFLU/s400/Picture+7.png" style="cursor: hand; cursor: pointer; display: block; height: 261px; margin: 0px auto 10px; text-align: center; width: 400px;" />  <br />
You can find the <a href="http://github.com/jfahrenkrug/CappuccinoLocations1/tree/master">complete source code on github</a>.<br />
Big thanks go out to Thomas Balthazar of the great <a href="http://cappuccinocasts.com/">Cappuccinocasts</a> and the great <a href="http://cappuccino.org/learn/demos/">cappuccino demo projects</a> and the <a href="http://www.nice-panorama.com/Programmation/cappuccino/">nice panorama Cappuccino tutorials</a>. Thank you, guys!<br />
So much for today. In Part 2, we'll add the routing window that will display your route. And in part 3 we'll add Rails support to actually load and save the locations.<br />
</div></div>
<br/><hr/><h3>Comments</h3>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/03442126282306977589">Eduard Bondarenko</a> said...</h4>
<p style="margin-left: 30px">Thanks, one more notice: github repos don&#39;t have .gitmodules reference to MapKit.<br /><br />No submodule mapping found in .gitmodules for path &#39;Frameworks/MapKit&#39;</p>
<em class="swlightgray" style="margin-left: 30px">September 09, 2009 03:08 PM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hi Eduard,<br /><br />Thank you for your feedback. You find the image on github: http://github.com/jfahrenkrug/CappuccinoLocations1/tree/b00d7b9ca79b0de4a3e895a9adf966d76e6b18ca/Resources<br /><br />- Johannes</p>
<em class="swlightgray" style="margin-left: 30px">September 09, 2009 03:04 PM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/03442126282306977589">Eduard Bondarenko</a> said...</h4>
<p style="margin-left: 30px">Thanks for great and usefull tutorial.<br /><br />One thing: I didn&#39;t have add.png, remove.png in Resources.<br /><br />I didn&#39;t find that files in cappuccino resources also.</p>
<em class="swlightgray" style="margin-left: 30px">September 09, 2009 02:43 PM</em></div>
