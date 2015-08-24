---
title: "Virtues of Modern Objective-C"
date: 2013-12-31 00:00
link_to: swift
---

<p>Well, here we are again. Another New Year's Eve, another blog post list of changes to make in the new year. I thought I'd follow up <a href="http://ashfurrow.com/blog/seven-deadly-sins-of-modern-objective-c">last year's post</a> with a little more positive one about virtuous habits that we should all endeavour to integrate into our routines. </p>

<p>These are habits that anyone, whether you're a beginner or an expert, or a old-world C developer or a <a href="https://speakerdeck.com/mattt/third-wave-objective-c">third-wave Objective-C'ist</a>, can use to help themselves become a more proficient coder. </p>

<h2 id="xcodebehaviours">Xcode Behaviours</h2>

<p>Xcode behaviours are like putting your IDE on autopilot so that you can focus on writing code instead of changing the layout of your editor. Behaviours let Xcode automatically switch to a view ideal for debugging when the debugger hits a breakpoint. Or go to a view ideal for editing when a compiler error occurs. </p>

<p>It's a little overwhelming at first, since we're used to doing everything ourselves and letting go of that control is difficult. </p>

<p>Admittedly, I haven't put in the time to master this habit yet; I've continued to use keyboard shortcuts to manually change Xcode's layout depending on the context within which I'm using it.  Here's an example of me not following my own advice. That said, I'm going to make it a priority in the new year to master Xcode Behaviours. </p>

<p>You can check out <a href="http://cocoaheads.tv/taming-xcode-by-jay-thrash/">Jay Thrash's presentation</a> on Xcode Workflows for more details. I highly recommend giving it a watch.</p>

<h2 id="effectiveuseofpragmamark">Effective use of #Pragma mark -</h2>

<p><code>#pragma</code> is a C preprocessor command that can be used to <a href="http://nshipster.com/pragma/">alter the behaviour of the compiler</a>. While it's very powerful, one of the simplest uses of it is just to separate different parts of your code. </p>

<p>When used in conjunction with the quick-jump bar – ^6 for quick access – your code becomes easily navigable. </p>

<img src="/img/import/blog/virtues-of-modern-objective-c/1B00FA080CBA4A13896F817ECDBF0BAA.png" class="img-responsive" />

<p>I use <code>#pragma mark -</code>, followed by protocol names in order to divide my code. Because I have the actual name of the protocol, I can ⌘-click on that name to immediately jump to the protocol definition. I also use it to separate out my private and public methods, which helps my sanity. </p>

<p>Using <code>#pragma mark -</code> takes nearly no effort and helps you keep your code straight. It'll also help other developers learn their way around your codebase. There's really no down side to this one. </p>

<h2 id="exploration">Exploration</h2>

<blockquote>
  <p>The only constant in the world is change.</p>
  
  <p>— <a href="http://www.codinghorror.com/blog/2006/05/the-ten-commandments-of-egoless-programming.html">Jeff Atwood</a></p>

</blockquote>

<p>It's tempting to get comfortable as a developer – to rest on our laurels and stop learning. However, the world will move on, especially Objective-C. Code from even a few years ago already looks stale compared to the latest and greatest in Objective-C land. I'm not saying that you need to embrace all these improvements, but you owe it to yourself to explore and determine for yourself if these are worthwhile enhancements. </p>

<p>Are unit tests the future? ReactiveCocoa? CocoaPods? Maybe. How will you know if you haven't tried them out? </p>

<p>Always keep learning and you'll always be employable. </p>

<p>For resources on exploration, I'd recommend <a href="https://github.com/explore/subscribe">GitHub's digest emails</a> and <a href="http://iosdevweekly.com">iOS Dev Weekly</a>. They're great ways to keep your finger on the pulse of the developer community. </p>

<h2 id="opensourcecontributions">Open Source Contributions</h2>

<p>I know first hand that getting started contributing to an open source project can be difficult, and opening a project of your own is intimidating. However, it's well worth the effort. </p>

<p>There's also something really satisfying about helping others. None of us, I believe, could have gotten here by ourselves. We've all had help from mentors, stack overflow answers, and the open source community. Contributing is a great way to pay back the help that we've received so that others can benefit from what we've learnt. </p>

<p>How to get started? The easiest way is to simply start <em>using</em> open source software. Instead of writing things yourself from scratch every time, look for an existing solution. It probably won't fit your needs perfectly, so fork it and improve it. Someone else will probably find your improvements a great addition to the project.</p>

<p>You should take a look at <a href="http://cocoaheadsmtl.s3.amazonaws.com/Open-Source.pdf">Sam Vermette's presentation</a> on how and why to open source your own code. </p>

<h2 id="accessibilitytesting">Accessibility Testing</h2>

<p>iOS and OS X applications actually ship with two interfaces. The first is the interface you see and interact with in the usual way. The second is an aural interface you interact with through a series of gestures. Many applications focus solely on the first type of interface, leaving users of the secondary interface using a (potentially) broken app. </p>

<p>The crux of the argument for accessibility on iOS and OS X is simply that it takes nearly no time to do. Knowing, they say, is half the battle, but with accessibility, it's more like 90% of the battle. You just need to know what to use, and when to use it. For example, a button using an image and no text will need an accessibility label. </p>

<p>Check out <a href="http://mattgemmell.com/accessibility-for-iphone-and-ipad-apps/">Matt Gemmell's excellent post</a> on iOS accessibility for an in-depth perspective on the topic. A lengthy read, it's well worth your time. </p>

<!-- more -->

