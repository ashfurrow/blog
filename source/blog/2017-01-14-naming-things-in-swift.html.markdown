---
title: Naming Things in Swift
date: 2017-01-14 21:15:11 UTC
background_image: /img/blog/naming-things-in-swift/background.jpg
background_image_source: https://twitter.com/CloudyConway/status/817193041161232385
---

Swift. What a language. Swift's design is rooted in Objective-C conventions, which are verbose, but Swift as provided mechanisms to write far more concise code than Objective-C (plus some awesome Objective-C interop). The question is when to use which level of verbosity?

It turns out this problem of naming things extends beyond Swift. Lately I've been writing Scala and let me tell you: Scala can be pretty concise! My manager sent me this awesome [blog post about naming things in Scala](http://www.lihaoyi.com/post/StrategicScalaStyleConcisenessNames.html) and it blew me away in its comprehensive description of when to use different levels of verbosity in Scala.

My goal with this post is to provide a similarly awesome blog post about when to be concise and when to be verbose in Swift. I'm going to be borrowing some examples and points from the Scala post, but also discuss feelings and TODO

(READMORE)

Whether or not you prefer conciseness or verbosity when programming, chances are your language supplies a spectrum of verbosity that your code can be written in. Swift has language features that allow you to write your code at your preferred middle ground on the concise/verbose spectrum. Things like trailing closure syntax, unnamed parameters, positional closure arguments allow programmers to be verbose in some circumstances and succinct in others.

The question isn't _if_ you should be concise. The question is: _where_ you should be precise.

