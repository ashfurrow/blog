---
title: "Core Data Duplicate Relations"
date: 2014-02-06 00:00
---

<import><p>I tweeted yesterday that I was having a problem with Core Data. A pretty serious problem. I have two entities, A and B, and A has a to-many relationship with B. Ever since I implemented a <a href="http://www.teehanlax.com/blog/krush-ios-architecture/">background managed object context</a>, We've been seeing very intermittent bugs with duplicate entries in the A-&gt;B relationship. </p>

<p>What does that mean? </p>

<p>Well, it means that an instance of A, called a, has a set of instances of B. That set would have <em>duplicates</em>, and when I say "duplicate", I mean the same god damned object. Same pointer. Same managed object ID. Same. Object. </p>

<p>In the UI, I turn the set into an array, which allows duplicate entries. </p>

<p>How is that even possible? Sets are supposed to disallow duplicates, but I had them. </p>

<p>I wasn't overriding <code>hash</code> or <code>isEqual</code> on B, so it was definitely a Core Data issue. Finally, after digging around for an hour or two, I found the problem. </p>

<p>One of the models, an ancillary one to A and B, was depending on the fact that it would be configured from the main thread. It would access a shared instance of A (the logged in user) and make a relationship to an instance of B. When performed on the background thread, that instance of B belonged to the background context. I don't know how the pointers became the same, but somehow Core Data was inferring something and making magic changes for me (I was using the generated accessors). </p>

<p>The lesson here is complicated. First, your models should <em>never</em> rely on being configured on a specific thread. Ever. Second, migrating from a single-context to multi-context Core Data stack is hard; it's better if you architect something mutli-context from the get-go, or use something like <a href="https://github.com/magicalpanda/MagicalRecord">MagicalRecord</a> to do it for you. Finally, even experienced Core Data practioners can make beginner mistakes. Always test your assumptions. </p></import>

<!-- more -->

