---
title: "Apple Rejecting iOS Apps with Dropbox Integration"
date: 2012-05-02 00:00
---

It looks like Apple is [rejecting](http://www.macstories.net/stories/11-13-and-the-dropbox-sdk/) some apps which contain Dropbox integration. Why? The mobile authentication page accessible from the app has a link to the normal authentication page, which has a link which eventually leads to a place you can buy a Dropbox subscription (not via Apple's In-App Purchase mechanism). This ostensibly violates Apple's rules, so the apps were rejected. <!--more-->

This rule has been around for a while now and, at first glance, it looks like Apple is starting to enforce it more rigorously. Internet nerds are running around screaming about Walled Gardens and anticompetitiveness and iCloud lock-in.

Whatever.

I don't think that's the case. There are other apps with Dropbox that are getting approved without incident, so it's not a policy change. I'd say it's more likely that one app reviewer got a little overzealous or was new and rejected the app.

It's true that Apple has used app store rejections in the past to [start enforcing rules](http://thenextweb.com/apple/2012/03/29/confirmed-apple-now-rejecting-apps-for-use-of-udid-start-finding-alternatives/) (which were previously in place, though unenforced). This behaviour really sucks from a developer's perspective, and I do agree that it's irresponsible for Apple to use the app rejection mechanism as a way to communicate policy changes. I'd even argue that the approval/rejection mechanism is a really bad way for Apple to provide app feedback at all. The dichotomy of "Approved" vs "Rejected" can be ambiguous and leaves no room for comprehensive feedback. Something like "nice app, it's approved this time, but we'd like it if X Y and Z" would be a huge improvement.

When we saw the UDID scandal, apps were unilaterally being rejected. Here, many apps with Dropbox integration are still getting through. I've had apps rejected for this same rule because of a "Forgot Password" link; clarifying how ridiculous this was with Apple lead to an easy approval. There's no proof of a change in Apple's In-App Purchase policy enforcement, so I'm not going to throw out my WWDC ticket just yet.

Being an iOS developer is at once really awesome and really shitty. In the start-up frenzied tech world of 2012, you're essentially a rockstar; employers will fall over themselves to get you. However, you have to jump in bed with Apple and their schizophrenic and randomly enforced policies. Apple makes a lot of business decisions I find reprehensible, but I live with them.

Every once in a while, iOS nerds are reminded that, while the benefits of developing for iOS outweigh the costs of dealing with Apple, there _are still_ costs involved and you do have to live with them. If you personally find the costs too high, there are [plenty of companies looking to hire you](http://500px.com/jobs).

S go ahead and make some noise; get Apple's App Review Team lead to slap the wrist of whoever overstepped the line. Just remember that no one is holding a gun to your head.

<!-- more -->
