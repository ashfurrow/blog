---
title: Moving Mastodon to Digital Ocean
date: 2017-04-14 00:14:01 UTC
background_image: /img/blog/moving-mastodon-to-digital-ocean/background.jpg
background_image_source: https://twitter.com/CrookedCosmos/status/852268664825008130
---

This morning [I wrote about](/blog/mastodon-hosting-migration-plan/) my plans to move from hosting [my mastodon instance](https://mastodon.technology) on Heroku to hosting it on AWS. Well I got some feedback, and I did some thinking, and I changed my plan, and then I actually did the whole thing! I'm now hosting on [Digital Ocean](https://m.do.co/c/4a83a8a7aedf) (referral link) and I kind of love it.

(READMORE)

My primary reason for moving hosts was cost. I really like Heroku, but you pay a premium for the convenience of it. That's why I planned to switch to AWS, but _turns out_ you can end up paying a lot for convenience on AWS, too. I found there were comparable costs for Redis and Postgres services between Heroku and AWS, the those were the two things I was expecting to save the most on.

I know that you save money when you roll up your sleeves and start administer your own database, but I didn't realize how much. Luckily, the Mastodon developers know administrating stuff is hard, so they have support for [Docker](https://www.docker.com).

Docker is _like_ a virtual machine (don't @ me) and the Mastodon developers include what are basically recipes for Docker containers to be built from, and to run from. Combined with [this blog post](http://digitalmind.io/post/deploying-mastodon-on-digital-ocean), I was able to get a test instance of Mastodon up within a half hour. 

Which, wow, that amazed me. I've historically had a lot of trouble deploying stuff, and this was amazing. I couldn't believe how quickly I had something working. But enough gushing over Docker.

I originally had a complicated migration strategy. Originally. Then, instead of doing a bunch of complicated configuration to get zero-or-near-zero downtime, I just took the instance down. The whole process took twenty minutes, and would have been shorter but I ran into problems importing the Postgres database backup. 

Things went well! I've got SSL set up like before, and also gained IPv6 support. Somehow, I guess, I lost the Redis database? I'm not sure, but things are working well enough that I'm not going to worry about it.

So how are things working? Well, I don't have a response time graph anymore but interactions feel a little slower. CPU utilization is peaking at 30%, and RAM is near 30% as well.

So what about the costs? Well, I'm currently running on a $40/month virtual machine, plus some backup, S3, and Mailgun costs, so I'm pegging it at $50–60, or about a third of what I was paying on Heroku. The VM has 4GB of RAM, 2 virtual CPUs, 30GB of SSD space, and 4TB of network transfer a month. Not bad! 

The constellation of Heroku Dynos and Add-Ons has been reduced to one virtual computer running contains each for Sidekiq, Rails-on-Puma, Redis, and Postgres. Everything is stored to the main disk but I may take a look at Digital Ocean's dedicated storage volumes soon.

I'm going to leave it running as-is and look at tuning or reducing costs until I have a solid baseline of how things are working. I kind of miss my Papertrail logs and my response time graphs, so I'll probably customize the code a bit. 
