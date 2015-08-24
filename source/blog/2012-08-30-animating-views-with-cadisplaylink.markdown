---
title: "Animating Views with CADisplayLink"
date: 2012-08-30 00:00
---

<p>After <a href="http://ashfurrow.com/animating-views-with-nstimer-and-dispatchafter">yesterday's post</a> on animating views with <code>NSTimer</code> and <code>dispatch_after</code>, <a href="http://twitter.com/senior">Robin Senior</a> responded on twitter with the following question:</p>

<div align="center">

<blockquote class="twitter-tweet" data-in-reply-to="240936328655691776">

<p><a href="https://twitter.com/ashfurrow"><s>@</s><b>ashfurrow</b></a> why don't you use CADisplayLink for animating views?</p>— Robin Senior (@senior) <a href="https://twitter.com/senior/status/240990149893312512" data-datetime="2012-08-30T01:51:43+00:00">August 30, 2012</a>

</blockquote>

<script src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

</div>

<p>Good question. The answer is that I didn't know that <code>CADisplayLink</code> existed. So I did some reading up.</p>

<p><a href="http://developer.apple.com/library/ios/#documentation/QuartzCore/Reference/CADisplayLink_ClassRef/Reference/Reference.html"><code>CADisplayLink</code></a> is this delightful little class that's used to synchronize drawing of views to the refresh rate of the device's screen. Super cool!</p>

<p>The class is used prenominently in game development, where the <a href="http://www.ananseproductions.com/game-loops-on-ios/">game loop</a> needs to be synchronized to the frame refresh of a screen. Neato. I looked back at my code to see how I would implement <code>CADisplayLink</code>, and it doesn't look like it's a fit for my particular needs.</p>

<p>My code works on a series of states, represented as a C <code>enum</code>. When I set a new state, the class (a <code>UIView</code> subclass) calls <code>[self setNeedsDisplay]</code>. The code in <code>drawRect:</code> only updates to discrete states; it does not actually animate the intermediate changes along the way.</p>

<p>The actual animation is a cheat. As an example of "good enough" implementations, I just add a new animation to the view's layer:</p>

<pre><code>-(void)setState:(PXWidgetState)widgetState
{
    _widgetState = widgetState;

    [self setNeedsDisplay];

    CATransition *transition = [CATransition animation];
    transition.duration = 0.05f;
    transition.timingFunction = [CAMediaTimingFunction functionWithName:kCAMediaTimingFunctionEaseInEaseOut];
    transition.type = kCATransitionFade;
    [self.layer addAnimation:transition forKey:nil];
}
</code></pre>

<p>It's not strictly <em>the most</em> efficient way to animate changes, but it works well and the performance cost is so insignificant as to be negligible. My <code>drawRect:</code> implementation is only 27 lines of code (pretty short). Adding support for rendering these "in-between" states would likely double the lines of code and complexity.</p>

<p>Next time you animate a view between transitions, consider using <code>CADisplayLink</code>. Tip o' the hat to Rob for pointing it out.</p>

<p><strong>Update:</strong> Robin sends along <a href="http://zearfoss.wordpress.com/2011/09/02/more-cadisplaylink/">this post</a> on how to use <code>CADisplayLink</code>, written by the author of this <a href="https://github.com/pzearfoss/CircleDraw">example on GitHub</a>. Good stuff.</p>

<!-- more -->

