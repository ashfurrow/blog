---
title: "We Need to Replace Objective-C"
date: 2014-02-11 00:00
link_to: swift
---

<p>I thought that, in 2014, it was just taken for granted that Objective-C needs to be replaced. I thought that we were all on the same page.</p>

<p>That's what I thought, but I was wrong. </p>

<p>So here we go again. </p>

<p>This all started, for me, when I first listened to <a href="http://5by5.tv/hypercritical/14">Hypercritical episode 14: A Dark Age of Objective-C</a>. Not everyone has time to listen to a podcast, so I'm going to do my best to do justice to John Siracusa's argument here. </p>

<p>The premise is that programming language abstraction increases over time. This isn't a hard pill to swallow; after all, we can see the progression pretty easily: </p>

<ol>

<li>Machine Code</li>

<li>Assembly</li>

<li>Procedural languages (C)</li>

<li>Objective-oriented languages (C++)</li>

<li>Virtual machines (Java, .Net, Ruby, etc)</li>

</ol>

<p>If you accept the premise that programming language abstraction increases over time, then consider where Objective-C is on our progression. Pointers. C-based APIs. No virtual machine. Ugh. </p>

<p>So Objective-C is a little behind, so what? It has benefits, after all. Being close to the metal has made performance better on resource-constrained iOS devices. </p>

<p>Sure, but that's not the point. The point isn't that Objective-C needs to be replaced <em>today</em>, but rather that eventually, progress in programming languages is going to leave it behind. Someday, someday soon, writing Objective-C as we know it today will seem as antiquated as writing assembly. That's going to hurt Apple. </p>

<p>If writing iOS and OS X apps is as cumbersome as writing assembly, by comparison to modern programming languages, then what will Apple do? </p>

<p>Now, the counter-argument is that Apple has been making strides in Objective-C development. They deprecated GCC in favour of LLVM. They added blocks. They added collections literals. Yeah, and that's all great, but those are all <em>incremental improvements</em>. At some point, there's going to be a gulf that can only be bridged by a radical change in the language.  Christ, look at how we're still arguing about dot-notation. Incremental changes aren't the way to get to the language of the future. </p>

<p>So why do we need to replace Objective-C today, then, if it will probably be fine for a while? Well, look at Microsoft. They transitioned from Win32 APIs to .Net and the CLR VM and it took <em>over a decade</em>. Apple needs to stat work on replacing Objective-C as its main language <em>now</em> if it wants it to be ready for, optimistically speaking, 2020.</p>

<p>My friend Jason <a href="http://nearthespeedoflight.com/article/2014_02_06_objective_c_is_a_bad_language_but_not_for_the_reasons_you_think_it_is__probably__unless_you___ve_programmed_with_it_for_a_while_in_which_case_you_probably_know_enough_to_judge_for_yourself_anyway__the_jason_brennan_rant">nails it</a>:</p>

<blockquote>
  <p>A new old thing is not really what we need. It seems absurd that 30 years after the Mac we still build the same applications the same ways. It seems absurd we still haven’t really caught up to Smalltalk.</p>

</blockquote>

<p>Exactly. </p>

<p>So what do I want in a language? Well, here are some things that <a href="http://5by5.tv/hypercritical/15">Siracusa points out</a>, augmented with some of my own suggestions:</p>

<ol>

<li>It shouldn't use pointers, structs, header files, anything C-based</li>

<li>It should be a memory-managed language (No ARC, not retain/release, no Core Foundation)</li>

<li>It should have native, unicode strings and native collections</li>

<li>It should be concise</li>

<li>It should have named parameters</li>

</ol>

<p>As long as, as iOS developers, we're one <code>NULL</code> pointer dereference away from a crash, we're a long way away from using a modern language. </p>

<p><em>Update</em>: It's been pointed out that I don't actually state <em>why</em> Objective-C needs to be replaced. I'll be concise: eventually, if things continue without radical changes to Objective-C, writing apps in the language will seem as outdated as writing assembler does to us today. That will be a competitive disadvantage to Apple, which I don't want to see happen. </p>

<!-- more -->

