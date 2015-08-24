---
title: "Evidence for Retina Mac Displays"
date: 2012-02-27 00:00
---

<p>Speaking of evidence for Retina Mac displays, I noticed this in the <code>NSWindow.h</code> header:<!--more-->

</p>

<blockquote>

<code>backingScaleFactor</code>
Returns the backing scale factor.
<p><code>- (CGFloat)backingScaleFactor</code>
Return Value
Returns 2.0 for high resolution scaled display modes, and 1.0 for all other cases.</p>

<p>Discussion
There are some scenarios where an application that is resolution-aware may want to reason on its own about the display environment it is running in.</p>

<p>It is important to note that this number returned by this method does not represent anything concrete, such as pixel density or physical size, since it can vary based on the configured display mode. For example, the display may be in a mirrored configuration that is still high resolution scaled, resulting in pixel geometry that may not match the native resolution of the display device.</p>

<p>Note: For almost all common cases, developers should avoid using the backingScaleFactor as an input to layout or drawing calculations. Developers should instead use the backing coordinate space conversion methods instead, as the resulting code will more likely work consistently and correctly under both low and high resolution operation.</p>

</blockquote>

<p>This API was introduced recently in Lion, but sounds very similar to the <code>UIScreen scale</code> property:</p>

<blockquote>

<p><code>scale</code>
The natural scale factor associated with the screen. (read-only)</p>

<p><code>@property(nonatomic, readonly) CGFloat scale Discussion</code>
This value reflects the scale factor needed to convert from the default logical coordinate space into the device coordinate space of this screen. The default logical coordinate space is measured using points, where one point is approximately equal to 1/160th of an inch. If a device’s screen has a reasonably similar pixel density, the scale factor is typically set to 1.0 so that one point maps to one pixel. However, a screen with a significantly different pixel density may set this property to a higher value.</p>

</blockquote>

<p>I'm still very new to Mac development, but I wouldn't be surprised if this NSWindow property gets a lot more attention as WWDC approaches.</p>

<!-- more -->

