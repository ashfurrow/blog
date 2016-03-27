---
title: "Animating Views with CADisplayLink"
date: 2012-08-30 00:00
---

After [yesterday's post](/animating-views-with-nstimer-and-dispatchafter) on animating views with `NSTimer` and `dispatch_after`, [Robin Senior](http://twitter.com/senior) responded on twitter with the following question:

<blockquote class="twitter-tweet" data-in-reply-to="240936328655691776">
	<p><a href="https://twitter.com/ashfurrow"><s>@</s><b>ashfurrow</b></a> why don't you use CADisplayLink for animating views?</p>— Robin Senior (@senior) <a href="https://twitter.com/senior/status/240990149893312512" data-datetime="2012-08-30T01:51:43+00:00">August 30, 2012</a>
</blockquote>
<script src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Good question. The answer is that I didn't know that `CADisplayLink` existed. So I did some reading up.

[`CADisplayLink`](http://developer.apple.com/library/ios/#documentation/QuartzCore/Reference/CADisplayLink_ClassRef/Reference/Reference.html) is this delightful little class that's used to synchronize drawing of views to the refresh rate of the device's screen. Super cool!

The class is used prenominently in game development, where the [game loop](http://www.ananseproductions.com/game-loops-on-ios/) needs to be synchronized to the frame refresh of a screen. Neato. I looked back at my code to see how I would implement `CADisplayLink`, and it doesn't look like it's a fit for my particular needs.

My code works on a series of states, represented as a C `enum`. When I set a new state, the class (a `UIView` subclass) calls `[self setNeedsDisplay]`. The code in `drawRect:` only updates to discrete states; it does not actually animate the intermediate changes along the way.

The actual animation is a cheat. As an example of "good enough" implementations, I just add a new animation to the view's layer:

```
-(void)setState:(PXWidgetState)widgetState
{
    _widgetState = widgetState;

    [self setNeedsDisplay];

    CATransition *transition = [CATransition animation];
    transition.duration = 0.05f;
    transition.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];
    transition.type = kCATransitionFade;
    [self.layer addAnimation:transition forKey:nil];
}
```

It's not strictly _the most_ efficient way to animate changes, but it works well and the performance cost is so insignificant as to be negligible. My `drawRect:` implementation is only 27 lines of code (pretty short). Adding support for rendering these "in-between" states would likely double the lines of code and complexity.

Next time you animate a view between transitions, consider using `CADisplayLink`. Tip o' the hat to Rob for pointing it out.

**Update:** Robin sends along [this post](http://zearfoss.wordpress.com/2011/09/02/more-cadisplaylink/) on how to use `CADisplayLink`, written by the author of this [example on GitHub](https://github.com/pzearfoss/CircleDraw). Good stuff.

<!-- more -->
