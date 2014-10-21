---
title: "Expression Interpretation Problem with Swift Closures"
date: 2014-06-08 00:00
---

<import><p>I was working with <a href="http://twitter.com/nottombrown">someone</a> on an <a href="https://github.com/modocache/Quick">open-source testing framework for Swift</a> and we came across the following problem. If the last statement in a closure can be interpreted as an expression, then the Swift compiler will try and interpret that as the return value for that closure, which can conflict with an expected type. </p>

<p>Let's take a look at an example. </p>

<p>Cosider a function <code>a</code> that does some operation, then returns <code>true</code> or <code>false</code> depending on the success of that operation.</p>

<pre><code>func a() -&gt; Bool {
    /* do some work */
    return true
}
</code></pre>

<p>Cool, so far so good. Let's now take a look at a function <code>b</code> that takes a closure that takes no parameters and doesn't return a value. </p>

<pre><code>func b(closure: () -&gt; ()) {
    closure()
}
</code></pre>

<p>Still OK. Now let's invoke <code>b</code> with a closure that invokes <code>a</code>.</p>

<pre><code>b{
    a()
}
</code></pre>

<p>Boom, compiler error. </p>

<blockquote>
  <p>Cannot convert the expression's type '()' to type 'Bool'</p>
</blockquote>

<p>Interesting. It took us a few minutes to understand what was going on. The invocation of <code>a</code> returned a <code>Bool</code>, so the compiler was inferring that the closure should return a <code>Bool</code>, too, leading to a type-mismatch. Remember that the last expression in a closure is interpreted as an implicit return statement. So the compiler was interpreting this as follows. </p>

<pre><code>b{
    return a()
}
</code></pre>

<p>The workaround is the convert the expression <code>a()</code> into a statement that the compiler will ignore. </p>

<pre><code>b{
    var _ = a()
}
</code></pre>

<p><a href="http://twitter.com/kylefuller">Kyle</a> pointed out this would fix the issue, too. </p>

<pre><code>b{
    var _ = a()
    return
}
</code></pre>

<p>Interesting. I've filed a radar about it and I expect it'll be fixed soon. </p></import>

<!-- more -->

