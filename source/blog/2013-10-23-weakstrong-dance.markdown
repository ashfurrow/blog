---
title: "Weak/Strong Dance"
date: 2013-10-23 00:00
link_to: swift
---

<import><p>Reader Chad Zeluff wrote in to me about a practice I've been following <a href="https://leanpub.com/iosfrp">in my book</a>.</p>

<p>When defining properties of a view, or view controller, which point to subviews of that view, or view controller's view, I'm using weak properties. This makes sense to me since the view referenced by that property will be added to a view hierarchy, and its parent view will hold a strong reference to it. </p>

<p>However, as Chad writes...</p>

<blockquote>
  <p>A view controller does not nil its view during low memory conditions anymore, so I can't imagine the scenario will ever come up, where a view controller remains in memory, but its view does not. So to me, it seems perfectly reasonable to use strong properties for subviews nowadays. Do you agree?</p>
</blockquote>

<p>He's completely correct from a technical perspective. There's no <em>need</em> to reference these as weak properties anymore. In fact, doing so requires you pollute your local scope when creating them. </p>

<pre><code>UIView *myView = [UIView new]; //capture in strong local variable
[self.view addSubview:myView]; //strongly referenced by self.view
self.myView = myView;
</code></pre>

<p>I still like the idea of referencing subviews weakly, since it maintains that ownership mechanic supported by ARC. However, I don't like the extra step taken in order to instantiate our properties. </p>

<p>What do you think?</p></import>

<!-- more -->

