---
title: "iOS Developer Discomfort"
date: 2013-10-02 00:00
index: true
---

Over the past year or so, I've noticed some trends in the code that's developed by some of the people I respect. People I look up to – people that I know are hella smart.

The code that these people put out is often seen as esoteric. Strange even.

When I first saw some of the approaches, which I'll outline below, I was uncomfortable. Things didn't feel natural. The abstractions that I was so used to working in were useless to me in the new world.

Smart people like these don't often propose new solutions to solved problems just because it's fun. They propose new solutions when they have _better_ solutions. Let's take a look.

Here are some practices that I've noticed have made me uncomfortable, but in practice have helped me become a better developer.

# Declarative Programming

Our first example is declarative programming. I've noticed that some experienced developers tend to shy away from mutating instance state and instead rely on immutable objects.

Declarative programming abstracts _how_ computers achieve goals and instead focuses on _what_ needs to be done, instead. It's the difference between using a [for loop and an enumerate function](/blog/stop-writing-for-loops).

Objective-C is an abomination (I love it anyway). It's a message-oriented language masquerading as an object-oriented language build on top of C, an imperative language. Ugh. Needless to say, abstracting common things in Objective-C can get hairy, but it's getter easier with things like blocks and object literals.

With the extreme of declarative programming, you would declare the entire behaviour of your application at startup and just let it run until completion.

## Why I Started Using Declarative Programming

Declarative programming removes mutable state, leading to fewer runtime errors and behavioural problems. It also made my code easier to test, either with functional, integration, or unit tests (more on unit testing later). It freed me from the minutiae of how computers work, leaving that tedium up to the compiler. For most applications, the performance hit is trivial and not worthy of consideration.

## Why It Was Hard to Declarative Programming

It was hard to get into declarative programming because it stripped away everything I was used to and left me with tools I was unfamiliar with. My coding efficiency plummeted in the short term. It seemed like prematurely optimizing my code. It was uncomfortable.

However, I'd still recommend [trying it out](http://labs.teehanlax.com/project/upcoming).

## Declarative Programming Resources

I've [written](http://www.teehanlax.com/blog/reactivecocoa/) [about](http://www.teehanlax.com/blog/getting-started-with-reactivecocoa/) ReactiveCocoa, or [RAC](https://github.com/ReactiveCocoa/ReactiveCocoa), before.

If you're interested in getting started in RAC, read my articles above or check out the [NSHipster](http://nshipster.com/reactivecocoa/) entry. Also, everyone should read Rob Rix's [Postmodern Programming](https://github.com/robrix/Postmodern-Programming/blob/master/Postmodern%20Programming.md).

# Dot-Syntax Accessing

Dot-syntax is a message-passing syntax in Objective-C that turns `obj.property` into `[obj property]` under the hood. The compiler doesn't care either way, but people get in [flame](http://qualitycoding.org/dot-notation/) [wars](http://qualitycoding.org/dot-notation-wins/) over the difference.

I've seen a lot of smart people favour the dot-syntax expression for more than just properties, however. You can call any method with zero-arity (no arguments) with dot-syntax. Or you could eschew it completely.

In the middle of the spectrum, which I like, is the use of dot-syntax for [idempotent values](https://github.com/github/objective-c-conventions#expressions). That means things like `UIApplication.sharedApplication` or `array.count` but not `array.removeLastObject`.

## Why I Started Using Dot-Syntax

It's a lot harder to argue that you should use dot-syntax in all idempotent cases. The best case I've heard for it is that it doesn't require knowledge of the header file declaration of the property/method. It's just always dot-syntax.

The trend is leaning toward using dot-syntax more and more for properties. Newcomers to iOS and OS X hardly even know about the dot-syntax war. In my opinion, this doesn't matter as much as long as you're relentlessly consistent.

## Why It Was Hard to Dot-Syntax

Mostly, it was hard to adopt because I had a habit of calling methods the classical way. Like declarative programming, it's uncomfortable.

It's also hard because Xcode's autocomplete will not help you with methods like `UIColor.clearColor` when using the dot-syntax. Boo.

# Unit Testing

Apple made a big push for unit testing in Xcode 5, even if it seems half-hearted (still no mocking framework? Hello, [Kiwi](https://github.com/allending/Kiwi)). I've [talked before](/blog/objective-c-vitamins) about about the benefits of unit testing.

Unit testing is about testing the smallest unit of composable code. In order to unit test effectively, you need to write smaller chunks of code that are easier to test than larger ones.

## Why I Started Unit Testing

The value of unit testing is two-fold. First, I've got automated tests that improved my confidence when making changes to an existing codebase. Second, I have my code in smaller chunks, hopefully with more abstractions, since that's what is easier to write unit tests against. Leaner, cleaner code is definitely a benefit I don't think anyone would argue with.

## Why It Was Hard to Adopt Unit Testing

As mentioned earlier, Objective-C is a quagmire of object- and message-orientation with a dash of imperative C thrown in. It's harder to test imperative code compared to object-oriented code.

Additionally, with the Model-View-Controller paradigm on iOS, it's hard to reliably unit test anything but your models. There's little point to unit testing your view code, since it relies on UIKit (unless you feel like mocking all of UIKit out), and the view controller often bloom to be thousands of lines long. That makes it hard to suss out testable control logic from view-manipulation code. Then again, separating these from one another is kind of the point of unit testing.

# Autolayout

Autolayout has been around in iOS since iOS 6, and even longer on OS X. It's a way to declare (there's that word again) your layout's constraints and have them satisfied for you by UIKit at runtime.

It promised to be a magical land where programming layouts was easy and springs and struts (auto resizing masks) were a thing of the past. The reality was that it introduced problems of its own, and Autolayout's interface was non-intuitive for many developers.

## Why I Want to Start Using Autolayout

Full disclosure: I'm no Autolayout ninja. I've only been using it in a few personal projects, in part because how hard it is to get started. However, I see it's benefits.

Declaring your interface is preferable to managing it yourself because you have less code to maintain. Autolayout lets you express interface layouts that were just not possible using springs and struts.

## Why It Will Be Hard to Adopt Autolayout

Springs and struts are familiar, while Autolayout is new and uncomfortable. Doing simple things like vertically centring a view within its superview is difficult in Autolayout because it abstracts so much away.

It's just never seems like a good time to switch over the Autolayout. But then, it never will. I've just got to bite the bullet.

## Dot-Syntax Resources

Check out Justin Williams' [Achieving Zen with Autolayout](http://carpeaqua.com/autolayout/) page.

# Conclusion

Why do these coding practices make one uncomfortable? Certainly they're new, and change is always awkward. However, even small changes can make a big difference.

After recently working in-house with a client who prioritized a declarative programming approach in their code, I found myself exhausted. I spent the whole week fully taxed&nbsp;– never reaching [flow state](http://en.wikipedia.org/wiki/Flow_(psychology)). Soon after starting, though, I saw the value in their approach.

Change is hard. Maybe the iOS community will resist declarative programming, as has the web development community for two decades. Maybe ReactiveCocoa will stay on the fringes of Objective-C development as ReactiveExtensions has with .Net and Lisp has with web development.

Maybe not.

We're in a golden age of tools – anyone can choose any tool that suits their task best&nbsp;– and the are concrete advantages of the approaches I've listed above. It makes one consider if some slight, temporary discomfort might be worth the gains in the long run.

If you avoid something just because it's unfamiliar or it disagrees with your currently held best practices, you're doing yourself a disservice by turning down an opportunity to rid yourself of ignorance. You're going to learn something new – either that you were right all along or that you still have more to learn.

<!-- more -->
