---
title: Dropping Dropbox
date: 2016-05-30 16:23:22 UTC
og_image: /img/blog/dropping-dropbox/dashboard.png
background_image: /img/blog/dropping-dropbox/background.jpg
background_image_source: https://twitter.com/CloudyConway/status/737279203532541952
---

Dropbox is a jewel of the Y-Combinator industrial complex: a successful company that provides software as a service to ordinary people. They even allegedly [turned down an acquisition offer from Steve Jobs](http://techcrunch.com/2011/10/18/dropbox-said-no-to-nine-digits-acquisition-offer-from-apple-steve-jobs/). Their success is no small feat, but sadly it appears that they had to make a deal with the devil to achieve so much. 

From my perspective, the company has been acting suspiciously for a while. Appointing [George W. Bush's Secretary of State to their Board](http://bits.blogs.nytimes.com/2014/04/18/protests-continue-against-dropbox-after-appointing-condoleezza-rice-to-board/) was a big red flag. It inspired a whole [Drop Dropbox](http://www.drop-dropbox.com/) movement. I've been uneasy about Dropbox, but when they announced they'd be integrating in with my [operating system's kernel](https://blogs.dropbox.com/tech/2016/05/going-deeper-with-project-infinite/), I decided to move away from them. 

<!-- more -->

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Things I don&#39;t want: <a href="https://twitter.com/hashtag/Dropbox?src=hash">#Dropbox</a> up in my kernel. <a href="https://t.co/p4LV87cKYy">pic.twitter.com/p4LV87cKYy</a></p>&mdash; Dusty (@duspom) <a href="https://twitter.com/duspom/status/735263193497505792">May 25, 2016</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I've been trying to move away from online services that allow easy mass surveillance. For example, I started in 2012, when I [moved off of Gmail](https://ashfurrow.com/blog/switching-from-gmail-to-fastmail/). It's not been easy, I think in part because services that are popular are typically ad-supported – viewing your data is how they sell ads to you – this implies a lack of end-to-end encryption, and security in general. I've been tolerating Dropbox because it's so _damm_ convenient, but the kernel extension was the last straw, so I [asked for alternatives](https://twitter.com/ashfurrow/status/736936037876895744). 

The solution that appealed to me the most was [BitTorrent Sync](https://getsync.com). It's closed source (boo) but offers a good compromise between security and convenience. I decided to give it a try, and in the process I ran into confusing documentation and advice that would make me _less_ secure than using Dropbox. It really sucks that in order to _securely_ do something as commonplace as syncing files, you have to be pretty tech savvy. While I'm continuing to evaluate it for a sync solution (I haven't moved off Dropbox yet), I'm hoping this post will be a resource for anyone who wants to use BitTorrent Sync securely.

(But I'm hopeful that next month we'll see Apple show us some awesome end-to-end encryption features for iCloud Drive, too.)

I am not a security expert, so I've marked the aspects of this post that I'm not 100% sure of with [?] so that I can be honest about what I know. If you can verify – or correct – something I'm unsure of, please [let me know](https://github.com/ashfurrow/blog/issues/new) or [send a correction](https://github.com/ashfurrow/blog/compare). My hope is that this post can evolve to be somewhat authoritative instructions on how to securely sync files across devices, aimed at people who are computer savvy but maybe not familiar with server administration and security (like me).

## Overview

Okay, so BitTorrent Sync is a service that runs on computers and synchronizes files across them using BitTorrent. Cool. Their site isn't clear on this, but you [need to buy a license](https://getsync.com/features#compare) to sync across multiple devices. It's $40/year, but has a 30-day trial (that they only tell you about after you download the app). Yeah, documentation needs some work.

BitTorrent Sync is a really impressive service that provides a _tonne_ of awesome features. I'm probably not going to use most of them, but crucially, it provides secure syncing of files across computers and smartphones.

The BitTorrent protocol is inherently decentralized, so naturally syncing with BitTorrent is decentralized too. If you have two computers online, and add a file to one, then it'll get transferred to the other over a secure, encrypted connection [?]. But consider the following scenario:

1. Computer A is on, B is off.
1. Add a file to A.
1. Turn A off.
1. Turn B on.
1. The file isn't sync'd to B, because A isn't online to send it.

The solution to this is to have a computer that's running BitTorrent Sync that's always on. Unless you have a home server or colocated machine, you're going to have to use a virtual server. That's where Amazon Web Services comes in.

AWS is super-popular, but managing it is so infamously unfriendly that there's a [AWS in Plain English](https://www.expeditedssl.com/aws-in-plain-english) site to help. We're going to use EC2, their virtual server service. The best blog post I found to help this is [here](http://meltingice.net/2015/07/27/how-to-run-bittorrent-sync-on-aws/), and it's an excellent reference on how to set up BitTorrent Sync on a new EC2 instance (basically a virtual server). You get a year of free service from AWS, and after that it's about $10/month (when billed hourly – you can save money by [billing monthly or yearly](https://aws.amazon.com/ec2/pricing/)). 

The post has some great suggestions, like using a random, pre-configured port for BitTorrent Sync, and allowing incoming connections only on that one port and port 80 for administration. However, there are a few aspects to the post I think can be improved upon:

1. <p>The post recommends opening port 80 to the entire internet, exposing the BitTorrent Sync dashboard (and consequently, access to your files [?]) to anyone who provides the username and password, which are [stored on the server in plaintext](http://help.getsync.com/hc/en-us/articles/204762689-Running-Sync-in-configuration-mode#overview).</p><p>Further complicating this problem is the fact that to administer BitTorrent Sync, you send your username and password to the server over port 80 _unencrypted_, so anyone monitoring your traffic can see the auth details in plaintext [?]. Yikes.</p>

1. The server syncs your files _in plaintext_, so an attacker who gains access to the server, or an NSA employee issuing a subpoena to Amazon for your instance's filesystem [?], now has all your files. 

These problems can be pretty easily mitigated. First, though, I need to explain a bit more about how BitTorrent Sync works.

## BitTorrent Sync

The first time you start their app, you create an _identity_. Under the hood, BitTorrent Sync creates an [X.509 certificate](http://help.getsync.com/hc/en-us/articles/205451005) that's used to identify you and authenticate with computers you want to sync with, like your home desktop, work laptop, and smartphone. Nice. To link a new device to your identity, you use [a key in text or QR code format](http://help.getsync.com/hc/en-us/articles/205457815-Sync-Private-Identity-Linking-My-Devices). 

Your identity syncs folders across devices. Unlike Dropbox where you have one big folder, BitTorrent Sync lets you have many folders with different permission/sharing settings. Any machine with your identity has access to all your files, unencrypted.

The blog post I linked to suggests adding your identity to your new EC2 instance. I'm not sure this is wise, because an attacker who gains access to the instance now has your files. The process of adding the instance to your identity over unencrypted HTTP traffic also opens up concerns (I think the X.509 certificates mitigate this concern though [?]). My solution to this problem is to use _encrypted folders_.

## Encrypted folders

An [encrypted folder](http://help.getsync.com/hc/en-us/articles/207370466) is the perfect solution to this problem, and in fact, the docs recommend using encrypted folders for syncing with virtual private servers (which are [similar to EC2 instances](https://www.quora.com/Is-there-any-benefit-of-EC2-over-VPS-offered-by-dedicated-server-providers)). So let's do it!

An encrypted folder is just like a regular folder that BitTorrent Sync synchronizes across devices, except that it adds encryption to the file contents it syncs. But encrypted folders separates the encryption keys for syncing the files and the keys for decrypting the files once they're sync'd. Your _identity_ automatically has access to the decryption key. 

So my solution was **not adding my identity to the EC2 instance**. Instead, I gave it the "Encrypted Key" to sync with (under the share menu for the folder). This lets the EC2 instance securely sync the files _without_ having access to the decrypted version of the files. Nice. 

If an attacker (or Amazon) gains access to the instance, they don't have access to my BitTorrent Sync identity and they don't have access to my files in plaintext form. Awesome.

Encrypted folders does a _tonne_ to help security on my instance, but it's not my only concern with the setup instructions I found. Remember, administering the server over HTTP without encryption means an attack could sniff out my username and password from my traffic [?], so what's to be done?

## SSH Tunnelling

The blog post suggests opening port 80 to the entire internet, so anyone can access the BitTorrent Sync dashboard (provided they have your password, which they can sniff). I'd recommend limiting HTTP traffic over port 80 to _just_ the instance itself, so that no one from the outside world can access it at all.

But _you're_ in the outside world, right? So how do you access the dashboard? You use something called SSH tunnelling.

When you first create your EC2 instance, you're given a certificate to log into the machine over SSH. What I'm suggesting is to use SSH tunnelling with that certificate to redirect all traffic to your personal computer _over_ the SSH tunnel to the instance, where it'll be accessing itself locally. Basically, I want to go to `localhost:9000` on my laptop and have SSH redirect traffic over an encrypted tunnel _to_ the instance, where it'll try to access itself (the instance) on port 80. 

First, configure your security group in EC2 to restrict port 80 access to `127.0.0.1/0` (instead of `0.0.0.0/0`, which means "anyone").

![Security Policy](/img/blog/dropping-dropbox/security.png)

Then open a terminal and use the following command:

```bash
ssh -i path/to/your/certificate.pem -N -L  9000:ec2-XX-XXX-XXX-XXX.compute-1.amazonaws.com:80 ubuntu@ec2-XX-XXX-XXX-XXX.compute-1.amazonaws.com
```

This command redirects traffic from port 9000 locally over the SSH tunnel to port 80 on `ec2-XX-XXX-XXX-XXX.compute-1.amazonaws.com` on the other side of the tunnel. Modify `path/to/your/certificate.pem` to point to your actual EC2 certificate that was created when you launched the instance, and change `ec2-XX-XXX-XXX-XXX.compute-1.amazonaws.com` to be the public DNS of the instance.

![Dashboard accessed through SSH tunnelling](/img/blog/dropping-dropbox/dashboard.png)

Run the command and go to `localhost:9000` on your computer. With BitTorrent Sync is running on the EC2 instance, you'll be prompted for your username and password to access the dashboard. Since all the traffic is routed over the SSH tunnel, no one can sniff out the plaintext credentials.

## Wrap Up

It sucks that all this setup is necessary to use BitTorrent Sync on an EC2 instance, and it sucks that it costs money. Dropbox is easier and more convenient, and has a free plan that's pretty enticing for most users. If you've read this far, you probably take security seriously and don't want the NSA snooping on your sync'd files. To me, it's worth it. 

While I was critical of BitTorrent Sync's documentation, it _is_ a step in the right direction, and I hope they continue to make setup easier. As for AWS, there are other solutions like [DigitalOcean](https://www.digitalocean.com) that might be easier. Cloud server administration is a lot simpiler than it used to be, and combined with cool services like BitTorrent Sync, I hope we can all take a step towards and end-to-end encrypted future.
