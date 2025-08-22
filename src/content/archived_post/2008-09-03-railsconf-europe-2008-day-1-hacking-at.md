---
name: railsconf-europe-2008-day-1-hacking-at

title: "RailsConf Europe 2008 - Day 1: Hacking at the Community Code Drive"
time: 2008-09-03 15:04:00.004000 Z
categories:
  - Ruby
  - rails
  - Conferences
  - RailsConf
---

<img style="margin: 0px auto 10px; display: block; text-align: center; cursor: pointer; width: 592px; height: 393px;" src="http://farm4.static.flickr.com/3144/2822419023_309679e41f.jpg?v=0" alt="" border="0" /></a>
I'm in the keynote session right now and day 2 of this year's RailsConf Europe is almost over. Yesterday was actually the tutorial sessions day, which I didn't book. But a much more exciting thing was going on in a small room down the hall: The Community Code Drive. I was one of the first guys in the room in the morning and was quickly joined by other developers and David Black, who quickly explained that the plan for the code drive was that there is no plan. You could just suggest a project that you'd like help with and then hope that someone would like to hack away at it with you.
So I suggested a developer-friendly OpenSocial extension to SproutCore. I was joined by a developer from the UK and it was a lot of fun. We got pretty far at coding OpenSocial helpers for SproutCore, but <a href="http://groups.google.com/group/sproutcore/browse_thread/thread/139d1679d4455998">got stuck at one point</a>. Let's hope someone will answer that soon, maybe <a href="http://groups.google.com/group/sproutcore/browse_thread/thread/83a1cf3c67ec3322">Charles when he's back from his honeymoon</a>.
In the evening there was a Q&amp;A session with DHH, Michael Koziarski, and Jeremy Kemper. I asked a question about the future of Test::Unit in view of rSpec. DHH said that in the next Rails release, you'll be able to use a test "something something" syntax which will make an rSpec-similar syntax possible and that he's not too fond of the overuse of "should" in rSpec. He likes Test::Unit, he likes it's simplicity and thinks that it's good as a default to get people started with TDD. If you like rSpec better, good for you, use it, but it will not replace Test::Unit.
Then I asked about their opinion on SproutCore and if they think that such desktop-like apps are the future of web apps where this desktop-ishness makes sense. DHH said that he doesn't think so and thinks that we will stick with the current state of Ajax apps for a while because they're proven and work well. Michael Koziarski said that he doesn't think it's good to abstract HTTP away from the developer but to embrace it instead. I'm not sure why he said that, I don't think he has taken a deep look at SproutCore yet, because SproutCore doesn't force nor encourage you to avoid HTTP. It talks to the backend with HTTP, but only if it needs to, not when a view changes or the way you display the data you have already loaded changes. I talked about this with Yehuda Katz today and he also agreed that SproutCore definitely is a cool project and makes a lot of sense. but since we still live in IE6 land, it wouldn't be a good choice for a web app which you want to reach as many users as possible. Agreed.
The evening consisted of a very enjoyable <a href="http://en.oreilly.com/railseurope2008/public/schedule/detail/5270">RejectConf</a>. I was in bed at midnite. Too late.
