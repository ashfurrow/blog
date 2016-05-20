---
title: Adulterated Objective-C
date: 2016-05-20 19:40:05 UTC
background_image: /img/blog/adulterated-objective-c/background.jpg
background_image_source: https://twitter.com/CloudyConway/status/698282495708676097
---

There’s been a lot of discussion lately surrounding the efficacy of Swift. Brent Simmons has been [writing](http://inessential.com/2016/05/18/what_im_doing_with_these_articles) about his experiences using Swift. As an expert Objective-C developer, his insights are worth paying attention to; he notes that tools at hand when developing Objective-C are either missing in Swift, or clumsy to use. [Responder chains](http://inessential.com/2016/05/15/a_hypothetical_responder_chain_written_i), [adding functions to objects at runtime](http://inessential.com/2016/05/18/dynamic_methods), and [selector reflection](http://inessential.com/2016/05/14/the_tension_of_swift). I suggest you read all his posts.

However, I feel the need to point out that there are a lot of iOS developers out there who don’t use those tools, or may not even be aware of them. Consequently, they may not share Brent Simmons’ frustration at their absence.

<!-- more -->

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">What am I doing wrong such that Swift&#39;s lack of dynamism doesn&#39;t seem to be hindering me in the slightest?</p>&mdash; Bryan Irace (@irace) <a href="https://twitter.com/irace/status/732051171498700800">May 16, 2016</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Objective-C’s dynamic nature exists as an integral part of UIKit, and as Craig Hockenberry [has pointed out](http://furbo.org/2016/05/20/adulterated-swift/), your app is still built atop an Objective-C foundation even if the code you write is 100% Swift. However, I think there are a lot of Objective-C developers – many who have come to the language since the iPhone – who don’t use a lot of the features that make Objective-C a powerful, dynamic language. 

I started learning Objective-C in 2009 when I learned to write iOS apps. At the time, I didn’t _really_ need to know about the dynamic runtime. Swizzling methods and asking if an object responds to a selector is something I knew about – kind of – but I never really took advantage of those capabilities. And I don’t think my experience is unique. 

Why don’t newer Objective-C developers know about these features? I think there are two reasons:

1. A lot of the knowledge needed to use Objective-C’s full dynamic power is woefully under-documented, arcane, and explained only on dated mailing lists.
2. Apple made a decision to de-emphasize Objective-C dynamic nature when building tools for iOS developers (in contrast with tools for OS X developers that already existed).

The second point is far more interesting. Let’s take a look at one example: OS X has this really cool feature in Interface Builder called _bindings_. You can have a property of a view be _bound_ to a property of something else, like `NSUserDefaults`, another view property, a property of an object you’ve added to your nib, whatever. It’s all built atop Objective-C’s dynamic runtime, key-value observation, and value transformers.

When I tell iOS developers about bindings, they’re usually stunned. They have _no idea_ what I’m talking about, because bindings don’t exist on iOS. Whether intentional or not, Interface Builder excluded bindings for iOS interfaces. It’s a tool that’s just not given to iOS developers.

This is one example of a trend: Objective-C has become stricter and stricter. For example: there are compiler warnings for invoking unknown selector names; collections now support generics to restrict the type they contain; initializers now return `instancetype` instead of `id`. These are all small changes, but there are many of them. And their sum effect is a direction from Apple to move the language away from dynamic use. 

I can’t fault iOS developers for not knowing how powerful dynamic Objective-C is, because developer tools have been discouraging its use for years.

I admire Brent Simmons, and Craig Hockenberry, and Aaron Hillegass, and many more Objective-C experts. The perspective they bring to Swift is invaluable. [Being reminded of our dependencies](http://artsy.github.io/blog/2015/09/18/Cocoa-Architecture-Dependencies/) is important. At the same time, though, maybe it’s not important to re-invent Objective-C’s dynamic runtime in Swift. The language is _far_ more static than Objective-C. And besides, a dynamic runtime is only a set of tools used to solve problems. In a different context, like Swift, different tools might be better suited.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Your goal should not be to find the best tool (there is none), but to grow your tool set, so you can choose the best tool for each job.</p>&mdash; Peter Hosey (@boredzo) <a href="https://twitter.com/boredzo/status/733159429391011841">May 19, 2016</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

We don’t need Objective-C to be pilloried, and we don’t need to pretend that Swift is a superior language in every way. At the end of the day, our job is to build software. Having a diverse set of tools means you can solve a diverse set of problems. Let’s keep sharing what we learn, and let’s keep learning from each other.
