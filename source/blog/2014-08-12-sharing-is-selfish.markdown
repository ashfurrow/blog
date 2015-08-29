---
title: "Sharing is Selfish"
date: 2014-08-12 00:00
---

OK, OK, not _all_ sharing is selfish, of course. A more accurate headline would have been _Sharing Can Be Selfish_, but I could have written _Four Mind-Blowing Reasons Why Sharing Makes You Rich_, so count your blessings.

So let's talk about the selfish benefits of sharing knowledge. To do so, we'll have to define what that actually means.

<!-- more -->

_Sharing knowledge_. Hmm.

I think that the benefits of sharing knowledge _for a price_ are pretty clear: you get paid. This includes people who write books, professional scientists, and those creepy bastards at Experts Exchange. So for the sake of argument, let's limit our discussion to _freely_ sharing knowledge. This would include, for example ...

- Releasing software under an open source license.
- Contributing to existing open source software.
- Posting answers to Stack Overflow questions.
- Writing blog posts, even if your blog doesn't have ads.

I'm sure there are others, but these are the big ones.

(Aside: what's really interesting to me is that the first two, probably the most important ones, are freely _giving away_ the primary product of software development. To my knowledge, this is truly unique to the software development industry. Designers don't typically open source their PSDs, civil engineers don't open source their building designs, and lawyers don't open source their law research. So when we talk about freely sharing knowledge, I think that it's awesome that this is occurring in the software development industry at a rate that is unprecedented in human history.)

So what are the benefits of sharing? What's in it for you? I've narrowed it down to four key benefits.

## Exposure

First up is the most obvious: exposure. When you share what you know, you put your name out there. You get Twitter followers. You get GitHub stars. You get a higher PageRank. Maybe some new RSS subscribers to your blog. Who knows. The point is that you get your name out there.

Why does this matter? Well, never underestimate the power of ego, but let's talk about tangible benefits. To do so, let's consider some examples.

My former employer, Teehan+Lax, gives away [tools](http://www.teehanlax.com/tools/) that they've developed. Primarily, the design source files for designing iOS interfaces. These have been used by thousands of developers all over the world and have helped make Teehan+Lax a household name of iOS design. These templates are even [integrated](http://www.teehanlax.com/blog/ios-7-gui-templates-will-ship-inside-of-sketch-3/) into Sketch 3. Now, when someone out there needs an amazing app design, they know exactly who to contact.

Too abstract for you? OK, well consider [objc.io](http://www.objc.io) and [NSHipster](http://www.objc.io) – two sites that were created in order to give away knowledge to the iOS developer community. Their organizers are now able to use their popular sources of information in order to promote books that they've written. By sharing some knowledge for free, they can use their sites to sell more of their books. Super-awesome!

## Validation of Ideas

This is actually one of my favourite benefits of sharing knowledge. When you share an idea, there are precisely two scenarios that may unfold:

- Your idea is awesome. You thought so already, but now you know for sure.
- Your idea could be improved. People point this out, and now you've learned something.

Over time, by exposing ideas to the world, you end up with better ideas. If you open source a component of an app that you've built, and someone points out a flaw, then your app just got better. Nice.

There is a danger, of course, in sharing ideas like this. What if someone really hates your idea? You could end up being [ridiculed](http://harthur.wordpress.com/2013/01/24/771/). After all, the internet is full of terrible, terrible monsters.

This will always be a danger, but you don't have to grow thick skin in order to be confident in sharing your ideas. Just follow these three steps in order to create a bullet-proof idea:

1. State your assumptions.
2. Explain what you tried first, and why it didn't work.
3. Explain what you ended up with, and why you think it's the best solution for your problem.

By explaining how you ended up at an idea, other developers are very likely to offer _constructive_ criticism. Maybe one of your assumptions is incorrect, or maybe your solution isn't the best because you were are unaware of a helpful API. If you explain how you arrived at a solution, then others can explain where you went wrong. It's like showing your work on math homework – even if you end up at an incorrect answer, at least you get partial credit for using the correct process.

In any case, this three-step process brings us to our next benefit of sharing.

## Research

Here is a key one, which heavily influences me when I teach. To illustrate how this benefit works, let me tell you a story.

Last year, in the lead-up to the iOS 7 launch, I wrote some [blog posts](http://www.teehanlax.com/blog/author/ash/) for Teehan+Lax. One of them was about the new custom UIViewController transitions API. This was a topic that I had identified as a great opportunity to write about: there was no WWDC sample code demonstrating how to use the API and, frankly, the WWDC presentation was very confusing.

I spent time investigating how to use the API, to understand its design and to test its boundaries. We released the [blog post](http://www.teehanlax.com/blog/custom-uiviewcontroller-transitions/) and its accompanying [GitHub project](https://github.com/TeehanLax/UIViewController-Transitions-Example), both of which became important sources for someone learning this new and confusing API.

Importantly I was now an expert in this API. Later, when I had to write a custom view controller transition for a project at work, I was able to draw upon that knowledge and complete the task quickly and accurately.

Often, when I begin to write about a subject, I don't really know what I am talking about. But in trying to explain the subject, I identify the gaps in my understanding, which makes it easy for me to fill them in. By sharing knowledge in well-informed blog posts, anyone can help teach _themselves_, with the benefit to others as a happy side-effect.

## Reciprocity

This is the final benefit to sharing knowledge, and it's one that I used when writing this blog post. I had a few ideas about the benefits of sharing, but I wanted to verify those ideas and to get some more.

> What do y'all consider the benefits of sharing knowledge via blog posts or open source software? I know what I think – what are your ideas?
> 
> — Ash Furrow (@ashfurrow) [August 12, 2014](https://twitter.com/ashfurrow/statuses/499104489211985920)<script async="" src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I was able to just ask Twitter what they thought and get people to give me _their_ ideas, _for free_. Why would anyone answer some asshole on Twitter? Well, there is a concept in evolutionary biology called [_Reciprocal Altruism_](http://en.wikipedia.org/wiki/Reciprocal_altruism). The idea is simple: you scratch my back, I'll scratch yours.

People who know me know that I share knowledge, and are more likely to share knowledge with me. So the next time I need ideas for a blog post, or a Stack Overflow question answered, or a GitHub issue clarified, I can rely on that social support network. Cool.

## Conclusion

I've laid out the four main selfish reasons that it makes sense for you to share what you learn. Of course, not only does it help _you_ when you share, it helps _everyone_. And if everyone gets better at this software development thingy, you'll get better, too. Rising tides lift all boats, after all.

I've been a long-time advocate for sharing what we learn, _while we learn it_. The fact is that at the very moment you acquire some piece of knowledge, you have a unique state of mind. You are undergoing the mental process of transitioning from ignorance to understanding and, I believe, are uniquely qualified _in that moment_ to teach others what you have just learned. You remember the exact state of mind you had before it "clicked" and can share the mental process that lead to that revelation. _Every_ developer out there should have a blog where they write about things that they – until very recently – did not understand.

