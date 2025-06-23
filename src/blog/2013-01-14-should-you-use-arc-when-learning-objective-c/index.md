---
title: Should You Use ARC When Learning Objective-C?
date: 2013-01-14
---


The answer is `YES`.

[Automatic Reference Counting](http://clang.llvm.org/docs/AutomaticReferenceCounting.html), or ARC, doesn't let you get away without learning the Objective-C memory management model; it only prevents you from having to write a lot of extra, stupid code. I call it "stupid" because the code is so simple that _literally_ the computer will do it for you. That's all ARC is.

ARC is the Way Of The Future™ and, while long-time Objective-C developers may eschew it in favour of manual memory management, newcomers to the language have no reason not to learn Objective-C with ARC.

ARC has some gotchas, and you'll learn them as you get familiar with the language, but so does manual memory management. Both have pros and cons, but to a newcomer, ARC greatly reduces the difficulty in getting started. As someone who taught himself Objective-C, I'll say that anything that can reduce the friction at this stage of learning will help keep you interested.

You can always go back and learn manual memory management later — it would be a great exercise. But if you're _just_ picking up the language, avoid manual memory management in favour of ARC.


  