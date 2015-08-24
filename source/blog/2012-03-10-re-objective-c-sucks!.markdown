---
title: "RE: Objective-C Sucks!"
date: 2012-03-10 00:00
---

<p><a href="https://twitter.com/#!/pagesofinterest">Michael Robinson</a> pointed me to a site where people submit and vote on <a href="http://amplicate.com/hate/objective-c">reasons Objective-C sucks</a>. I found the <a href="http://amplicate.com/hate/objective-c/2212673-a-few-reasons-why-i-think-objective-c-is-not-good/">following list</a> representative of most of the ramblings there:<!--more--></p>

<blockquote>

<p>A few reasons why I think Objective C is not good enough:</p>

<ol>

<li>

<p>Memory management got introduced in ios 5. In contrast, Java, C# have such concept a long time a ago.</p>

</li>

<li>

<p>Objective c lacks a concept of package. It has a group concept, but the package concept comes with certain modifier access control. Such as protected or (default) in java.</p>

</li>

<li>

<p>Objective c doesn’t support private very well. You can call it if you know the function exists.</p>

</li>

<li>

<p>Mutable arrays and arrays. Can’t be transparently exchangeable. If you want to make the point bold of locking objects’ modification, at least be consistent and apply this principle to all objects. So we end up with double the quantity of classes.</p>

</li>

<li>

<p>A mixture of dot and bracket. With the dot being supported recently by objective c, not all invocation could be done with it. Some you must use bracket. I find this align with my general impression on objective c’s being not very well consistent.</p>

</li>

</ol>

</blockquote>

<p>Nice list. For a first-year Computer Science student. In response:</p>

<ol>

<li>

<p>Java and C# use Garbage Collection, which yields poor performance on mobile devices.</p>

</li>

<li>

<p>True, it does lack this feature, but you fail to explain why you think this is important. It's still possible to group your code, and you don't end up with crazy, enterprise-y namespaces. I actually prefer it; it's cleaner.</p>

</li>

<li>

<p>So what? Also, who cares!</p>

</li>

<li>

<p>This is, again, for performance. "Oh my god, too many classes!"</p>

</li>

<li>

<p>I agree that this can lead to inconsistent code, but you're <strong>not</strong> supposed to call methods with this syntax, only properties. If you always access properties with the dot syntax, then you're consistent.</p>

</li>

</ol>

<p>Maybe you should stop whining about how <em>new things are hard</em> and start getting good at something.</p>

<!-- more -->

