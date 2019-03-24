---
title: "Native iOS \"versus\" JavaScript: How to Learn From Other Programming Communities"
date: 2019-03-23 20:54:23 UTC
background_image: /img/blog/learning-from-other-programming-communities/background.jpg
background_image_source: https://twitter.com/CloudyConway/status/1106940840491081728
---

I started writing iOS applications in 2009. By 2012, I had immersed myself deeply enough in the world of iOS development that I had co-authored [a book on Objective-C](https://amzn.to/2UaTPx4). I took a great deal of professional pride in crafting delightful user experiences in iOS applications, and thought I would carry on this kind of work for a long time. (You can read the whole story [here](https://ashfurrow.com/blog/5-years-of-ios/)).

After I started at Artsy in 2014, I began branching out. Way out. I started helping the platform team maintain our Ruby/Node.js/Scala APIs that our iOS apps relied upon. Using JavaScript, I developed UIs for tools that helped Artsy build its business. I grew. Nowadays, I spend my time building "[roads and bridges](https://www.fordfoundation.org/about/library/reports-and-studies/roads-and-bridges-the-unseen-labor-behind-our-digital-infrastructure/)" to help my colleagues be productive in Artsy's React Native codebase (which is [open source](http://github.com/artsy/emission/)).

Let me put it to you this way: at companies with both iOS and web developers, those two groups often don't overlap. Or even interact all that much. They don't share programming languages, they don't share developer tooling, sometimes they are on entirely different teams from one another. They are _distinct_ teams with _distinct_ cultures.

In my work at Artsy, I no longer feel that distinction.

(READMORE)

My point is that my deep experience in both native iOS and JavaScript software development has given me an [uncommon perspective](https://ashfurrow.com/blog/perspective-of-the-polyglot/) of seeing both community's from the other one's perspective. When I write native iOS, I miss Jest and Prettier _so much_. When I write React, I miss Apple's polished profiling tools and their opinionated APIs. I have a foot in both worlds, and I try to share that perspective with other software developers.

You might think this sounds awful – that I only see the downsides of both platforms. And yeah, that's actually something [I've had to deal with](https://ashfurrow.com/blog/swift-vs-react-native-feels/). But it's not all bad: dual perspectives help me share the best that each world has to offer with the other. It's why Artsy's entire engineering team now has a [healthy, conservative policy](https://github.com/artsy/README/issues/117) about adopting new dependencies. It's why our web engineers, even if they've _never_ done iOS development before, can pitch in on iOS work when we have a tight deadline.

This "we all have so much to learn from each other" idea is kind of my whole... it's my whole thing. Like, if I had to distill the drive of my professional practice into a single sentence, it would be: "We all have so much to learn from each other." I care about this _a lot_. In 2014, back when Swift was still in beta, my [first ever talk on Swift](https://www.youtube.com/watch?v=LtrzZb5Jw0g) was a call to action: we Swift developers need to steal the best ideas from other programming language communities. [Moya](https://github.com/Moya/Moya) was one of those ideas.

And so when I saw [SE-250](https://github.com/apple/swift-evolution/blob/master/proposals/0250-swift-style-guide-and-formatter.md), a request from the Swift community to have ~~Apple~~ Swift develop an "official" Swift style guide and tooling to enforce it, despite existing [community](https://github.com/nicklockwood/SwiftFormat) [options](https://github.com/realm/SwiftLint), a distinction crystallized in my mind. It kind of hit me, actually. A huge difference between the cultures of the two communities.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">“You know, developing this software would be easier if we had X new tool...”<br><br>Ruby/JS Developers: “Yeah, let’s build it!”<br><br>iOS Developers: “Yeah, let’s ask Apple to build it!”</p>&mdash; Ash &quot;daCareZ0ne&quot; Furrow (@ashfurrow) <a href="https://twitter.com/ashfurrow/status/1108692951348191232?ref_src=twsrc%5Etfw">March 21, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

I did try to be value-neutral in my wording, though I admit that it's not obvious from what I wrote that I _do_ see value in both approaches. And this tweet _definitely_ generalizes both communities – there are folks with these attitudes in both camps. I followed up with this note:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">“This distinction exists“ != “this distinction is bad.” Software development is all about navigating tradeoffs ❤️ Being aware of those tradeoffs has only helped me grow as a professional.</p>&mdash; Ash &quot;daCareZ0ne&quot; Furrow (@ashfurrow) <a href="https://twitter.com/ashfurrow/status/1108705766033276928?ref_src=twsrc%5Etfw">March 21, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

This is really key: pointing out a difference _exists_ isn't the same thing as asserting "this is good" or "this is bad"; it's just "this exists." I'm endlessly fascinated by these differences and I've learned that you can only really learn from a difference if you approach it with an open mind and _genuine curiosity_. (This skill, of being interested while staying neutral, is something I learned in [cognitive behavioural therapy](https://ashfurrow.com/blog/all-i-can-say-is-im-excited/).)

Thank you to everyone who responded with their own perspectives; for the rest of the week, I had a lot of interesting discussions. I now have more to share about the distinction between JavaScript and native iOS – admittedly, Twitter was never the right medium to explore these nuanced ideas, so I've written this blog post! Let's dive in.

My absolute favourite reply came from Reginald Braithwaite, who compared the difference between native iOS and JS to the difference between renting and owning your home:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;You know, our residence would be better if we had X...&quot;<br><br>Homeowners: &quot;Yeah, project time, let&#39;s hit the home improvement store!&quot;<br><br>Tenants: &quot;Yeah, let&#39;s ask the landlord to do it!&quot;</p>&mdash; Reginald Braithwaite (@raganwald) <a href="https://twitter.com/raganwald/status/1108738516530298885?ref_src=twsrc%5Etfw">March 21, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

The reason I love this response is because I think there are benefits to _both_ renting and owning your home. I _like_ renting, actually, because it keeps me mobile – I can pick up and move from one city or neighbourhood to wherever I want. It's not for everyone, but it's right for me at this point in my life. (And I couldn't afford to buy a house in Manhattan anyway, so.)

I approached this response with that same open mind, and I realized that this is _the_ perfect metaphor for comparing native iOS and JavaScript development. Native developers get a _tonne_ of awesome advantages to having a single, authoritative platform owner; from that perspective, asking Apple to build a new tool to help iOS developers makes a lot of sense. But just like there are also disadvantages to renting, there are disadvantages to having Apple own your platform.

Similarly, there are advantages and disadvantages to owning your own home! And just as with home ownership, JavaScript confers its own set of advantages and disadvantages.

Personally, what makes these two distinctions (renting-vs-owning and native-iOS-vs-JavaScript) map so well onto each other is because I believe that **anyone unwilling to acknowledge the advantages _and_ the disadvantages of _both_ sides is trying to sell something**.

Not to mix metaphors _too_ much, but I was reminded of [this Steve Jobs WWDC Fireside Chat (25:02)](https://youtu.be/6iACK-LNnzM?t=1502) from 1997. Jobs also used the metaphor of a building to describe how software gets developed:

BEGIN_WIDE

> (With Apple's tools), you can build an app you couldn't build on any (other) platform. And, to me, this is the most exciting. (...) Because it's all about managing complexity. You're developers, you know that. It's all about managing complexity. It's like scaffolding, right? You erect some scaffolding, and if you keep going up and up and up, and eventually the scaffolding collapses under its own weight. That's what building software is. It's "how much scaffolding can you erect before the whole thing collapses under its own weight?" (...) We all know that. It's about managing complexity.
> 
> (Apple's) tools allow you to not have to worry about 90% of the stuff you've worried about, so you can erect your five stories of scaffolding, but _you're starting on story number twenty three instead of story number six_. You can get a lot higher. (Emphasis added)

END_WIDE

Jobs is saying that a team can only really build an app that's so complex, but they can start building from a higher starting point to build a building/app that nets out to be higher/better. Those starting stories of the building are Apple's tools and platforms. When I first saw this video a few years ago, so much of Apple's behaviour "clicked" for me.

Apple sees _themselves_ as landlords. Remember: no value judgement (I've had some bad landlords, too). They see their role as a provider of foundations, upon which software can be built; Apple benefits because better software built on their platform increases the value _of_ that platform. Developers benefit because they can make better software on those foundations.

So let's explore this a little bit. Apple is acting like a landlord, okay. As an iOS developer, I pay rent to Apple but I get to benefit from having an awesome home that someone else maintains. So what are the JavaScript developers doing? How does a home-ownership mentality affect how they build software?

Turns out, it affects it _a lot_. JavaScript developers feel a profound sense of _ownership_ over their tools and frameworks. No company owns the platform, so in a sense, _all_ JavaScript developers own it. I struggled to describe this ownership concept until Reginald Braithwaite's tweet; I owe him for helping me put words to this feeling.

When I write native iOS code, I _feel_ like a renter. When I write JavaScript code, I _feel_ like a homeowner. With all the benefits and drawbacks of each.

While Apple might be able to provide a great foundation, _I'm a roads-and-bridges kind of developer_. I want to be able to improve my own tools, and I often find myself frustrated. Apple might have those twenty three stories to build on top of, but the JavaScript ecosystem is _huge_ and they're questioning the idea that you can only build so much complexity before it collapses under its own weight. That's great – I love questioning dominant paradigms! But it's also terrifying. Used responsibly, JavaScript can be used to start on a higher floor than native iOS development _and_ help you erect _ten_ stories of scaffolding – all on a platform _you_ own.

With all that said, with open hearts and clear minds, I'd like to share some of the practical affects of this rather philosophical distinction. What _are_ the actual advantages/disadvantages to both native iOS and JavaScript? In what's sure to make everyone mad, here are some concrete things I think make native iOS and JavaScript development both amazing and awful.

BEGIN_NARROW

<div class="chatparent">
  <div class="responsive-html5-chat">
  </div>
</div>

END_NARROW

This isn't a compressive list, and my opinions are constantly evolving. I try to be aware of my biases and blindspots, and I try not to assume that my experiences apply universally. These observations are obviously based on my experience of moving between iOS and web, which isn't typical.

What's important is that when you see a difference between what you know and what someone else knows, you approach that with an open mind. Don't jump to conclusions. Be curious about differences and always look for something you can learn.

BEGIN_WIDE

> In the beginner's mind there are many possibilities, in the expert's mind there are few. —Shunryu Suzuki, _Zen Mind, Beginner's Mind_, 1970

END_WIDE

If you're an expert in one thing, it's going to feel uncomfortable to branch out and become a beginner again. It was terrifying for me. But if you push through that discomfort, you can gain valuable perspective that will only help you be a better professional.
