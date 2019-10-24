---
title: Static Site Search with Middleman and lunrjs
date: 2016-08-07 15:03:06 UTC
background_image: /img/blog/static-site-search-with-middleman-and-lunrjs/background.jpg
background_image_source: https://twitter.com/CloudyConway/status/749304932835155968
---

A few months ago, [someone opened an issue](https://github.com/ashfurrow/blog/issues/213) asking for a site search on my blog. Neat idea, it wasn't high on my list of priorities at the time, but maybe I'd get to it someday.
  
Well, today's the day 🎉

(Note: The original "the day" was two weeks ago but I had given up in frustration.)

(READMORE)

Search is an interesting problem. Most search engines run on servers and not the browser client. This site, just like all static sites like those built with [Middleman](https://middlemanapp.com), is generated on a computer before being served statically. It's a faster, easier, and more secure way of serving web pages that don't need dynamism, but it does mean that you can't run server code when a page is fetched.

Running search on servers makes sense for DuckDuckGo and Google because their search engines are trying to cover the whole internet. But for a site like mine, a client-side search engine written in Javascript can be a suitable solution.

[Solr](http://lucene.apache.org/solr/) is an open source search engine. [lunrjs](http://lunrjs.com) is a Javascript-based search engine, which claims to be:

> A bit like Solr, but much smaller and not as bright.

Lovely. I think the sun-vs-moon metaphor for server-vs-client search engines is really apt.

There are a few Middleman extensions that integrate lunrjs search into static sites, but I couldn't get any to work for me because I didn't understand how they worked. I ended up [reading the source code](https://github.com/256dpi/middleman-lunr/blob/5c49621007e003da0b748ec8bd34bfc7b11240d2/lib/middleman-lunr/indexer.rb#L23-L64) of one to understand _exactly_ how it worked. Even then, I couldn't get things right. It turns out that I didn't know enough Javascript to use a Javascript-based search engine. Not yet anyway.

I submitted a [work-in-progress pull request](https://github.com/ashfurrow/blog/pull/232) and gave up again.

After a little break and some food, I went back and looked into a different extension. Actually it was the original extension I tried but I couldn't get it working. I understood what it was doing on the Ruby side, and concentrated just on the Javascript. After looking up some jQuery syntax, I had something that worked.

Some fiddling with CSS and lining things up, [I had a ready PR](https://github.com/ashfurrow/blog/pull/233).

BEGIN_WIDE

[![Screenshot of site search](/img/blog/static-site-search-with-middleman-and-lunrjs/screenshot.jpg)](/search)

END_WIDE

Site search stumped me for weeks. Distinct from search engines in general, server-side static site search is a very interesting problem in its own right. Ruby code uses Javascript to generate a search engine index of the content of my entire site. Then client-side Javascript downloads that index and uses lunrjs to run queries against it. It crosses the dynamic-to-static barrier, which isn't something many other features of static sites need to do.

After submitting the pull request, I realized I had been working into the late evening, that I'd had a beer or two, and that maybe pushing code to production wasn't the best thing to do. I pinged Orta on the pull request and asked for a second opinion. It can never hurt to have someone double-check things for you.

Things checked out, and [search is here](/search).

[The pull request is here](https://github.com/ashfurrow/blog/pull/233), so feel free to comment on anything that you'd like clarification on or that you have a suggestion about. I'm sure there are ways this could be more idiomatically done. (**Update**: I've [added documentation](https://github.com/ashfurrow/blog/pull/237) to all the code and linked to the relevant code [in the readme](https://github.com/ashfurrow/blog).)

Writing new features into software can be overwhelming, and stepping back for a break is usually the right answer. It's okay to give up if things are getting frustrating, and it's okay to ask for help.

BEGIN_NARROW

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">PARTY TIP: At the end of the day, just try your hardest to be nice.</p>&mdash; ANDREW W.K. (@AndrewWK) <a href="https://twitter.com/AndrewWK/status/722843678994219009">April 20, 2016</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

END_NARROW

We're all in this together.
