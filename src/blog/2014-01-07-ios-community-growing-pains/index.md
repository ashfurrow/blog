---
title: iOS Community Growing Pains
date: 2014-01-07
---

I read a really interesting article this morning about [developing for iOS 7 and beyond](http://www.schukin.com/developing-for-ios-8/).

> By the way, iOS 2.0 started with an assumption that only one view controller be displayed on the screen at a time. With iOS 3.2 (iPad), this obviously changed. iOS 4.0 sent developers & designers scrambling for retina assets. The iPhone 5 brought us a new screen size to support, once again causing developers to swim through their spaghetti nuking hard-coded layout values. And, despite a beta being given to them months before official launch, iOS 7 has left countless developers once again scrambling to come up to speed.

The problems that the author has laid bare are, in my opinion, indicative of a community that lacked best practices and maturity to follow them.

Coding for iOS was a real departure from coding for OS X, and the iOS gold rush certainly exacerbated the problem of newcomers not really knowing the best way to approach iOS apps.

The author of the post posits that you should write code with the intention of it eventually dying. That's a great way to see things, but it doesn't go far enough I think. You need to write modular code in small pieces that can be replaced individually, instead of massive classes that need to be rewritten every time a new iOS version is released.

So far, we've left everything up to Apple, letting them dictate the best way to approach our problems. That clearly isn't going to work in the long run, since Apple is apparently figuring this out themselves. On top of that, their best interests don't lie in helping developers. Instead, we need to solve problems ourselves. I have some suggestions for writing better code, and I'm open to suggestions I should add to this list:

- Explore [MVVM](http://www.teehanlax.com/blog/model-view-viewmodel-for-ios/) as an alternative to MVC
- Subclass `UIView` and perform layout code there instead of in your view controllers
- Always favour breaking code into smaller pieces
- Use [lighter view controllers](http://www.objc.io/issue-1/lighter-view-controllers.html) (hat tip to [John](https://twitter.com/strife25)) through [refactoring](http://nsscreencast.com/episodes/102-refactoring-view-controllers)
- As the author of the post suggests, use categories to support multiple versions on iOS

We're still a very young community that's finding its feet. We need to look at other communities who have been through this and see what they did right and wrong in order to develop our own set of best practices.
