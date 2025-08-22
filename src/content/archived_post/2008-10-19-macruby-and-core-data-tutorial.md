---
name: macruby-and-core-data-tutorial

title: MacRuby and Core Data Tutorial
time: 2008-10-19 15:40:00.031000 Z
categories:
  - Programming
  - Mac
  - Tutorials
  - Ruby
  - Cocoa
---

these instructions on how to build and install the MacRuby trunk</a> (it's super easy) and you'll be building MacRuby Cocoa Data applications with a spiffy Xcode template in no time!

<div>
I love both Ruby and Objective-C, so <a href="http://www.macruby.org/">MacRuby</a> naturally deserves the adjective "flippin' sweet!"
I wanted to get up to speed with CoreData for a current project and wanted to do so with MacRuby, so I could take advantage of some or Ruby's string processing power and so on. RubyCocoa has Core Data XCode templates, but MacRuby does not. So I made one (this is a lie, read on). First I'll tell you how stupid-easy it was: I just had to take the ObjC-AppDelegate.m code from the Apple "Core Data Application" template and "translate" the ObjC-code to Ruby (which basically consists of removing square brackets and curly braces). The new AppDelegate.rb file sets up all the Core Data stuff (PersistentStoreCoordinator, ManagedObjectModel, ManagedObjectContext) just like its ObjC-cousin.
So how do you create a Core Data application with MacRuby?<ol><li>Create a new MacRuby Application<img style="margin: 0px auto 10px; display: block; text-align: center; cursor: pointer;" src="/assets/archived_posts/Picture+12_8744bf06.png" alt="" /></li><li>Paste the following code into that file:
<pre class="prettyprint">
#
#  AppDelegate.rb
#  MyGreatApp
#
#  Created by Johannes Fahrenkrug on 10/17/08.
#  Copyright __MyCompanyName__ 2008 . All rights reserved.
#

class AppDelegate
attr_writer :window

# Returns the support folder for the application, used to store the Core Data

# store file. This code uses a folder named "MyGreatApp" for

# the content, either in the NSApplicationSupportDirectory location or (if the

# former cannot be found), the system's temporary directory.

def applicationSupportFolder
paths = NSSearchPathForDirectoriesInDomains(NSApplicationSupportDirectory, NSUserDomainMask, true)
basePath = (paths.count &gt; 0) ? paths[0] : NSTemporaryDirectory()
return basePath.stringByAppendingPathComponent("MacObjTalks")
end

#

# Creates and returns the managed object model for the application

# by merging all of the models found in the application bundle.

#

def managedObjectModel
if @managedObjectModel
return @managedObjectModel
end

@managedObjectModel = NSManagedObjectModel.mergedModelFromBundles(nil)
return @managedObjectModel
end

#

# Returns the persistent store coordinator for the application. This

# implementation will create and return a coordinator, having added the

# store for the application to it. (The folder for the store is created,

# if necessary.)

#

def persistentStoreCoordinator
if @persistentStoreCoordinator
return @persistentStoreCoordinator;
end

error = nil

fileManager = NSFileManager.defaultManager
applicationSupportFolder = self.applicationSupportFolder

if !fileManager.fileExistsAtPath(applicationSupportFolder, isDirectory:nil)
fileManager.createDirectoryAtPath(applicationSupportFolder, attributes:nil)
end

url = NSURL.fileURLWithPath(applicationSupportFolder.stringByAppendingPathComponent("MyData.xml"))
@persistentStoreCoordinator = NSPersistentStoreCoordinator.alloc.initWithManagedObjectModel(self.managedObjectModel)
if !@persistentStoreCoordinator.addPersistentStoreWithType(NSXMLStoreType, configuration:nil, URL:url, options:nil, error:error)
NSApplication.sharedApplication.presentError(error)
end

return @persistentStoreCoordinator
end

#

# Returns the managed object context for the application (which is already

# bound to the persistent store coordinator for the application.)

#

def managedObjectContext
return @managedObjectContext if @managedObjectContext

coordinator = self.persistentStoreCoordinator
if coordinator
@managedObjectContext = NSManagedObjectContext.alloc.init
@managedObjectContext.setPersistentStoreCoordinator(coordinator)
end

return @managedObjectContext
end

#

# Returns the NSUndoManager for the application. In this case, the manager

# returned is that of the managed object context for the application.

#

def windowWillReturnUndoManager(window)
return self.managedObjectContext.undoManager
end

#

# Performs the save action for the application, which is to send the save:

# message to the application's managed object context. Any encountered errors

# are presented to the user.

#

def saveAction(sender)
error = nil;
if !self.managedObjectContext.save(error)
NSApplication.sharedApplication.presentError(error)
end
end

#

# Implementation of the applicationShouldTerminate: method, used here to

# handle the saving of changes in the application managed object context

# before the application terminates.

#

def applicationShouldTerminate(sender)
error = nil
reply = NSTerminateNow

if self.managedObjectContext
if (self.managedObjectContext.commitEditing)
if (self.managedObjectContext.hasChanges and !self.managedObjectContext.save(error))

# This error handling simply presents error information in a panel with an

# "Ok" button, which does not include any attempt at error recovery (meaning,

# attempting to fix the error.) As a result, this implementation will

# present the information to the user and then follow up with a panel asking

# if the user wishes to "Quit Anyway", without saving the changes.

# Typically, this process should be altered to include application-specific

# recovery steps.

errorResult = NSApplication.sharedApplication.presentError(error)

if errorResult
reply = NSTerminateCancel
else
alertReturn = NSRunAlertPanel(nil, "Could not save changes while quitting. Quit anyway?" , "Quit anyway", "Cancel", nil)
if (alertReturn == NSAlertAlternateReturn)
reply = NSTerminateCancel
end
end
end
else
reply = NSTerminateCancel
end
end

return reply
end

end

</pre></li><li>Save it.</li><li>Open MainMenu.nib</li><li>Drag a new NSObject to the MainMenu.nib window:
<img style="margin: 0px auto 10px; display: block; text-align: center; cursor: pointer;" src="/assets/archived_posts/Picture+13_88e19397.png" alt="" />
<img style="margin: 0px auto 10px; display: block; text-align: center; cursor: pointer;" src="/assets/archived_posts/Picture+14_ba00a188.png" alt="" />
</li><li>Open the inspector for the new object and open the next-to-last tab. Select "AppDelegate" from the Class popup list.
<img style="margin: 0px auto 10px; display: block; text-align: center; cursor: pointer;" src="/assets/archived_posts/Picture+15_7d11b46d.png" alt="" /></li><li>Control-drag from the File's Owner to the App Delegate and connect it's delegate outlet.
<img style="margin: 0px auto 10px; display: block; text-align: center; cursor: pointer;" src="/assets/archived_posts/Picture+16_6bd3d098.png" alt="" /></li><li>Control-drag from the App Delegate to the Window to connect it's window outlet.
<img style="margin: 0px auto 10px; display: block; text-align: center; cursor: pointer;" src="/assets/archived_posts/Picture+17_3a56d348.png" alt="" /></li><li>Save the changes to the nib.</li><li>Add a Core Data data model (give it a name of your choice and just click Finish in the 3rd step of the wizard).
<img style="margin: 0px auto 10px; display: block; text-align: center; cursor: pointer;" src="/assets/archived_posts/Picture+18_0c67a9c6.png" alt="" /></li><li>Double-click on the new data model file to open it with the data model editor.</li><li>Add an entity called "Skill" with a string attribute called "name" and an integer 16 attribute called "level".

<img style="margin: 0px auto 10px; display: block; text-align: center; cursor: pointer;" src="/assets/archived_posts/Picture+20_06a240e8.png" alt="" />
<img style="margin: 0px auto 10px; display: block; text-align: center; cursor: pointer;" src="/assets/archived_posts/Picture+21_2f27d9c5.png" alt="" />
<img style="margin: 0px auto 10px; display: block; text-align: center; cursor: pointer;" src="/assets/archived_posts/Picture+22_7ce2c62b.png" alt="" />
<img style="margin: 0px auto 10px; display: block; text-align: center; cursor: pointer;" src="/assets/archived_posts/Picture+23_3ddab9f4.png" alt="" /></li><li>Save the data model.</li><li>Back in Interface Builder, drag a Core Data Entity to the Window.
<img style="margin: 0px auto 10px; display: block; text-align: center; cursor: pointer;" src="/assets/archived_posts/Picture+24_824a129a.png" alt="" /></li><li>In the wizard that comes up, select your Xcode Project, your data model and the "Skill" entity.</li><li>In the next step, select the Master/Detail view and check all the options.
<img style="margin: 0px auto 10px; display: block; text-align: center; cursor: pointer;" src="/assets/archived_posts/Picture+25_68906ea7.png" alt="" /></li><li>In the next step, select both attributes and click "Finish".
<img style="margin: 0px auto 10px; display: block; text-align: center; cursor: pointer;" src="/assets/archived_posts/Picture+26_1087ef53.png" alt="" /></li><li>Your window should look like this:
<img style="margin: 0px auto 10px; display: block; text-align: center; cursor: pointer;" src="/assets/archived_posts/Picture+27_e7ba6dd4.png" alt="" /></li><li>Disconnect the saveDocument action from the Save menu item by clicking the X on the left of "First Responder".
<img style="margin: 0px auto 10px; display: block; text-align: center; cursor: pointer;" src="/assets/archived_posts/Picture+28_7fb2cebd.png" alt="" /></li><li>Control-drag from the Save menu item to the App Delegate and connect it to the saveAction.</li><li>Save the NIB.</li><li>Click Build &amp; Go.</li><li>You should be able to add, remove, edit, and search for skills.
<img style="margin: 0px auto 10px; display: block; text-align: center; cursor: pointer;" src="/assets/archived_posts/Picture+29_fe8dff72.png" alt="" /></li><li>Click File -> Save, close the app and restart it: your data should still be there.</li><li>Commence frolicking and rejoicing.</li></ol>Congratulations to your first MacRuby Core Data application. If there are ways to improve this (and I'm sure there are) kindly punch me in the nose by criticizing me in the comments. I'm probably just as new to MacRuby and Core Data as you are, so please ask in-depth questions about these vast topics elsewhere.
Don't miss this <a href="http://developer.apple.com/mac/articles/scriptingautomation/cocoaappswithmacruby.html">great MacRuby tutorial on ADC</a>. And read the <a href="http://developer.apple.com/documentation/Cocoa/Conceptual/CoreData/index.html">Core Data Programming Guide</a>.
Ok, I mentioned an XCode template for this in the beginning. Well, I haven't really made one yet, but I will. Soon. I hope this was kinda useful to you anyhow.</div>
<br/><hr/><h3>Comments</h3>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Not any that I know of, unfortunately. It should be easy enough to put something like that together in MacRuby, though.</p>
<em class="swlightgray" style="margin-left: 30px">July 31, 2009 06:20 AM</em></div>
<div class="swcomment"><h4><a href="">Anonymous</a> said...</h4>
<p style="margin-left: 30px">Is there a rails fixture-esque feature for CoreData?</p>
<em class="swlightgray" style="margin-left: 30px">July 31, 2009 05:28 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hi Anonymous (if that really IS your real name),<BR/><BR/>thank you for your friendly comment.<BR/>You are absolutely correct. I did this rather quickly, I basically went through the ObjC code line by line and "translated" it to Ruby. I neither optimized nor beautified it. But writing it the way you pointed out would have been much prettier and ruby-ish. Guilty as charged.<BR/>Btw, it should be "Very bad ruby style!!!", putting a whitespace before a punctuation mark is very bad writing style. ;-)<BR/><BR/>- Johannes</p>
<em class="swlightgray" style="margin-left: 30px">February 13, 2009 07:56 AM</em></div>
<div class="swcomment"><h4><a href="">Anonymous</a> said...</h4>
<p style="margin-left: 30px">very bad ruby style !!!<BR/><BR/>def managedObjectModel<BR/>if @managedObjectModel<BR/> return @managedObjectModel<BR/>end<BR/><BR/>@managedObjectModel = NSManagedObjectModel.mergedModelFromBundles(nil)<BR/>return @managedObjectModel<BR/>end<BR/><BR/>it's<BR/><BR/>def managedObjectModel<BR/>@managedObjectModel ||= NSManagedObjectModel.mergedModelFromBundles(nil)<BR/>end</p>
<em class="swlightgray" style="margin-left: 30px">February 13, 2009 07:48 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hey jamesu,<BR/><BR/>check out my update note on the top of the article!</p>
<em class="swlightgray" style="margin-left: 30px">October 29, 2008 08:25 PM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">thank you for your comment, James! I know, the error = nil solution is less then optimal. I saw that they also do that in the RubyCocoa core data template, but that's no excuse. Not the value, but a reference has to be passed as the argument. If anyone has time to find out how to do that in macruby before me, please, by all means, leave a comment!</p>
<em class="swlightgray" style="margin-left: 30px">October 24, 2008 06:49 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/12522829106812243678">jamesu</a> said...</h4>
<p style="margin-left: 30px">Neat, was looking how to do this the other week.<BR/><BR/>Had an issue where i couldn't figure out what the "error" parameter should be for addPersistentStoreWithType. Looks like you have worked around this by using "nil"... interesting.<BR/><BR/>(I ended up just implementing this bit in Objective C. Yikes.)</p>
<em class="swlightgray" style="margin-left: 30px">October 23, 2008 11:03 AM</em></div>
