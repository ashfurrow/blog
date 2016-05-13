---
title: "Let's Steal Other Developers' Best Ideas"
date: 2016-05-12 23:41:10 UTC
background_image: /img/blog/lets-steal-other-developers-best-ideas/background.jpg
background_image_source: https://twitter.com/CloudyConway/status/728333617999564800
---

Last week, I was getting some weird behaviour from an Artsy websocket API. The API is written in Scala, a language I'd never used before. With some help from colleagues, I was able to debug the strange behaviour and isolate its cause – but I didn't want to make any changes on my own. While I've wanted to dip my toes further into web development for a long time now, I've been really nervous about making a mistake.

Then yesterday happened.

<!-- more -->

I’ve been working on a new feature for Artsy’s iOS app ([GitHub](https://github.com/artsy/eigen)) which accesses our API using [GraphQL](http://graphql.org). This is a pretty new technology that allows server APIs to be defined in such a way that makes writing queries expressive and type-safe. It’s _really_ cool.

BEGIN_WIDE

![An example GraphQL query and response.](/img/blog/lets-steal-other-developers-best-ideas/example.png)

END_WIDE

But our GraphQL project ([GitHub](https://github.com/artsy/metaphysics)) was missing a feature we needed. Normally I might've just opened an issue or nudged another engineer to do it for me, but the rest of my team was at a conference. Orta and I were pairing at the time and he suggested we ought to just add the feature ourselves. This is exactly the kind of push I needed.

See, I have a passing familiarity with Javascript, but it’s mostly _old_ Javascript, stuff I learned in high school. Artsy’s GraphQL project is written in Node and uses [ES6](https://github.com/lukehoban/es6features), which is to the Javascript _I_ know as Swift is to Objective-C. Even when I wrote a Node/Express/MongoDB [app](https://ashfurrow.com/blog/35mm-launch/) three years ago, I used _old_ Javascript. I used the tools I was familiar with and only learned the new stuff I absolutely had to to build the server components. I wasn’t that familiar with the Node and Javascript ecosystems, and they have changed a tonne since then. 

So this is _basically_ a language I’ve never used before. 

On top of a brand-new framework neither Orta or I have used.

And it was _awesome_. 

In under two hours, Orta and I had [submitted a pull request](https://github.com/artsy/metaphysics/pull/243) which added the feature we needed, including test coverage. 

It wasn't easy. In fact, I was uncomfortable the whole time. I was so mentally exhausted afterwards that I had to go for a walk before I could think clearly. But it was an _amazing_ experience and I had _so much fun_. 

There are some things that were just so strange to me as an iOS developer. For example, part of the project's unit testing included linting so that the codebase stays uniform and consistent. For a beginner like me, it was super-helpful, giving me updated syntax for the old Javascript I was using. And when I submitted the pull request, I didn't have to worry about messing up the project with my terrible code, because that kind of feedback has been automated.

And running the tests was _so fast_. From command line to completing the whole test suite took, like, two seconds. I could've easily setup [rerun](https://github.com/alexch/rerun) or [grunt](http://gruntjs.com) to automate tests so whenever I changed a file, the tests related to _just that file_ would be re-run. Can you imagine how cool that would be, if Xcode could just give you a constant reassurance that things are still working, that you've not broken anything? Or even that what you intended to break is indeed broken in the way you expect it to be? 

(Side note: Orta and I have talked with other developers about [creating something like this](https://github.com/artsy/mobile/issues/26), but it's a very large project.)

We iOS developers are stuck manually invoking tests, which need to be compiled then be installed in the simulator then be launched then be attached to then blah blah blah. I have always agreed that shortening the run/debug cycle is important, but yesterday, I got to experience near-instantaneous feedback. 

Now that I'm back writing Swift, I miss it. I miss the linting and the tooling – the Javascript community has an awesome mentality that encourages building and sharing awesome tools.

---

Developers of all stripes have laughed at the Javascript community, at Node and left-pad. I've laughed at them. But _daaaaaaamn_ their tooling game is _solid_. 

I can even maybe almost see myself picking awesome tooling over a real type system. 

Joking aside, I hope that someday, the Swift community will have both.
