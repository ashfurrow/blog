---
title: Becoming Proficient at Technical Writing
date: 2019-04-27 14:52:25 UTC
background_image: /img/blog/becoming-proficient-at-technical-writing/background.jpg
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

Being a beginner in any creative pursuit sucks because, at first, your taste exceeds your abilities. You know what you've written isn't good, and you know why, but you've not yet got the practice to write something really good. _Lean into that discomfort_. Figure out what the delta is between your writing output and your taste, and then practice those skills.

BEGIN_WIDE

<div class="embed-responsive embed-responsive-16by9"><iframe mozallowfullscreen="" allowfullscreen="" src="https://player.vimeo.com/video/24715531?wmode=opaque&amp;api=1" data-embed="true" webkitallowfullscreen="" frameborder="0" class="embed-responsive-item"></iframe></div>

END_WIDE

You should also be seeking out feedback on what you write from people you trust. If you have a blog post, send it to a friend or colleague and ask them for feedback. But _be specific_ about what kind of feedback you want. This is where developing your taste starts to pay dividends: tell your reviewer what you're trying to accomplish as a writer so they can help identify those deltas I mentioned earlier. If you're really close to the person, you can also tell them how you're trying to grow as a writer to get even more specific feedback.

Feedback is a gift, so if someone gives you feedback, take it constructively. Learning to accept good-faith feedback as a gift is probably the most important skill you can develop as a professional, regardless of your profession.

As you write more and more, you'll eventually find that your time writing gets spent in two distinct "modes": inserting new content, and editing existing content. (Tell me if this sounds familiar, vim users.) I usually spend about two thirds of my writing time by dumping out a stream-of-consciousness blob of text, and spend the rest of my writing time editing. Editing is whittling down, rearranging, rephrasing, etc. Usually these two modes are done in separate sessions of work, to give myself emotional distance from what I've written.

Sometimes, I'll finish writing my initial stream-of-consciousness and when I go back to edit it, I realize that a huge part just needs to be deleted. Usually it's the first third. That's okay – the separation I develop between me and my writing helps me know when something I've written is bound for the trash.

Okay! You might have noticed that so far, I haven't really described where to write. I generally don't like telling people where to put their writing, but here's my take:

It literally doesn't matter where you blog.

When trying to write, programmers tend to procrastinate by building their blog. Instead of spending time writing, they'll faff with CSS or Gatsby or Squarespace templates. This is a trap. Resist the temptation.

If you're just beginning and need somewhere to put a blog post, to go [GitHub Gists][gist] and just start writing. GitHub gists are publicly accessible, indexable by Google, and let you write in Markdown. And most importantly: you _cannot_ faff with design on a gist.

Once you've practice enough writing to warrant investing in an actual blog, you can go ahead and find a more permanent home for your work. I'd recommend avoiding Medium, or even tools like Squarespace, because as a coder, you should [build your own blog][blog].

Building a blog can be a great way to stretch your coding skills into new domains, to learn new tools and languages. Once I [learned how to build this blog with Middleman][my_blog], I've found [lots of other opportunities to use that skill][labs]. Building a new site also gives you lots of new things to write about, so use it as an opportunity to practice you're writing skills.

Writing well takes practices and it takes persistence, but honestly, that's all it takes. With time and patience, you'll become your own writing powerhouse. Good luck!

[Orta]: https://open.nytimes.com/five-questions-with-orta-therox-d5bb9659c50b
[sicp]: https://en.wikipedia.org/wiki/Structure_and_Interpretation_of_Computer_Programs
[cb]: https://ashfurrow.com/blog/contemporaneous-blogging/
[templates]: https://artsy.github.io/blog/2017/12/01/engineering-blog-post-templates/
[old_post]: /blog/projections-on-nsarray-using-valueforkey/
[gist]: https://gist.github.com
[blog]: https://artsy.github.io/blog/2019/01/30/why-we-run-our-blog/
[my_blog]: /blog/blog-transition-retrospective/
[labs]: /blog/building-static-sites-with-middleman/
