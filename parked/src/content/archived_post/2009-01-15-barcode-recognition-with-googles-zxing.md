---
name: barcode-recognition-with-googles-zxing

title: Barcode Recognition with Google's ZXing on the Mac with TIFF Support
time: 2009-01-15 11:00:00.005000 Z
categories:
  - Programming
  - Java
  - Mac
---

WTK</a> (wireless toolkit) dependency, but there's no WTK for the Mac. The good news is: you don't need the _wireless_ toolkit if you want to run this thing on your desktop machine. So how do you get it to compile on your Mac? Easy:<div>

<div><ol><li><a href="http://zxing.googlecode.com/files/ZXing-1.2.zip">Download ZXing</a></li><li>Unpack it.</li><li><a href="http://groups.google.com/group/zxing/browse_thread/thread/2ad34ac61ac6ef75/676c804d44d40947?lnk=gst&amp;q=mac#676c804d44d40947">Read this post</a></li><li>... or just download <a href="http://gist.github.com/47360">my modified build.xml file</a> and put it in core/build.xml</li><li>Change into core and run ant</li><li>Change into javase and run ant</li><li>Change into the zxing root and try running the command line client:
<pre class="prettyprint">java -cp javase/javase.jar:core/core.jar com.google.zxing.client.j2se.CommandLineRunner http://www.idautomation.com/ucc_ean_128.jpeg</pre>The result should look like this:
<pre class="prettyprint">Raw result:
81007123452112345678
Parsed result:
81007123452112345678
</pre></li><li>Rejoice.</li></ol><div>OK, so this works. But I had to get the barcode from the first page of a multipage TIFF file. That didn't work. But it was easy to fix. I had to modify javase/src/com/google/zxing/client/j2se/CommandLineRunner.java a little bit.</div><div>I imported some JAI packages:
<pre class="prettyprint">import javax.media.jai.*;
import com.sun.media.jai.codec.*;</pre></div><div>And I changed one line in the static decode method from
<pre class="prettyprint">image = ImageIO.read(uri.toURL());</pre></div><div>to
<pre class="prettyprint">PlanarImage pi = JAI.create("URL", uri.toURL());
image = pi.getAsBufferedImage();</pre></div><div>(If you're too lazy to type that, <a href="http://gist.github.com/47368">get the file here</a>)</div>Now just save the file, change back into the javase directory and run ant again. Now you should be able to decode barcodes in TIFF files as well. You might have to add the "--try_harder" argument to the CommandLineRunner, though. Without it, it didn't find the barcode in my TIFF file.</div><div>I'm not sure if it scans every page of the TIFF for a barcode or just the first. If you need to access a specific page, <a href="http://java.sun.com/products/java-media/jai/forDevelopers/samples/MultiPageRead.java">check out this code</a> and <a href="http://www.jguru.com/faq/view.jsp?EID=114602">this code to turn a RenderedImage into a BufferedImage</a>.</div><div>Now enjoy your Mac-TIFF-barcode-reading awesomeness. </div></div>
<br/><hr/><h3>Comments</h3>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/10421901636288721261">sonomos</a> said...</h4>
<p style="margin-left: 30px">Sun / Oracle released the JME SDK for OS X a short while ago.</p>
<em class="swlightgray" style="margin-left: 30px">March 16, 2010 10:58 PM</em></div>
<div class="swcomment"><h4><a href="">Anonymous</a> said...</h4>
<p style="margin-left: 30px">Excellent info. Just what I needed. Thanks!<BR/><BR/>Andy</p>
<em class="swlightgray" style="margin-left: 30px">March 11, 2009 09:05 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hey Sean,<BR/><BR/>Thanks for the feedback. I understand that the WTK dependency makes sense for making sure it'll run on JavaME, but getting it to compile on the Mac out-of-the-box would surely be great :)<BR/>Thanks for all the hard work and this truly great library!</p>
<em class="swlightgray" style="margin-left: 30px">January 16, 2009 06:56 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06524814758673314736">srowen</a> said...</h4>
<p style="margin-left: 30px">Yeah great, thanks much for this. You are right, the WTK dependency from core is actually almost not even there. The only reason it is there is because we want to compile the core -- which does not depend on Javame classes, but cannot depend on non-Javame classes if it is to work in that environment -- against the Javame subset of Java's core APIs.<BR/><BR/>It would of course compile against desktop Java's classes too. I suppose you risk then changing the code in a way that compiles against Java but not Javame's subset. But that's only an issue for developers I suppose and it is a really small risk, and one we'd catch at release.<BR/><BR/>I could introduce a change to just use Java's classes when on a mac (which is what I use too). That would address this without need for tweaks. I'll get on it.</p>
<em class="swlightgray" style="margin-left: 30px">January 15, 2009 08:56 PM</em></div>
