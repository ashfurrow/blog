---
title: AI Coding Tools
date: 2026-02-16
---

If you’re put off by using AI coding tools _at all_, this isn’t really the post for you. If you’re already using Claude Code or a similar tool, then you might still enjoy reading about my own journey. But this post is really for the group of developers who have heard of AI coding tools but who _just don’t get it_.

I empathize. I want to walk through my own journey with AI coding tools, and hopefully something will resonate. It's hard to sell a programmer on the value of the tools because it's something that really needs to be experienced, like the first time you write code and the computer executes it.

And, by way, no AI was used to write the blog post. Writing is something I do as a way to organize my own thoughts, to work through my own feelings. The process of writing _is_ the outcome for me; the blog post is just a side-effect. None of the prose on my blog has been written by AI.

—

I was working at Shopify when GitHub Co-Pilot was first announced in 2021. Someone flipped a switch on GitHub and I suddenly had access to the tool in VS Code, so I tried it out. I hated it immediately, and viscerally. It was impressive, technically, that it was able to sometimes predict what I would type next. But if I were coding normally, it would interrupt my workflow with its suggestion if I paused typing too long. My brain would get distracted by the suggestion, my output slowed, and I never hit flow state. I turned it off. 

When I joined Float, the tool was enabled on my new laptop. It had improved in the two years since, but only in terms of how quickly it generated distracting suggestions. The only time I ever had luck with it was when I wrote a multiline comment describing a custom `groupBy` that I was too lazy to write, then started writing a function definition. 

```tsx
/*
TODO: Write a function that groups items by such-and-such a blah blah blah
*/
function groupBy( // This is where I paused
```

It filled in the implementation, mostly correctly. Cool! But I turned it off again anyway. Because that was the _only_ interaction I had with it.

But you know how it is these days. Companies want to make sure they take advantage of the new AI tools. No one wants to get left behind, myself included. I love to learn, and I love getting paid to learn. So when my coworkers started talking about Cursor, and work offered me a licence, I tried it out. 

Cursor is a fork of VS Code with a ChatGPT-like interface where you can tell it what you want. It will walk through the implementation with you change-by-change, or you can let it rip. I liked the chat interface – it was like my commend workaround with GitHub Co-Pilot. I didn’t like that I had to use a whole new editor, especially since Cursor stole the ⌘K keyboard shortcut. _Excuse you._ I still didn’t like it, but I tried it anyway because tools take time to learn. I tried using it as a first resort and accepted it would slow me down at first. I was getting better at it, but I still didn’t like it. It felt like the worst of both worlds. 

Every week, I would bring what I had learned about using Cursor to Float Engineering’s weekly knowledge share. I got feedback from others, and applied it. I was honest about what was working and what was not. It was actually fun, even if it was frustrating.

Then, Claude Code was released. I tried it while it was in preview and immediately cancelled the Cursor subscription. I’ve been using it ever since.

Claude Code was the first tool that met me where I was at. I could hold its hand, or I could let it work on its own. I could use it in a terminal, or use its VS Code plugin. It was functional, and it was cute. I think this last part is important: everyone at work loved the cute messaging Claude Code would give while it was running inference. It would give statuses like “Coding”, or “Spelunking”, or “Manifesting”, and I think this cuteness is important because it shows how Claude Code is not just a tool, but a product. 

I have a lot of problems with, and a lot of complicating feelings about, generative AI. I feel conflicted about using these tools, because I’m aware of both the benefits that AI coding tools can have and the harms that LLMs do at scale. I have copyrighted books that were included in LLM training data. My open source contributions and this blog are almost certainly in the Claude’s training data. Inference is costly, even if text-based inference is cheap compared to generating images or video. 

Those are my issues, to sort out personally. As a professional, I think it’s necessary to evaluating these products on their merits. When I started really getting into using Claude Code at Float, a coworker told me it was like watching _Invasion of the Body Snatchers_. I had been so critical of these tools that they saw it as an about face. But _I_ didn’t change; the tools just finally got good enough.

