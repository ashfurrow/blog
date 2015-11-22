---
title: "Structuring Modern Objective-C"
date: 2014-01-20 00:00
link_to: swift
---

When learning a new skill, like a programming language, we often just mash together whatever works in order to get it running. Later, we'll return to these habits and re-evaluate, adopting best practices from the community and making better, more well-structured code.

Lately, the Objective-C language has received a plethora of new features, but the community's best practices hasn't consistently stayed up to date. This goes beyond just "style" and into "structure".

Lately, I've taken a critical look at my own coding practices to evaluate where I can do better, so I thought I'd share my findings with you.

Welcome to modern Objective-C.

## Accessing Instance Variables

Instance variables. Where to begin. Basically, instance variables are bad. If you're currently doing this:

```
@interface MyClass : NSObject {
    BOOL someVariable;
}

@end
```

Stop. Right now.

Don't declare instance variables and _please_ don't declare them in headers. Instead, you should be declaring them as _properties_, and then _accessing_ them through message-passing or dot syntax.

I've [covered before](https://ashfurrow.com/blog/objcmsgsend-is-not-your-bottleneck) how accessing properties through instance variables doesn't give you any discernible benefits. In fact, accessing them through getters/setters has a few advantages.

- Consistency: you no longer have to guess if a getter/setter's side-effects, if any, are going to be invoked because they always will be.
- Debugging: you're able to easily set breakpoints on getters/setters instead of making watchpoints on instance variable addresses at runtime.

