---
title: "Lingua Rubinus"
date: 2011-12-02 00:00
---

I've been writing iOS apps for two years, now. Before that, I had experience in ASP.Net &nbsp;3.5 with a C# codebehind. I've also done some open source C coding as part of my honours thesis. For the most part, I've been living in a world of native application development with only academic pursuits of server-centric languages such as PHP with almost no exposure to the frameworks used to write server software.

That's my fault, of course. At any point, I can choose to pick up a language, but I've got a (great) job writing iOS apps and in my spare time, I write iOS apps. They're kind of my thing, I guess. But there's a problem.

Most software I deal with, and most software developers I know, deal in Ruby. Well, Rails. You know what I mean. Most APIs I use have documentation with code examples ... written in Ruby. It's everywhere and, while I know the basic Ruby syntax, I'm not familiar with the Rails framework.

This is kind of an impediment for me. It's not something that's stopping me from doing anything major - after all, if I needed Rails to do my job or for a personal project I was passionate about, I would just learn Rails. However, I'm happy writing iOS apps, so learning Rails is never a priority to me. Not knowing it is just a minor hindrance.

As I opened yesterday, [writing apps to work with OAuth libraries kind of sucks on iOS](http://ashfurrow.com/2011/12/oauth_sucks/). Many APIs online are documented-by-example code, and that code is written in Ruby. This may be a kind of failure of the language I'm using; I can't just specify POST with these paramaters. I have to specify the POST HTTP method, concatenate the key/value parameter pairs, url-encoding each one, and in some cases, set the Content-Type and Content-Length. There are open source libraries out there to do this, but my point is that if I knew Rails, I wouldn't have to run to the Rails developer here in the office so often to get help with this code.

Not that I'm saying Rails (or even Curl/PHP) work with OAuth or other web technology out of the box; developers working in Rails have to be aware of how these technologies work. They just don't need to write GET/POST parameter encoding. Every. Single. Time. The first time you try to use an API documented in Rails examples, you're basically writing an HTTP client framework from scratch. I hope you paid attention in school, because everyone just asumes you remember exactly how GET and POST parameters differ. And if the Rails devs forget, they just look at the Rails source! Fantastic!

There are so many libraries and frameworks online that are based on web languages. If you're familiar with Ruby, you're probably also familiar with Javascript, which leads to Node.js and Underscore.js and a host of other online frameworks that do things. Huzzah! I'm really interested in programming language theory, but I don't have the background in web technologies necessary to understand why these two javascript files, for instance, are important.

Ruby on Rails is like the Lingua France of the modern Internet. Not knowing it has left my illiterate in conversations I have with my coworkers, and I've decided to do something about it.

Tomorrow. iOS are profound procrastinators.

<!-- more -->
