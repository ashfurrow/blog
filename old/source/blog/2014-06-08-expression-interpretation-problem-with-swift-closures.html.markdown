---
title: "Expression Interpretation Problem with Swift Closures"
date: 2014-06-08 00:00
link_to: swift
---

I was working with [someone](http://twitter.com/nottombrown) on an [open-source testing framework for Swift](https://github.com/modocache/Quick) and we came across the following problem. If the last statement in a closure can be interpreted as an expression, then the Swift compiler will try and interpret that as the return value for that closure, which can conflict with an expected type.

Let's take a look at an example.

Cosider a function `a` that does some operation, then returns `true` or `false` depending on the success of that operation.

```
func a() -> Bool {
    /* do some work */
    return true
}
```

Cool, so far so good. Let's now take a look at a function `b` that takes a closure that takes no parameters and doesn't return a value.

```
func b(closure: () -> ()) {
    closure()
}
```

Still OK. Now let's invoke `b` with a closure that invokes `a`.

```
b{
    a()
}
```

Boom, compiler error.

> Cannot convert the expression's type '()' to type 'Bool'

Interesting. It took us a few minutes to understand what was going on. The invocation of `a` returned a `Bool`, so the compiler was inferring that the closure should return a `Bool`, too, leading to a type-mismatch. Remember that the last expression in a closure is interpreted as an implicit return statement. So the compiler was interpreting this as follows.

```
b{
    return a()
}
```

The workaround is the convert the expression `a()` into a statement that the compiler will ignore.

```
b{
    var _ = a()
}
```

[Kyle](http://twitter.com/kylefuller) pointed out this would fix the issue, too.

```
b{
    var _ = a()
    return
}
```

Interesting. I've filed a radar about it and I expect it'll be fixed soon.

(READMORE)