Really, there is no reason to declare instance variables or access those variables backing properties directly, except in an overridden getter/setter itself, and the [initializer/dealloc method](https://github.com/NYTimes/objective-c-style-guide/issues/6), depending on how defensive you want to be (Thanks to [Bryan](https://twitter.com/irace) for the link). Except habit, which you should break, as I did.

_Update_: I found a link to an [official document](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/MemoryMgmt/Articles/mmPractical.html#//apple_ref/doc/uid/TP40004447-SW6) suggestion that you should _not_ use setters/getters in dealloc. The more you know.

What about readonly properties? Don't you need to access the instance variable because the setter doesn't exist? Good question. That leads me to my next point.

## Use Read-only Properties in Headers

Read-only properties are great for exposing properties or components in your public interface, but how does one set their value without accessing the instance variable directly? The answer is to define a private class extension in your .m file.

In your header, you'd declare the following.

```
@interface MyClass : NSObject

@property (nonatomic, readonly) Type propertyName;

@end
```

Then, in your implementation file, _above_ the implementation itself, declare the following:

```
@interface MyClass ()

// Private Access
@property (nonatomic, strong, readwrite) Type propertyName;

@end
```

You've just defined a _public_ getter but a _private_ setter. Congrats! Now you no longer need to access the instance variable.

Schwa adds one more suggestion:

> [@ashfurrow](https://twitter.com/ashfurrow) re: “Use Read-only Properties in Headers”. I’d also add do not expose mutable objects in headers too. Good article btw.
> 
> — Jonathan Wight (@schwa) [January 24, 2014](https://twitter.com/schwa/statuses/426760500056047616)<script async="" src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
## Properly Define `BOOL` properties

It's always been a good idea to follow [Apple's Guidelines](https://developer.apple.com/library/ios/documentation/Cocoa/Conceptual/CodingGuidelines/Articles/NamingMethods.html#//apple_ref/doc/uid/20001282-1004202-BCIGGFCC) when declaring properties. But I admit I haven't always been diligent. Remember that when declaring `BOOL` properties to define a custom getter.

```
@property (nonatomic, assign, getter = isSomething) BOOL something;
```

## Don't `#import` in Header Files Unnecessarily

I see this a lot in code written by Objective-C newcomers. Basically, the crux of it is that most `#import` statements should only be written in `.m` files, not `.h` headers.

Consider the following example.

```
#import "MyOtherClass.h"

@interface MyClass : NSObject

@property (nonatomic, strong) MyOtherClass property;

@end
```

You can re-write this to be the following, then `#import` the `MyOtherClass.h` header in your `MyClass.m` implementation file.

```
@class MyOtherClass;

@interface MyClass : NSObject

@property (nonatomic, strong) MyOtherClass property;

@end
```

The `@class MyOtherClass` is a _forward class declaration_.

The [benefits](http://qualitycoding.org/file-dependencies/) are numerous. Forward class declarations in lieu of `#import`ing headers will lead to faster compile times, will avoid circular `#import` statements, and will keep your headers lightweight, the way they were meant to be.

The one real exception is when subclassing another custom class, you'll need to `#import` its header.

Now, let's talk about the elephant in the room. You _do not_ need to `#import` either Foundation or UIKit headers in your header, almost ever. That's right – the template classes that Apple includes in Xcode are _wrong_.

I first picked this tip up from [Mike Lee](https://github.com/lemurs/guide2/blob/master/ObjCStyle.md). Take a read on his style guide. It's great.

If we take a look in the precompiled header (named `AppName-Prefix.pch`), what will be find?

```
#import <UIKit/UIKit.h>
#import <Foundation/Foundation.h>
```

A-ha! They're already _de facto_ `#import`ed by default, anyway, so there is no need to `#import` them a second time.

Unless you're writing a framework or other third-party component, most `#import`s in header files are just unnecessary.

_Update_: Steve Streza points out that the precompiled header really isn't [meant](http://clang.llvm.org/docs/PCHInternals.html) to be used like this. I'm not sure I completely agree, but wanted to let you all make an informed decision.

> [@ashfurrow](https://twitter.com/ashfurrow) pch files are optimizations. Projects should build without them. So leave Foundation import in if your code depends on them.
> 
> — Derpy Streza (@SteveStreza) [January 21, 2014](https://twitter.com/SteveStreza/statuses/425430707419103232)<script async="" src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
## Grouping `#import` statements

Here's one we've all done from time-to-time. How often have you written a (probably) long implementation file only to have ten or twenty randomly-ordered `#import` statements at the top of your file? Tsk-tsk-tsk. That's ok! We're here to help.

Whether or not the order of the `#import`s matter is up for debate, so I won't touch on that. What matters is that you _group_ them. And _comment_ those groups.

```
// Frameworks
#import <QuartzCore data-preserve-html-node="true"/QuartzCore.h>

// Views
#import "ASHButton.h"
#import "ASHUserView.h"

// View Controllers
#import "ASHOtherViewController.h"
#import "ASHThisViewController.h"
```

Don't wait until it's already a mess to fix it – start right away! Then, adding them later is a breeze and it keeps your code clean.

## Don't use `#define` for Constants

Here's one I expect to get some blowback on. The thing with constants is that they're, well, _constant_. Constant in name and constant in value. When you `#define` a constant, it's defined in every other file the compiler looks at until (if) it's `#undef`'d. Yikes! That's not constant at all, and, like, global variable type stuff.

Avoid it.

Instead, _declare_ constants in headers as `extern` variables which are defined in the corresponding implementation file.

In the header:

```
extern const CGFloat ASHHeaderViewHeight;
```

Then, in the implementation,

```
const CGFloat ASHHeaderViewHeight = 44.0f;
```

Now your constant is visible to anyone who wants it (who `#import`s the header), but isn't visible to the rest of the app. It also can't be `#undef`'d and re-defined later (a definite code smell).

Note: [Michael](http://twitter.com/italoarmstrong) points out that we should technically be using [`FOUNDATION_EXPORT`](http://stackoverflow.com/questions/10953221/foundation-export-vs-extern) instead of `extern`.

## Properly Name Constants

I don't care whether you prefix your constants with 'k' or a class name, or just a prefix, but _do_ be consistent. And descriptive. Otherwise, you'll run into naming conflicts when your codebase grows. Trust me on this one.

<!-- more -->
