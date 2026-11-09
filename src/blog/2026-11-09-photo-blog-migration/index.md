---
title: Photo Blog Migration
date: 2026-11-09
banner: ./banner.jpg
---

In 2013, when it was still in beta, I signed up for [Exposure](https://www.exposure.co). This is a web publishing tool for photographers, to organize their work into photo blog posts. It does _a lot_ more than that, especially as they've added new features over the years, but I've only used its simpler options.

I've published dozens of photo blog posts on `photos.ashfurrow.com`, but fewer lately. Only seven since 2018, actually. But I didn't want to let my subscription lapse because I still had my beta discount, and I didn't want to lose my archive. The community aspect of it never clicked for me, but I know it does for others. The Exposure founder is also a great person and I liked supporting his business.

Over the years, I've contemplated a migration to combine the photo blog with this site, my "main" blog. It's never been the most important thing, so I never did it. It's also pretty complex, needing to both migrate content into my blog system _and_ design and implement the features that my photo posts used on Exposure.

Well, I finally had some free time and [I've done it](https://github.com/ashfurrow/blog/pull/547). My photo blog posts are now a part of [my blog archive](/blog) and have their own [photo archive](/photos). Every refresh gets a randomized banner photo. Redirects for existing URLs should all be working, so links to old photo blog posts should redirect. And the photo blog posts will appear as normal posts in my RSS feed.

I've spent hours arranging photos into the basic Exposure grid layout over the years, so I recreated what I needed here. This was a little tricky, since my site is statically generated instead of JS-rendered. Since I didn't use the advanced Exposure features, I didn't need to migrate much else. I'll miss the "Enjoy" button, granted. I'll publish one final post to the Exposure site for the few dozen people who signed up for email notifications on new blog posts.

I'm grateful to have had a place to organize my photographic ideas in Exposure. I'm glad that Luke created this company and I with them all the best. Thanks for giving my photography a home for the past 13 years. It's time for me to take care of that myself.
