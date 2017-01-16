---
title: Naming Things in Swift
date: 2017-01-14 21:15:11 UTC
background_image: /img/blog/naming-things-in-swift/background.jpg
background_image_source: https://twitter.com/CloudyConway/status/817193041161232385
---

Lately, I've been using different programming languages and environments, trying to diversify my skills. I've been working regularly in React, Swift, Objective-C, and Scala, and they all have their own idioms and conventions. It's been a real learning experience, getting to compare and contrast the languages, and to use what I learn to become a better Swift developer, too.

My manager, who has been helping me learn Scala, sent me this awesome [blog post about naming things](http://www.lihaoyi.com/post/StrategicScalaStyleConcisenessNames.html) and it blew me away with its comprehensive description of when to use different levels of verbosity in Scala. So my goal today is to provide a similarly awesome blog post about when to be concise and when to be verbose, in Swift. I'm going to be borrowing some examples and points from this Scala post, relating things back to Swift and iOS apps.

(READMORE)

Whether or not you prefer conciseness when programming, Swift has language features that allow you to write your code at your preferred level of verbosity. Beyond naming, features like trailing closure syntax, unnamed parameters, positional closure arguments allow programmers to be verbose in some circumstances and succinct in others.

The question isn't _if_ you should be concise (or not). The question is: _where_ you should be concise (or verbose).

Swift has been around long enough that it's started to develop idioms that code should generally adhere to. The creators of Swift have been kind enough to release [official API design guidelines](https://swift.org/documentation/api-design-guidelines/) which are an excellent read. These are great, but I want more: I want to talk about how to develop an _intuition_ about idiomatic Swift. We're going to cover intutively naming things in detail, then move onto a discussion of language features.

## Philosophy

The principles of the Swift API design that specifically touch on naming things are:

- Clarity at the point of use is your most important goal.
- Clarity is more important than brevity.

Fantastic guidelines, but let's go further. Haoyi's Scala blog post tells us that our goal when naming something is to:

BEGIN_WIDE

> Show programmers something they don't already know, but want to know.

END_WIDE

This is an interesting guideline because it requires us to think about the context of our code, and who will be working with it in the future. Remember: code is written only once, but is read over and over, so programmers should optimize for _ease of reading_ and not ease of writing. And, the most important thing to consider when optimize for reading is _context_. The Scala blog post [lays this out well](http://www.lihaoyi.com/post/StrategicScalaStyleConcisenessNames.html#Philosophy), and says that context includes both things the programmer already knows, and things they want to know:

BEGIN_WIDE

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

END_WIDE

Think about who will be reading your code, and when. Is it a colleague, who will use the code every day? Or maybe yourself six months from now? Are you trying to encourage more casual contributions to your open source project? These different situations may affect how you name some function. Let's examine.

A colleague using your code every day is likely to be thoroughly familiar with your codebase and its conventions, so pithy code might be best. If you don't plan on working on the codebase for six months, you'll likely return to it unfamiliar with its conventions, so being wordy might be most helpful. Casual contributors to open source projects probably won't understand how large codebases fit together, so being overly verbose could help improve the number of contributions to your project.

Think about who is likely to read your code, and what their goals are. 

## Guidelines

These are guidelines, not axioms. Break the rules if your intuition tells you to. Let's discuss guidelines for naming things in rough order of importance. And remember: always keep context in mind!

(Please remember that I'm adapting these naming guidelines [from the original article](http://www.lihaoyi.com/post/StrategicScalaStyleConcisenessNames.html#long-names-vs-short-names) for Swift – we owe that post and its author, [Li Haoyi](https://github.com/lihaoyi).)

### Wider-Scoped Names Should Be Longer

Why is the name `i` okay in this example?

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

Consider where `i` is being referred from within the codebase. In the first example, `i` is only accessed from within the `for` loop. But in the second example, it is a member of a struct and is accessed by any code using that struct, possibly then entire codebase! At a glance, it's impossible to find out the whole context of what `i` because it's so widely used. 

Remember: we want to tell the programmer reading the code something they don't know but want to know. Let's fix the struct.

```swift
struct MyStruct {
  let numberOfInteractions: Int
}
```

This doesn't mean that all loop variables should be short, it only means that _widely_ used names should be longer. Let's see a counterexample, where a short variable name in a loop can be a bad idea.

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

I think we can all agree that `i` would benefit from a longer name. Why? Because its scope of use is wider, and it's used more. That brings us to our next guideline.

### More-Used Names Should be Shorter

Consider `print`, probably the first function you learned in Swift. As a function name, "print" works perfectly well:

```swift
print("Hi there!")
```

So why doesn't "cache" work well here?

```swift
class Downloader {
  func cache() { ... }
}

...

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  func applicationDidFinishLaunching(_ application: UIApplication) {
    ...
    downloader.cache() // Only called at app startup.
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

Some functions should be long because of what they _do_. Dangerous functions should be long, while boring ones should be shorter. This is a function that's _too_ long.

```swift
extension Downloader {
  func loadDataFieldsFromOfflineCache() { ... }
}
```

It could be something like this instead: `loadFromCache`. 

```swift
extension Downloader {
  func loadFromCache() { ... }
}
```

But consider this function, which really benefits from being quite long:

```swift
extension Downloader {
  func deleteAPICredentialsFromCache() { ... }
}
```

This function has a long name because it's dangerous to call it: we always want to avoid deleting user data by accident. For that reason you wouldn't want to call it something really succinct, like:

```swift
extension Downloader {
  func delToken() { /* deletes use data omg! */ }
}
```

Remember: we want to tell the developer reading the name something they don't know but that they _do_ want to know. I imagine whoever calling this function definitely wants to know if it deletes users data!

### Names with Source-Context Should be Shorter

Types with names that exist inside types should be shorter, and ones that exist outside types should be longer. Consider the following:

```swift
protocol Delegate {
  ...
}
```

That's probably too short, since we don't know what the `Delegate` protocol is _for_. Let's improve it by giving it a longer name:

```swift
protocol DownloaderDelegate {
  ...
}
```

Awesome! Now the name helps us know what the protocol is for. 

If the Swift compiler supported protocols within types, an alternative improvement would be:

```swift
class Downloader {
  protocol Delegate {
    ...
  }
}
```

This would extend its _fully qualified_ name to be `Downloader.Delegate`. But alas, Swift doesn't yet support this kind of protocol nesting.

Just make sure to avoid duplicating type information within names:

```swift
class Downloader {
  protocol DownloaderDelegate {
    ...
  }
}
```

Developers already know that types inside the `Downloader` class have to do with that class, so repeating that information is superfluous. This brings us to our final guideline:

### Strongly Typed Names Should be Shorter

Swift has a powerful, expressive type system and we can use that to make our names shorter. For example, consider the following property:

```swift
class Downloader {
  var downloaderDelegate: Delegate
}
```

We already know that the delegate property belongs to the `Downloader` class, to giving it `downloaderDelegate` as a property name is excessive. 

Here's another counterexample:

```swift
func zipTwoSequences<...>(_ sequence1: Sequence1, _ sequence2: Sequence2) -> ...
```

Instead, the standard library contains only:

```swift
func zip<...>(_ sequence1: Sequence1, _ sequence2: Sequence2) -> ...
```

This is because it's obvious from the type signature that the arguments are sequences.

That's all for naming guidelines, let's talk about Swift features that let us be concise!

## Omitting Names Entirely

On the spectrum of verbose to succinct, at the very end of "succinct", we have the option to just not name things _at all_. You can do this with trailing closure syntax, with unnamed parameters, and with positional closure arguments. When to use them is a matter of following the guidelines outlined above.

Trailing closure syntax is really handy, it helps make calling functions more concise. Borrowing from the Ray Wenderlich Swift Style Guide [section on closures](https://github.com/raywenderlich/swift-style-guide#closure-expressions): don't use trailing closure syntax if the _purpose_ of the closure is ambiguous. For example, this would be bad:

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
- Omit labels for type conversion (ex: `Int64(someUInt32)`).
- Otherwise (generally) include argument labels.

Finally, that brings us to positional closure arguments. When to use these depends mostly on the length of your closure, and closely matches the "Wider-Scoped Names Should Be Longer" rule. 

If your closure does only a few things, use positional closure arguments:

```swift
(0..<10).map({ String($0) })
```

Here's a counterexample of being overly verbose:

```swift
(0..<10).map({ number in String(number) })
```

And this is what things would look like if you don't adhere to the first two guidelines about naming things.

```swift
(0..<10).map({
  ...
  
  ...

  let data = Data(repeating: 0, count: $0)
  
  ...
  
  ...

  return Model(fromData: data, index: $0)
})
```

Again, refer to the Ray Wenderlich guide for more info on closures.

---

Remember, the guidelines we've discussed today are not absolutes. Experiment, ask others, and learn. Have fun!
