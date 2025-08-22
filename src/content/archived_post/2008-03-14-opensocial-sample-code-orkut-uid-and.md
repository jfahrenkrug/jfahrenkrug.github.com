---
name: opensocial-sample-code-orkut-uid-and

title: "OpenSocial Sample Code: Orkut UID and Viewer == Owner?"
time: 2008-03-14 13:16:00.007000 Z
categories:
  - Programming
  - OpenSocial
---

So I've been working on an OpenSocial app for a while. A lot of things come in quite handy and are needed relatively often. One of those things is checking if the current viewer is the owner of the application (if the viewer is the person that has added the application to his/her profile and is viewing the app on his/her profile or canvas page at the moment). On Facebook you have a tag for that:

<pre>&lt;fb:visible-to-owner&gt;
  Welcome back to your profile!
&lt;/fb:visible-to-owner&gt;
</pre>How useful! Well, this doesn't exist on OpenSocial. So what you have to do is compare the OpenSocial ID for the current view to the ID of the owner. If both are the same, the viewer is the owner and the owner is the viewer and everyone is happy.

So what you do is get both IDs when the app is loaded and you remember them in a bunch of variables. I added one more thing, though: Getting the Orkut UID since the Orkut UID is not the same as the OpenSocial ID of the user. You need the Orkut UID to construct links to a person's canvas page. It's a really ugly hack, but <a href="http://code.google.com/apis/orkut/docs/orkutdevguide.html#ops_uid">that's how you're supposed to do it according to Google</a>.
Having the Orkut UID, you can construct links to the canvas page of your app for a certain user. This is useful when you have a canvas page you want to link to for your friends to look at (showing the latest photos or videos you've uploaded or some other useless crap nobody will look at anyway).
Here's a little code sample (note: SAMPLE, you still need to add error checking and stuff) for constructing an Activity Stream update on Orkut that has a link to the canvas page of the person who's posting the activity:

<pre class="prettyprint">const CANVAS_BASE_URL =
'http://sandbox.orkut.com/Application.aspx'; //Orkut specific!

function postActivity(title, body) {
  var params = {};
  params[opensocial.Activity.Field.TITLE] = title;
  if (body != null) {
      params[opensocial.Activity.Field.BODY] = body;
  }
  var activity = opensocial.newActivity(params);
  opensocial.requestCreateActivity(activity,
    opensocial.CreateActivityPriority.HIGH,
    postActivityCallback);
};

function postActivityCallback(data) {
  if (DEBUG) console.log(data);
};

function createASampleActivity() {
  var title = 'Something to waste 2 minutes of your life!';
  var body = '&lt;a href="' + CANVAS_BASE_URL +
             '?uid=' + viewer_network_uid +
             '&amp;appId=' + stored_app_id +
             '"&gt;Check them out!&lt;/a&gt;';
  postActivity(title, body);
}
</pre>

Ok, and here's the code for getting all the IDs and a useful function to check if the viewer is the owner or not. Just call it during the initialization of your gadget with gadgets.util.registerOnLoadHandler(setupViewerOwnerIds);

<pre class="prettyprint">const DEBUG = true;

/** not the opensocial uid, but the users
    uid on the current social network, ie Orkut or MySpace */
var viewer_network_uid = '';
/** current viewer's opensocial id */
var viewer_os_id = null;
/** owner's opensocial id */
var owner_os_id = null;
var stored_app_id = '1111111111111'; //for orkut!

function setupViewerOwnerIds() {
    var req=opensocial.newDataRequest();
    req.add(req.newFetchPersonRequest("VIEWER"), "viewer");
    req.add(req.newFetchPersonRequest("OWNER"), "owner");

    req.send(setupViewerOwnerIdsCallback);
}

function setupViewerOwnerIdsCallback(data) {
  if (data.hadError()) {
    if (DEBUG) console.log("setupViewerOwnerIdsCallback had an error");

    viewer_os_id = null;
    owner_os_id = null;
  } else {
    var viewer = data.get("viewer").getData();
    var owner = data.get("owner").getData();

    viewer_os_id = viewer.getId();
    owner_os_id = owner.getId();

    //Orkut specific
    if (opensocial.getEnvironment().getDomain() == 'orkut.com') {
        var profile_url =
          viewer.getField(opensocial.Person.Field.PROFILE_URL);
        var regex = /uid=([^&amp;#]+)/;
        var result = profile_url.match(regex);
        if (result.length == 2) {
          viewer_network_uid = result[1];
          /* uid now contains the viewer's orkut UID */
        } else {
          /* there was a problem getting the UID */
        }
    }

    if (DEBUG) console.log('Viewer: ' + viewer_os_id);
    if (DEBUG) console.log('Viewer Network UID: ' +
                            viewer_network_uid);
    if (DEBUG) console.log('Owner: ' + owner_os_id);
  }

  if (DEBUG) console.log('isViewerOwner: ' + isViewerOwner());
}

function isViewerOwner() {
    if (viewer_os_id != null &&
        owner_os_id != null &&
        viewer_os_id == owner_os_id) {
        return true;
    } else {
        return false;
    }
}
</pre>

I can't take credit for most of this, since a lot of stuff is taken from the Orkut and OpenSocial wikis and mailing lists. My thanks go out to all the great people out there sharing their code and knowledge!
<b>UPDATE:</b> The code now also works when someone visits your app who doesn't have the app installed (produced an "unauthorized" error before while trying to fetch the viewer data).
<br/><hr/><h3>Comments</h3>

<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hi umesh,<br /><br />You&#39;ll have to read the opensocial docs, I haven&#39;t done anything with opensocial for a while, things most likely have changed.<br /><br />cheers,<br /><br />Johannes</p>
<em class="swlightgray" style="margin-left: 30px">February 05, 2010 09:05 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/07182176844509670913">umesh</a> said...</h4>
<p style="margin-left: 30px">how can i use this code in orkut application for getting userid</p>
<em class="swlightgray" style="margin-left: 30px">October 20, 2009 11:24 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/07182176844509670913">umesh</a> said...</h4>
<p style="margin-left: 30px">how can i use this code in orkut application</p>
<em class="swlightgray" style="margin-left: 30px">October 20, 2009 11:23 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/01387443872774081089">Manikandan Mohan -- The Bell</a> said...</h4>
<p style="margin-left: 30px">Yes, it did. Thank you.</p>
<em class="swlightgray" style="margin-left: 30px">September 21, 2008 02:02 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hi Manikandan,<BR/><BR/>yes, your view is correct: An OpenSocial container like Shindig is not intended to run OpenSocial apps that access OTHER social networks like orkut or myspace: it's intended to host OS apps that will access the data or YOUR site.<BR/>Does that answer your question?</p>
<em class="swlightgray" style="margin-left: 30px">September 18, 2008 11:27 AM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/01387443872774081089">Manikandan Mohan -- The Bell</a> said...</h4>
<p style="margin-left: 30px">Hi John,<BR/><BR/>I'm very new to opensocial. Just couples of days back I have installed the shindig container to host the opensocial apps.<BR/><BR/>Normal google gadgets are working fine in that. But if I put any orkut opensocial app in the container, it seems to be not working.<BR/><BR/>What my views regarding this would be that we can create shindig container for our own sites and map the restful APIs calls to our server to get the required details like friends, activities, etc...<BR/><BR/>Please let me know whether my views are correct. Share if you have any further details about the same.<BR/><BR/>Thanks for sharing your knowledge.</p>
<em class="swlightgray" style="margin-left: 30px">September 13, 2008 04:00 PM</em></div>
<div class="swcomment"><h4><a href="http://www.svasearch.com">SVA Search</a> said...</h4>
<p style="margin-left: 30px">Very nicely done ! I'm sure it will come in handy</p>
<em class="swlightgray" style="margin-left: 30px">July 29, 2008 11:34 PM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/06650223978538123548">Johannes Fahrenkrug</a> said...</h4>
<p style="margin-left: 30px">Hey Cassie,<BR/><BR/>Haha, that seems to be the much more elegant solution! I must have missed that in the docs. Thanks a lot!<BR/><BR/>- Johannes</p>
<em class="swlightgray" style="margin-left: 30px">April 06, 2008 01:46 PM</em></div>
<div class="swcomment"><h4><a href="http://www.blogger.com/profile/09537010397425201042">Cassie Doll</a> said...</h4>
<p style="margin-left: 30px">you know, you can always just do:<BR/><BR/>ownerObject.isViewer()<BR/>or<BR/>viewerObject.isOwner()<BR/><BR/>:)</p>
<em class="swlightgray" style="margin-left: 30px">April 06, 2008 07:17 AM</em></div>
