---
title: "Developing for iOS in a Server-Centric World"
date: 2012-12-11 00:00
index: true
---

I came across a really interesting article about the [surprises of designing an iPhone app](http://jackg.org/iphone-design). It includes a lot of sage advice, but a few things _really_ struck out at me.

> In the PSD, the word “every” was bolded, which makes the phrase more intuitive. It seemed like a simple thing to implement–there must be an iOS equivalent of the `<strong>` tag, right? Apparently not. Eric, our CTO, spent a long while messing around with `NSAttributedString` and a couple of open-source libraries before finally giving up and using an image in the interest of time. We talked to more experienced iOS devs who confirmed that bolding a single word is indeed non-trivial.

And this one:

> We should have finalized our design before we began coding. We didn’t, and it created a lot of additional work. On the web, I’m used to a workflow where a backend developer can create a page’s core logic and a designer can then beautify everything. Or the designer can do their work first and the backend engineer can hook up the UI afterwards. That fluidity doesn’t exist with the iPhone. When we wanted to make UI changes late in the game, it slowed everything down.

YES. A thousand times _YES_.

I work with and for developers who are used to developing server-side components. It drives me bananas when I mention something off-hand about iOS development and they look at me like I'm crazy. Or if I give out an estimate they think is ridiculous, I have to justify the time I will need to spend on such-and-such a feature.

_Turns out_, developing iOS apps is different from developing web apps. Like, _hella_ different. For any server-side readers out there, I thought I'd hit you with a few big ones:

- There is no CSS. Every part of a design has to be coded in Objective-C.
- There is no flow layout (like HTML). Everything is `position: absolute;`.
- Small "cosmetic changes" can mean _hours_ or _days_ for developers to complete. 
- No one unit tests in Cocoa. Like, [no one](http://blog.wilshipley.com/2005/09/unit-testing-is-teh-suck-urr.html). 
- Likewise, unit testing is a _bitch_.
- No one does automated UI testing. There are some open source projects, but it's _far_ from the mainstream.

So, server guys, _please_ stop making assumptions about how easy or difficult tasks are on iOS. iOS development is a completely different world from web apps and it has its own challenges and costs; don't shoehorn your view of software development into the constraints unique to iOS.

<!-- more -->
