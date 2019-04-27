---
title: Technical Writing on the Web
date: 2019-04-27 14:52:25 UTC
background_image: /img/blog/technical-writing-on-the-web/background.jpg
background_image_source: https://twitter.com/CloudyConway/status/1120994984952500224
---

One of my first major career accomplishments was when, in 2012, a publisher contacted me about co-authoring on a book. They'd found my blog and thought I was good enough at technical writing to help write a book – like an actual paper book! I owe that opportunity to the writing I'd done on my blog and I've only continued to hone my craft since then.

Becoming a good writer was really great _for me_ because written communication is a critical skill for software developers. But it's also great for those _around_ me because I've been able to lend my skills to my team. Here is my colleague [Orta being interviewed by the New York Times' developers blog][Orta]:

BEGIN_WIDE

> One of my colleagues, Ash Furrow, is really the powerhouse behind improving the state of our public documentation. He runs weekly writing workshops internally and always encourages achievements as being post-worthy. Sometimes the best practice is to have someone who cares encouraging you. It works for me.

END_WIDE

In this post, I want to discuss both how and why to improve your own technical writing skills. In a follow-up post, I'm going to cover how I've become the writing "powerhouse" that Orta describes me as above.

While I'm going to focus specifically on writing, there are _many_ ways that humans communicate technical ideas: diagrams, podcasts, meetup talks, paired programming, etc. A lot of what I discuss applies broadly to knowledge sharing beyond just writing.

Okay let's get started.

(READMORE)

## Why Write? How to Start?

I stated earlier that written communication is a "critical skill" for software engineering because writing code _is_ written communication. A lot of programmers think that writing code is how we tell computers what to do, but I disagree. To prove my point, let me quote the introduction of a [famous book on programming][sicp]:

BEGIN_WIDE

> Programs must be written for people to read, and only incidentally for machines to execute.

END_WIDE

Think about the implications of this, applied to your own experience. We write code to express _ideas_, and when others read our code, they're trying to understand those ideas. Computers don't care about ideas, they care about executing instructions.

Let me put it this way: if code _weren't_ written communication, why do coders care so much about formatting and style? Semicolons and whitespace? Tabs and spaces?

Writing code is _one_ way to communicate ideas, but the language of code is rigid and highly structured. Natural language, like English, is ambiguous and messy, and good programmers often have a difficult time expressing themselves using written words. What I'll say to this is that you don't need to _only_ use natural language to communicate ideas. In fact, pieces of technical writing (like blog posts and documentation) often _need_ to be punctuated with code snippets and examples.

As you begin technical writing, _lean on this_. You're already comfortable expressing ideas in code, so try writing about topics that lend themselves to including lots of code snippets. Some of my earliest blog posts, [like this one][old_post], are like, _half_ code.

The most important step to improving any skill is _practice_. If you want to improve your writing skills, then you need to write. But of course, writing alone is not enough, but it is necessary. You need to set up habits and behaviours that put you in a position to write as much as possible: scheduling time to write, weekly or daily, is a great way to start.

(Another really important habit to get into is writing short technical posts as you get exposed to new ideas and questions. I explain in more detail [here][cb] why it's important to capitalize on these opportunities.)

Beginning to write is going to suck because you're not going to be good at writing for a while. That's okay! You need to get comfortable with sucking at writing because – just like coding – most of what you write isn't going to be very good. Especially at first. Don't be afraid to use blog post templates to help you get started – I have some [here][templates] you can get started with.

As a beginner, you're going to have to learn to distance yourself from what you write. You need this distance in order to develop critical reading skills. Your writing might suck, sure, but _why_ does it suck? How do you improve it?

To help develop your critical reading skills, you should also be _reading_ a lot. But not just reading anything: read the kinds of posts that you want to write. Read something, and then pause to think about why you like it (or not). You're trying to develop _taste_. Once you read something, ask yourself if you like it and then ask yourself _why_. Is it the tone of the post? Is it the level of detail? Is it the narrow or broad audience it focuses on?

Being a beginner in any creative pursuit sucks because, at first, your taste exceeds your abilities. You know what you've written isn't good but you've not yet got the skills to improve it. _Lean into that discomfort_. Figure out what the delta is between your writing output and your taste, and then practice those skills.

BEGIN_WIDE

<div class="embed-responsive embed-responsive-16by9"><iframe mozallowfullscreen="" allowfullscreen="" src="https://player.vimeo.com/video/24715531?wmode=opaque&amp;api=1" data-embed="true" webkitallowfullscreen="" frameborder="0" class="embed-responsive-item"></iframe></div>

END_WIDE

You should also be seeking out feedback on what you write from people you trust. If you have a blog post, send it to a friend or colleague and ask them for feedback. But _be specific_ about what kind of feedback you want. This is where developing your taste starts to pay dividends: tell your reviewer what you're trying to accomplish as a writer so they can help identify those deltas I mentioned earlier. If you're really close to the person, you can also tell them how you're trying to grow as a writer to get even more specific feedback.

Feedback is a gift, so if someone gives you feedback, take it constructively. Learning to accept good-faith feedback as a gift is probably the most important skill you can develop as a professional, regardless of your profession.

## Writing on the Web

Don't underestimate the value of the web as a writing platform; it presents its own unique set of opportunities that, used effectively, enhances writing beyond the written, printed word.

First up, the web is _mutable_. If you make a mistake on a blog post, you can edit that post. Once I wrote [a blog post that was _so bad_][bad] – just unbelievably factually incorrect – that I deleted the entire contents and replaced the post with a photo of my cat. It's okay to make mistakes on the web because people will correct you and then you can make edits based on feedback. Hell, I get _other people_ to fix my typos (please click the "Edit" link at the bottom of this post if you find any here).

Next, the web isn't just a medium, it's a _hypermedium_. You don't just write text, you write _hypertext_. Compelling online writing, whether its blog posts or documentation, should take appropriate advantage of the capabilities of the web. Let's take a look at a few examples.

If you're writing a blog post and there's some kind of prerequisite your audience needs to know, you can just [link][] to further reading. People familiar with the prerequisite won't click it, but someone who needs more context can. Judicious use of hyperlinks is one of the most important fundamentals of compelling writing on the web.

If you're writing a blog post and there's some multimedia that can support your point – a podcast, a video, an Instagram post – then you can just embed it instead of linking to it. This is critical because it helps break up the visuals of your writing. I've included a video and block quotes in this post to introduce visual interest; I avoid writing walls of text.

Finally, if you're writing a blog post and an idea is too difficult to convey using language, you can make it interactive. Language is really lossy at conveying some ideas, while animated/interactive components in online writing can convey them fluently. Let's take my [recent post on JavaScript and iOS][versus]; it used a mock conversation UI to force the reader into having the conversation that _I_ wanted to have with them. Or take Orta's [post on augmented reality at Artsy][arkit]; it used SVG diagrams that were dynamically styled with JavaScript and CSS. My post detailing the [first 5 years of my career][career] isn't even really a blog post – it's a scroll-driven animated timeline of my life.

Text couldn't have expressed those same ideas as losslessly as the interactive elements.

Earlier, I said that online writing should take _appropriate_ advantage of what the web has to offer; you need to decide what you're trying to accomplish with your writing, and then use the aspects of the web that support your goals. Namely, don't make things interactive for the fun of it – make them interactive to convey nuance, or persuade someone, or tell a story. And don't get lost in making your writing web-centric that you neglect developing fundamentals of written language: diction, punctuation, tone, and metaphor.

Interactive elements ought to support your writing, not distract from it.

The web is its own medium; get familiar with it and learn to leverage it. For an in-depth exploration of what electronic writing _can_ be, read [this post by Bret Victor][bret].

## Levelling Up

As you write more and more, you'll eventually find that your time writing gets spent in two distinct "modes": inserting new content, and editing existing content. (Tell me if this sounds familiar, vim users.) I usually spend about two thirds of my writing time by dumping out a stream-of-consciousness blob of text, and spend the rest of my writing time editing. Editing is whittling down, rearranging, rephrasing, etc. Usually these two modes are done in separate sessions of work, to give myself emotional distance from what I've written.

Sometimes, I'll finish writing my initial stream-of-consciousness and when I go back to edit it, I realize that a huge part just needs to be deleted. Usually it's the first third. That's okay – the separation I develop between me and my writing helps me know when something I've written is bound for the trash.

Earlier, I mentioned developing a narrative voice. This too is something that comes with practice – but what even _is_ a narrative voice? It's the rhythm of your sentences, the cadence of your paragraphs. It's the tone you take, conveyed through diction and punctuation. It's how your post _feels_ to read. This is one of the things I often explain to first-time contributors to the [Artsy Engineering blog][eng_blog]: instead of trying to adhere to an official "Artsy Engineering Editorial Voice", they should use the blog as an opportunity to develop their own.

Okay! You might have noticed that so far, I haven't really described _where_ to put your writing. I generally don't like telling people where to put their writing, but here's my take:

**It literally doesn't matter where you blog**.

Especially at first because – sorry to say this – but no one is really going to read what you write. You're not really writing for others as much as you are writing for yourself. That's okay, that's normal, just accept it. In the beginning, the _process of writing_ is more important than the actual content you write.

Lots of programmers, when trying to write more, tend to procrastinate by building/configuring their blog. Instead of spending time writing, they'll faff with CSS or Gatsby or Squarespace templates. This is a trap. Resist this temptation.

If you're just beginning and need somewhere to put a blog post, put them on [GitHub Gists][gist]. Gists are publicly accessible, indexable by Google, and let you write in Markdown. And most importantly: you _cannot_ faff with design on a gist.

Once you've practiced enough writing to warrant investing in an actual blog, you can go ahead and find a more permanent home for your work. I'd recommend avoiding Medium, or even tools like Squarespace, because as a coder, you should [build your own blog][blog]. Building a blog is a lot easier when you have existing content to put into the blog; you'll be able to customize the layout of the blog to support your writing and your narrative style (once you know what your style is).

Building a blog can be a great way to stretch your coding skills into new domains, to learn new tools and languages. Once I [learned how to build this blog with Middleman][my_blog], I've found [lots of other opportunities to use that skill][labs]. It's also a way to express yourself creatively, or to share ideas you like. For example, every time I write a new blog post, the banner at the top of the post is pulled from the [latest generative art photo I've favourited on Twitter][cc]. You can't really get that level of expression through Medium or Squarespace.

The easiest way to build your own blog is going to be with a static site generator. I'd recommend either [Middleman][] (if you're familiar with Ruby) or [Gatsby][] (if you're familiar with React). For hosting, use either [GitHub pages][] or [Netlify][]. If designing and building web UIs isn't your strongest suit, just find a free template online and modify it to suite your needs; that's what I did with this site's current iteration.

And by the way, building a new site also gives you lots of new things to write _about_, so use it as an opportunity to practice you're writing skills.

---

Writing well takes practices and it takes persistence, but honestly, that's all it takes. With time and patience, you'll become your own writing powerhouse. To sum it all up, here's how to get proficient at technical writing on the web:

BEGIN_WIDE

- **Write a lot**. When you start, you need practice. Set up habits and routines to help you with this.
- **Read a lot**. Develop your critical reading skills and find out what your taste is. Apply that taste to your writing, iterate on it.
- **Write for the web**. Take appropriate advantage of the hypermedium.
- **Find your voice**. Once you gain proficiency of the basics, find out what it is that makes a blog post written by your post distinctly _yours_.
- **Don't start with a blog**. Instead, just start writing. Once you're sufficiently practiced and invested in the craft, build your own blog to support your narrative style.

END_WIDE

Make mistakes. Learn from them. Make better mistakes tomorrow. Good luck!

[Orta]: https://open.nytimes.com/five-questions-with-orta-therox-d5bb9659c50b
[sicp]: https://en.wikipedia.org/wiki/Structure_and_Interpretation_of_Computer_Programs
[cb]: https://ashfurrow.com/blog/contemporaneous-blogging/
[templates]: https://artsy.github.io/blog/2017/12/01/engineering-blog-post-templates/
[old_post]: /blog/projections-on-nsarray-using-valueforkey/
[gist]: https://gist.github.com
[blog]: https://artsy.github.io/blog/2019/01/30/why-we-run-our-blog/
[my_blog]: /blog/blog-transition-retrospective/
[labs]: /blog/building-static-sites-with-middleman/
[bad]: /blog/dont-use-oauth-for-your-api/
[versus]: /blog/learning-from-other-programming-communities/
[arkit]: https://artsy.github.io/blog/2018/03/18/ar/
[bret]: http://worrydream.com/MagicInk/
[career]: /blog/5-years-of-ios/
[eng_blog]: https://artsy.github.io
[cc]: https://github.com/ashfurrow/blog/blob/9435117750faaa69e5432c37c5632d5e7b6bc706/Rakefile#L122-L148
[Netlify]: https://www.netlify.com
[Middleman]: https://middlemanapp.com
[Gatsby]: https://www.gatsbyjs.org
[GitHub pages]: https://pages.github.com
[link]: https://en.wikipedia.org/wiki/Hyperlink
