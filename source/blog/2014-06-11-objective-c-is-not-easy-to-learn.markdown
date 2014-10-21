---
title: "Objective-C is Not Easy to Learn"
date: 2014-06-11 00:00
---

<import><p>I read <a href="http://www.bignerdranch.com/blog/ios-developers-need-to-know-objective-c/">this blog post</a> by Aaron Hillegass this morning and was immediately disappointed. </p>

<p>There are many things that I disagree with about this article, but there is one in particular that I took offence to. </p>

<blockquote>
  <p>Objective-C is easier to learn than Swift.</p>
</blockquote>

<p>Really? Come on now. That's just silly. </p>

<blockquote>
  <p>Objective-C is a really simple little extension to C.</p>
</blockquote>

<p>I'm disappointed by this statement, because it is simply not true. Objective-C is a <a href="http://ashfurrow.com/blog/2012/03/why-objective-c-is-hard">massive pain in the ass to learn</a>. It's a mix of language (with "weird" syntax), runtime (all that arcane knowledge), and frameworks (massive ones). Swift obviates the difficult with the first two, which is awesome. </p>

<p>Let's consider a simple example. </p>

<pre><code>NSLog(@"Hello, world!");
</code></pre>

<p>OK, so let's take a look at this. Why is <code>NS</code> there? Why not just <code>log</code>? And why is there an <code>@</code> sign in front of the string? That's bizarre! Why doesn't <code>NSLog</code> conform to standard Objective-C syntax? </p>

<p>Pedantic? Maybe. But I'm not the one claiming Objective-C is easier to learn than Swift. Let's take a look at another example. I want an array, called <code>array</code>, of the numbers 1 to 5. Let's contrast. </p>

<pre><code> NSArray *array = @[@(1), @(2), @(3), @(4), @(5)];
</code></pre>

<p>Holy shit. Why is that asterisk there? (Yeah, explain pointers to a newcomer to programming. Have fun.) Again, what's with all these <code>@</code> signs?! It makes no sense! Why doesn't this look more like the following?</p>

<pre><code>var array = [1...5]
</code></pre>

<p>But then, that's Swift. </p>

<p>I'll tolerate people saying that "Swift is complex", either because it's unfamiliar or whatever reason you have. But come on. Objective-C being easier to learn? Give me a break. </p>

<p>As educators, it's our job to put ourselves in the shoes of a beginner and see things through a newcomer's eyes. I don't see that happening in this article. </p>

<p>Aaron Hillegass is an amazing developer and business person. I have admired and looked up to him, and the Big nerd Ranch, for a long time now. However, this post feels like it was written out of fear. I think that it is a disservice to iOS newcomers. </p></import>

<!-- more -->

