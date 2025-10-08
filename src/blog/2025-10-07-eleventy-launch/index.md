---
title: Eleventy Launch
date: 2025-10-07
banner: ./banner.jpeg
---

[As I discussed previously](/blog/yet-another-blog-rewrite/), I've been rewriting this blog in a new tool called [11ty](https://www.11ty.dev). This post is the first post written in the new blog engine, and the migration is complete!

I already mentioned my reasons for migrating off of Gatsby, but it's worth repeating how much less complex an 11ty implementation is. Gatsby's complexity led to long build times, which started exceeding Netlify's (free tier) deploy timeout. On my M2 MacBook Air, you can see a **16x speedup on fresh builds**:

```
# Gatsby
yarn build  329.83s user 28.18s system 257% cpu 2:19.14 total

# Netlify
yarn build  57.01s user 4.42s system 387% cpu 15.863 total
```

I had let the project sit on the back burner for a while but [recent events](/blog/floating-on/) have led me to have time to finish it. One of my first priorities had been to get Netlify deploy previews working again, which was a great call.

Counting lines of code isn't a perfect way to measure complexity, but in this case I think it's helpful for comparing the two implementations. Remember that Gatsby is a React site generated from Markdown using GraphQL with lots of other bells and whistles; more complex but more expressive. The 11ty implementation uses plain HTML, CSS, and JavaScript; simpler but more verbose.

```
# Gatsby
cloc --exclude-dir=node_modules,public,.netlify,blog,.cache,
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
TypeScript                      50            259             52           3143
Markdown                         6            112              0            616
JavaScript                       2              9             19            207
JSON                             3              0              0            155
CSS                              1             19             10            111
SVG                              6              0              3             93
Text                             2             13              0             61
diff                             1              2             28             24
TOML                             1              0              0              4
-------------------------------------------------------------------------------
SUM:                            72            414            112           4414
-------------------------------------------------------------------------------

# 11ty
cloc --exclude-dir=node_modules,public,.netlify,.husky --not-match-d="blog|fontawesome" .
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
CSS                              7             86             54           1585
Nunjucks                        17             76             17           1239
JavaScript                       7            101            160            581
Markdown                         5             86              0            179
Text                             2             13              0             61
SVG                              3              0              3             48
JSON                             3              0              0             46
TOML                             1              0              0              4
-------------------------------------------------------------------------------
SUM:                            45            362            234           3743
-------------------------------------------------------------------------------
```

Despite being less expressive, 11ty is still the "smaller" implementation. Which makes sense, since _you don't need GraphQL to render markdown into HTML_. In any case, I remain impressed at how much can be accomplished using only what we was once called "Dynamic HTML." Gatsby's implementation used 24 node dependencies while 11ty used only _two_. Two!

Overall, the implementing the new site went smoothly with one exception. The thing that furstrated me the most was [11ty's Image plugin](https://www.11ty.dev/docs/plugins/image/). This is the most (only?) opinionated part of 11ty's stack – they clearly want developers to use new HTML features (like image sets) to render multiple copies of an image so browsers can choose the best one to display. That makes sense, and Gatsby actually does something similar (albeit with JavaScript). But I just couldn't really wrap my head around it, and it kept getting in my way. And due to ~~me being a stubborn ass~~ some constraints of my directory structure, I couldn't _not_ use it.

Eventually, I figured it out. Actually it was quite easy, once I started actually using my brain. I had been fighting the Image plugin by proxy, with Claude Code. This is probably a good time to talk about AI.

I mentiond in the last post that Claude Code had accelerated this project. I think it's fair to say I would not have gotten this done if Claude Code hadn't automated some of the most tedious work. But Claude Code was _awful_ at the start of the project; only when I completed the initial project setup myself was it helpful. Near the end of the project, Claude Code became similarly frustrating, especially as I fought with the Image plugin. Once I ~~lost access to my former employer's Claude Code account~~ decided to valiantly complete the project on my own terms, it became a lot easier. I had to fully read the docs to understand what the Image plugin was trying to accomplish. Half an hour of using my brain was also more rewarding than several hours of fighting with Claude Code.

In summary, _AI tools seem most useful in the middle of a project_. I needed to give them a solid foundation to start from. Simiarly, at the end of the project, they could not polish work to my satisfaction. I think it's also helpful to be able to maintain this project _without_ using AI tools; call me old fashioned, but _I want to understand the code_. I want to be able to maintain this even if ~~the AI bubble bursts~~ my internet connection goes down.

[You can review the pull request here](https://github.com/ashfurrow/blog/pull/520) for insights into my process (ignore the lines-of-code count, as prettier formatted thes blog posts once they were migrated from MDX to markdown).

I've taken pains to make sure the RSS feeds still work as expected, but I always worry with changes that might affect my favourite readers, the RSS nerds. If you see any problems, anywhere on the site, [please open an issue](https://github.com/ashfurrow/blog/issues/new).
