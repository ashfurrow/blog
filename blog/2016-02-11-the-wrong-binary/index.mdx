---
title: The Wrong Binary
date: 2016-02-11
banner: background.jpg
bannerAttribution: https://twitter.com/CloudyConway/status/697609940140224513
---


In a binary, anything is either zero or one. Right? Maybe not. 


A binary can be any two mutually-exclusive cases, like "true or false", which are often an analogue for one and zero, respectively. But those are two different binaries – just because they're analogous doesn't meant that they're the _same_. There're a tonne of binaries out there! Let's take a look at a few others.

- Success or Failure
- Some or None
- Request or Response
- Server or Client
- Give or Take
- [Do or Do Not](https://cdn1.lockerdome.com/uploads/cdcf6960d1f78b73fe33f730500e77a6ee243a1398f3bd559d525d9e5e927419_large)

There are plenty of others, but one of the interesting things about these all is that they describe two _different_ cases. The case are "success" and "failure", not "success" and "not success." Even if logically "not success" might be equivalent to "failure," using the term "failure" is better because it helps connote meaning.

And that's kind of my point here: we shouldn't pigeon-hole ourselves and our code into thinking _only_ in true/false binaries. I did this earlier today, when I wrote this horrible-looking code:

```swift
guard bypassCCRequirement == false else {
...
```

Wow, eh? Totally bananas. The `bypassCCRequirement` variable is from a function called `checkForAdminCCBypass`, which _was_ returning a `Bool`. So what does a `true` or `false` mean in this circumstance? That the bypass should happen? Or that the requirement is present? 

This is an example of using the _wrong_ dichotomy. Or if not wrong, at least inappropriate. 

After [Orta pointed this out](https://github.com/artsy/eidolon/pull/588#discussion_r52672464), the solution became pretty obvious, a two-case enum:

```swift
enum BypassResult {
    case RequireCC
    case SkipCCRequirement
}
```

So now my guard statement would look like this:

```swift
guard case bypassCCRequirement = .RequireCC else {
...
```

I don't know why I was so reluctant to use an enum – to be honest, it just didn't occur to me. Once it had, it seemed pretty obvious. I wonder where else in my code I'm using `Bool`s where something else might be more appropriate. I'm going to keep an eye on where I use booleans and we'll see.


  