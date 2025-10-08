---
title: TypeScript Ergonomics
date: 2022-04-03
banner: background.jpg
bannerAttribution: https://twitter.com/CloudyConway/status/1509723366646759435
---

One of the things I really enjoy about working with React Native is that I get to use TypeScript, and I'd like to share a little bit about why I find the language so fun to work with. In this article, I want to introduce you to TypeScript's union types. We will compare the ergonomics of [TypeScript unions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) with the ergonomics of [Swift enums with associated vales](https://docs.swift.org/swift-book/LanguageGuide/Enumerations.html#ID148). Ergonomics are how the languages "feel" to use – to a large degree, ergonomics are subjective. But the comparison should still be interesting, even if you disagree. So let's dive in!

An important thing to understand about TypeScript is that its goal has been to [add a strong type system on top of an _existing_ language: JavaScript](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html). Because JavaScript is loosely typed, TypeScript needed to meet JavaScript where it was at, with all its weird APIs and patterns. As a consequence, TypeScript has a really fun and flexible type system. TypeScript structural types, whereas Swift uses nominal types. Both are fine approaches, but structural typing has become my go-to way to think about types, generally.

{% tweet "1322285852492550147" %}

Let's consider a function that looks for a number in an array and returns its index if found. I'll implement the function in both languages. We could get fancy with these functions, but I'm going to keep them simple so we can focus on comparing unions and enums with associated values.

Here's what we might write in Swift:

```Swift
// Swift

let primes = [1, 2, 3, 5, 7, 11, 13]

func findElementIndex(_ element: Int, inArray array: [Int]) -> Optional<Int> {
  for (index, value) in array.enumerated() {
    if (element == value) {
      return index
    }
  }
  return nil
}

findElementIndex(5, inArray: primes) // Returns 3
```

And now in TypeScript:

<!-- prettier-ignore -->
```typescript
// TypeScript

const primes = [1, 2, 3, 5, 7, 11, 13]

const findElementInArray = (element: number, array: number[]): number | undefined => {
  for (const [index, value] of array.entries()) {
    if (value === element) {
      return index
    }
  }
  return undefined
}

findElementInArray(5, primes) // Returns 3
```

I want to draw your attention to the return type of each function. In Swift, we represent an index that might be missing as the `Optional<Int>` generic (you could also use `Int?` as a shorthand). In TypeScript, we use `number | undefined`. This is a union type, and it literally means "number or undefined."

Union types are one of my favourite parts of TypeScript 😊 Let's look at a more complex example.

Consider another function that needs to return either a string or a number. The implementation itself doesn't really matter, it's the return type we care about. When Swift needs to represent a potentially missing value, we use the `Optional` enum. But there's no built-in Swift enum for "string or number", so we'll need to create our own with associated values.

```swift
// Swift

enum NumberOrString {
  case number(Int)
  case string(String)
}

func sillyFunction(_ input: Int) -> NumberOrString {
  if (input % 2 == 0) {
    return NumberOrString.string("Hello, world!")
  } else {
    return NumberOrString.number(1337)
  }
}

sillyFunction(10) // Returns NumberOrString.string("Hello, world!")
sillyFunction(11) // Returns NumberOrString.number(1337)
```

There's a lot of boilerplate here. Not only do we need to define our own enum, but we need to unbox the values to use them afterwards. That is to say, the return value of `sillyFunction(10)` is not `"Hello, world!"` but rather an enum `NumberOrString.string("Hello, world")`; to access the associated value, we need more syntax. You would need to do something like:

```swift
// Swift

switch sillyFunction(10) {
case let .number(number):
  print("The number was \(number)")
case let .string(string):
  print("The string was \(string)")
}
```

That's... kind of a lot. And I can never remember the syntax on the first try 😅

Let's compare with a TypeScript implementation.

<!-- prettier-ignore -->
```typescript
// TypeScript

const sillyFunction = (input: number): number | string {
  if (input % 2 === 0) {
    return 'Hello, world!'
  } else {
    return 1337
  }
}

sillyFunction(10) // Returns 'Hello, world!'
sillyFunction(11) // Returns 1337
```

In the TypeScript implementation, we don't need to declare an enum. We declare an inline union type, `number | string`, but that's it. Our return values are also not boxed – we can access them directly as `number` or `string` without any extra syntax. But that syntax is important, isn't it? I mean, the syntax exists in Swift to distinguish between the two possible types, and I haven't shown how that would be done in TypeScript.

Here's where things get really interesting...

So far, our union types are quite straightforward. "This thing, or that thing", basically. Next, we're going to take a look at a more real-world example. We're going to implement a function that returns a `Result` type.

`Result` is a generic enum built into the Swift standard library, similar to `Optional`. It represents success and failure cases, with each case including an associated value. Success associated values can be anything, but error associated values must conform to the `Error` protocol.

Let's rewrite our `findElementIndex(_ inArray:)` function from earlier to return a `Result` instead of an `Optional`.

```swift
// Swift

enum SearchError: Error {
  case notFound
}

func findElementIndex(_ element: Int, inArray array: [Int]) -> Result<Int, SearchError> {
  for (index, value) in array.enumerated() {
    if (element == value) {
      return Result.success(index)
    }
  }
  return Result.failure(SearchError.notFound)
}

findElementIndex(5, inArray: primes) // Returns Result.success(3)
```

We see that we need to define our own custom type, `SearchError`, in order to use `Result`. Unlike `Optional`, which has built-in syntactic sugar for unboxing values, `Result`'s associated types need to be unboxed to use them:

```swift
// Swift

switch findElementIndex(5, inArray: primes) {
case let .success(index):
  print("The index was \(index)")
case .failure(SearchError.notFound):
  print("The index was not found")
}
```

Again, a lot of syntax here. Plus, I'm only printing these out. Practically speaking, I'd probably be assigning the index to a local variable – yet more syntax!

```swift
// Swift

guard case let .success(index) = findElementIndex(5, inArray: primes) else { return }
```

Let's rewrite the `findElementInArray` function in TypeScript to use a `Result` type. I need to define my own type here, since `Result` isn't included in the TypeScript language.

<!-- prettier-ignore -->
```typescript
// TypeScript

type Result = {
    type: 'success'
    value: number
  } | {
    type: 'not_found'
  }
```

This is a special kind of union. It's called a [discriminated union](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#discriminating-unions) because all the members have an overlapping field name (`type`) which can be used to discriminate between the potential values. This might feel familiar, like a Swift enum with associated values.

Let's see how our `Result` union type gets used:

<!-- prettier-ignore -->
```typescript
// TypeScript

const findElementInArray = (element: number, array: number[]): Result => {
  for (const [index, value] of array.entries()) {
    if (value === element) {
      return {
        type: 'success',
        value: index
      }
    }
  }
  return {
    type: 'not_found'
  }
}

findElementInArray(5, primes) // Returns { "type": "success", "value": 3 }
```

Ah-ha! A boxed value! You can see the parallels between discriminated unions in TypeScript enums with associated values in Swift. How would we unbox this value? What kind of syntax would we use?

Well, remember that TypeScript was built on top of JavaScript, with all its existing APIs. So the syntax to unbox the value is just the syntax that JavaScript developers were already using:

<!-- prettier-ignore -->
```typescript
// TypeScript

const returnValue = findElementInArray(5, primes)
switch (returnValue.type) {
  case 'success':
    console.log(`The index was ${returnValue.value}`)
    break
  default:
    console.log('The index was not found')
}
```

Pretty straightforward, eh? The TypeScript compiler is actually doing something really clever here, though. Within the `switch`case (where `returnValue.type` is `'success'`), TypeScript narrows `returnValue` to _only_ be `{ type: 'success', value: ... }`. If you tried to access `returnValue.value` outside of that `case` block, you would get a compiler error because not all the possible `returnValue` values have that property.

Similar to Swift, we could assign the index in a single line of code:

<!-- prettier-ignore -->
```typescript
// TypeScript

const index = returnValue.type === 'success' ? returnValue.value : undefined
```

(This is not _quite_ semantically identical to the Swift one-liner, but we've found an area where the languages happen to support different developer patterns. Swift's example used an early return while TypeScript uses a `number | undefined` type. I love finding these little spots where programming languages differ in subtle, but meaningful ways!)

It's important to remember that TypeScript was adding type safety to an existing language with existing patterns. JavaScript already _had_ APIs that returned objects that _looked like_ discriminated unions. This was a popular pattern among APIs. You would often get back an object, check its `type`, and then access properties that you expected to be there. TypeScript's support for discriminated unions brought type safety to an existing developer pattern. TypeScript met JavaScript where it was at, and I think there's something beautiful about that.

---

Please understand that I love Swift. It is so precise and specific and pedantic – I can't help but love it! But during day-to-day use, it frustrates me. TypeScript gets out of my way and lets me focus on the structure of my code rather than on boilerplate and syntax.

You could say that both Swift and TypeScript frustrate me (because they are both programming languages and all programming languages are frustrating). But TypeScript frustrates me less severely, and less often. And that's what I mean when I say that I like TypeScript's developer ergonomics.

I hope you've enjoyed this blog post. I've been meaning to write code-level blog posts about React Native _from a Swift developer's perspective_ literally for years; I hope that this is a first step. I encourage you to look back at the examples and take a look at the syntax – I bet you can understand most of it, even if you've never written TypeScript before! Or, maybe there's something that surprised you.

If you enjoyed this, let me know. I'd love to follow up with more.
