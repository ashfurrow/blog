---
title: The Necessity of C in Objective-C
date: 2013-01-05
---


When I wrote my [Seven Deadly Sins of Modern Objective-C](/blog/seven-deadly-sins-of-modern-objective-c) article last week, I got a lot of feedback about the "Unnecessarily-C APIs" point and I wanted to take a closer look at what I meant.

First, some reader feedback. John Randolph wrote me to explain why the Keychain API on iOS is C-based: low-level systems apps on OS X still need to access the keychain but may not link against Foundation (that is, they're entirely C-based apps). When Apple ported over Keychain from OS X, they didn't bother writing an Objective-C wrapper for their C-based Keychain API.

Phil Nash wrote in with the following, wonderful sentiment:

> One of the biggest problems with Objective-C is that it is a dynamic, pure OO, language (derived from Smalltalk) grafted over a statically typed low-level procedural language (C)
> 
> One of the greatest things about Objective-C is that it is a dynamic, pure OO, language (derived from Smalltalk) grafted over a statically typed low-level procedural language (C).
> 
> My point is that you have the power of both approaches - which have their own strengths and weaknesses. Obviously you need to understand what those strengths and weaknesses are to play to one and play down the other.

I couldn't agree more — Objective-C and C both have their places in the toolbox of a good Objective-C developer. I'd say that C is like a sledgehammer: it's powerful and specialized tool. Objective-C is more like a regular hammer: it's versatile but lacks some of the raw power of the sledgehammer. Both are powerful tools but each has its own uses.

You _could_ use a regular hammer where a sledgehammer should be used, but you're probably going to have a bad time. Likewise, using a sledgehammer to drive in finishing nails is a bad idea.

Here's the thing: most of iOS development is driving finishing nails.

There are situations where C is a more appropriate option than Objective-C, but those are exceptions to the rule. These exceptions include things like OpenGL, audio/video capturing and processing, and hard number crunching. Notice something? All these things require _speed_, which C is really good at.

I'm not arguing that you, as an Objective-C developer, can't use C. My argument is that when you want other people to use your library, only expose a C API to it if it's appropriate to do so. The internals can be C if you want, but the externals should be Objective-C unless you've got a really good reason.

That doesn't mean that C doesn't belong in Objective-C at all. For example, we use C structs all the time, like `CGRect`. We even use C methods like `CGRectInset`. Consider the `UIScrollViewDelegate` method `scrollViewWillEndDragging:withVelocity:targetContentOffset:`, whose last parameter is a pointer to a `CGPoint` that allows method implementations to pass back information to the caller without using the return value. It's super-useful!

(See, guys? I don't hate C.)

So you can use C in Objective-C, but I would strongly caution _against_ using Objective-C in C. For example, there are very, very few circumstances where you should have an object within a struct.

C is a procedural programming language. Objective-C is a message-oriented language that has objects. If the problem you're solving is best done with a procedural approach, then by all means, use C. However, you should always stop first and consider if the problem wouldn't really be better solved using a message-oriented or object-oriented approach, instead.


  