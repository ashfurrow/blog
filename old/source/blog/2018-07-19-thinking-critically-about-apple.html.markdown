---
title: Thinking Critically About Apple
date: 2018-07-19 14:15:03 UTC
background_image: /img/blog/thinking-critically-about-apple/background.jpg
background_image_source: https://twitter.com/CloudyConway/status/1018608204488564736
---

Yesterday I tweeted a complaint I had about Apple's iOS SDK. My complaint highlighted one instance of a larger trend in Apple's behaviour towards their SDK design and documentation; I'm far more interested in the trend than I am in any given SDK issue.

(READMORE)

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Apple&#39;s stubborn refusal to provide a simple API to determine if you&#39;re on an iPhone X causes developers to check for hardcoded screen dimensions, which is worse than developers making device-specific layouts. Don&#39;t @ me.</p>&mdash; Ash Furrow (@ashfurrow) <a href="https://twitter.com/ashfurrow/status/1019631126585978881?ref_src=twsrc%5Etfw">July 18, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

Despite my request to not be replied to, people did. They really seemed to want to discuss the specifics of this issue. But, to repeat myself: I don't care about this specific complaint, I care about the larger trend.

So what is that trend? Well it's complicated and it involves critical thinking; if you've never thought critically about Apple before, this might seem like a really weird thing to complain about, but here's my issue:

Apple designs its SDK based on how Apple wants the community to build software. However, sometimes the way Apple wants you to build things and the way you want to build things is going to differ.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I really wish &quot;you should think critically about Apple&quot; weren&#39;t such a hot take in the iOS developer community, but here we are.</p>&mdash; Ash Furrow (@ashfurrow) <a href="https://twitter.com/ashfurrow/status/1004406015956221953?ref_src=twsrc%5Etfw">June 6, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

This attitude Apple has ("you can either build how they want you to build, or get out") obviously has advantages and disadvantages. I'm not saying it's absolutely bad, I'm saying that _I_ am often frustrated by it. My complaints on twitter are not meant to deride Apple, but rather to draw the community's attention to how Apple's motivations and their own motivations are not the same. (This fact seems obvious to me but I often get pushback from community developers, which boggles my mind.)

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Thinking critically about Apple would involve asking questions about their decisions. Let’s take how they deprecated OpenGL for example. Who does this benefit? Who does it harm? What are the implications? Those sorts of questions need to get asked.</p>&mdash; Ash Furrow (@ashfurrow) <a href="https://twitter.com/ashfurrow/status/1004708649896435712?ref_src=twsrc%5Etfw">June 7, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

Sometimes, when trying to define a problem with how you work, it's helpful to step outside your experience and get a different perspective. Let's contrast how Apple treats its SDK design with another platform: React.

Whereas Apple's philosophy could be characterized as "this is how to build software for our platform, take it or leave it", React could described with "this is how to build software for our platform, but sometimes you might need to escape our abstractions, and here's how to do that." You might think I'm being hyperbolic, but let's look at the docs for [imperatively accessing DOM elements outside of React's lifecycle](https://reactjs.org/docs/refs-and-the-dom.html). The technical details don't matter here – just pay attention to their tone:

> Your first inclination may be to use refs to “make things happen” in your app. If this is the case, take a moment and think more critically about where state should be owned in the component hierarchy.

And:

> In rare cases, you might want to have access to a child’s DOM node from a parent component. This is generally not recommended because it breaks component encapsulation, but it can occasionally be useful for triggering focus or measuring the size or position of a child DOM node.

That's a huge shift from Apple's approach to, for example, the iPhone X API that I tweeted about yesterday. React's docs caution you against overusing this escape hatch from their SDK, but they also explain in detail how to do it.

Maybe it's just me, but this difference is really striking. It exemplifies the distinction that I'm trying to highlight.

I'm not saying Apple needs to change or that you need to change your mind or anything. Not everything I say is meant to be persuasive. All I'm saying is: Apple is its own company with its own motivations. Do not forget that, and do not conflate what's good for you with what's good for Apple.
