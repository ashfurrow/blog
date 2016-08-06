---
title: "Don't Use UISwipeGestureRecognizer"
date: 2013-05-22 00:00
index: true
---

Your job as an app developer is to craft a meaningful and delightful user experience. One of the best ways to accomplish this goal is to provide feedback _as_ a user performs some gesture.

When using gesture recognizers, it is almost always far, far better to use `UIPanGestureRecognizer` than `UISwipeGestureRecognizer` because it provides callbacks _as the gesture takes place_ instead of after it is said and done.

`UISwipeGestureRecognizer` doesn't provide developers with an opportunity to provide immediate, in-progress feedback. Compared to `UIPanGestureRecognizer`, it robs you of an opportunity to [make your app juicy](http://www.youtube.com/watch?v=Fy0aCDmgnxg).

<!-- more -->