Swift has been around long enough that it's started to develop idioms that our code should generally adhere to. So let's talk about those idioms. The creators of Swift have been kind enough to release [official API design guidelines](https://swift.org/documentation/api-design-guidelines/) which are an excellent read. These are great, but I want more: I want to talk about how to develop an _intuition_ about idiomatic Swift.

The principles of Swift API design that specifically touch on naming things are:

- Clarity at the point of use is your most important goal.
- Clarity is more important than brevity.

Fantastic guidelines, but let's go further. Quoting the original Scala blog post:

> Show programmers something they don't already know, but want to know.

This strikes me as a more interesting guideline because it requires us to think about the context of our code, and who will be working with it in the future. Remember: code is written only once, but is read over and over, so programming should optimize for _ease of reading_ and not ease of writing. The most important thing to consider when optimize for reading is _context_. The Scala blog post [lays this out well](http://www.lihaoyi.com/post/StrategicScalaStyleConcisenessNames.html#Philosophy):

> Programmers already know:
> 
> - Things they've seen before in your codebase
> - Things they've seen before in other codebases
> - Facts they've picked up in previous jobs
>
> Programmers want to know about:
>
> - Things that affect what they're doing
> - Things which they need to understand
> - Things they are unfamiliar with
> - Things that are especially dangerous, whether due to correctness, security, performance, etc.
>
> This is not comprehensive.

Think about who will be reading your code, and when. Is it a colleague, who will use the code every day? Or maybe yourself six months from now? Are you trying to encourage more casual contributions to your open source project? These different situations may affect how you name some function.

A colleague using your code every day is likely to be familiar with your codebase and its conventions, so pithy code might be best. If, in six months you've forgotten how most of the codebase works, being wordy might be most helpful. Casual contributors to open source projects probably won't understand how a large codebase fits together, so being overly verbose could be really helpful.

Think about who is likely to read your code and what their goals are. 

## Guidelines

Please remember that I'm adapting the advice [from the original article](http://www.lihaoyi.com/post/StrategicScalaStyleConcisenessNames.html#long-names-vs-short-names) for Swift – we owe that post and it's author [Li Haoyi](https://github.com/lihaoyi). Also remember that these are guidelines, not axioms: brea the rules if your intuition tells you to. Let's dive in!

### Wider-Scoped Names Should Be Longer

Why is the name `i` ok in this example?

```swift
for var i in 0..<10 {
  print(i)
}
```

But not in this one?

```swift
struct MyStruct {
  let i: Int
}
```

Consider where `i` is being referred from within the codebase. In the first example, `i` is only accessed from within the `for` loop. But in the second example, it is a member of a struct and is accessed by any code using that struct, possibly then entire codebase! At a glance, it's impossible to find out the whole context of what `i` because it's so widely used. Remember: we want to tell the programmer reading the code something they don't know but want to know. Let's fix the struct.

```swift
struct MyStruct {
  let numberOfInteractions: Int
}
```

This doesn't mean that all loop variables should be short, it only means that _widely_ used names should be longer. Let's see a counterexample, where a short variable name in a loop is a bad idea.

```swift
for var i in 0..<10 {

  ...
  
  ...

  let data = Data(repeating: 0, count: i)
  
  ...
  
  ...

  writeToDb(transformedData, i) // Tricky C API...

  ...
  
  ...
  
  ...
  
  let temp = i + 1
  
  ...
}
```

I think we can all agree that `i` would benefit from a longer name. Why? Because its scope of use is wider.

### More-Used Names Should be Shorter

Consider `print`, probably the first function you learned in Swift. `print` works perfectly well here:

```swift
print("Hi there!")
```

So why doesn't `cache` work well here?

```swift
class Downloader {
  func cache() { ... }
}

...

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  func applicationDidFinishLaunching(_ application: UIApplication) {
    ...
    downloader.cache() // Only called once.
  }
}
```

`print` is used a lot and any Swift developer could be expected to be familiar with it. `cache` is only used once and is defined in a custom object that probably doesn't get looked at all too often. It could benefit from a longer name.

```swift
class Downloader {
  func initializeCache() { ... }
}
```

Much nicer.

### Dangerous Names Should be Longer

This is a function that's _too_ long.

```swift
extension Downloader {
  func loadDataFieldsFromOfflineCache() { ... }
}
```

It could be something like `loadFromCache`. But consider this function, which is _definitely_ too short:

```swift
extension Downloader {
  func deleteAPICredentialsFromCache() { ... }
}
```

This is probably okay being that verbose because it does something dangerous. You wouldn't want to call it something really succinct, like:

```swift
extension Downloader {
  func delToken() { /* deletes use data omg! */ }
}
```

Remember: we want to tell the developer calling the function something they don't know but that they _do_ want to know. I imagine whoever calling this function definitely wants to know if it deletes users data!

### Names with Source-Context Should be Shorter

Types with names that exist inside types should be shorter, and ones that exist outside types should be longr. Consider the following:

```swift
protocol Delegate {
  ...
}
```

That's probably too short, since we don't know what the `Delegate` protocol is _for_. Let's improve it:

```swift
protocol DownloaderDelegate {
  ...
}
```

Awesome! Now the name helps us know what the protocol is for. An alternative improvement could be:

```swift
class Downloader {
  protocol Delegate {
    ...
  }
}
```

Both of these are improvements, but the second one is what I prefer. Just try to avoid repeating source context in your type names:

```swift
class Downloader {
  protocol DownloaderDelegate {
    ...
  }
}
```

Developers already know that types inside the `Downloader` class have to do with that class, so repeating that information is superfluous.

### Strongly-Typed Names Should be Shorter



## Omiting Names Entirely

On the spectrum of verbose to succinct, at the very end by "succinct", we have the option to just not name things at all. You can do this with trailing closure syntax, with unnamed parameters, and with positional closure arguments. Using them – or not – follows the general guidelines above, but let's take a look at each.

Trailing closure syntax is really handy, I'll refer you to the Ray Wenderlich Swift Style Guide [section on closures](https://github.com/raywenderlich/swift-style-guide#closure-expressions): don't use trailing closure syntax if the purpose of the closure is ambiguous. For example, this would be bad:

```swift
UIView.animate(withDuration: 1.0, animations: {
  ...
}) { finished in
  ...
}
```

This would definitely be more clear:

```swift
UIView.animate(withDuration: 1.0, animations: {
  ...
}, completion: { finished in
  ...
})
```

For unnamed parameters, I'll refer you to the official Swift API Guidelines [on argument labels](https://swift.org/documentation/api-design-guidelines/#argument-labels):

- Omit all labels when arguments cannot be usefully distinguished (ex: `union(set1, set2)`).
- Omit labels when its clear from the grammar of the function name what the first argument is (ex: `addSubview(y)`).

Finally that brings us to propositional closure arguments. I think this depends mostly on the length of your closure, and it closely matches the "Wider-Scoped Names Should Be Longer" rule. If your closure does only a few things, use positional closure arguments:

```swift
(0..<10).map({ String($0) })
```

But either of these would be bad:

```swift
(0..<10).map({ number in String(number) })
(0..<10).map({
  ...
  
  ...

  let data = Data(repeating: 0, count: $0)
  
  ...
  
  ...

  Model(fromData: data, index: $0)

  ...
})
```

You can read more about closures in 
