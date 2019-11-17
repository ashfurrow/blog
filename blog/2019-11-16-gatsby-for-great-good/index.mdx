---
title: Gatsby For Great Good
date: 2019-11-16
banner: background.png
bannerAttribution: https://twitter.com/CrookedCosmos/status/1195084434170687511
---

I have been a blogger for most of my adult life (a dubious honour) and have, over a decade, used a variety of blogging platforms. My first blog, hosted on BlogSpot and please don't go looking for it, centred around my personal explorations of atheism. When I started blogging about software development in 2011, I had the foresight to [start a new blog](/blog/transitioning-from-attero-ingorantiam/), this time using a self-hosted Wordpress installation.

Wordpress worked well for a few years, until my installation got hacked and `ashfurrow.com` started advertising knock-off handbags. Since I was focused on learning iOS development at the time, I [migrated to Squarespace](/blog/moved-away-from-wordpress/). This let me outsource the design, hosting, and security aspects of my blog which let me focus on what I cared about most: my writing.

Several years (and a few jobs later), I had developed an eye for design and some HTML+CSS+Ruby skills. The tradeoffs that Squarespace made – specifically, the constraints it dictated on design – were no longer suiting my needs as a writer. Or even as a software developer. I felt stifled. So in 2014, I [rebuilt my site in Middleman](/blog/fresh-coat-of-paint/), a static site generator. This struck the perfect balance of giving me the freedom to design my own site however I wanted with the security of hosting it on an S3 bucket, where it couldn't be hacked (as long as my AWS credentials weren't compromised).

