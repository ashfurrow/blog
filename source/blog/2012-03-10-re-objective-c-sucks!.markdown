---
title: "RE: Objective-C Sucks!"
date: 2012-03-10 00:00
---

[Michael Robinson](https://twitter.com/#!/pagesofinterest) pointed me to a site where people submit and vote on [reasons Objective-C sucks](http://amplicate.com/hate/objective-c). I found the [following list](http://amplicate.com/hate/objective-c/2212673-a-few-reasons-why-i-think-objective-c-is-not-good/) representative of most of the ramblings there:



> A few reasons why I think Objective C is not good enough:
> 
> 1. 
> 
> Memory management got introduced in ios 5. In contrast, Java, C# have such concept a long time a ago.
> 
> 2. 
> 
> Objective c lacks a concept of package. It has a group concept, but the package concept comes with certain modifier access control. Such as protected or (default) in java.
> 
> 3. 
> 
> Objective c doesn’t support private very well. You can call it if you know the function exists.
> 
> 4. 
> 
> Mutable arrays and arrays. Can’t be transparently exchangeable. If you want to make the point bold of locking objects’ modification, at least be consistent and apply this principle to all objects. So we end up with double the quantity of classes.
> 
> 5. 
> 
> A mixture of dot and bracket. With the dot being supported recently by objective c, not all invocation could be done with it. Some you must use bracket. I find this align with my general impression on objective c’s being not very well consistent.

Nice list. For a first-year Computer Science student. In response:

1. 

Java and C# use Garbage Collection, which yields poor performance on mobile devices.

2. 

True, it does lack this feature, but you fail to explain why you think this is important. It's still possible to group your code, and you don't end up with crazy, enterprise-y namespaces. I actually prefer it; it's cleaner.

3. 

So what? Also, who cares!

4. 

This is, again, for performance. "Oh my god, too many classes!"

5. 

I agree that this can lead to inconsistent code, but you're **not** supposed to call methods with this syntax, only properties. If you always access properties with the dot syntax, then you're consistent.

Maybe you should stop whining about how _new things are hard_ and start getting good at something.

<!-- more -->
