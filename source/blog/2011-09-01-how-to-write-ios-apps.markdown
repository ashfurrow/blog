---
title: "How to Write iOS Apps"
date: 2011-09-01 00:00
---

Well, how to write good ones, anyways. This article describes how _programmers_ can make good iOS apps. It kind of assumes they can design them, too. However, I recently realized two things:

- Developers, even good ones, aren't necessarily good at design. In fact, most developers kind of probably suck at it. Get help from a friend.
- _Reading_ the [HIG](http://developer.apple.com/library/ios/#documentation/userexperience/conceptual/mobilehig/IconsImages/IconsImages.html) shouldn't be confused with _understanding_ the HIG. Anyone can read 90 pages of dense Applese but that doesn't mean a thing unless you understand _why_ they made the recommendations they did.

Why should you listen to me? Well, I'm no expert in writing iOS apps. No, wait. Yes I am. I taught a course at my university on the topic. Let's carry on, then.<!--more-->

### Objective-C

You need to learn Objective-C. Go mess with MonoTouch or whatever if you want. Then go grab a fruit roll-up, think about what you did, and realize you should have just learned Objective-C. You can watch free lessons on iTunes U from [Stanford](http://itunes.apple.com/us/podcast/cs193p-student-final-projects/id395605774?i=90218598). If you're new to iOS apps and Objective-C and are serious, drop $100 to get a [dev license](http://developer.apple.com/programs/which-program/) and download Xcode 4.2 and never look back. Seriously, it'll be worth it not to learn about manual memory management.

By the way, you better love Model-View-Controller. I mean _love_ it like you want to marry it and raise a whole family of models, views, and controllers with it. If you don't like to use it, go back to C. We're _civilized_ here..

The next step is to try to write an app. Anything you want - but remember this is only an _attempt_. You don't want your first attempt to become something you [have to maintain years later](http://ashfurrow.com/index.php/projects/coffeetimer/).

### UIKit

You think because you know Objective-C you know how to write a real app? Sit your ass back down because you've got to master UIKit first. I mean _master it_. It's not a terribly hard or overly complex framework, but it's something you have to know inside and out. If you don't completely understand the lifecycle of a UIView instance, learn.

Seriously.

This will bite you in the ass every time. I've seen smart developers invent their own frameworks because they never bothered to learn UIKit and _my god_ they were awful at it. You should be able to stand at a whiteboard and trace out the hierarchy of a keywindow for navigation-based, tab bar-based, and view-based apps, as well as describe the view lifecycle. You should know why adding a subview doesn't mean its controller's viewDidAppear: method ever gets called. You should know what awakeFromNib is and when it's appropriate to use. And so on.

### App Domain-Specific Frameworks and API Calls

You can use UIKit to make your apps look nice. But it takes some domain-specific frameworks like MapKit, CoreLocation, and CoreData to make your apps useful.

The frameworks you decide to learn depend on the kind of app you want to make. I wrote a app for the last New Brunswick provincial election that displayed stuff on a map so I learned MapKit. There are programming guides, tutorials, and code samples available from Apple for about every framework they have. That's a good place to start.

API calls can be done dozens of different ways. I can't tell you which way is best for your app. You just have to try to write data-retrieval methods from your CoreData store or Web API with (somewhat paradoxically) too few _and_ too many layers of abstraction and learn how _not_ to do it in order to learn how to do it the right way for you.

### CoreGraphics & CoreAnimation

If you're not #importing &lt;QuartzCore/QuartzCore.h&gt; in your precompiled header file yet, your apps probably look fine. But they probably look like _every other app_, too. Also, if you don't know what a pch file is, google it. It's important.

If you want to make your shiny app intuitive and easy to use, you need CoreGraphics and CoreAnimation. If you _don't_ want to make your apps intuitive and easy to use, I hear OpenOffice&nbsp;is looking for some Java developers.

CG/CA isn't _that_ hard to learn. Basically, your UIKit stuff is rendered by this layer, which is in turn rendered by OpenGL, which we don't care about because we don't hate ourselves. Basically all you need to know need to know about the CALayer, CAGradientLayer, and CAAnimation classes and CG types, like CGRect/Point, where to use them, and where _not_ to use them.&nbsp;Oh, and some CoreOS memory management stuff.

Gosh.

OK, fine, CG/CA is kind of hard. But it is _so worth it_.

You need to be aware of a few things. Foremost is that, while you're developing on your shiny new iPhone 4 or iPad 2, your poor users might still be stuck on an iPhone 3G. And that sucks. But you can make a [really good app](http://twitter.com/#!/tapi/status/109334914628984832) that works well for them, too.

Doing things like turning off a CALayer's opaque or masksToBounds properties makes your app slower. Like,&nbsp;_way slower, brah_. Only do it if you have a really good reason to. There are some awesome effects that you can achieve really easily with CG/CA, but you need to be aware of when it hurts performance.

### Testing

[Testing sucks](http://27.media.tumblr.com/tumblr_loy7vaGhOH1qci335o1_500.jpg). You could take the easy path and let your (paying) users test your app for you in the wild, but your ratings are going to suck. More importantly, you'll be an awful person.

At least _try_ to test your app. Give it to someone and see how they use it. Not someone who's used it before, someone new to it. Observe when/where they get frustrated or confused and fix those parts of your app.

That's it! If anyone has any suggestions, please leave them in the comments!

<!-- more -->
