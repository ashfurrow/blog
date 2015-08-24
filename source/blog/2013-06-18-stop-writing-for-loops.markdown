---
title: "Stop Writing For Loops"
date: 2013-06-18 00:00
link_to: swift
---

<p>Most of the time, when we use a <code>for</code> loop, it's to iterate over some collection. Typically an array. We used to write things like this:</p>

<pre><code>for (NSInteger i = 0; i &lt; [array count]; i++) {
    id obj = array[i];
    // do something with obj
}
</code></pre>

<p>Then we came up with the foreach loop. </p>

<pre><code>for (id obj in array) {
    // do something with obj
}
</code></pre>

<p>That worked well unless you wanted to know the index of the object that you're using. We've all written code like this:</p>

<pre><code>NSInteger i = 0;
for (id obj in array) {
    // do something with obj
    i++;
}
</code></pre>

<p>This one is particularly insidious since it creates a new local variable <code>i</code> outside of the lexical scope of the loop. Gross!</p>

<p>Please, stop using all of these. Instead, use <code>enumerateObjectsUsingBlock:</code></p>

<pre><code>[array enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
    //do something with obj at idx
}];
</code></pre>

<p>This abstracts away <em>how</em> the computer is doing something and let's you focus solely on <em>what</em> it is you're trying to accomplish. You get the index of the iteration and can stop the enumeration at any time by setting <code>*stop = YES</code>. </p>

<p>We used to have to use arrays because Objective-C didn't have blocks. We've left the dark ages and can now focus on what we're trying to accomplish instead of being mired in the minutia of how the computer works. </p>

<p>EDIT: Several readers have pointed out the <a href="http://darkdust.net/writings/objective-c/nsarray-enumeration-performance">performance</a> <a href="http://stackoverflow.com/questions/4486622/when-to-use-enumerateobjectsusingblock-vs-for">gains</a> when using the different methods. Good point, and definitely worth a read. </p>

<!-- more -->

