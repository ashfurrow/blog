---
title: Unnecessary Code Indentation
date: 2011-05-17
---


If you know me or read my blog or follow me on twitter, you'll know that I have ... particularities. I like things a certain way and, while I don't believe in forcing my way of doing things onto others, when I do things, I do them&nbsp;conscientiously. Since first year when a sage [upper year student](https://twitter.com/#!/njdoyle) showed me how to avoid unnecessary indentation in my code, it's something I've tried to do. I won't correct existing code since it doesn't improve performance, but I structure my code to avoid superfluous tabstops. Following [Apple's example](http://developer.apple.com/library/ios/#documentation/Cocoa/Conceptual/ObjectiveC/Chapters/ocAllocInit.html), we write a custom initializer of an Objective-C object like the following:

```
- (id)init {
  self = [super init];
  if (self) {
    creationDate = [[NSDate alloc] init];
  }
  return self;
}
```

You'll notice that the if statement is only checking that self is non-nil. Why not do the following?

```
- (id)init {
  self = [super init];
  if (!self) return nil;
  creationDate = [[NSDate alloc] init];
  return self;
}
```

If we're nil, let's bail early so we don't accidentally add code after our if block that could operate on a nil self.

Better yet:

```
- (id)init {
  if (!(self = [super init])) return nil;
  creationDate = [[NSDate alloc] init];
  return self;
}
```

Brackets are around the assignment to avoid a compiler warning on Xcode 4's LLVM compiler; GCC doesn't complain.

Again, this is a particularity of mine and I don't care enough to change existing code, but I care enough to blog about it. Does anyone have any thoughts on this method of writing initializers or indenting in general?


  