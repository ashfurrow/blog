---
title: "Objective-C Singleton Macro"
date: 2011-04-01 00:00
---

<p>My friend <a href="http://twitter.com/#!/tapi" target="_blank">Paddy</a> showed me an awesome macro for generating single classes, shown <a href="http://pastebin.com/yfgc28dR">here</a>.
You'd use it like:</p>

<p><code>SYNTHESIZE_SINGLE_FOR_CLASS(class_name);</code></p>

<p><code>//instance methods go here!</code></p>

<p><code>@end</code></p>

<p>This is pretty sweet - if you're using the Singleton pattern a lot, and let's face it, it's always something we mean to do, this is a lifesaver since Singleton code is all copy-and-paste.</p>

<!-- more -->