That was five years ago, and since then, I've continued developed new skills. I've applied those skills, building [client-side search for my blog](/blog/static-site-search-with-middleman-and-lunrjs/) ([and on Artsy's blog](https://github.com/artsy/artsy.github.io/pull/332)). I learned enough [Bootstrap](https://github.com/artsy/artsy.github.io/pull/332) and [jQuery](https://jquery.com) to build [a Portfolio](/portfolio), a [home for my conference talks](/speaking), and even [some interactive blog posts](/blog/ios-versus-javascript-how-to-learn-from-other-programming-communities/). I even did some SEO, [loading "critical" styling inline, in the HTML header](https://github.com/ashfurrow/blog/commit/22eb6cb5d05e2aceb698c7e2ce5021272b7d1055). But I would never have called myself my a "web developer."

Until recently. My work at Artsy has pushed me to [learn React Native](/blog/swift-vs-react-native-feels/) and, subsequently, React itself. I helped build a brand-new ecommerce web app at Artsy using React, TypeScript, styled-components, GraphQL, and other cutting-edge technologies. After this experience, returning to my blog's codebase felt... icky. I had built a mountain of hacks, and I wasn't proud of it anymore.

Enter [Gatsby](https://www.gatsbyjs.org), another static site generator, built on top of React. I could use all the tools that I was familiar with from my work at Artsy, but still keep a static site, striking that perfect balance I still wanted.

I tried, a few years ago, to migrate to Gatsby. I [wrote a script](https://gist.github.com/ashfurrow/b10628a879236d85c262e5621e583f14) to migrate my blog posts into Gatsby's folder structure and tried it out. Unfortunately, Gatsby's v1 development server refused to start; Gatsby collapsed under the weight of all of my posts. Another dubious honour.

So I gave up. Gatsby v2 came out then next year and so I tried, for a second time, to migrate my posts. But my heart just wasn't in it. Maybe it was the [overwhelming depression](/blog/so-i-have-been-struggling/) that I was struggling through at the time. It just seemed like a lot of work for not a lot of benefit.

---

Over the past few months, I've been working on a five-year career retrospective: a sequel to my [initial five-years-of-iOS post](/blog/5-years-of-ios/). In writing this new retrospective, I was reusing the code from the first one, and again it felt... icky. Around the same time, a coworker had shared [react-timeline](https://react-timeline.com/) on Artsy's Slack; it looked _way_ better than the timeline that I had built with jQuery in 2014. I wanted to use it. This was the kick in the pants that I needed ([post-recovery](/blog/all-i-can-say-is-im-excited/)) to try a third time.

This time, I didn't start with migrating the posts because migrating hundreds of posts from three different content systems is hard, and I am lazy. Instead, I started with the site design. I took a [Gatsby starter project](https://github.com/mhadaily/gatsby-starter-typescript-power-blog) that used TypeScript and styled-components, and worked on migrating it to my existing design (no need to re-invent the wheel). Not only was this _fun_, but it helped me get emotionally invested in the new codebase. Every commit made the Gatsby site look and feel like the site that I was already emotionally attached to.

It took three weekends and [140 commits](https://github.com/ashfurrow/blog/pull/402), but I finally did it. Here's the _very_ brief breakdown of my process:

- Set my Netlify build command to `rake build || yarn build` so that I could have in-progress deploy previews without breaking my existing continuous delivery.
- Move the old site into an `./old` directory so I could reference the existing implementation and, eventually, move the posts and images into the new file structure.
- Migrate the design. Holy moly this was fun, but took a while.
- Build out static pages (my portfolio, speaking page, etc).
- Create React components to replace my custom Middleman plugins. (No more [regular expressions](https://github.com/ashfurrow/blog/blob/0cbf198b48f04ccf2d1a90b2ecd36511dd2e9856/lib/modify_widths.rb#L49-L65)! Ugh!)
- Rebuild the RSS feed, sitemap, opengraph tags, that kinda stuff.
- Write a [basic migration script](https://github.com/ashfurrow/blog/blob/9ef488244aa579bdd6ee2976dfe14a4672e9b26a/scripts/migrate.ts) to move the posts and their images into Gatsby's structure, reformatting their contents and yaml frontmatter, and translating Middleman plugin invocations to React components.
- Migrate the blog posts in batches, moving the files from `./old` to keep the git history as continuous as possible. I visited _every_ blog post in the browser to make sure it rendered correctly, and to improve the migration script for the next batch.
- Compare the old and new sitemaps and create any necessary URL redirects.

The code is _definitely_ not perfect. The design still needs to be tightened. But "done is the enemy of perfect", so I shipped the migration last weekend.

All the heavy-lifting that I had to build myself in Middleman was _so easy_ to do in Gatsby. Search is [just a plugin](https://www.gatsbyjs.org/packages/@gatsby-contrib/gatsby-plugin-elasticlunr-search/). Critical CSS gets inlined for me automatically. My posts are written in [MDX](https://mdxjs.com), so I can mix in React components. No more Bootstrap or jQuery, so I only have the styling that I actually use.

Et cetera. And so on. Gatsby is just so... nice!

So that's it! Finally, my personal site is congruent with tools that I actually use day-to-day. I feel really comfortable working in my site's codebase and I'm excited to build more interactive posts using custom React components to tell compelling stories. Gatsby and React have opened up a whole new world for my writing, and I'm _so_ excited to see what comes next.

Over the years, I had gotten really used to using Ruby as my go-to scripting language; moving to TypeScript has been another learning curve. And I'm still climbing that curve. And you know what else? Gatsby is... it's kinda hard. Gatsby strikes a good balance between the "magic" of Ruby/Rails and _staying the heck out of my way_, but any tool this sophisticated will necessarily include a good measure of inherent complexity.

I continue to learn.

In the course of this work, I had to look at a decade's worth of my writing, which was kind of a trip. It was fun, but a bit emotionally exhausting. And it made me realize just how out-of-date my portfolio is: I made it in 2014, and I've grown a lot since then. It feels almost... quaint to look at now. It doesn't reflect who I am anymore. After I clean up the Gatsby code and publish my five-year retrospective in December, my next step is to rethink my Portfolio from the ground-up.

I'd like to give thanks to a few folks who helped make this happen, even if they didn't know they were helping.

- [Orta Therox](https://twitter.com/orta) helped with getting my Gatsby internals [modularized](https://github.com/ashfurrow/blog/pull/402/commits/99aaa6471f22ffc9cc97fa62471b6bdb60edc124) so that I could write them [in TypeScript](https://github.com/ashfurrow/blog/pull/402/commits/e6af919ded1f57fc28da794414c0050ca165af1b).
- [Harshil Shah](https://twitter.com/_HarshilShah) for tweeting through the process building his own site in Gatsby.
- [Majid Hajian](https://github.com/mhadaily) for the fantastic [starter](https://github.com/mhadaily/gatsby-starter-typescript-power-blog) that I used.
- Honestly, all of my coworkers at Artsy. I learn so much from everyone there, every day. I wouldn't be the developer I am today without you all.

So. What did I ultimately learn? A lesson that I seem to be re-learning every six months or so: **I should never pigeon-hole myself**. That goes for you, too. If you're a software developer, **you can build anything**. I believe in you, and maybe finally, I can believe in myself. Take care.
