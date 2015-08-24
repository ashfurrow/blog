---
title: "Lazy Property Setup in Swift"
date: 2014-07-05 00:00
link_to: swift
---

<p>A few weeks ago, I was talking with my friend <a href="http://twitter.com/ratkins">Robert</a> about Swift. He had a problem. He wanted to create a property of a class that is <em>not</em> an optional, but depends on <code>self</code> for its creation.</p>

<!-- more -->

<p>The issue revolves around <a href="http://ashfurrow.com/blog/swift-initializers">initializers in Swift</a>. If a property is not optional, it <em>must</em> be set <em>before</em> the super's initializer is called. However, in order to refer to <code>self</code>, the super initializer must be called <em>first</em>. It's a chicken-and-the-egg problem. I need to set my properties before calling <code>super.init()</code>, but in order to set my properties, I need to refer to <code>self</code>, which I can't do until I've already called <code>super.init()</code>. </p>

<p>Hmmm. </p>

<p>I've come up with a pretty good solution. Consider a <code>UIDynamicAnimator</code> property on a view controller. I need to initialize it with a reference view of <code>self.view</code>, but I'm in the same situation as Robert was. My solution, which came from a talk with Dave Addey at the WWDC labs, was to use a <code>@lazy</code> property that is set to a self-evaluating closure. The closure returns a reference to the initialized dynamic animator, but it since it's lazy, it isn't set until the first time it's referred to. </p>

<pre><code>@lazy var animator: UIDynamicAnimator = {
    let animator = UIDynamicAnimator(referenceView: self.view)
    return animator
}()
</code></pre>

<p>The downside, as I can see it, is that <code>@lazy</code> properties <em>must</em> be <code>var</code> and not <code>let</code>, so you lose some Swift-ness there. Still, it's better than having an optional type. </p>