I credit Nilay Patel of The Verge for being the first person to articulate this idea in a way that resonated with me: AI technical innovation is impressive _only technically_ if it can’t be used to build a good product. And generally, [it can’t](https://www.theverge.com/podcast/801532/ai-smart-home-apple-m5-vergecast). But for coding specifically, it can. 

The real innovation with AI coding tools has been to loop them back on themselves, to give them the ability to verify their own work. If an AI coding tool has a unit test suite with a broken test, it can fix the implementation _if_ you give it the right prompt, and have strict compiler settings, and use opinionated linters… and give it access to run those tools. 

In fact, I don’t think LLM model development is the bottleneck on AI coding tool quality. There are lots of languages and development environments that haven’t been integrated with yet, and there is still a lot of experimentation happening in the product area. Sloppy codebases lead to sloppy AI tool output, and smart teams are currently investing in infrastructure to make it easier to evaluate code correctness: CI, linters, unit tests, automated regression tests, static analyzers. AI tools benefit from the same things developers benefit from, so smart teams are also investing in documentation, style guides, design systems.

(But then again, smart teams were already investing in all those things.)

I never know if I’m ahead of the curve or behind the curve on these tools, but I _do_ think that there are a lot of developers out there who could get value from these tools that aren’t. The tools aren’t working for them, or developers haven’t been persuaded to try them yet, or they haven’t been compelling enough to stick with. And frankly: I blame the tools. GitHub Co-Pilot is _so bad_ that it did reputational damage to AI coding _in general_. Tools are products; they need to meet developers where they are at, provide onramps, and provide value fast. 

There are lots of tasks that Claude Code can’t do. And you don’t know until you try. 

Using Claude Code, or other tools, is a skill. It has taken me time to learn, and I’m still learning. The context window is a resource that you need to manage, like any finite resource. The longer the conversation goes, the more likely Claude is to mess up. You have to know when to compact the conversation, when to use a subagent, and when to start over. AI coding agents makes other tasks harder, like pull request review: _you_ have to be the first reviewer of any pull request that you author with Claude Code. 

I have to confess that my resistance to AI tools hasn’t just been because they sucked until Claude Code. I resisted them because emotionally, I was conflicted. And while I’m sad to see the end of hand written code, I do not mourn it in the way that some do. After spending years as a technical lead who never feels he has enough time to code, I am _loving_ this. I can get so much done. And sure, part of that is my new job at Wealthsimple that brought me back to coding. But part of it is that I’m not fighting with compiler errors all the time. Claude Code is fixing them for me.

The tools get easier to use the more you try to use them. My resistance to using them led me to avoid them, subconsciously. At the start of the year, I resolved to opt in. I’ve finally started choosing the best model for a task, building up an intuition for which ones work better through trial and error. I’ve graduated from working on two parallel clones of my repo to using worktrees and subagents. I’ve invested in my `CLAUDE.md` file. I’ve written agent skills for my team to use. 

It’s fun. I wish I had stopped resisting sooner.

—

Here’s my practical advice.

If you have access to these tools as part of your job then _use them_. If you feel self-conscious about how learning the tools slows you down at first, that’s okay. Just tell your boss that you’re investing in AI tooling and they’ll probably love it – they wouldn’t be paying for your subscription if they didn’t want you to use it. Share what you learn with your team. 

Use the tools as a _first resort_. Look for upcoming projects at work that are well-suited to the tools, like prototypes or timeboxes. Use an AI coding tool to put together a proof-of-concept, a first draft of your next task. Point your tool towards a gnarly bit of tech debt that you’ve never had the time to pay off, and ask it for a plan. If you can, try using the tools on your own personal projects. 

It’s okay to mourn your craft. It’s okay to have complicated feelings about all this. It’s okay to be excited, too. 
