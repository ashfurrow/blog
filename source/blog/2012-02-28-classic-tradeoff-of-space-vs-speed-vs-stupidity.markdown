---
title: "Classic Tradeoff of Space vs Speed vs Stupidity"
date: 2012-02-28 00:00
---

I'm working on a Mac App that uses a series of png files as frames in an animation. Why not an animated gif? Because they have no alpha channel. I draw the appropriate frame in drawRect: and wanted to create a "drop shadow" effect behind each image that is the image, inverted and offset by 1 pixel downwards. My initial attempt looked like the following.

[gist id=1935770]

What's wrong with this? About everything. It's _very_ CPU-intensive. About 6% of my late-model MacBook Pro. `NSImage` instances returned with `imageNamed:` are cached by the runtime, so it won't cause a bottleneck in terms of disk I/O, but the images from the CoreImage filter are not and are recomputed at every frame.

Yikes! Now, I know easily that I could render the output `CIImage` to a png and then render the shadow and main frame individually, but that's stupid. I'll never use them individually so why not just combine them into one asset?

Consider the following, where `shadowImage` is the same `CIImage` instances as output above (each frame is 20x11).

[gist id=1935760]

This saved each frame to my home directory. I ran the application and triggered the animation; after it was done one cycle, I copy and pasted the frames to replace the old ones. Now the animation is down to something like 1% of my CPU.

My initial attempt was naive, but informative. I think this is the best approach in terms of how to approach this; it may be possible to find an more elegant solution using CoreAnimation with keyframe animations of some kind, but this solution is fast, not that CPU-intensive, and good enough.

<!-- more -->
