---
name: setting-default-editor-mac-os-style

title: Setting the Default Editor - Mac OS Style
time: 2008-04-30 09:11:00.004000 Z
categories:
  - Mac
  - Tutorials
  - Apple
---

This is really short and can most likely be found in a million different places online. Well, now the count is up to a million and one.<br />You want to set the EDITOR environment variable for Terminal.app on Mac OS X? You're puzzled that there's (possibly) no .profile or .bash_profile in your home directory? You are distressed, scared, and disoriented because you don't know where to put your environment variables? Alas! Thou shalt wonder no more!<br /><br />Just run this in your Terminal.app:<br /><pre class="prettyprint"><br />open /Developer/Applications/Utilities/Property\ List\ Editor.app ~/.MacOSX/environment.plist<br /></pre><br />(This assumes that you have the XCode development tools installed. If you don't just use vi and edit the XML file by hand. I also assume that you have a .MacOSX subdirectory in your home folder which contains an environment.plist file)<br /><br />You will be greeted with something like this:<br /><br />set | grep EDITOR<br /></pre>
