---
title: "Objective-C is Not Easy to Learn"
date: 2014-06-11 00:00
link_to: swift
---

I read [this blog post](http://www.bignerdranch.com/blog/ios-developers-need-to-know-objective-c/) by Aaron Hillegass this morning and was immediately disappointed.

There are many things that I disagree with about this article, but there is one in particular that I took offence to.

(READMORE)

> Objective-C is easier to learn than Swift.

Really? Come on now. That's just silly.

> Objective-C is a really simple little extension to C.

I'm disappointed by this statement, because it is simply not true. Objective-C is a [massive pain in the ass to learn](/blog/why-objective-c-is-hard-to-learn). It's a mix of language (with "weird" syntax), runtime (all that arcane knowledge), and frameworks (massive ones). Swift obviates the difficult with the first two, which is awesome.

Let's consider a simple example.

```
NSLog(@"Hello, world!");
```

OK, so let's take a look at this. Why is `NS` there? Why not just `log`? And why is there an `@` sign in front of the string? That's bizarre! Why doesn't `NSLog` conform to standard Objective-C syntax?

Pedantic? Maybe. But I'm not the one claiming Objective-C is easier to learn than Swift. Let's take a look at another example. I want an array, called `array`, of the numbers 1 to 5. Let's contrast.

```
NSArray *array = @[@(1), @(2), @(3), @(4), @(5)];
```

Holy shit. Why is that asterisk there? (Yeah, explain pointers to a newcomer to programming. Have fun.) Again, what's with all these `@` signs?! It makes no sense! Why doesn't this look more like the following?

```
var array = [1...5]
```

But then, that's Swift.

I'll tolerate people saying that "Swift is complex", either because it's unfamiliar or whatever reason you have. But come on. Objective-C being easier to learn? Give me a break.

As educators, it's our job to put ourselves in the shoes of a beginner and see things through a newcomer's eyes. I don't see that happening in this article.

Aaron Hillegass is an amazing developer and business person. I have admired and looked up to him, and the Big nerd Ranch, for a long time now. However, this post feels like it was written out of fear. I think that it is a disservice to iOS newcomers.

