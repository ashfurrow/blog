---
title: Mastodon Administration
date: 2017-04-05 22:44:43 UTC
background_image: /img/blog/mastodon-administration/background.jpg
background_image_source: https://twitter.com/CrookedCosmos/status/849109805079949312
---

Yesterday I [wrote](/blog/mastodon/) about starting my own Mastodon instance. It's like a federated Twitter. 

I wanted to create a place for tech folks to hang out, but I don't have a lot of experience with server administration. So I chose Heroku. Things have gone... okay.

(READMORE)

I've run into a number of scaling issues, 500 errors, questions I don't know the answer to, yikes. So I've spent time searching for answers, scaling up Heroku Dynos, Redis installs, and Postgres databases. 

BEGIN_WIDE

![Resources](/img/blog/mastodon-administration/resources.png)

END_WIDE

My hope is that these resources will be sufficient for some time while the community scales. I'm planning on starting a Patreon to help cover the hosting costs, and maybe even a little of my time. But I don't want to start asking for help unless I'm certain that this is something I want to build in the long run.

These are the metrics for the Heroku app. The red numbers worry me. We'll see how things go.

BEGIN_WIDE

![Metrics](/img/blog/mastodon-administration/metrics.png)

END_WIDE

At first I was really overwhelmed because things weren't always running perfectly. Then I realized that this is just a process, an experiment, and I should relax. People have been thanking me for setting up the instance, which has felt really nice. Even if this space turns out to be ephemeral, it's still its own community, and creating that community is really rewarding.

Once I accepted that the instance won't be around forever, that at some point in the future it _will_ shut down (all websites will eventually), once I accepted that fact, things became a lot less stressful. So what if GIF uploads aren't work, or 2FA is broken? I'm opening GitHub issues to ask for help, and I'm getting helped. I'm contributing back documentation improvements. I'm learning a _tonne_ about how to administer websites through firsthand experience and experimentation. And I'm helping contribute to an entire community of online communities.

So [join](https://mastodon.technology), if you like, in a social media experiment and experience. It might not last – but nothing does – and in the mean time, you can have fun and meet new friends. 

If you're keen, I'm going to need help. Things on my agenda are:

- define a code of conduct.
- help to establish community norms.
- respond to reported users.

If you're interested in helping, let's chat.
