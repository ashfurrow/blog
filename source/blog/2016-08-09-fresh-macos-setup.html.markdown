---
title: Fresh macOS Setup
date: 2016-08-09 14:24:52 UTC
background_image: /img/blog/fresh-macos-setup/background.jpg
background_image_source: https://twitter.com/CloudyConway/status/762788174955413505
---

There are a bunch of things I do when I re-install macOS on a computer, or when I begin working on a new computer. I don't do this often, so it's easy to forget the steps. So I [documented everything in a gist](https://gist.github.com/ashfurrow/3865eed417a5fbe8402708e2c706eea6).

(READMORE)

I used to keep these steps in Notes.app but figured they should be public anyway (open source by default, right?) so here we are.

BEGIN_WIDE

<script src="https://gist.github.com/ashfurrow/3865eed417a5fbe8402708e2c706eea6.js"></script>

END_WIDE

One thing I've added recently, that's super-important to me, is to untrust a certain certificate. Blue Coat is a company that creates [internet surveillance and censorship software](https://en.wikipedia.org/wiki/Blue_Coat_Systems#Controversy) and Semantic gave them an intermediate CA certificate. That means they can sign arbitrary certificates that you're computer will trust (because your computer trusts Semantic, and Semantic trusts Blue Coat). 

BEGIN_NARROW

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">BlueCoat now has a CA signed by Symantec <a href="https://t.co/8OXmtpT6eX">https://t.co/8OXmtpT6eX</a><br><br>Here&#39;s how to untrust it <a href="https://t.co/NDlbqKqqld">https://t.co/NDlbqKqqld</a> <a href="https://t.co/mBD68nrVsD">pic.twitter.com/mBD68nrVsD</a></p>&mdash; Filippo Valsorda (@FiloSottile) <a href="https://twitter.com/FiloSottile/status/735940720931012608">May 26, 2016</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

END_NARROW

I'm not really into the idea of my computer trusting a company like Blue Coat, so I [follow the instructions](https://blog.filippo.io/untrusting-an-intermediate-ca-on-os-x/) to untrust this certificate. I highly recommend you do, too.

And I recommend you document everything you do to make your computer awesome! 
