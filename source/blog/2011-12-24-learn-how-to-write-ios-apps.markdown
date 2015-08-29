---
title: "Learn How to Write iOS Apps"
date: 2011-12-24 00:00
---

My friend contacted me on twitter and asked for advice on different sources on how to learn iOS apps. Since this paragraph will already exceed 140 characters, I'm posting here, instead. (Obviously, reading this blog regularly is a great way to [pick up some iOS development tricks](http://ashfurrow.com/2011/09/how-to-write-ios-apps/))

To get started, some people buy a book or find some good online tutorials. I tried both approaches, and the online tutorials were definitely better. I found [Stanford's class on iPhone Development](http://www.stanford.edu/class/cs193p/cgi-bin/drupal/), available [for free on iTunesU](http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewPodcast?id=473757255), to be a great place to start. However, watching lectures is time-consuming and, frankly, boring. If I was going to learn now, here is the approach I'd take.<!--more-->

I'd use a top-down/bottom-up strategy to learn both the implementation details of writing Objective-C/CocoaTouch while also getting a handle on the high-level aspects of the platform. Learning them both would make it more obvious how they fit together.

You need to know some high-level stuff, particularly application lifecycle. Apple's documentation, listed below, is a good place to start. If you want to write iOS apps, you're probably already an iOS user, so you're familiar with user conventions. Reading the HIG is still a good idea. It's not long - 90 pages with lots of pictures.

Resources for getting started:

<dl>

<dt><a href="http://developer.apple.com/library/ios/#referencelibrary/GettingStarted/GS_iPhoneGeneral/_index.html" target="_blank">Apple's iOS Starting Point </a></dt>

<dd>A great list of other Apple resources that step you through what tools you need, building your first "Hello World" app, and a primer in Objective-C. </dd>

<dt><a href="http://developer.apple.com/library/IOs/#documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40007072-CH1-SW1" target="_blank">Apple's iOS App Programming Guide</a></dt>

<dd>Very detailed list of high-level concepts in iOS. This is a good resources for finding out the capabilities and limitations of the platform; check this for how to use push notifications, for example.</dd>

<dt><a href="http://amzn.to/uHUaRU" target="_blank"><em>Programming iOS 4</em> by Matt Neuburg</a></dt>

<dd>This book is recommended by just about everyone that recommends books on iOS apps, but I admittedly haven't read it. It's apparently amazing and a great book to buy if reading books is how you learn things.</dd>

<dt><a href="http://amzn.to/sUQrti" target="_blank">iOS Recipes</a></dt>

<dd>Once you get a handle on the basics, you'll want to make our apps look unique. This <a href="http://pragprog.com/" target="_blank">Pragmatic Bookshelf</a> book offers discussions on how to do things like stylizing splash screen transitions, animating views for better user experience, creating custom alert/notification views, and more.</dd>

<dt>Mike Rundel's "<a href="http://designthencode.com/scratch/" target="_blank">Building iOS Apps from Scratch</a>"</dt>

<dd>Mike Rundel linked to this in the <a href="http://news.ycombinator.com/item?id=3389528" target="_blank">comments on Hackers News</a>. It's a fantastic, single-document guide that covers basic Objective-C, CocoaTouch, and app architecture. I wish I had read this when I was starting.</dd>

</dl>

I find that following certain blogs or just looking through archives to be really helpful. Objective-C isn't just another language; it has a set of conventions that work very differently from standard C, Java, or .Net code. Immersing yourself in these blogs is a great way to become familiar with the language and the runtime.

<dl>

<dt><a href="http://mikeash.com/pyblog/" target="_blank">NSBlog by Mike Ash</a></dt>

<dd>This is an Intense (capital 'I') look at the Objective-C language and accompanying runtime. It plays with a lot of fire that you probably want to avoid in production code, but it also has some insightful, low-level reviews of concepts like <a href="http://mikeash.com/pyblog/friday-qa-2011-09-30-automatic-reference-counting.html" target="_blank">Automatic Reference Counting</a> and <a href="http://mikeash.com/pyblog/friday-qa-2011-10-14-whats-new-in-gcd.html" target="_blank">Grand Central Dispatch</a>. He even looks at how you might implement some of these language/runtime features yourself (though you shouldn't).</dd>

<dt><a href="http://www.cimgf.com/" target="_blank">Cocoa is My Girlfriend</a></dt>

<dd>This is like a "how to do things" look at iOS development. Apple's official documentation is sometimes opaque and hard to understand; CIMGF takes that documentation, explains the reasoning behind it, and does a good job of showing you how to use that knowledge in practice. </dd>

<dt><a href="http://cocoawithlove.com/" target="_blank">Cocoa with Love</a></dt>

<dd>This is a kind of "best practices" website that takes a topic, say Core Data, and looks at how to develop consistent, efficient code to work with persistent stores. It goes beyond "following the rules" to show you great conventions you should be adhering to in your own code. It's a great resources and, whenever I'm googling for something, finding a Cocoa with Love article is usually the end of my search.</dd>

</dl>

That's about all I can say - I learn best by trying, identifying a problem or shortcoming in my understanding, and then fixing it. Hopefully you'll be on your way in no time. If anyone ever has a question or comment, please feel free to [contact me via twitter](http://twitter.com/#!/ashfurrow).

<!-- more -->
