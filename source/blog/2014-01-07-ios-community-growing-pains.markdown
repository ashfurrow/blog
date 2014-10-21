---
title: "iOS Community Growing Pains"
date: 2014-01-07 00:00
---

<import><p>I read a really interesting article this morning about <a href="http://www.schukin.com/developing-for-ios-8/">developing for iOS 7 and beyond</a>. </p>

<blockquote>
  <p>By the way, iOS 2.0 started with an assumption that only one view controller be displayed on the screen at a time. With iOS 3.2 (iPad), this obviously changed. iOS 4.0 sent developers &amp; designers scrambling for retina assets. The iPhone 5 brought us a new screen size to support, once again causing developers to swim through their spaghetti nuking hard-coded layout values. And, despite a beta being given to them months before official launch, iOS 7 has left countless developers once again scrambling to come up to speed.</p>
</blockquote>

<p>The problems that the author has laid bare are, in my opinion, indicative of a community that lacked best practices and maturity to follow them. </p>

<p>Coding for iOS was a real departure from coding for OS X, and the iOS gold rush certainly exacerbated the problem of newcomers not really knowing the best way to approach iOS apps. </p>

<p>The author of the post posits that you should write code with the intention of it eventually dying. That's a great way to see things, but it doesn't go far enough I think. You need to write modular code in small pieces that can be replaced individually, instead of massive classes that need to be rewritten every time a new iOS version is released. </p>

<p>So far, we've left everything up to Apple, letting them dictate the best way to approach our problems. That clearly isn't going to work in the long run, since Apple is apparently figuring this out themselves. On top of that, their best interests don't lie in helping developers. Instead, we need to solve problems ourselves. I have some suggestions for writing better code, and I'm open to suggestions I should add to this list:</p>

<ul>
<li>Explore <a href="http://www.teehanlax.com/blog/model-view-viewmodel-for-ios/">MVVM</a> as an alternative to MVC</li>
<li>Subclass <code>UIView</code> and perform layout code there instead of in your view controllers</li>
<li>Always favour breaking code into smaller pieces</li>
<li>Use <a href="http://www.objc.io/issue-1/lighter-view-controllers.html">lighter view controllers</a> (hat tip to <a href="https://twitter.com/strife25">John</a>) through <a href="http://nsscreencast.com/episodes/102-refactoring-view-controllers">refactoring</a>
</li>
<li>As the author of the post suggests, use categories to support multiple versions on iOS</li>
</ul>

<p>We're still a very young community that's finding its feet. We need to look at other communities who have been through this and see what they did right and wrong in order to develop our own set of best practices. </p></import>

<!-- more -->

