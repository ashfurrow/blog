---
title: "Stop Writing For Loops"
date: 2013-06-18 00:00
link_to: swift
---

Most of the time, when we use a `for` loop, it's to iterate over some collection. Typically an array. We used to write things like this:

```
for (NSInteger i = 0; i < [array count]; i++) {
    id obj = array[i];
    // do something with obj
}
```

Then we came up with the foreach loop.

```
for (id obj in array) {
    // do something with obj
}
```

That worked well unless you wanted to know the index of the object that you're using. We've all written code like this:

```
NSInteger i = 0;
for (id obj in array) {
    // do something with obj
    i++;
}
```

This one is particularly insidious since it creates a new local variable `i` outside of the lexical scope of the loop. Gross!

Please, stop using all of these. Instead, use `enumerateObjectsUsingBlock:`

```
[array enumerateObjectsUsingBlock:^(id obj, NSUInteger idx, BOOL *stop) {
    //do something with obj at idx
}];
```

This abstracts away _how_ the computer is doing something and let's you focus solely on _what_ it is you're trying to accomplish. You get the index of the iteration and can stop the enumeration at any time by setting `*stop = YES`.

We used to have to use arrays because Objective-C didn't have blocks. We've left the dark ages and can now focus on what we're trying to accomplish instead of being mired in the minutia of how the computer works.

EDIT: Several readers have pointed out the [performance](http://darkdust.net/writings/objective-c/nsarray-enumeration-performance) [gains](http://stackoverflow.com/questions/4486622/when-to-use-enumerateobjectsusingblock-vs-for) when using the different methods. Good point, and definitely worth a read.

<!-- more -->
