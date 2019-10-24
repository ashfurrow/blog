---
title: Swift vs. React Native Feels
date: 2017-02-11 18:12:20 UTC
background_image: /img/blog/swift-vs-react-native-feels/background.jpg
background_image_source: https://twitter.com/CloudyConway/status/828776172255338497
---

So this past week, my colleague Orta wrote a blog post, [Retrospective: Swift at Artsy](http://artsy.github.io/blog/2017/02/05/Retrospective-Swift-at-Artsy/). It's a long read, but worth it. The post describes _why_ we made the decision to move all new development into React Native instead of Swift.

So here's my side of the story: my team make a decision I disagreed with, but it turned out to be the right decision for us. I had to come to terms with that.

(READMORE)

See, I like Swift. I liked it from the day it was announced because [it wasn't Objective-C](https://ashfurrow.com/blog/we-need-to-replace-objective-c/). I pushed for us to adopt it at Artsy, and [the code we wrote](https://github.com/artsy/eidolon) there has become a landmark for the entire OSS community.

So when Eloy proposed writing apps in JavaScript – _JavaScript!_ – I was unenthusiastic. However, Eloy is the most pragmatic and level-headed developer I know, and he reached the decision to move to React Native after months of careful study, so I kept an open mind. And I'm glad I did.

I decided to look into JavaScript and started contributing to JS web projects at Artsy last year. And I was surprised to see that the modern JS development workflow is _slick_. Like, _really slick_. The tooling has been built with developer experience front of mind, and it shows. Orta goes into more detail in his post, but suffice it to say that compared to Xcode and Swift development, the JS workflow is matured and polished.

After getting some first-hand experience with JavaScript, and learning more about [React Native, Relay, and GraphQL](http://artsy.github.io/blog/2016/08/15/React-Native-at-Artsy/), I was on board with using React Native at Artsy. The decision made sense, from our perspective. And it might not from yours – that's okay! Each team has different priorities and will make different compromises. 

However...

I still had trouble accepting the decision, even after I agreed with it. At Artsy, every line of Swift I write now is legacy code, and that's a new feeling for me. I don't like it.

Swift is awesome and it sucks to _feel bad_ writing it. It's something I've had to get used to, I guess my honeymoon with Swift had to end sometime.

I want Swift to succeed, and I still think it will. It's a great language with a kick-ass community, backed by a company with a vested interest in seeing it explode in popularity. 

As luck would have it, Artsy needs someone to maintain all their Swift code, so I'll be writing Swift for a long time 😉 

And I have to acknowledge: I really enjoy the JS workflow. JS had a decades-long  head start, and I hope Apple engineers are looking to close the gap. ([Hint hint](http://isxcodeopensourceyet.github.io)).
