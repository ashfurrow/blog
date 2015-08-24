---
title: "A Familiar Form"
date: 2014-06-07 00:00
---

<p>Last week, Apple introduced a brand new programming language for iOS and OS X development, called Swift. During WWDC, I attended every Swift presentation and spent time in the labs chatting with the engineers responsible for this new language. While I've had less than a week's exposure to this new language, I have some thoughts. </p>

<p>Generally, <a href="http://ashfurrow.com/blog/initial-thoughts-on-swift">I'm impressed</a>. Swift is the kind of radical departure from the existing Objective-C language that I was <a href="http://ashfurrow.com/blog/we-need-to-replace-objective-c">hoping for</a>. Sure, it's a radical departure, but is it radical enough?</p>

<p>Swift gets rid of a lot of cruft of Objective-C syntax while keeping some of its key features, like named parameters, around. But it also keeps around things that aren't <em>necessarily</em> a good thing. Let's take a look at a basic example. </p>

<pre><code>func compute (x: Int) -&gt; Int {
    return x*x
}

compute(4) //prints 16
</code></pre>

<p>This is a basic function definition and a corresponding invocation. A few things jump out that should be familiar to Objective-C developers. First, we have brace brackets delimiting the scope of the function. Lots of languages do this, but plenty don't, as well. We also see a familiar, C-like syntax for invoking the <code>compute</code> function. </p>

<p>Swift could easily have looked like this, a more Haskell-friendly syntax.</p>

<pre><code>func compute x: Int -&gt; Int 
   x*x

compute 4 //prints 16
</code></pre>

<p>Less familiar, sure, but would be just as valid if you're designing a whole new language. </p>

<p>When I asked an Apple engineer about these kinds of constructs, his answer was that familiarity with existing Objective-C developers was an important factor in the design process of the language. </p>

<p>Familiarity is important, certainly. We need existing developers to embrace Swift in order to avoid a situation where this new language languishes. However, while it's important for the sake of developer adoption, will it lead to the <em>best</em> language possible?</p>

<p>Maybe. Maybe not. </p>

<p>I feel that Apple may be making compromises on the language design for the sake of familiarity with developers, sacrificing what could be an even better syntax for the sake of developer penetration. Maybe this is the right choice, maybe it's not. I hope that they know what they're doing, and I hope that future revisions of the language aren't burdened with these familiarity considerations. </p>

<!-- more -->

