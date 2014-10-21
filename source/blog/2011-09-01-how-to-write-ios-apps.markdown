---
title: "How to Write iOS Apps"
date: 2011-09-01 00:00
---

<import><p>Well, how to write good ones, anyways.
This article describes how <em>programmers</em> can make good iOS apps. It kind of assumes they can design them, too. However, I recently realized two things:</p>
<ul>
<li>Developers, even good ones, aren't necessarily good at design. In fact, most developers kind of probably suck at it. Get help from a friend.</li>
<li>
<em>Reading</em> the <a href="http://developer.apple.com/library/ios/#documentation/userexperience/conceptual/mobilehig/IconsImages/IconsImages.html" target="_blank">HIG</a> shouldn't be confused with <em>understanding</em> the HIG. Anyone can read 90 pages of dense Applese but that doesn't mean a thing unless you understand <em>why</em> they made the recommendations they did.</li>
</ul>
<p>Why should you listen to me? Well, I'm no expert in writing iOS apps. No, wait. Yes I am. I taught a course at my university on the topic. Let's carry on, then.<!--more--></p>
<h3>Objective-C</h3>
<p>You need to learn Objective-C. Go mess with MonoTouch or whatever if you want. Then go grab a fruit roll-up, think about what you did, and realize you should have just learned Objective-C. You can watch free lessons on iTunes U from <a href="http://itunes.apple.com/us/podcast/cs193p-student-final-projects/id395605774?i=90218598" target="_blank">Stanford</a>. If you're new to iOS apps and Objective-C and are serious, drop $100 to get a <a href="http://developer.apple.com/programs/which-program/" target="_blank">dev license</a> and download Xcode 4.2 and never look back. Seriously, it'll be worth it not to learn about manual memory management.</p>
<p>By the way, you better love Model-View-Controller. I mean <em>love</em> it like you want to marry it and raise a whole family of models, views, and controllers with it. If you don't like to use it, go back to C. We're <em>civilized</em> here..</p>
<p>The next step is to try to write an app. Anything you want - but remember this is only an <em>attempt</em>. You don't want your first attempt to become something you <a href="http://ashfurrow.com/index.php/projects/coffeetimer/">have to maintain years later</a>.</p>
<h3>UIKit</h3>
<p>You think because you know Objective-C you know how to write a real app? Sit your ass back down because you've got to master UIKit first. I mean <em>master it</em>. It's not a terribly hard or overly complex framework, but it's something you have to know inside and out. If you don't completely understand the lifecycle of a UIView instance, learn.</p>
<p>Seriously.</p>
<p>This will bite you in the ass every time. I've seen smart developers invent their own frameworks because they never bothered to learn UIKit and <em>my god</em> they were awful at it. You should be able to stand at a whiteboard and trace out the hierarchy of a keywindow for navigation-based, tab bar-based, and view-based apps, as well as describe the view lifecycle. You should know why adding a subview doesn't mean its controller's viewDidAppear: method ever gets called. You should know what awakeFromNib is and when it's appropriate to use. And so on.</p>
<h3>App Domain-Specific Frameworks and API Calls</h3>
<p>You can use UIKit to make your apps look nice. But it takes some domain-specific frameworks like MapKit, CoreLocation, and CoreData to make your apps useful.</p>
<p>The frameworks you decide to learn depend on the kind of app you want to make. I wrote a app for the last New Brunswick provincial election that displayed stuff on a map so I learned MapKit. There are programming guides, tutorials, and code samples available from Apple for about every framework they have. That's a good place to start.</p>
<p>API calls can be done dozens of different ways. I can't tell you which way is best for your app. You just have to try to write data-retrieval methods from your CoreData store or Web API with (somewhat paradoxically) too few <em>and</em> too many layers of abstraction and learn how <em>not</em> to do it in order to learn how to do it the right way for you.</p>
<h3>CoreGraphics &amp; CoreAnimation</h3>
<p>If you're not #importing &lt;QuartzCore/QuartzCore.h&gt; in your precompiled header file yet, your apps probably look fine. But they probably look like <em>every other app</em>, too. Also, if you don't know what a pch file is, google it. It's important.</p>
<p>If you want to make your shiny app intuitive and easy to use, you need CoreGraphics and CoreAnimation. If you <em>don't</em> want to make your apps intuitive and easy to use, I hear OpenOffice is looking for some Java developers.</p>
<p>CG/CA isn't <em>that</em> hard to learn. Basically, your UIKit stuff is rendered by this layer, which is in turn rendered by OpenGL, which we don't care about because we don't hate ourselves. Basically all you need to know need to know about the CALayer, CAGradientLayer, and CAAnimation classes and CG types, like CGRect/Point, where to use them, and where <em>not</em> to use them. Oh, and some CoreOS memory management stuff.</p>
<p>Gosh.</p>
<p>OK, fine, CG/CA is kind of hard. But it is <em>so worth it</em>.</p>
<p>You need to be aware of a few things. Foremost is that, while you're developing on your shiny new iPhone 4 or iPad 2, your poor users might still be stuck on an iPhone 3G. And that sucks. But you can make a <a href="http://twitter.com/#!/tapi/status/109334914628984832" target="_blank">really good app</a> that works well for them, too.</p>
<p>Doing things like turning off a CALayer's opaque or masksToBounds properties makes your app slower. Like, <em>way slower, brah</em>. Only do it if you have a really good reason to. There are some awesome effects that you can achieve really easily with CG/CA, but you need to be aware of when it hurts performance.</p>
<h3>Testing</h3>
<p><a href="http://27.media.tumblr.com/tumblr_loy7vaGhOH1qci335o1_500.jpg" target="_blank">Testing sucks</a>. You could take the easy path and let your (paying) users test your app for you in the wild, but your ratings are going to suck. More importantly, you'll be an awful person.</p>
<p>At least <em>try</em> to test your app. Give it to someone and see how they use it. Not someone who's used it before, someone new to it. Observe when/where they get frustrated or confused and fix those parts of your app.</p>
<p>That's it! If anyone has any suggestions, please leave them in the comments!</p></import>

<!-- more -->

