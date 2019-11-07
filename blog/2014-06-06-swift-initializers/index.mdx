---
title: Swift Initializers
date: 2014-06-06
---


Swift, Apple's new programming language for iOS and OS X, makes several significant departures from Objective-C. What I found to be particularly interesting are the new semantics surrounding object lifecycles. Here are the key points:

- Formalizing convenience and designated initializers.
- Formalizing sequence of operations for initializers.
- Enforcing language-level, compile-time enforcement of these new semantics.

I'm going to cover each of these in depth, with examples. Let's dive in!

## Initializers In-Depth

In Objective-C, things are pretty loosey-goosey when it comes to how you construct your initializers. For instance, you _could_ call `super`, or not, or call init on an entirely different class. You can set up ivars and properties before you init, even though you're not supposed to, and while you're actually not supposed to access methods or properties inside any init method, everybody does. It's really the wild west.

That's not the case in Swift. Swift has a very clear, specific sequence of operations that are done in initializers. Let's start with some basic examples are work our way up to a general case.

Let's take an object A. We'll define it as follows.

```swift
class A {
    var x: Int
    init(x: Int) {
        self.x = x
    }
}
```

Notice that A does _not_ have a superclass, so it cannot call a `super.init()` function as it does not exist.

OK, so now let's subclass A with a new class named B.

```swift
class B: A {
    var y: Int
    init(x: Int, y: Int) {
        self.y = y
        super.init(x: x)
    }
}
```

This is a departure from Objective-C where `[super init]` would typically be called _first_ before anything else. Not so in Swift. You are responsible for ensuring that _your_ instance variables are in a consistent state before you do _anything else_, including calling methods (which includes your superclass' initializer). Neato.

But there's one more hitch. Say that we want to make sure that `x` is always set to a value computed by a method in our class? We can't call a method on B until we call super's init. We'd actually write something like this.

```swift
class B: A {
    var y: Int
    init(x: Int, y: Int) {
        self.y = y
        super.init(x: x)
        self.x = self.generate()
    }

    func generate() -> Int {
        /* return some value */
    }
}
```

That's right. If you want to access a superclass' property,you _must_ do so _after_ calling `super.init()` in order to give the superclass a chance to set them first.

In general, a Swift object initializer looks like the following:

```swift
init(/*parameters*/) {
    // set own properties, if necessary
    // call super.init()
    // set superclass' properties, if necessary
}
```

## Convenience and Designated Initializers

Swift formalizes the common Objective-C pattern of designated initializers into something checked at compile-time. This is actually really, really cool. Let's take a look at a new class hierarchy.

```swift
class A {
    var x: Int
    convenience init() {
        self.init(x: 0)
    }
    init(x: Int) {
        self.x = x
    }
}
```

`init(x: Int)` is the designated initializer for this class and all other initializers in A _must_ have the `convenience`. Convenience initializers can call other convenience initializers, or the designated initializer.

Let's take a look at a subclass. This is where things get interesting.

```swift
class B: A {
    var y: Int
    convenience init() {
        self.init(y: 0)
    }
    convenience init(y: Int) {
        self.init(x: 0, y: y)
    }
    init(x: Int, y: Int) {
        self.y = y
        super.init(x: x)
    }
}
```

Convenience initializers in a subclass may _only_ call other initializers in _their own class_. Only the designated initializer may call an initializer on the superclass.

## Missing Objective-C-Style Semantics

Swift departs from Objective-C initializers. Consider the old style initializer.

```objc
-(instancetype)init {
    self = [super init];
    if (self) {
        // setup
    }
    return self;
}
```

There are a few distinctive parts to a classic Objective-C initializer. First, you need to assign `self` to something, either your superclass' initializer or another initializer on `self`. Then we check if the reference to `self` is valid (maybe the initializer that _we_ called returned `nil`). We do some setup, then we must return `self`.

In contrast, Swift initializers are very straightforward. Initializers don't return `self`, so you don't need to return `self`. Cool! However, this has a implication. In Objective-C, if initialization fails, we can return `nil` in order to indicate that failure. Since Swift initializers don't return a reference to `self`, this approach is not possible.

I spoke with an Apple engineer at the Swift Lab at WWDC and asked about the pattern. He indicated that this was not currently possible. Instead, we should use factory methods that return an _optional_ type. (**Update**: see the [note](#update) at the end of this post.)

```swift
class A {
    class func anything() -> A? {
        return A()
    }
}
```

He indicated that they're working on building something into the language, since initializers are the preferred way to create instances (as opposed to factory class methods). For now, this works well if you need this kind of failing initializer pattern.

Neat! Swift has really embraced the conventions that Cocoa and CocoaTouch developers already know and incorporated them into the language-level with compile-time checks.

---

### Update

Swift 1.1 introduced the concept of [_failable initializers_](https://developer.apple.com/swift/blog/?id=17): `init` methods that return an optional. These can be specified by placing a `?` after the `init` keyword.

```swift
class Image {
    init?(filename: String) {
        ...
    }
}
```

Inside the `init?`, you can `return nil` to define a failing initialization, or assign `self = whatever` to indicate success. 

Be careful about calling through to a failable initializer inside of a regular one – a non-failing initializer _must not fail_. The compiler will force you either to force-unwrap the call to `super.init()` or to change your initializer to _also_ be failable. Neat!

  