---
title: WWDC 2015 Keynote Reactions
date: 2015-06-08 23:41:42 UTC
---

Today kicked off WWDC 2015 with two exciting keynotes: the "Keynote" keynote, and the State of the Union keynote, which is really meant for developers. Why the keynote of an event named "World Wide Developer's Conference" would be targeted at journalists is a topic for another time. 

So what happened? 

<!-- more -->

A lot happened. And I'm going to ignore most of it, because a summary isn't really what's important. 

What _is_ important are the inferences we can draw from the individual announcements. 

### Shift Towards Engineering

In my native land of Canada, the term "Engineer" is a  protected term, like "Judge" or "Doctor" – I can't just go out and claim to be a software engineer. I am (a lowly) software _developer_.  

What separates engineering from developing? 

In my opinion, **discipline**. 

Software engineers, at least at my university, learnt a lot more about how to build _systems_ of software rather than the math, which is what I focused on. Only through experience have I learnt that doing things right is more important, in the long run, then doing them quickly. 

Software developers make code. Software engineers make products.

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Apple seems to be pushing us from developing iOS apps to engineering them. Really exciting times.</p>&mdash; Ash Furrow (@ashfurrow) <a href="https://twitter.com/ashfurrow/status/608049688760197122">June 8, 2015</a></blockquote>

With their announcements of the tools and language features, Apple has shown an awareness of this distinction. For example, new projects include _two_ testing targets: one for unit tests, and one for UI tests. They've provided UI testing tools that are _freaking amazing_ and miles ahead of anything else I've seen for iOS.

Apps have gotten much _much_ more complicated. When I started, on iOS 3, it was enough to build an app that ran when the user was looking at it. Now we have: background modes, push notifications, background network fetch, iCloud syncing, state restoration, Today widgets, WatchKit extensions, all of which need to work on iPhones with 3.5", 4", 4.7", and 5.5" _and_ iPads at _three_ different pixel densities.

Phew!

Making an app is a lot of work – a lot more than it used to be. But modern apps also provide a lot more value to users. 

Apple has recognized this tradeoff, and has thankfully provided helpful tools. These tools don't make the job of developing apps easier; they make the job of _engineering_ apps easier. 

### More Diversity

This keynote featured two women presenting important news from their respective departments in Apple. These are capable professionals who have been working hard at Apple, and were able to present products they helped create. 

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Two women, and now a Canadian. A truly inclusive WWDC.</p>&mdash; Dave Wiskus (@dwiskus) <a href="https://twitter.com/dwiskus/status/607986303297200128">June 8, 2015</a></blockquote>

Drake's lack of apparent preparation aside, it was refreshing to see more non-whitedudes on stage. And [Eliza Block](http://twitter.com/elizablock) presented the cool new Watch things in the State of the Union. 

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">Next step is to get to a point where we’re not like “OMG A WOMAN” cause it’ll be so normal. <a href="https://twitter.com/hashtag/WWDC?src=hash">#WWDC</a></p>&mdash; Ayaka Nonaka (@ayanonagon) <a href="https://twitter.com/ayanonagon/status/607973285779763201">June 8, 2015</a></blockquote>

I'm not saying things are perfect or that Apple has fixed diversity in tech. The videos, really, still catered to a heteronormative male gaze and had characters fulfilling stereotypical roles. But I am excited that, from the very top levels of leadership, Apple are [acknowledging the problem](http://mashable.com/2015/06/08/tim-cook-apple-diversity-women-future/) and seem to actually be doing things to help. 

### Acknowledgement of the OSS Community

The biggest announcement was, in my opinion, the open sourcing of Swift. In [their blog post](https://developer.apple.com/swift/blog/?id=29), Apple have laid out a few really interesting initiatives: 

- They're open sourcing the compiler, to bring it up to par with Objective-C.
- They're open sourcing the *runtime*, which makes it possible to use Swift on non-Apple platforms. 
- They're _supporting Linux_ on day one, which is bananas.
- They're releasing it under a _permissive license_, meaning you can do as you like with it, which is even _more_ bananas.

**Why** would Apple do this? It's nuts! Don't they know that someone is going to build a way to write Android apps in Swift???

The thing is, they recognize that the community really wants this. They know that the benefits and good PR from opening Swift will outweigh the possible disadvantages (this is true of open sourcing most things, imo). 

One thing in particular is that they will accept _and encourage_ contributions from the community. 

Think about that. 

Acknowledging that the open source community exists is rare enough from Apple, but a significant contribution to it _and_ a call for collaboration is, in recent years, unprecedented. 

This is a continuing trend that I believe began under Tim Cook's leadership. Swift engineers have been using Twitter as a means to engage with adopters of the language; last year they mentioned CocoaPods in a WWDC talk; we knew the native Watch SDK was coming because _Apple told us beforehand_. These are all data points on a trend line that leads us to open sourcing Swift. 

Apple seem to be waking up to the reality that they have more to gain from working with us than in secret. There are obviously still tensions between the community and Apple, but I've never been more excited to see where things will go.

### Self Awareness

From the [initial WWDC opening video](http://mashable.com/2015/06/08/apple-wwdc-bill-hader/) to Tim Cook basically acknowledging that no one cares about the Apple retail store updates, Apple seems to have become aware of how we see them. 

The State of the Union in particular had engineers acknowledging that the initial Swift releases weren't perfect, or that the limitations imposed by the existing tooling are unreasonable. 

It's only my impression, but they seem to understand their flaws and the tensions that exist in their relationship with developers. Rather than avoid those topics, they seem to acknowledge them. Apple is comfortable with who Apple is, and they aren't afraid to act like it. 

[![](/img/blog/wwdc-2015/eddywhatareyoudoingeddy.gif)](http://mashable.com/2015/06/08/eddy-cue-dancing-apple/)

For better or worse. 

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
