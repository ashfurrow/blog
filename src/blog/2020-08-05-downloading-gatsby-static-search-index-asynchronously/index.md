---
title: Downloading Gatsby Static Search Index Asynchronously
date: 2020-08-05
banner: background.png
bannerAttribution: https://twitter.com/CrookedCosmos/status/1290897133474844673
---

Last year, I rewrote this blog in [Gatsby](https://www.gatsbyjs.org) where it had previously used [Middleman](https://middlemanapp.com). I launched the new site [with a blog post](/blog/gatsby-for-great-good/); in the spirite of "done being the enemy of perfect", I shipped the new site before it was _entirely_ finished.

> The code is definitely not perfect.

It's still not perfect, to be honest, but yesterday I _did_ fix one of the biggest problems I had with my new site: its search. Static sites, like ones built with Gatsby or Middleman, often use client-side JavaScript search engines like [lunr](https://lunrjs.com) or [elasticlunr](http://elasticlunr.com) to power their search features. I used this approach with my old Middleman site, I used this approach for [the Artsy Engineering blog](https://github.com/artsy/artsy.github.io/pull/332), and I still use it with this Gatsby site.

The idea is to generate the search index at build time and then download the index when the user lands on the search page. The searching itself happens within the browser and the computationally intensive work (generating the index) happens at build time. The client just uses the index that's been pre-built for it.

Using this approach, search is _very_ responsive... once the index has been downloaded, that is. In order for search to work without a server, the browser needs to download the _entire_ search index before querying it. This is fine if you have a small index, but I have an entire decade of writing on this blog, and my search index is multiple megabytes large.

When I rewrote this site in Gatsby, I had to figure out how to get search working. I found [the `gatsby-plugin-elasticlunr-search` module](https://github.com/andrew-codes/gatsby-plugin-elasticlunr-search) which looked promising, and it worked just as I expected. Except for one thing...

The documentation for the plugin describes using a [`StaticQuery`](https://www.gatsbyjs.org/docs/static-query/) to download the search index so it can be used in the browser. `StaticQuery` makes it so that downloading the search index is a blocking operation in order to render any part of the search page. In effect, the search index becomes part of the page content itself, rather than something that is fetched asynchronously once the page is loaded. This means that users navigating to my site's search page would have to wait to download the index _just to see the page render_. That's not acceptable performance – the site looked broken.

This was the biggest problem I had with my site and I've wanted to fix it for a while. I had searched the internet for queries like "download Gatsby StaticQuery data asynchronously", "render Gatsby query to JSON", and "Gatsby static site search asynchronous index download", but couldn't find what I was looking for. Part of the problem is that I'm not a Gatsby expert, so it's difficult to know what to search _for_.

I'm writing this blog post now becuase _this_ is the post that I wish I had found while I was looking for a solution.

Search on my site is now a lot better. Its search index is still too large, due to how the Gatsby plugin generates the search index, but the download itself is now asynchronous. Here was my approach:

1. Modify the Gatsby build pipeline to generate the search index in its own JSON file.
2. Download the JSON file using [the `fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
3. Update the search page to indicate when the index was being downloaded asynchronously.

Let's dive in a bit deeper. You can find the work [in this pull request](https://github.com/ashfurrow/blog/pull/424), but I'll link to individual commits for each step. If you have suggestions, please leave feedback on that pull request.

**First**, modify the `createPages` step of the Gatsby site pipeline to query Gatsby for its search index. Serve this index in its own JSON file. This ended up being a lot easier than I had expected – it turns out you can just write the file in the `public` directory and it will be included in the build (I examined some other plugins to figure out how this works).

[Here is the commit](https://github.com/ashfurrow/blog/pull/424/commits/90bd5142f2f807df0fb629ce1606246b773e0ea1) where I queried the search index and wrote it out to a file. I used [the `createPages` step](https://www.gatsbyjs.org/docs/node-apis/#createPages) because conceptually, I am creating a _kind_ of page. Maybe this isn't an idiomatic approach with Gatsby, but it works. The important thing is that the search index plugin has already been ran and the index is available to query; if you use this approach, make sure the data you want to query is already available.

**Next**, replace the `StaticQuery` component with an asynchronous download using `fetch`. [Gatsby has great docs](https://www.gatsbyjs.org/docs/data-fetching/) on how to do this for _an API_, but I was frustrated by the lack of resources for downloading asynchronously from the Gatsby site itself. [Here is the commit](https://github.com/ashfurrow/blog/pull/424/commits/bbb3e9ee67ea73d31bbed161b2c8cf1185047d39?diff=unified&w=1) where I created the proof-of-concept for this to work. I subsequently [refactored the component from a JavaScript class into a functional component](https://github.com/ashfurrow/blog/pull/424/commits/a9fd0437e94ee94503910141ba459cb9abc9eb4a?diff=unified&w=1) because I was more comfortable using hooks than React lifecycle methods like `componentDidMount`.

**Finally**, I added a download indicator to the search page so users would see that something is happening. My old site used [Bootstrap](https://getbootstrap.com) and used one of their indicators, but I had to research on how to build my own using CSS animations and [`styled-components`](https://styled-components.com). It was a lot of fun! [Here is the commit](https://github.com/ashfurrow/blog/pull/424/commits/218a171bc2ef3f4e8e29b174dc0497672503a604?diff=unified&w=1) for adding the indicator.

I also made some efforts to reduce the size of the search index, but as I said earlier I still need to do more here. The problem is that the search index also contains every document _in_ its index, instead of just the keyword-to-URL mapping that I actually need. I'm pretty sure that the old Middleman plugin I was using did this, so I'm hopeful I can replicate its behaviour. In any case, [here is the commit](https://github.com/ashfurrow/blog/pull/424/commits/befa8c6e0206803292561b11383c8e7637735cdc).

Despite some frustrations, I really enjoyed fixing this. It was really fun to come back to a codebase I hadn't really touched in nine months and improve it. Sometimes when learning new technologies, it can be difficult to guage how much one is am actually learning. Fixing this problem was a good way to guage how I've grown

Fixing this was fun, in part, because of how much more confident I feel now than I did a year ago. React and TypeScript are technologies I enjoy working with, but returning to this codebase after so much time away really helped orient me. I saw bad code patterns that I had previously used, and intuitively knew why they were bad and how to fix them. I saw React class components that I had previously written, and refactored them into newer functional components with [hooks](https://reactjs.org/docs/hooks-intro.html) because hooks make more sense to me. I saw problems with TypeScript types that I had previously worked _around_, and I solved them directly instead.

Growing as an engineer is a really cool feeling. I've been working as a tech lead for a year now, and I don't write as much code as I used to. The code I _do_ write gets peer reviewed and mostly contributes to a shared codebase. In contrast, building this site is a bit like working without a safety net. It's rewarding to make it through on my own.
