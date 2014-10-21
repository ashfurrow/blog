---
title: "Developing for iOS in a Server-Centric World"
date: 2012-12-11 00:00
---

<import><p>I came across a really interesting article about the <a href="http://jackg.org/iphone-design">surprises of designing an iPhone app</a>. It includes a lot of sage advice, but a few things <em>really</em> struck out at me. </p>

<blockquote>
  <p>In the PSD, the word “every” was bolded, which makes the phrase more intuitive. It seemed like a simple thing to implement–there must be an iOS equivalent of the <code>&lt;strong&gt;</code> tag, right? Apparently not. Eric, our CTO, spent a long while messing around with <code>NSAttributedString</code> and a couple of open-source libraries before finally giving up and using an image in the interest of time. We talked to more experienced iOS devs who confirmed that bolding a single word is indeed non-trivial.</p>
</blockquote>

<p>And this one:</p>

<blockquote>
  <p>We should have finalized our design before we began coding. We didn’t, and it created a lot of additional work. On the web, I’m used to a workflow where a backend developer can create a page’s core logic and a designer can then beautify everything. Or the designer can do their work first and the backend engineer can hook up the UI afterwards. That fluidity doesn’t exist with the iPhone. When we wanted to make UI changes late in the game, it slowed everything down.</p>
</blockquote>

<p>YES. A thousand times <em>YES</em>. </p>

<p>I work with and for developers who are used to developing server-side components. It drives me bananas when I mention something off-hand about iOS development and they look at me like I'm crazy. Or if I give out an estimate they think is ridiculous, I have to justify the time I will need to spend on such-and-such a feature. </p>

<p><em>Turns out</em>, developing iOS apps is different from developing web apps. Like, <em>hella</em> different. For any server-side readers out there, I thought I'd hit you with a few big ones:</p>

<ul>
<li>There is no CSS. Every part of a design has to be coded in Objective-C.</li>
<li>There is no flow layout (like HTML). Everything is <code>position: absolute;</code>.</li>
<li>Small "cosmetic changes" can mean <em>hours</em> or <em>days</em> for developers to complete. </li>
<li>No one unit tests in Cocoa. Like, <a href="http://blog.wilshipley.com/2005/09/unit-testing-is-teh-suck-urr.html">no one</a>. </li>
<li>Likewise, unit testing is a <em>bitch</em>.</li>
<li>No one does automated UI testing. There are some open source projects, but it's <em>far</em> from the mainstream.</li>
</ul>

<p>So, server guys, <em>please</em> stop making assumptions about how easy or difficult tasks are on iOS. iOS development is a completely different world from web apps and it has its own challenges and costs; don't shoehorn your view of software development into the constraints unique to iOS. </p></import>

<!-- more -->

