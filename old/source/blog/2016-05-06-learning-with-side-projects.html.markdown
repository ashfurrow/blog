---
title: Learning with Side Projects
date: 2016-05-06 13:58:14 UTC
background_image: /img/blog/learning-with-side-projects/background.jpg
background_image_source: https://twitter.com/CloudyConway/status/727959731785113602
---

I'm a professional iOS developer – world class, if you believe my [about page](/about/). But while I have a  very particular set of skills building iOS apps, I want to be _more_ than just an "iOS" developer. I want to be a bit of a polyglot, to explore other communities and languages and frameworks. For fun, but also because it makes me better at my job. Diverse experience helps me identify solutions to problems I've seen elsewhere, and being a beginner in other skills helps me empathize with other developers.

My favourite way to branch out of iOS development is to build this site, my blog. I've gotten experience in Ruby, Haml, web design, site deployments, CDN configuration, SVG formatting, etc etc etc. What's really fun is when I get an idea for an improvement to make, and my skills are [perfetcly matched for the task](https://en.wikipedia.org/wiki/Flow_(psychology)).

(READMORE)

---

The other day, I got an [empty threat of a DDoS attack](https://twitter.com/ashfurrow/status/727999169827377153). Cloudflare, my awesome CDN provider, has a [great blog post](https://blog.cloudflare.com/empty-ddos-threats-meet-the-armada-collective/) explaining this scam. Now, my site is statically generated and uploaded to an S3 bucket, and then that bucket is behind Cloudflare, so even if the DDoS threat was credible, I'm protected. 

It got me thinking, though, what if someone bypassed the CDN and accessed my site directly by its S3 URL? I mean, what would the consequences be? I guess I'd be paying for S3 costs – bandwidth and stuff – but I have an AWS alert to let me know if my bill gets too high. It would suck, but I'd be fine.

The next day, Cloudflare emails me a newsletter and says they've got some new datacenter IP addresses; so if I use whitelisting, I need to add those addresses. "Huh," I thought, "that would mitigate any issues from an actual DDoS attack." 

After a few minutes of Googling, I was only my way to creating a bucket policy that would whitelist Cloduflare's IP addresses so you can't access ashfurrow.com.s3-website-us-east-1.amazonaws.com publicly except from Cloudflare. 

It was a little tricky, since no one tells you buckets are _public by default_. I had unsuccessfully tried "allow these IPs to access my bucket", when what I had to do was say "deny all _but_ these IPs from accessing the bucket." Thanks to [this blog post](https://pete.wtf/2012/05/01/how-to-setup-aws-s3-access-from-specific-ips/), I got it [working](https://github.com/ashfurrow/blog/commit/7ad9e51964bafad337167fc1fedcfb037d383d86) quickly. 

But Cloudflare notes that they periodically add new IP addresses, so I need to update the whitelist every now and then. I'm a person, so I'm dumb, and I'll probably forget things like that, so it would be _awesome_ if I could automate this process. 

Unfortunately, I had _actual_ work to do, so I [opened an issue](https://github.com/ashfurrow/blog/issues/206) with some notes, got back to work, and returned to the issue that evening. 

I'm already using Travis CI to [automate deploys](https://ashfurrow.com/blog/blog-transition-retrospective/) whenever a commit is made to the `master` branch on GitHub, so I already had the infrastructure to easily automate whitelist updates. So I broke it out into steps:

1. Grab the new whitelist.
1. Create a bucket policy with the IP addresses.
1. Update the policy on AWS.

After some trial-and-error with Ruby's [pry REPL](http://pryrepl.org), I had [finished](https://github.com/ashfurrow/blog/pull/207). Ruby's a great language for getting things done easily – I used it originally to format a plaintext list of IP addresses into a JSON array. I'm really glad that I've learnt enough Ruby to be effective and productive, even in environments where I'm not as experienced as iOS development. 

---

So that's that! My site is low-risk, low-effort way for me to explore the world of web development and infrastructure. It's fun and rewarding to step outside my comfort zone now and then; it gives me a sense of how my colleagues in the web world work. There are lots of ways to step outside one's comfort zone, but I like working on my site because I'm making something _real_, that's actually used.
