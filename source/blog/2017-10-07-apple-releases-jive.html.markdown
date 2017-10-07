---
title: Apple Releases Jive
date: 2017-10-07 14:55:08 UTC
background_image: /img/blog/apple-releases-jive/background.png
background_image_source: https://twitter.com/CloudyConway/status/916410007964483585
---

The following is a hypothetical blog post, written by a version of me in a parallel universe. In this fictional world, Apple cares very much about software quality (ensured by unit testing), as well as the developer experience of building software for its platforms. The features I describe of Apple's new fictional test runner are all real features in the [Jest project][jest].

(READMORE)

---

Wow, what a WWDC! Lots of stuff to get excited about, but what's got me most pumped up is the release of Apple's new unit testing tool: Jive. Let's dive into what Jive is, how it makes your life as an iOS developer easier, and how it helps you write better software.

First some theory. Unit testing generally has three components: a test runner, which runs your tests; a test framework, which is how you structure your tests; and a matcher library, which helps you write test assertions. Jive provides the whole package: it's a test runner, a test framework, and a matcher library. Let's go through each component in detail.

## Test Runner

Jive's test runner is seriously impressive. Apple has examined the workflow that developers – inside Apple and within the community – and has optimized Jive for common workflows. The top priority of Jive is to give accurate test results as quickly as possible.

So let's say you check out a new branch to work on a feature. Jive is going to use git to determine which Swift files and which tests have changed since the last commit. Running fewer tests will speed up the test suite run time. And whenever you save a file, Jive examines the dependency graph and re-runs all related tests, giving you near instant feedback in your red/green/refactor cycle.

Jive prioritizes running tests that failed the last time it ran because it assumes that you're trying to fix those tests first. It also keeps track of how long each test takes to run, in order to prioritize long-running tests _first_. This reduces overall test time. 

![Before and after running long tests first](/img/blog/apple-releases-jive/length.png)

Apparently, the improved scheduling of long-running tests improved full test suite run times by 20% – wow! And because it can run tests in parallel simulator processes (from Xcode 9), parallelism is constrained only by the number of cores in your CPU.

Overall, Jive provides a fast testing experience, using advanced dependency resolution techniques and aggressive caching so that incremental changes take less than a second to test. This near-instant feedback is a _huge_ change in how we can write code. Since tests take a very short time to run, developers run them more often (on file saves, in a pre-commit hook, etc). 

On full test runs, Jive is still stunningly fast, reducing test suite run times with XCTest to about 15% of their original run times. Very impressive!

## Test Framework

XCTest provided a very bare-bones approach to testing, something reminiscent of JUnit circa 1999. In contrast, Jive provides a modern RSpec-like interface for behaviour-driven development. Let's compare.

```swift
class MyTests: XCTestCase {
    override func setUp() {
        super.setUp()
    }
    
    override func tearDown() {
        super.tearDown()
    }
    
    func testExample() {
        // TODO
    }
}
```

Okay now let see an equivalent Jive test suite.

```swift
beforeEach {
}

afterEach {
}

it("behaves a certain way") {
    // TODO
}
```

What may not be obvious about RSpec-style tests is the possibility of _nesting contexts_. Let's take a look at a more practical example to see the power of nesting test contexts.

```swift
var db: DataBase!

beforeEach {
    db = DataBase.testDataBase()
}

afterEach {
    db.destroy()
}

it("adds new rows to the db") {
}

describe("prepopulated") {
    beforeEach {
        db = DataBase.populateWithFakeData()
    }
    
    it("can fetch rows from the db") {
    }
}
```

This kind of nested contexts was impossible to build in XCTest (at least, without a lot of work and/or repeated code). Finally Apple has recognized that a test suite needs more than just two `setup()` and `tearDown()` methods.

Jive leverages its new runner with the RSpec-style tests to run each test in an independent process. This means that state leftover from one test can't affect the outcome of another test. Nice!

Overall, Jest provides an interface for testing that lends itself to writing more expressive tests. It reminds me of [Quick][quick], the Swift test framework that's now been sherlocked by Jive.

## Matchers

XCTest matchers were... not optimal. Matchers are used by the assertions of a test, so making them concise and expressive is really important.

Let's see an example.

```swift
XCTAssertEqual(objectA, objectB)
```

Now let's compare with the new Jive matchers.

```swift
expect(objectA).to.equal(objectB)
// or
expect(objectA) == objectB
```

Jive uses operator overloading to help write more expressive tests. I really dig this – it lets developers choose whatever level of verbosity they feel is right for their project.

Let's take a look at a few more examples.

```swift
expect(array) ~= value
expect(result) > 0
expect(optional).not.to.beNil()
```

You can write your own matchers, too, and leverage the power of the Swift type system. For example, it'd be pretty easy to write a custom matcher to check that collections are of a certain size. I'll likely port my [Nimble-Snapshots][ns] library over to Jive within the next few weeks.

And of course Jive ships with a comprehensive mocking library. This makes mocking dependencies and injecting them into a subject under test _really_ easy. 

```swift
it("invokes the callback") {
    let mock = Jive.mock()
    
    testSubject.method(mock)
    
    expect(mock).to.haveBeenCalledWith(.success)
}

it("calls the network") {
    let mock = Jive.mock(Alamofire)
    testSubject.networkModel = mock
    
    testSubject.fetch()
    
    expect(mock.request).to.haveBeenCalledWith("https://example.com")
}
```

Very cool, and all out of the box! Mocking is a testing strategy that Objective-C and Swift developers aren't too familiar with, but it [solves a lot of problems][so]. I'm looking forward to this powerful testing technique become more popular within our community.

## Wrap up

Apple has released Jive as an open source Xcode extension, written in Swift. This means that any Swift developer can contribute back to the project, helping to improve everyone's developer experience. After releasing the [Swift refactoring tools][swift] as open source last year, it's exciting to see Apple continue this trend.

Finally, Xcode ships with everything an iOS developer needs to write comprehensive unit tests. Apple really put a concerted effort into making Jive an industry-leading test runner, and I thank them for recognizing how important unit testing is to making quality software.

---

Of course, Jive doesn't exist. It's up to iOS developers to seek out better testing tools than the ones we're given by Apple, and most folks don't bother. And because Xcode is [closed source][xcode], the community can't contribute back to improve their own tools.

So why haven't Apple done this? Priorities. Apple has the engineering talent to make this a reality, but they'd rather make Animojis I guess.

Not to suggest that making Jive would be easy. Imagine: you hit "save" and Xcode has to determine which files have changed, recompile them, load them into a runtime, and execute them. That alone would take a lot of engineering effort, and only a few companies exist that could invest the time. And only Apple can contribute to Xcode.

Until Apple starts caring about writing modern unit tests, or until they get tired of us [filing radars][radars] begging for better tools, we'll likely never see Jive come to be.

[jest]: https://github.com/facebook/jest
[quick]: https://github.com/Quick/Quick
[ns]: https://github.com/ashfurrow/Nimble-Snapshots
[xcode]: http://isxcodeopensourceyet.github.io
[swift]: https://swift.org/blog/swift-local-refactoring/
[radars]: https://bugreport.apple.com
[so]: https://stackoverflow.com/a/3623574/516359
