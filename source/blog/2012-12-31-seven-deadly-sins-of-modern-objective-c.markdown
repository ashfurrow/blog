---
title: "Seven Deadly Sins of Modern Objective-C"
date: 2012-12-31 00:00
index: true
link_to: swift
---

I've had this post cooking for a long time, and I think it's ready to unveil. If you code Objective-C, this is going to offend you and that's good. If you aren't offended, then you don't care, and that's bad.

This list isn't about stylistic things like which line new braces go on (new ones, duh). This list is about potential problems with the code you're writing on an objective scale. So let's get started.

## 1. Giant .xib

Let's start off our list with a sin that's quite common among Objective-C newcomers. Opening my own early Xcode projects shows that I'm guilty of this one, too. You have two views, or view controllers, or whatever, and you put them in the same .xib file. Then three. Then four. And so on.

Why is this bad? A few reasons. The biggest problem is that when the system loads the .xib, it has to load _the entire .xib_. That takes time and is often done on app launch or in response to user interaction — two things you do _not_ want to delay.

The second problem is that you can't re-use the view (or the code associated with it). Well, you can, but you won't since copy-and-paste is so easy.

What's that? You want to see all your views at once? That's what Storyboards are for, guys. Storyboards are optimized for loading only the view controllers that they need for the moment so you don't have the performance problems associated with giant .xibs. They also let you use views and code more than once, more easily.

Either move your giant .xib to a Storyboard or ditch the visual layout management altogether.

## 2. Not Using Dot Syntax Consistently

People have written in to tell me that the use of dot syntax is subjective, and they're right. I personally find dot syntax a more modern way to access properties, but that's not objective.

Instead I'll say that if you choose to use dot syntax, do so consitently. Either go whole-hog or eschew them altother. Don't mix-and-match without a good reason and without telling your team why.

## 3. Too Many Classes in `.m` Files

Now time for a sin everyone has committed at one time: multiple classes in the same file. This one is pretty subjective, since this is often a useful way to define things like small wrapper model classes or value transformers. However, it can be a slippery slope that leads to `#import`ing unrelated view controllers all over the place and tightly-coupled code. Ick.

If your new class is going to be used outside the file, or it might be someday, put it in it's own file. If you ever `#import` a view controller just to get at an ancillary class within the `.m` file, refactor first.

## 4. Not Testing With Compiler Optimizations

Here's a sneaky one that's gotten me a few times: not testing with compiler optimizations enabled. Here's how it works:

You develop your app with optimizations turned off, as they are by default in new Xcode projects. This makes debugging easier. Then you test with the development settings, which still have the optimizations turned off. When you distribute your app, either to beta testers or to Apple for approval, the deployment scheme has the optimizations turned _on_. This can lead to some serious cluserfucks.

One time, I tracked down a bug only appearing to our beta users that was caused by a bug in ARC and LLVM. It took half a day to find it since I was only testing using my development profile.

You don't have to do a full regression test with the compiler optimizations — a simple smoke test will usually suffice. If you have beta testers, then you're all set. It's just important that somebody out there tests the actual generated binary that your users will have in their hands.

## 5. Architecture-Dependent Primitive Types

This is probably as close to a stylistic sin as I'm going to get, but it's a _huge_ pet peeve of mine.

Objective-C isn't just for iOS and it isn't just for OS X: the language, and the runtime, is built for both. iOS is 32-bit, while OS X is 64-bit (mostly). When you're defining primitive values in Objective-C, using `int` is losing, like, half the bits when compiling for OS X. Likewise, `long int` just looks stupid.

So what's the big deal? It's not like you're going to compile your sick iOS app for OS X, is it? Well, what about shared libraries? What about when iOS transitions to 64-bit? What about the sexier syntax highlighting you'll get using `NSInteger`?

Yeah, that's right: every time I need a integer in Objective-C, I use `NSInteger`. If I need it to be unsigned, I use `NSUInteger`. Every. Time. Same with `float` and `CGFloat`. That takes care of the 32/64-bit conversion for me.

It leads to some interesting compiler warnings with `NSLog` and format strings, since `NSLog(@"%d", i)` is not valid for 64-bit integers, but you can find ways around it. It's the smallest of prices to pay for being a good Objective-C citizen.

## 6. Unnecessarily-C APIs

Did I say I was going to avoid stylistic sins? Too bad.

Listen, guys, it's the twenty first century. Don't use C anymore unless you have to. It's rude.

(I'm looking at you, Apple.)

Seriously, what is up with the Keychain API? Or new OS X APIs required for use with Sandboxing that require use of straight C? I'm not talking about Core Foundation classes — I'm talking about some seriously messed up C.

Obviously this hits a nerve with me. C is not appreciably faster than compiled Objective-C for most uses. I trust my [sources](http://twitter.com/wilshipley/status/277920619893510144) on this.

Note: if you're doing any real time systems stuff, or processing live audio or video, using C and Accelerate can actually make a huge difference. These are situations where C is appropriate. Most situations, it's not. (There is a follow-up post forthcoming.)

## 7. Not Using Automated Tests

Alright, gang. You've made it through the last six sins, and you've more than likely been guilty of one or two along the way. Maybe there's a few of you out there that haven't committed any of these sins so far, so I'm picking the last one that _literally everyone_ is guilty of.

Do you unit test your Objective-C? No, you probably don't. Do you have automated UI acceptance tests for your UI? Nope. Do you have any kind of continuous integration set up? No, you don't.

I don't understand what is wrong with the Objective-C community that it [continuously eschews](http://5by5.tv/buildanalyze/107) any form of automated testing. It's a serious, systemic problem. I think I might know the cause.

I only recently started unit testing, and have a coworker who is exploring automated UI acceptance testing. The reason no one does it is because _it's hard_. Like, _really hard_. Why is it hard? Because no one else is doing it, so there aren't many resources and you have to figure it out on your own. So no one does it, and no one writes tutorials on it, so no one does it, etc etc. It's like an infinite loop of pain.

(Oh, and if the guys who wrote the `OCMock` header files are reading this, _wtf_? Documentation is an important part of writing code. I had to spend an entire day just figuring out what mock objects were even _for_, let alone how to use them.)

This is a serious problem with the Objective-C community. Unit testing is [totally worth it](http://www.levelofindirection.com/journal/2012/12/26/tdd-is-it-worth-it.html) and we all need to be doing better at this. A giant tip of the hat to the fellas behind [Frank](http://testingwithfrank.com) and a giant wag of the finger to Apple, who continues to disappoint us with UIAutomation.

## Conclusion

That's my list. We're all guilty of some Objective-C sins, I'm sure, but the important thing is to improve. We're at the dawn of a new year. Why not take this opportunity to reflect on why you've been so sinful and find ways to code more virtuously in the new year?

<!-- more -->
