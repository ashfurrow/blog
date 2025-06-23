---
title: Code Catch-22
date: 2011-10-21
---


I've been reading through some of [Mike Ash's blog posts](http://www.mikeash.com/pyblog), and [this one in particular got me really excited](http://www.mikeash.com/pyblog/friday-qa-2011-10-14-whats-new-in-gcd.html). OK, so they _all_&nbsp;got me excited, but this one's really awesome. It discusses new features Apple added to Grand Central Dispatch in Lion and iOS 5. Previously, you created dispatch queues with the C function dispatch\_queue\_create(const char \*label, dispatch\_queue\_attr\_t attr), where attr was always NULL so Apple could "Add Support Later" for additional options. I figured this was typical C-style future-proofing _just in case_, but it looks like they were actually plannon on something.

I won't get into the details, but sufficed to say, the new features are _awesome_. They've actually solved issues I've had with GCD and I can't wait to use them. (If you don't know how revolutionary dispatch queues and GCD are for a language based in C, imagine Lisp-level serenity with the ability to actually accomplish useful tasks).

Here's the thing. This is a language feature designed so programmers don't have to know or think about threads in order to write concurrent programs. But in order to effectively use the new attribute options, you need to have an understanding of thread safety. It's kind of a catch-22.

This isn't the only case. With the new Automatic Reference Counting Apple introduced into the LLVM 3.0 compiler, I don't have to write retain/release code because the _compiler does it for me_. They've written a compiler so that programmers don't have to know about manual memory management, but in order to use it properly, programmers have to adhere to naming conventions and protocols, so they end up having to _know about_&nbsp;retain/release even if they never use it.

This is common outside of Objective-C, too. I guess this is why we had to learn things like assembler (or, some would argue, C) in school even if some of us were going to write Ruby for the rest of our lives. _Knowing_&nbsp;about low-level semantics is enough to write good _high-level_&nbsp;code, even if you never use that knowledge directly.

For instance, if a programmer who knows about the implementation details of collections like lists, arrays, dictionaries/hash maps, and sets, then they can write more efficient code around them.

All of programming is pretty much a catch-22, I guess. Nothing highlights this fact more than learning about new programmer language features.


  