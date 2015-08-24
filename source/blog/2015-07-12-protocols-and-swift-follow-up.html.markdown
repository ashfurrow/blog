---
title: Protocols and Swift Follow-up
date: 2015-07-12 22:51:11 UTC
link_to: swift
---

Earlier this year, I wrote a [GIF-laden and rambling post about protocols in Swift](http://ashfurrow.com/blog/protocols-and-swift/). It described a new approach to using Swift protocols in a more idiomatic way than just using Objective-C techniques.

Well, Swift 2 has been in beta for a month now, and protocols are hot stuff. 

<!-- more -->

![Captain Picard loves Swift 2 protocols](/img/blog/protocols-and-swift-follow-up/picard.gif)

[Soroush Khanlou](http://www.twitter.com/khanlou) has written a [great post exploring protocols in Swift 2](http://khanlou.com/2015/06/protocol-oriented-networking/) that I'd highly recommend checking out. It explores a case for doing networking through protocol extensions. As the creator of a [hip and cool networking library](https://github.com/ashfurrow/Moya), it's an approach that I had not considered, and need to reflect on. I've always assumed Moya would be used with enums, but with Swift 2, it makes sense to reevaluate that assumption. 

This brings up an important point that I've been yelling at you people for a year now: solving problems using Swift _is not_ the same as solving the same problems using Objective-C. 

<div class="embed-responsive embed-responsive-16by9">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/LtrzZb5Jw0g" frameborder="0" allowfullscreen class="embed-responsive-item"></iframe>

</div>

If all you're doing in Swift is writing Objective-C with Swift syntax, stop and reflect on your choices. Swift _isn't_ Objective-C – and thank god. The community has been dutifully exploring new ways to solve familiar problems – it's an exciting time! 

![Go explore!](/img/blog/protocols-and-swift-follow-up/best_captain.gif)

We're explorers charting deep space. Sure, it's space that the Haskell and Ruby developers navigated years ago – hey, maybe we should ask them for directions?
