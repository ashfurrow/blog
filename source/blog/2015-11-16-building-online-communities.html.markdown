---
title: Building Online Communities
date: 2015-11-16 00:44:46 UTC
background_image: /img/blog/building-online-communities/background.png
background_image_source: https://twitter.com/CloudyConway/status/665704240350932992
---

I've been giving a lot of thought to community-building within the context of open source software. Ideas have been bouncing around my head for some time and lately I've been trying to make sense of them, to articulate them clearly.

<!-- more -->

The other day I tweeted this:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">I was writing a message and accidentally called CocoaPods a “decency manager.“&#10;&#10;I’m not entirely wrong.</p>&mdash; Ash Furrow (@ashfurrow) <a href="https://twitter.com/ashfurrow/status/664180055778660352">November 10, 2015</a></blockquote> 

Haha, yeah, that's funny, but it's also kind of true, isn't it?

I mean, like, [Linus Torvalds](http://arstechnica.com/business/2015/01/linus-torvalds-on-why-he-isnt-nice-i-dont-care-about-you/) would've been told to leave the CocoaPods community for violating its [Code of Conduct](http://cocoapods.org/legal). That tickles my brain a bit.

<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p lang="en" dir="ltr">CocoaPods isn’t a dependency manager, CocoaPods _makes_ a dependency manager in addition to all the other stuff.</p>&mdash; Ash Furrow (@ashfurrow) <a href="https://twitter.com/ashfurrow/status/664180152352509953">November 10, 2015</a></blockquote>

I've seen a lot of positive community-building while hanging out with the CocoaPods core team members. I've witnessed the organization, as a whole, promote and normalize online, team-based problem-solving in the iOS developer community. 

CocoaPods is a dependency manager only in the sense that Apple is a cell phone manufacturer – it's just one of their many projects.

Watching the team work, I've realized that the role of an OSS leader doesn't necessarily have _anything_ to do with code. Good communities don't happen by accident, it takes purposeful work and planning.

<blockquote class="twitter-tweet" data-conversation="none" data-cards="hidden" lang="en"><p lang="en" dir="ltr"><a href="https://t.co/8uUEb4Ny1n">https://t.co/8uUEb4Ny1n</a> shows hackathons, bug jams, automated online documentation, meetups, test jams, pechakuchas, and more.</p>&mdash; Ash Furrow (@ashfurrow) <a href="https://twitter.com/ashfurrow/status/664180241942913025">November 10, 2015</a></blockquote>

In a broad sense, their goals are to get people to work together. After all, that's something like a core tenant of open source software. Making a dependency manager is just _one_ way to get people collaborating.

<blockquote class="twitter-tweet" data-conversation="none" lang="en"><p lang="en" dir="ltr">I’d argue CocoaPods is making us all more decent developers and more decent human beings.</p>&mdash; Ash Furrow (@ashfurrow) <a href="https://twitter.com/ashfurrow/status/664181353374724096">November 10, 2015</a></blockquote> 

By "more decent," I really mean "better." Obviously, "better" is subjective, but I'd argue that (for example) good communication skills, unit testing, and documentation are all important parts of being a good developer.

More general than those specific practices, "better" means the ability to work at a higher level than Apple says is necessary. "Better" means [fixing our own problems](https://github.com/Realm/jazzy) instead of just complaining. "Better" means [contributing to a community](https://github.com/facebook/ios-snapshot-test-case/pull/53).

CocoaPods' message is really that while the [Cocoa Core Competencies](https://developer.apple.com/library/ios/documentation/General/Conceptual/DevPedia-CocoaCore/) are a necessary foundation, they aren't sufficient to be a good iOS developer.

---

The other day, I was reading over my site, looking for things to spruce it up, and I ended up making a [change](https://github.com/ashfurrow/blog/commit/05f4c8af7a3037fe7d555e67a6a3d8e3593ae04e#diff-4fd6f0e1381366f10be0d96003f6fdabL100) on my portfolio. I still had [my original thoughts on community participation](https://github.com/ashfurrow/blog/pull/39), which were good but unrefined.

I knew then that community participation was important, but I've since reflected on what that actually means. I've now [articulated my definition of _good_ community participation](/blog/minswan-for-ios/) and have worked to adhere to its principles.
 
To a large degree, I think this has been a natural progression of my existing ideas and background. I already believed in [open source by default](http://code.dblock.org/2015/02/09/becoming-open-source-by-default.html) but now I've taken time to reflect on [why its important to me](https://www.artsy.net/article/remy-ferber-open-sourcing-company-culture-at-artsy).

But this shift has also been absorbed via osmosis from my peers and mentors, a few of whom I even have the pleasure of calling "colleagues."

One thing in particular that's had a large impact is Justin Searls' talk [_The Social Coding Contract_](https://www.youtube.com/watch?v=e_-qV8waPVM), which discusses the logistics of building OSS communities. I highly recommend it.

BEGIN_WIDE

YOUTUBE e_-qV8waPVM

END_WIDE

After seeing this talk, I made a few big changes to a project I led. 

- I transitioned [Moya](https://github.com/Moya) to be its own organization so the project could belong to the developer community. 
- Whenever someone had their pull request merged into Moya, I gave them push access to the repository so they felt a sense of ownership.
- I worked with the contributors to define a set of [contributor guidelines](https://github.com/Moya/contributors) to make sure the community grows in a positive direction.
- Now I'm encouraging other contributors to review pull requests and discuss features without my input.

As a result of these changes, there are more people reviewing pull requests, planning features, and discussing how to write a better networking library in Swift. The [project](https://github.com/Moya/Moya) currently has 1541 stars on GitHub with 45 contributors, spanning 36 releases. It's been downloaded [over ten thousand times](https://cocoapods.org/pods/Moya).

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">The project should be able to function entirely without me.</p>&mdash; Ash Furrow (@ashfurrow) <a href="https://twitter.com/ashfurrow/status/665222377425498112">November 13, 2015</a></blockquote>

These aren't radical or new ideas. I've believed in open source by default for some time. But believing in something isn't enough to make it happen. It takes planning and consistent action.

I've been surrounded by other developers trying to make better open source communities, but I'm only now really appreciating the depth of their thoughtfulness.

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
