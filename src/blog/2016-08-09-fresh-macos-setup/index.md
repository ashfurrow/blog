---
title: Fresh macOS Setup
date: 2016-08-09
banner: background.jpg
bannerAttribution: https://twitter.com/CloudyConway/status/762788174955413505
---

There are a bunch of things I do when I re-install macOS on a computer, or when I begin working on a new computer. I don't do this often, so it's easy to forget the steps. So I [documented everything in a gist](https://gist.github.com/ashfurrow/3865eed417a5fbe8402708e2c706eea6).

I used to keep these steps in Notes.app but figured they should be public anyway (open source by default, right?) so here we are.

<Wide>

<script src="https://gist.github.com/ashfurrow/3865eed417a5fbe8402708e2c706eea6.js"></script>

</Wide>

One thing I've added recently, that's super-important to me, is to untrust a certain certificate. Blue Coat is a company that creates [internet surveillance and censorship software](https://en.wikipedia.org/wiki/Blue_Coat_Systems#Controversy) and Semantic gave them an intermediate CA certificate. That means they can sign arbitrary certificates that you're computer will trust (because your computer trusts Semantic, and Semantic trusts Blue Coat).

<Tweet tweetID="735940720931012608" />

I'm not really into the idea of my computer trusting a company like Blue Coat, so I [follow the instructions](https://blog.filippo.io/untrusting-an-intermediate-ca-on-os-x/) to untrust this certificate. I highly recommend you do, too.

And I recommend you document everything you do to make your computer awesome!
