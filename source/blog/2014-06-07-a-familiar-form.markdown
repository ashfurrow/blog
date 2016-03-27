---
title: "A Familiar Form"
date: 2014-06-07 00:00
---

Last week, Apple introduced a brand new programming language for iOS and OS X development, called Swift. During WWDC, I attended every Swift presentation and spent time in the labs chatting with the engineers responsible for this new language. While I've had less than a week's exposure to this new language, I have some thoughts.

Generally, [I'm impressed](/blog/initial-thoughts-on-swift). Swift is the kind of radical departure from the existing Objective-C language that I was [hoping for](/blog/we-need-to-replace-objective-c). Sure, it's a radical departure, but is it radical enough?

Swift gets rid of a lot of cruft of Objective-C syntax while keeping some of its key features, like named parameters, around. But it also keeps around things that aren't _necessarily_ a good thing. Let's take a look at a basic example.

```
func compute (x: Int) -> Int {
    return x*x
}

compute(4) //prints 16
```

This is a basic function definition and a corresponding invocation. A few things jump out that should be familiar to Objective-C developers. First, we have brace brackets delimiting the scope of the function. Lots of languages do this, but plenty don't, as well. We also see a familiar, C-like syntax for invoking the `compute` function.

Swift could easily have looked like this, a more Haskell-friendly syntax.

```
func compute x: Int -> Int 
   x*x

compute 4 //prints 16
```

Less familiar, sure, but would be just as valid if you're designing a whole new language.

When I asked an Apple engineer about these kinds of constructs, his answer was that familiarity with existing Objective-C developers was an important factor in the design process of the language.

Familiarity is important, certainly. We need existing developers to embrace Swift in order to avoid a situation where this new language languishes. However, while it's important for the sake of developer adoption, will it lead to the _best_ language possible?

Maybe. Maybe not.

I feel that Apple may be making compromises on the language design for the sake of familiarity with developers, sacrificing what could be an even better syntax for the sake of developer penetration. Maybe this is the right choice, maybe it's not. I hope that they know what they're doing, and I hope that future revisions of the language aren't burdened with these familiarity considerations.

<!-- more -->
