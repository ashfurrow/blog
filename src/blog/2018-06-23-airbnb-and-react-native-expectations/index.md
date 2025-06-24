---
title: Airbnb and React Native Expectations
date: 2018-06-23
banner: background.jpeg
bannerAttribution: https://twitter.com/CloudyConway/status/1010127316805177344
---

By now, most iOS developers have probably heard the news that [Airbnb is moving away from React Native][airbnb]. It's kind of weird to see the reaction online – people are acting jubilant, almost _celebrating_ the announcement. I see some iOS developers on twitter practically _rolling their eyes_ at Airbnb for even _trying_ React Native. But I'm not here to talk about insularity of the iOS developer community, I'm here to talk about Airbnb's (quite excellent) blog posts.

These blog posts are excellent because Airbnb first lays out its expectations for React Native, and then explains how well the technology met (or failed to meet) those expectations. It's a thorough, honest discussion about how large teams evaluate technologies, as well as how those team live with the consequences of their decisions.

So I really like these posts, but I wouldn't say that they're _complete_. More on that later. First, I want to discuss Airbnb's actual expectations. I'm going to summarize them here, but you really, really should [read the posts yourself][airbnb].

Here are Airbnb's goals for React Native, which I'm interpreting as their expectations for the technology:

1. Allow us to **move faster** as an organization.
2. Maintain the **quality bar** set by native.
3. Write product code **once** for mobile instead of **twice**.
4. Improve upon the **developer experience**.

Okay, so how did those four things go? Well, I'll summarize again:

<Wide>

1. _"Engineers were able to move at an unparalleled speed"_, but also there were also technical and cultural hurdles that mitigated this success.
2. Again, a qualified success: _"we were able to accomplish a number of things that we weren’t sure were possible."_ But they point to the same technical challenges and a lack of internal engineering resources that frustrated their team sometimes.
3. This was a failure(**\***): _"we wound up supporting code on three platforms instead of two"_, which sounds grim. But also, _"only a small percentage of our app was React Native"_, meaning they had a lot of overhead for not a lot benefit. I want to discuss this expectation in more detail, but more on that in a minute.
4. A _"mixed bag"_, which some things being way easier and faster, while other things were worse.

</Wide>

(**\*Note**: my characterization of #3 as a failure has been disputed; you should go read [Leland Richardson's thread][thread] responding to me to get a really great, nuanced clarification of Airbnb's experience sharing code between Android and iOS.)

Okay so at first glance, this seems kind of promising, right? I mean, Airbnb says that "60% [of engineers] would describe their experience as amazing", so a _majority_ of your team is on board. But 5% were "strongly negative"? Interesting. Very interesting. We'll get back to this shortly, first let's talk about that third expectation.

The big point everyone is talking about is number three: Airbnb expected to be able to reuse code across Android and iOS but were let down. They wanted that "write once, run everywhere" experience. And that's the problem that I have with these posts and how they're being discussed.

React Native is [explicitly **not** "write once, run everywhere"][rn], although this is a common misconception. The idea that you can write one app and deploy to Android and iOS is attractive, and solutions like [Expo][] do exist to do that, but cross-platform code reuse is _not_ the central selling point of React Native. React Native is a "learn once, write everywhere" platform; instead of building one app for multiple platforms, the main selling point of React Native is that [it lets you use React][case].

And that's it.

So when people frame Airbnb's decision as a _failure_ of React Native, I wonder about how much they really understand about what React Native is _for_. If you have an expectation that a technology can do something that it's not designed for, and then you're disappointed when it fails to deliver, it's not really the technology's fault, is it? And further, if "only a small percentage" of your app even _uses_ that technology, then you don't get as much of the benefits.

I'm trying not to frame this as an Artsy-vs-Airbnb discussion, but it's hard to avoid the comparison because Artsy has had [such overwhelming success][artsy] with our React Native stack. I think a big part of that comes from how we structured our React Native code: all the JavaScript is in [its own repository][emission] and it [gets shipped as a CocoaPod][pod]. The [native app][eigen] just imports that pod and instantiates view controllers from it as if they were normal view controllers (because they _are_, their views just happen to be React Native components). Our native codebase was using React Native for a year before I even wrote _any_ JavaScript, which minimized the overhead for me, a person who was pretty unhappy that JavaScript was in Artsy's app at all.

And that kind of leads me back to culture. I think these blog posts do an excellent job of describing the _technical_ parts of their experience, but they lack a detailed description of non-technical barriers to adopting React Native.

What kind of barriers? Well, not to bring up the insularity of the iOS developer community again, but... iOS developers kind of have a reputation within the broader software industry. Charlie Cheever, [writing about this topic][charlie] from Expo's perspective, has this to say:

<Wide>

> [...] organizations where there are people who identify themselves strongly as iOS programmers and Android programmers have a really hard time being happy with React Native. **iOS programmers in particular are very unhappy** with it and generally **regard JS as an infestation** of the company’s codebase, while Android programmers have more mixed feelings.

</Wide>

(Emphasis added.)

When I see a majority of a team describe their experience as "amazing", and a very small (but very vocal, I'm sure) minority of the team describe it as "strongly negative", it really makes me wonder about the internal discussions about React Native at Airbnb.

And I get it, I really do. _I_ thought JavaScript was an infestation, too. It [took a long time for me to get over it][feels]. I mean, if you've been hired to write Swift/Objective-C and all of a sudden your team asks you to use JavaScript instead, it's natural to feel frustrated, or even angry. But you know what else? Engineers don't just write code, they _solve problems_. Of course engineers are going to have feelings about the tools their team use, and I think a future blog post should cover how Artsy worked to mitigate the cultural tensions between native iOS developers and our React Native choice. But I wish we'd keep our feelings in check a little bit more.

Airbnb's experience has been compared, [appropriately][spike], to a rejected organ transplant. If your company's culture is really, really into iOS native development, then the organ will be rejected.

The reasons that Airbnb chose to move away from React Native are cultural as much as they are technical, and while I understand why they didn't publicize these tensions, it gives the impression that Airbnb's decision was based entirely in technical merit. And that's just not the case.

[airbnb]: https://medium.com/airbnb-engineering/react-native-at-airbnb-f95aa460be1c
[charlie]: https://blog.expo.io/should-we-use-react-native-1465d8b607ac
[Expo]: https://expo.io
[spike]: https://twitter.com/spikebrehm/status/1010279535319879680
[case]: /blog/the-case-for-react-native/
[rn]: https://code.facebook.com/posts/1014532261909640/react-native-bringing-modern-web-techniques-to-mobile/
[artsy]: http://artsy.github.io/series/react-native-at-artsy/
[emission]: https://github.com/artsy/emission
[pod]: http://artsy.github.io/blog/2018/04/17/making-a-components-pod/
[eigen]: https://github.com/artsy/eigen
[feels]: https://ashfurrow.com/blog/swift-vs-react-native-feels/
[thread]: https://twitter.com/intelligibabble/status/1010948686501691393
