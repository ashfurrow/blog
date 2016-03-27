---
title: "Lazy Property Setup in Swift"
date: 2014-07-05 00:00
link_to: swift
---

A few weeks ago, I was talking with my friend [Robert](http://twitter.com/ratkins) about Swift. He had a problem. He wanted to create a property of a class that is _not_ an optional, but depends on `self` for its creation.

<!-- more -->

The issue revolves around [initializers in Swift](https://ashfurrow.com/blog/swift-initializers). If a property is not optional, it _must_ be set _before_ the super's initializer is called. However, in order to refer to `self`, the super initializer must be called _first_. It's a chicken-and-the-egg problem. I need to set my properties before calling `super.init()`, but in order to set my properties, I need to refer to `self`, which I can't do until I've already called `super.init()`.

Hmmm.

I've come up with a pretty good solution. Consider a `UIDynamicAnimator` property on a view controller. I need to initialize it with a reference view of `self.view`, but I'm in the same situation as Robert was. My solution, which came from a talk with Dave Addey at the WWDC labs, was to use a `@lazy` property that is set to a self-evaluating closure. The closure returns a reference to the initialized dynamic animator, but it since it's lazy, it isn't set until the first time it's referred to.

```
@lazy var animator: UIDynamicAnimator = {
    let animator = UIDynamicAnimator(referenceView: self.view)
    return animator
}()
```

The downside, as I can see it, is that `@lazy` properties _must_ be `var` and not `let`, so you lose some Swift-ness there. Still, it's better than having an optional type.

