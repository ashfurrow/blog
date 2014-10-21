---
title: "VoiceOver Crashes my App"
date: 2013-01-26 00:00
---

<import><p>I'm working on a small app and I loaded it into my iPhone to perform my due diligence with VoiceOver testing. It was there I discovered that my app actually crashes!</p>

<p>Only when using VoiceOver.</p>

<p>Hmm. Shit. </p>

<p>Turns out it's only when using <code>UITableView</code>'s sexy new <code>dequeueReusableCellWithIdentifier:forIndexPath:</code> with pre-registered classes. Somehow, VoiceOver is interfering with this process and calling this method will crash your app when VoiceOver is turned on.</p>

<p>For the mean time, avoid the new table view methods. Fall back to the old "try to dequeue, create if nil" approach. </p>

<p>Golf clap, Apple. Golf. Clap.</p></import>

<!-- more -->

