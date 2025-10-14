---
title: Joining Wealthsimple
date: 2025-10-14
banner: banner.jpg
---

I'm excited to announce that today is my first day working at [Wealthsimple](https://www.wealthsimple.com/)! I'll be working as a staff developer on their mobile app. [In a previous blog post](/blog/floating-on/), I teased that this role was a perfect fit for me. Today, I'm excited to share some details.

But first we need some context and a little background on React Native.

---

I started working with React Native at Artsy. [Orta and Eloy were keen on adopting it in 2016](https://artsy.github.io/blog/2016/08/15/React-Native-at-Artsy/), but I was very skeptical. So skeptical, in fact, that I found myself working on non-mobile Artsy projects. That's when I learned React on the web, and [that's when I came around to React Native](/blog/the-case-for-react-native/). I got on board with the vision that the two of them had started building. I started contributing to that vision and eventually I worked up to [leading the team that owned the whole app](https://artsy.github.io/blog/2020/09/29/becoming-mobile-first-at-artsy/).

One of the foundational principles that Orta and Eloy had established was that Artsy wouldn't use React Native where it led to a worse user experience; we'd use React Native only _where it made sense_, and use native iOS tech where _it_ made sense. Our goal was to create a great app, and React Native couldn't do that on its own. As a concrete example, the navigation stack itself was still in Objective-C (while the view controllers were slowly migrated to React Native).

That was (gosh) nearly a decade ago. React Native itself has gotten _much_ better, especially as tools like [Expo](https://expo.dev) have taken off. It's now easy for developers to access underlying native SDKs from JavaScript (like photo pickers, Spotlight integration, even augmented reality). But! There still remains a "last mile" in React Native, where native technologies _must_ be used _directly_ in order to build the best user experience. In 2016, maybe you could get 70% to a great UX in React Native alone. By 2020, maybe that had reached 90%. Today, maybe it's around 95%, or so? But I don't believe it will ever reach 100% for two reasons.

First is the platform vendors themselves. Apple and Google develop their own SDKs for building apps and would prefer you to use them. Now, React Native _uses_ those SDKs under the hood, but React Native itself doesn't fit in certain restrictive runtimes. Take widgets, for example. Or push notification extensions, or smartwatch apps, or any number of the small-but-deeply-integrated features that elevate an app from _good_ to _great_. (Even where it's _possible_ to fit a React Native runtime into these environments, you might not actually want to. I helped a team at Shopify build an [App Clip](https://developer.apple.com/documentation/appclip) in React Native; App Clips needed to archive down to under 10MB and fitting inside that constraint was a huge challenge. While the project was a technical success, the user experience wasn't great.)

Second is the irreducible complexity of a cross-platform development tool like React Native. This kind of tool needs to work across all kinds of platforms while not _feeling_ like a "lowest common denominator." The React Native project itself has made a lot of improvements here over the years. In case you weren't aware, please let me blow your mind: there is now synchronous, two-way interoperability between React Native's JavaScript runtime and native code. JavaScript can now communicate _directly_ with native code through object references 🤯 This has come a long way since React Native's original, asynchronous bridge where all communication was serialized over JSON. This advancement has led to huge performance gains that close the distance on that last mile – even if it can't close it entirely.

However. This fancy [new architecture](https://reactnative.dev/architecture/landing-page) comes with added complexity. You don't get end-to-end type-safe memory access between TypeScript and native runtimes without _at least a little bit_ of C++. Any app developer who's serious about delivering the _highest-possible quality mobile user experience_ will need to dive under React Native's JavaScript exterior and work in the underlying native stack, in C++, Swift, Kotlin... whatever it takes.

That's where I come in.

It's very rare to find a developer who is comfortable in _both_ React Native _and_ the underlying native SDKs. Mobile native developers tend to avoid React Native. On the other side, React Native developers tend to want to stay in JavaScript, avoiding native tech. There are exceptionally few developers out there with deep enough experience with native iOS that they could still write manual-retain-release Objective-C _and_ who have extensive experience building React Native applications in JavaScript. _And_ who enjoy working in both.

What I have to offer is an unbiased perspective. (Or at least, a less biased one.) Someone to help make the right decision for the product, whether it's native or React Native. Someone who is confident contributing at any level of the stack. And someone to help scale up a larger team with those same skills. I can't wait!

---

My new role will have a narrower focus with more day-to-day coding and [I'm expecting a greater career satisfaction](/blog/work-at-your-spikes/). I've learned that I _can_ do anything, but if I try to do _everything_, then my work suffers. I suffer. It's time to specialize in mobile UX again.

{% narrow %}

![Photo of (a younger) me at WWDC 2010.](./wwdc2010.jpg)

{% endnarrow %}

I'm also _really_ excited to be working in native technologies more often. I've followed every WWDC since I attended my first in 2010, but if I'm being completely honest, it's been hard to feel as immersed as I used to in Apple technology without working in native iOS day-to-day. My Swift skills are a little rusty and my SwiftUI skills... well, let's just say that I'm looking forward to sparring with Xcode again. In some ways, this will be a return to native iOS for me. But I'm not "going back", I'm using my experience to go forward.

{% narrow %}

![Photo of (a less younger) me speaking at mDevCamp.](./mdevcamp.jpg)

{% endnarrow %}

I'm really looking forward to ramping up with Wealthsimple. They have a great product for an underserved Canadian market. [Their stated culture](https://www.wealthsimple.com/en-ca/culture) describes the exact kind of environment where I can do my best work. Also, I've opened personal bank accounts in three countries so I also get to bring my experience banking in the US and Europe. When I moved home to Canada, I was surprised to see how little the big banks had changed in the seven years I lived away. Wealthsimple is pushing Canada forward here. They've built a quality app and have already done a lot to cover that last mile of React Native user experience – I can't wait to pitch in!
