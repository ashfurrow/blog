---
title: NSRect in iOS?
date: 2012-08-21
---


So, Cocoa and Cocoa Touch are cousins and share a lot of the same underpinnings. You'll see the same type of C struct used for view geometry (a point with x and y, and a size with width and height). On iOS, this is CGRect and on OS X, this is NSRect. Same struct, different name.

Imagine my surprise when I saw NSRect on iOS:

```
{% raw %}
(lldb) po [imageViews valueForKey:@"frame"]
(id) $1 = 0x004d0100 <__NSArrayI 0x4d0100>(
NSRect: {{0, 0}, {220, 220}},
NSRect: {{230, 0}, {220, 220}},
NSRect: {{460, 0}, {220, 220}},
NSRect: {{0, 230}, {220, 220}},
NSRect: {{230, 230}, {220, 220}},
NSRect: {{460, 230}, {220, 220}},
NSRect: {{0, 460}, {220, 220}},
NSRect: {{230, 460}, {220, 220}},
NSRect: {{460, 460}, {220, 220}},
NSRect: {{0, 690}, {220, 220}},
NSRect: {{230, 690}, {220, 220}},
NSRect: {{460, 690}, {220, 220}}
)
{% endraw %}
```

This prints out all of the frames in the imageViews array, but they're all NSRects! What's going on?

Well, valueForKey: has to return an Objective-C object. But the array its returning has to contain CGRect structs, which Objective-C arrays can't hold (they can only hold objects, not structs or primitives). So the framework is using a wrapper called [NSValue](https://developer.apple.com/library/ios/#documentation/Cocoa/Reference/Foundation/Classes/nsvalue_Class/Reference/Reference.html).

NSValue is this crazy wrapper for, well, values. It's heavily used in OS X development because its awesome, but had its balls chopped off on iOS. I had never used it, but Paddy showed them to me.

On iOS, the NSValue methods or wrapping rects are stored in a category on NSValue, decalred in UIGeometry.h. On OS X, they're methods in the class definition itself and even have a spot in the documentation (iOS documentation makes no reference to these methods).

What's more interesting is that the iOS methods are called things like "valueWithCGRect:" and the OS X methods are the likes of "valueWithRect:". It's probably a trick by Apple to get the compiler to not complain, but it is very curious why they chose to segregate the methods into a hard-to-find section of a related header file on iOS.


  