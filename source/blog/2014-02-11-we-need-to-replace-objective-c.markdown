---
title: "We Need to Replace Objective-C"
date: 2014-02-11 00:00
link_to: swift
---

I thought that, in 2014, it was just taken for granted that Objective-C needs to be replaced. I thought that we were all on the same page.

That's what I thought, but I was wrong.

So here we go again.

This all started, for me, when I first listened to [Hypercritical episode 14: A Dark Age of Objective-C](http://5by5.tv/hypercritical/14). Not everyone has time to listen to a podcast, so I'm going to do my best to do justice to John Siracusa's argument here.

The premise is that programming language abstraction increases over time. This isn't a hard pill to swallow; after all, we can see the progression pretty easily:

1. Machine Code
2. Assembly
3. Procedural languages (C)
4. Objective-oriented languages (C++)
5. Virtual machines (Java, .Net, Ruby, etc)

If you accept the premise that programming language abstraction increases over time, then consider where Objective-C is on our progression. Pointers. C-based APIs. No virtual machine. Ugh.

So Objective-C is a little behind, so what? It has benefits, after all. Being close to the metal has made performance better on resource-constrained iOS devices.

Sure, but that's not the point. The point isn't that Objective-C needs to be replaced _today_, but rather that eventually, progress in programming languages is going to leave it behind. Someday, someday soon, writing Objective-C as we know it today will seem as antiquated as writing assembly. That's going to hurt Apple.

If writing iOS and OS X apps is as cumbersome as writing assembly, by comparison to modern programming languages, then what will Apple do?

Now, the counter-argument is that Apple has been making strides in Objective-C development. They deprecated GCC in favour of LLVM. They added blocks. They added collections literals. Yeah, and that's all great, but those are all _incremental improvements_. At some point, there's going to be a gulf that can only be bridged by a radical change in the language. Christ, look at how we're still arguing about dot-notation. Incremental changes aren't the way to get to the language of the future.

So why do we need to replace Objective-C today, then, if it will probably be fine for a while? Well, look at Microsoft. They transitioned from Win32 APIs to .Net and the CLR VM and it took _over a decade_. Apple needs to stat work on replacing Objective-C as its main language _now_ if it wants it to be ready for, optimistically speaking, 2020.

My friend Jason [nails it](http://nearthespeedoflight.com/article/2014_02_06_objective_c_is_a_bad_language_but_not_for_the_reasons_you_think_it_is __probably__ unless_you ___ve_programmed_with_it_for_a_while_in_which_case_you_probably_know_enough_to_judge_for_yourself_anyway__ the_jason_brennan_rant):

> A new old thing is not really what we need. It seems absurd that 30 years after the Mac we still build the same applications the same ways. It seems absurd we still haven’t really caught up to Smalltalk.

Exactly.

So what do I want in a language? Well, here are some things that [Siracusa points out](http://5by5.tv/hypercritical/15), augmented with some of my own suggestions:

1. It shouldn't use pointers, structs, header files, anything C-based
2. It should be a memory-managed language (No ARC, not retain/release, no Core Foundation)
3. It should have native, unicode strings and native collections
4. It should be concise
5. It should have named parameters

As long as, as iOS developers, we're one `NULL` pointer dereference away from a crash, we're a long way away from using a modern language.

_Update_: It's been pointed out that I don't actually state _why_ Objective-C needs to be replaced. I'll be concise: eventually, if things continue without radical changes to Objective-C, writing apps in the language will seem as outdated as writing assembler does to us today. That will be a competitive disadvantage to Apple, which I don't want to see happen.

<!-- more -->
