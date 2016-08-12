---
title: Blog Infrastructure
date: 2015-09-07 16:27:55 UTC
background_image: /img/blog/blog-infrastructure/background.png
background_image_source: https://twitter.com/CloudyConway/status/640181721326059520
---

My blog's current incarnation's birthday is approaching – it's been nearly a year since I [put a fresh coat of paint](/blog/fresh-coat-of-paint/) on an otherwise boring-looking site. In order to design and build it, I had to [master some basics of web development](/blog/blog-transition-retrospective/). After its launch, I've not stopped learning and improving it.

At times, I've gone a bit overboard, but I've been able to justify the time and energy because it's been educational. My blog has been a good side project to learn new things on. It's something I care about, but updates to it are almost certainly never urgent. It's a low-risk thing I'm motivated to work on.

(READMORE)

Recently, I've been busy. I've [switched to using haml](https://github.com/ashfurrow/blog/pull/124), [put the site on CloudFlare](https://github.com/ashfurrow/blog/pull/132), and [tried moving to GitHub pages instead of S3](https://github.com/ashfurrow/blog/tree/archive-gh-pages).

This weekend has also been full of exciting changes to my blog ( ಠ_ಠ ). It started when I took a look at the CloudFlare dashboard and saw that my site barely had *any* cache hits. Not a huge deal, since my S3 bill is pretty cheap anyway, but I wanted to fix it. It was a matter of principle or whatever.

![Giphy](http://media4.giphy.com/media/14uycovNIQpFf2/giphy.gif)

I started by [applying asset hashes](https://github.com/ashfurrow/blog/commit/77ae72d62b95d20055707f818a39b18715cab003) to individual resources, like javascript and CSS files. Middleman statically generates my site, which is then uploaded to S3. I'd _like_ to cache the CSS and javascript forever on the client's side, but that's difficult to do. By changing the filename to include a hash of the file itself, the filename changes when its contents do. By using a differently named file, I can bypass existing caches when I make changes. Nice. 

Now that the files are uniquely named based on hashes, I need to tell clients to cache these files for a long time. I used [s3cmd](https://github.com/s3tools/s3cmd) to give all existing resources long cache lives, and I hooked into my existing CDN invalidation script to [set cache headers on new or modified files](https://github.com/ashfurrow/blog/blob/78b0313fb131fb325f81dc60ad456cf1c69261a6/config.rb#L95-L105). 

The next thing was to tell CloudFlare to cache _everything_. By default, it doesn't cache HTML. Since I'm trying to do things properly or whatever, [I also added documentation](https://github.com/ashfurrow/blog/commit/eba80f4be5d3e33b83550a9441a291bc7a01b3d3#diff-04c6e90faac2675aa89e2176d2eec7d8R62). 

![Thumbs up for documentation!](http://media1.giphy.com/media/vtVpHbnPi9TLa/giphy.gif)

So the site is now properly cached and stuff, very cool (since [verified](https://twitter.com/ashfurrow/status/640877854478217216)). I would've called it a day at this point, but in the process of setting up the cache, I came across [Google's PageSpeed tester](https://developers.google.com/speed/pagespeed/insights/). My site had a pretty respectable rating in general – CLoudFront helped a lot here – but it had only 74% on mobile. This really bothered me for some reason. I guess I always assumed since my site was statically served off of S3, and behind a CDN, that it would be fast. 

The problem was, I had never considered what happens between my site being served and my site being seen by a user. 

The biggest issue, according to Google, was that my site required render-blocking CSS to display "above the fold content." Their recommendations seemed _way_ too difficult, so I decided to tackle the smaller problems first.

I spent significant time reducing the number of round trips the browser. This was accomplished by [reducing the number of CSS and javascript assets](https://github.com/ashfurrow/blog/commit/55a87af4381cbd38526e3dd38ec953446679e5f0). Note I said _number_ of assets, and not the size of the assets themselves. Since each asset needs to be individually fetched, putting all CSS and all javascript into single respective files reduces the number of round trips. Hell, I even included jQuery and Bootstrap (but later decided [this was probably a bad idea](https://github.com/ashfurrow/blog/commit/6371865b135fea464fc3233fb64027fce9ab4fe8)).

I checked back with the PageSpeed tester, and I checked. My score _had_ improved, but only from 74% to 84%. 

![Sadness](/img/blog/blog-infrastructure/sad.gif)

I had to tackle the main problem: CSS.

Browsers work by downloading HTML, and then fetching the files needed to render it. This includes CSS – until every bit of it is downloaded, _none_ of the page is rendered at all. [Google's suggestion](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery) was to include the CSS _inline_ with the HTML, which is clever. Let me explain. 

In order to display the top of the page – the part the reader sees first – you need to have all the CSS that HTML needs to be rendered. There's lots of CSS that you _don't_ need to just render the top of the page, and you can download that later. By including _just_ the necessary bits (near the beginning of the HTML file), you can render the visible content right away. While the user is reading the site, the browser downloads and applies the remaining CSS asynchronously.

It intimidated me because most of the resources I found suggested that I do this by hand. I thought this was a bananas idea – turns out I was right.

I [found a tool](https://jonassebastianohlsson.com/criticalpathcssgenerator/) that would calculate _just_ the CSS you need to render the top of a page. I put this in a `critical.css` file, and [embedded it in the generated HTML](https://github.com/ashfurrow/blog/commit/22eb6cb5d05e2aceb698c7e2ce5021272b7d1055#diff-b23996f3eeec7cadc058b2c068e47082R8). 

I pushed the changes, waited for the deploy, and Google was happy. 

![A perfect score.](/img/blog/blog-infrastructure/results.png)

I'm sure there are things I'm not doing correctly, or optimally. If you have feedback or suggestions, [just open an issue](https://github.com/ashfurrow/blog/issues/new).

It's remarkable that I've been able to take my site from something simple to something _just_ sophisticated enough – I'm quite proud of it. 

A year ago, if you told me to embed some CSS in the pages, I'd have just pasted it in. But now I'm comfortable enough to be clever about where I put it. It's a small change, but it's indicative of a broader perspective. My comfort zone has grown, and I'm excited to see what kinds of new challenges I'll take on next. 
