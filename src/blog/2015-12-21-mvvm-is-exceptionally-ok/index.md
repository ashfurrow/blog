---
title: MVVM is Exceptionally OK
date: 2015-12-21
banner: background.png
bannerAttribution: https://twitter.com/CloudyConway/status/678384591930048512
---

Last week I saw a blog post float around called [MVVM is Not Very Good](http://khanlou.com/2015/12/mvvm-is-not-very-good/), and I specifically avoided reading it because I was having a not-great week and I was afraid I would take the blog post personally. Well, this morning I read the article and here I am writing a response to it.

So let's break this down. The post levels a few criticisms of MVVM:

1. MVVM is poorly-named.
2. MVVM invites many responsibilities.
3. MVVM doesn't change your structure.

I actually agree with all of these.

MVVM _is_ poorly named. Why don't we rename it? Great idea. MVVM is a pretty big "umbrella term", and precise language would help beginners get started.

When articles introduce MVVM, their focus generally is to get developers to move as much code as possible _out_ of view controllers. Since view controllers _do everything_ in MVC apps, there has to be a place to move _all that stuff_ in MVVM. Introductory articles on MVVM instruct newcomers to just cut-and-paste it to the view model.

That's a great start, but it's _just_ a start. Here are a few definitions aimed at MVVM newcomers:

> A **view controller** _only_ binds user interaction and data display.
>
> A **view model** is everything that your view controller used to do, _except_ for anything that directly touches the views.

We could definitely strive for more precise definitions, but the reason these ones persist is to make MVVM approachable for beginners.

Ok, so MVVM is poorly named and uses loose definitions, and that leads to some confusion. But that's fixable! Everything is fixable.

Next, does MVVM encourage objects that have many responsibilities? Sure, I guess it does. But again, the alternative that most iOS developers are familiar with is a massive view controller. So compared to MVC, MVVM is just telling you to use objects with _one fewer_ responsibilities, which is a step in the right direction!

I'll tackle this question later on, but Soroush links to his article [discussing ways to reduce view controller complexity](http://khanlou.com/2014/09/8-patterns-to-help-you-destroy-massive-view-controller/), which I really enjoyed. His main principle seems to be to separate distinct responsibilities into distinct objects, which is an _awesome_ idea.

There's nothing inherent to MVVM that precludes one from following his advice. In addition to view models, I also have [network models](https://github.com/artsy/eidolon/blob/master/Kiosk/Bid%20Fulfillment/PlaceBidNetworkModel.swift) that help keep view models to a minimum. But that breaks my above definition of view models, shoot! Looks like that question of definitions is bigger than I thought... I'll get to that in a future post.

So finally, the last claim is that MVVM doesn't change your structure. As evidence, Soroush links to [an article I wrote](https://www.objc.io/issues/13-architecture/mvvm/). My intention is to help readers understand that MVVM isn't unfamiliar, that it's a cousin of MVC. It's aimed at readers who need help taking the first step away from massive view controllers; the article's point was that MVC and MVVM essentially _are_ the same.

Despite this, I argue that moving to MVVM (keeping the existing app structure, plus view models) is _still_ a great idea. Separating as much code from the view layer as possible makes it _way_ easier to further factor those components into smaller-yet objects.

Separating out view models and view controllers isn't _just_ to make future work easier – it also provides you with an extremely important, immediate benefit: better testability. Now that view controllers are thin, you can use stubbed view models and [test your view controllers visually](https://cocoapods.org/pods/Nimble-Snapshots). Similarly, the logic in your view models is now far easier to test because it's not touching the views _at all_.

---

A statement like "MVVM is not very good" implies that "MVVM is worse than what we already have." But what we have are view controllers that are hundreds of lines long and do _everything_ in our apps. And MVC tightly binds all our app logic to UIKit and the `UIView` lifecycle, which makes them _incredibly_ difficult to test. As a result, they don't get tested. I don't blame us – [even the Ruby community struggles with this](https://www.youtube.com/watch?v=VD51AkG8EZw).

Learning to program is a journey with no end. I believe that for the iOS community, MVVM is one stop along that journey, a layover to _even better_ places. But these are _all_ just stops along a journey; we can't stop at MVVM, we have to keep moving.

However, the iOS community is _so stationary_ that it's very difficult to get everyone excited about this journey. So I've been trying to _just_ get people excited about the first stop.

> View controllers, ugh.<br />
> So untestable and bad.<br />
> Lo, MVVM.
>
> —Ancient MVVM Haiku

When I read Soroush's post this morning, to be honest I felt a bit attacked. But after reflecting, it's pretty clear that we both want the same thing. I can't speak for him, but I suspect that we're both frustrated by the slow pace of the community.

I hope that no one misinterprets my emphasis on MVVM as a belief that MVVM is the final destination. Far from it. I hope that by using MVVM, people are freed from the belief that they _must_ write software like Apple writes sample code, and we can keep the momentum up.

(Side note: I think one of the most beneficial decisions that Apple's made recently, from a developer community perspective, is to _not_ release a large amount of Swift sample code. Instead, they've left it up to us. This has really helped the community realize that we are in control of our own destiny.)

Is MVVM perfect? No of course not. Is it an improvement? I think so. And it makes other improvements a lot easier.

I'd rather have a 50-line view controller and a 400-line view model than just a 450-line view controller. A view model that long is doing _way_ too much, but it's a step in the right direction. And it makes following Soroush's [great advice on reducing view controller complexity](http://khanlou.com/2014/09/8-patterns-to-help-you-destroy-massive-view-controller/) way easier.
