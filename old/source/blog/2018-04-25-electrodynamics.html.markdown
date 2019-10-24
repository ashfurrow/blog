---
title: Electrodynamics
date: 2018-04-25 17:24:57 UTC
background_image: /img/blog/electrodynamics/background.png
background_image_source: https://twitter.com/CloudyConway/status/987893658748899328
---

Okay so I've got a lot of thoughts on [Electron][] bouncing around my brain and I honestly can't take it anymore. So this post is more for me, as usual.

Oh and one important thing to note: I'm not interested in discussing Electron itself. If you think it sucks, past experience has taught me that I'm very unlikely to change your mind. This post is about the discourse surrounding Electron and, more generally, the discourse in the Apple developer community. And I'm thinking about this from a big-picture perspective, not specific tweets or people. I don't know if it's getting more experienced, or getting older, or [getting outside the iOS ecosystem][polyglot], but lately I find myself really bored by "specifics." I'm much more keen on looking at issues as a whole piece, rather than component parts.

Okay so let's dig into this.

(READMORE)

Some people dislike Electron. They seem to resent it, in fact. Generally, people discussing Electron seem to fall into one of a few camps:

- They dislike Electron for _whatever_ reason.
- They think Electron has a place, sometimes, in software development.
- They don't care about Electron and just want everyone to shut up.

I obviously fall in the middle ground. I've never built an Electron app but I understand the technology involved and I appreciate its appeal. If I were building a Mac app for whatever reason, I'd look into building it with Electron (I have built Mac apps and have no desire to use AppKit again).

The people in the third bucket are my favourite. I sympathize with them because I too want everyone to just shut up. But here I am writing a blog post, so.

It's the people who really dislike Electron that make the most noise. Different folks have their own reasons for disliking it, which is fine. Folks are welcome to their opinions of course. However, I am a bit embarrassed by the fervour with which members of our community are expressing their outright _disdain_ for Electron.

It's tempting for me to refute the arguments with counter examples, but I really want to emphasize that the individual points people have about Electron are _not_ what I'm talking about right now. It's the _tone_ of the conversation that I find distasteful. People are complaining – loudly – about a technology they'll never use to build apps, as though _no one_ should use that technology.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Also, let&#39;s be kind even when nominally criticizing tech—people invest a lot of themselves in the tools they use every day, and it&#39;s a short trip from &quot;X is bad&quot; to &quot;choosing X is bad&quot; to &quot;people who choose X are bad&quot;</p>&mdash; Nate Cook 🌱 (@nnnnnnnn) <a href="https://twitter.com/nnnnnnnn/status/988974021453676550?ref_src=twsrc%5Etfw">April 25, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

I'm sure there are outsiders looking in on the Apple developer community right now. I wonder what they think of how we're behaving.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Instead of yelling at companies, teams, and developers about the choices they made about their own work, why not take a moment and consider how we got here. <br><br>And why are you so mad about the decisions of other developer teams. What business is it of yours?</p>&mdash; Jon Maddox (@maddox) <a href="https://twitter.com/maddox/status/988925582665768961?ref_src=twsrc%5Etfw">April 24, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

Finally, a note about Slack. Slack is an Electron app, probably the most popular Electron app. And Slack has bugs. It has memory leaks. But I [question][] the intellectual rigour of those who would infer or imply that Slack's bugs are the result of being built in Electron. I mean, come on. Lots of software has memory problems. Besides, there are Electron apps _without_ memory issues. [Visual Studio Code][code] is a shining example of an Electron app, a counterexample to anyone who tries to argue that Electron apps are necessarily poor user experiences. Frankly, blaming Electron for Slack's bugs let's Slack off the hook.

I'm just so very tired of this conversation. Regularly, someone will reignite the discussion. But every time, people miss out on the bigger picture: whether or not you think developers _should_ use Electron, they _are_ using it. So ask yourself: why? Put yourself in their shoes, assume positive intent, try to understand what they're thinking, and please please please stay nonjudgemental. A few tips: 

- Don't remove their agency – "well Electron only makes sense for businesses." That dismisses entire groups of developers who _want_ to build Electron apps. 
- Don't dismiss their technical decisions – "well they should just learn AppKit." The fact is, they aren't learning AppKit. Asking "why not?" is a much more interesting question than labelling them as lazy.
- Don't be defensive – "well if Electron replaces native apps then what will happen to me?" That's jumping to a conclusion. No one is arguing that Electron will or should replace native apps.

Electron is just another tool; the more tools you have, the more types of problems you can solve. I keep reiterating this point because it's so important: software developers of different stripes have more in common than they have differences. We have so much to learn from one another, but we can't if we keep focusing on our differences.

[Electron]: https://electronjs.org
[polyglot]: /blog/perspective-of-the-polyglot/
[code]: https://code.visualstudio.com
[question]: https://twitter.com/ashfurrow/status/989100844674158592
