---
title: "Don't Use UISwipeGestureRecognizer"
date: 2013-05-22 00:00
---

<import><p>Your job as an app developer is to craft a meaningful and delightful user experience. One of the best ways to accomplish this goal is to provide feedback <em>as</em> a user performs some gesture. </p>

<p>When using gesture recognizers, it is almost always far, far better to use <code>UIPanGestureRecognizer</code> than <code>UISwipeGestureRecognizer</code> because it provides callbacks <em>as the gesture takes place</em> instead of after it is said and done. </p>

<p><code>UISwipeGestureRecognizer</code> doesn't provide developers with an opportunity to provide immediate, in-progress feedback. Compared to <code>UIPanGestureRecognizer</code>, it robs you of an opportunity to <a href="http://www.youtube.com/watch?v=Fy0aCDmgnxg">make your app juicy</a>. </p></import>

<!-- more -->

