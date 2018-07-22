---
title: Snapshot Testing on iOS
date: 2018-07-21 14:09:45 UTC
background_image: /img/blog/snapshot-testing-on-ios/background.png
background_image_source: https://twitter.com/CloudyConway/status/1020634048438460416
---

"Snapshot testing" is a phrase that you'll hear in circles of developers who are into unit testing. Conceptually, snapshot testing is a simple idea: take a screenshot of your user interface and store it as a reference image. Then, make unit tests to take screenshots of the same UI and compare it to the reference image. Facebook created, and Uber now maintains, [ios-snapshot-test-case](https://github.com/uber/ios-snapshot-test-case), a testing framework that makes this process really easy. Lots of us have written testing tools on top of ios-snapshot-test-case and have been using it in production for a few years now.

So here's the question that I want to discuss: is it worth it?

tl;dr yeah it is totally worth it, but (like any technique) you want to be careful about over-doing it.

(READMORE)

The idea to write this post came from a friend who shared this trick to display before and after screenshots in GitHub pull requests using Markdown tables.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">🔥 Pull Request Description Tip<br><br>Using tables is useful for showing before/after screenshots in PRs touching the UI. <a href="https://t.co/lYhfQX30T5">pic.twitter.com/lYhfQX30T5</a></p>&mdash; Gio 💻🔧📚 (@mokagio) <a href="https://twitter.com/mokagio/status/1019709696872087557?ref_src=twsrc%5Etfw">July 18, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

The conversation turned to snapshot testing; a consequence of snapshot testing  would be that you don't _need_ to include before/after shots in your PR description because they'd be included for you in the PR's changed files. Think about it: your reference images are essentially screenshots of your UI – and they're stored in your repository. So when you open a PR that changes the UI, your PR will necessarily include changes to those references images, showing the before and after of the UI changes. Neat!

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">That’s awesome!<br><br>I was considering a spike to set up some snapshot testing at work too. <br><br>Would you say it’s worh the time? <br><br>Does it often reveal defects like that? False positive?</p>&mdash; Gio 💻🔧📚 (@mokagio) <a href="https://twitter.com/mokagio/status/1020081618239668224?ref_src=twsrc%5Etfw">July 19, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

Is it worth the time? Yes, for our team it was.

Does it reveal defects? Yes it does – let me give you an example from last week at Artsy.

We have this button class, [`ARBidButton`](https://github.com/artsy/eigen/blob/052e79a29e6208a099a4972ad0c17158499776b0/Artsy/Views/Styled_Subclasses/Buttons/ARBidButton.m), which is given an `ARAuctionState` and is responsible for updating its background colours, text colours, enabled state, and text. We include this button on artwork views in auctions so the user can bid on them. We wanted to change some of the render logic in the button, but we inadvertently broke another part of our app that we didn't realize was using `ARBidButton` too. [Here is the original pull request](https://github.com/artsy/eigen/pull/2659) and [here is the second attempt](https://github.com/artsy/eigen/pull/2667) we made (once we realized the button was used elsewhere).

If we hadn't had snapshot tests for different parts of our UI, we wouldn't have noticed that the small change we wanted to make would have inadvertent changes elsewhere in our app.

But what about drawbacks? Is snapshot testing worth it? Well, let's back up and get more context.

Developers who are familiar with different testing strategies eventually form an intuitive understanding of what's formally called the "testing pyramid." Here is a depiction of the pyramid that I borrowed from [this unit testing book](https://gkedge.gitbooks.io/javascript-acceptance-testing/content/).

![Unit testing triangle](/img/blog/snapshot-testing-on-ios/pyramid.jpg)

The idea is that some tests are really quick to run (automated unit tests) and others take a really long time to run (manual tests). The testing pyramid models the spectrum between the two: if a test is expensive to run, the pyramid tells you to run fewer of those tests. The pyramid helps developers balance the competing demands of testing (to ensure quality) and shipping quickly (to stay in business).

Snapshot testing sits right on that barrier between "did we build it right?" and "did we build the right thing?" That means that, while snapshot testing is useful, it shouldn't be your _entire_ testing strategy. You will still need unit tests and manual tests, but snapshot tests really help fill in the gap between the two.

So, with the testing pyramid in mind, let's return to the question: is it worth it? Well, let's run down some quick pros and cons.

BEGIN_WIDE

- **Pro**: Reference image changes provide an opportunity for designers to give feedback on pull requests.
- **Con**: Reference images have a large filesize and can change frequently, which can lead to a ballooning git repository size ([our repo](https://github.com/artsy/eigen) that makes the heaviest use of snapshot testing is 500MB on disk).
- **Pro**: [Lots](https://github.com/pointfreeco/swift-snapshot-testing) [of](https://github.com/ashfurrow/Nimble-Snapshots) [tools](https://github.com/dblock/ios-snapshot-test-case-expecta) [exist](https://github.com/ashfurrow/second_curtain) to make snapshot testing even more useful.
- **Con**: Tooling for snapshot testing, such as [this project](https://github.com/orta/Snapshots), are hampered by Xcode's extremely limited plugin API.
- **Pro**: Snapshot tests are a very broad-strokes confirmation that your UI is "correct."
- **Con**: Snapshot testing can only test static UIs and not things like animations or user interaction.
- **Pro**: Testing across devices, iOS versions, and size classes becomes trivial.
- **Con**: Snapshot testing introduces additional complexity to your testing setup.
- **Pro**: iOS-snapshot-test-case has tools for allowing a specified percentage of differing pixels, along with other cusotmization options.
- **Con**: iOS versions often include changes to text antialiasing, so your tests need to be tied to specific iOS versions. Updating reference images when you update your iOS versions introduces a lot of churn in reference image files, contributing to repo size bloat.
- **Pro**: Snapshot testing encourages you to write testable view controllers.
- **Con**: It's easy to overdo snapshot tests, _feel_ confident in your app's correctness, but not actually be testing the correct thing.
- **Con**: Snapshot test failures on CI can't be reviewed, since the image files aren't accessible (it's [not difficult to get around this with an S3 bucket](https://github.com/ashfurrow/second_curtain)).

END_WIDE

I have no regrets about our snapshot testing strategy, but others will have different approaches. A lot of the cons that I've outlined above have workarounds (one could, for example, store reference images in a submodule to mitigate repo bloat). And snapshot testing is really an open field: if you have an idea for a tool, you could probably build it on top of tools that already exist.

If you decide to try snapshot testing, I can't recommend [Kaleidoscope](https://www.kaleidoscopeapp.com) enough. Its integration into `git difftool` makes reviewing changes to reference images _before_ opening a PR really easy.

I hope that gives you a clear picture of what snapshot tests are and how they can be used as a part of a comprehensive testing strategy. It's a cliché, but snapshot tests are not a silver bullet. They will not be a replacement for unit testing. But they can help you write better code, be more confident in your product, and open up whole new ways to collaborate with non-developer colleagues. They're definitely worth learning about – a tool worth having in your toolbox.
