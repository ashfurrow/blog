---
title: AI Coding Tools
date: 2026-04-19
banner: ./banner.jpg
---

I started writing this blog post as an attempt to collect and distill all my various thoughts and feelings about AI and AI coding tools. But the longer I took to write it, the more things kept changing, and the harder it became to fulfill that scope. So I'm just going to give a history of my own use of AI coding tools. [This video](https://www.youtube.com/watch?v=LACyqdAfnaw) tries to describe why Claude Code specifically has taken off in popularity, but I don't think the creator was specific enough. I'll cut to the chase: Claude Code was the first AI coding tool to _meet me_ where _I_ was at.

{% youtube "LACyqdAfnaw" %}

I have a lot of problems with. and feelings about, generative AI. I'm conflicted about using these tools because I’m aware of both the benefits that AI coding tools can have and the harms that LLMs do at scale. My own copyrighted books were stolen and included in LLM training data. My open source contributions and this blog are almost certainly in LLM training data. If you're looking for a cohesive moral stance on AI, [I don't have one](/blog/foresight/).

I have always been curious about new tools and technology, that's why I chose this career. But I'm confused by the staunch rejection of AI coding tools by some coders. I see a kind of pride taken in their incuriosity, that I have a hard time relating to.

My approach to writing this blog has been to share things _as I learn them_: Since I still remember what it was like to not understand something, my explanations are helpful to others. Since it's so new in my understanding, it helps me solidify my own understanding. So, keep that in mind here.

---

I was working at Shopify when GitHub Co-Pilot was first announced in 2021. I was given access to the tool in VS Code, so I tried it out. I hated it immediately, viscerally. It was only impressive in a technical sense, that it was able to predict what I might type next. But as I wrote code, it would interrupt my train of thought with its suggestion if I paused typing too long. My brain would get distracted by that suggestion, flipping from thinking-to-reading modes. GitHub Co-Pilot slowed me down and kept me out of flow state. I turned it off.

When I joined Float, a few years later, GitHub Co-Pilot was enabled on my new laptop. It had improved since, but only in terms of how quickly it generated its distracting suggestions. The only time I ever had luck with it was when I wrote a multiline comment describing a custom `groupBy` that I was too lazy to write, started writing a function definition, and waited.

```tsx
/*
TODO: Write a function that groups items by such-and-such a blah blah blah
*/
function groupBy( // This is where I paused
```

It filled in the implementation, mostly correctly. Cool! But I still turned it off again. Because that was the _only_ positive interaction I had with it.

But you know how it is these days. Companies want to make sure they take full advantage of all the new AI tools. No one wants to get left behind, including me. I love to learn, and I love getting paid to learn. So when my coworkers started talking about Cursor, and Float offered me a licence, I tried it out.

Cursor is a fork of VS Code with a ChatGPT-like interface where you can tell it what you want. It will walk through the implementation with you change-by-change, or you can just let it rip. I liked the chat interface – it was like my comment workaround with GitHub Co-Pilot. I didn’t like that I had to use an entirely new editor, _especially_ since Cursor stole the ⌘K keyboard shortcut. _Excuse you._

Like Co-Pilot, I didn’t like Cursor either, but I kept at it anyway because tools do take time to learn. I wouldn't expect to feel productive with a brand new IDE, AI or not. I committed to using Cursor as a _first_ resort for tasks and accepted that it would slow me down at first. I was getting better at it, but I still didn’t _like_ it. It felt like the worst of both worlds: I had to pay attention to every code change but I didn't get to _make_ any changes myself.

Each week, I would discuss what I had learned about using Cursor to Float Engineering’s weekly [knowledge share](https://artsy.github.io/blog/2020/12/09/share-your-knowledge/). I got feedback from others about my workflow, I applied it, and then came back the next week. Other shared what they had learnt too. I was always honest about what was working and what was not. It was actually fun to learn, even if it was still frustrating.

Then, Claude Code was released. I tried it while it was in preview and I _immediately_ cancelled my Cursor subscription. I’ve been using Claude Code daily ever since.

Claude Code was the first tool that met me _where I was at_. It wasn't a new IDE, it was in my terminal. I could hold its hand, or I could let it work on its own; unlike Cursor, it was actually decently okay at making changes unsupervised. I review its output at the end, in a chunk, like a pull request. Claude Code's VS Code plugin came out with just the right amount of IDE integration.

Unlike other tools until then, Claude Code was functional, effective, and... it was cute. I think this last part is important: everyone at work loved the cute messaging Claude Code would give while it was running inference. It would give statuses like “Coding”, or “Spelunking”, or “Manifesting”, and I actually think this cuteness is important because it highlights that it's not just a tool, but a _product_.

GitHub Co-Pilot is a tech demo. Claude Code is a product.

When I started really getting into using Claude Code at Float, a coworker told me it was like watching _Invasion of the Body Snatchers_. I had been so critical of these tools because they hadn't been working for me, that when I started enjoying them it felt like I had changed. But _I_ hadn't changed – the tools just finally got good enough.

I credit Nilay Patel of The Verge for being the first person to articulate this idea in a way that resonated with me: AI technical innovation is impressive _only if_ it can be used to build something impressive. And generally, [it can’t](https://www.theverge.com/podcast/801532/ai-smart-home-apple-m5-vergecast). But for coding specifically, it can.

On the technical side, the real innovation with AI coding tools has been to loop them back on themselves, to give them the ability to verify their own work. That's it, that's the whole innovation. It sounds dumb and it is, but it works remarkably well. In fact, I don’t think LLM model development is a bottleneck on AI coding tool quality. There are many languages and development environments that aren't yet set up with this loop back, and there is still a lot of experimentation happening in this product area.

If an AI coding tool has a unit test suite with a broken test, it can fix the implementation _if_ given the right prompt, with strict compiler settings, and opinionated linters… and access to run tools. Sloppy codebases lead to sloppy AI tool output, and smart teams are currently investing in infrastructure to make it easier to evaluate code correctness: CI, linters, unit tests, automated regression tests, static analyzers, and so on. Smart teams are prioritizing investments in these.

(But then again, smart teams were already investing these.)

I never know if I’m ahead of the curve or behind the curve with these tools, but I _do_ think that there are a lot of developers out there who could get value from these tools but aren’t. The tools aren’t working for them and I blame the tools. GitHub Co-Pilot is _so bad_ that it has irreparably damaged the reputation of AI _generally_. AI coding tools are products; they need to meet developers where they are at, provide onramps, and show their value quickly.

Using Claude Code, like any tool, is a skill. It has taken me time to learn and I’m still learning. [My CLAUDE.md](https://gist.github.com/ashfurrow/efd5b84e2700b23fda266f3de36409b6) file gets updated all the time. I've learned to manage the context window like any kind of finite resource. The longer a conversation goes, the more likely Claude is to mess up. You have to know when to compact a conversation, when to use a subagent, and when to start over. AI coding agents makes other parts of coding harder, like code review: _you_ have to be the first reviewer of any pull request that you author with Claude Code.

I have to confess that my resistance to AI tools hasn’t _only_ been because they sucked until Claude Code. I resisted them because emotionally, I was conflicted. I'm still conflicted. But I'm glad I pushed myself to try them. I don't want to go back.

While it's sad to see the craft of programming change like this, become mechanized like this, [I do not mourn it in the way that some do](https://nolanlawson.com/2026/02/07/we-mourn-our-craft/). After spending years as a technical lead who never feels he has enough time to code, I am _loving_ this. I can get _so much done_. And sure, part of that shift is [my new job at Wealthsimple](/blog/joining-wealthsimple/) that brought me back to coding. But part of it is that I’m not fighting with compiler errors all the time. Claude Code is fixing them for me.

It’s fun. I wish I had stopped resisting sooner.

---

Here’s my practical advice.

First, you aren't going to get left behind if you haven't used these tools yet. I mostly skipped Cursor and that turned out to be great for me: a lot of developers are currently _un_ learning their Cursor workflows in order to use Claude Code more effectively. So you won't get left behind, but also, these tools _are_ becoming more widely used. An entire generation of programmers is starting their careers never _not_ having access to AI tools. You're allowed to feel however you want about that.

If you have access to AI coding tools as part of your job then try them. If you feel self-conscious about how slow you are when learning how to use the tool, just tell your boss that you’re investing in AI tooling and they’ll probably love it. Your workplace wouldn’t be paying for your subscription if they didn’t want you to use it. Share what you learn with your team. Figuring out what the tools _can't_ do is just as important to learn as what they _can_ do.

To learn what they're good at, try using the tools as a _first resort_. Look for upcoming projects at work that are well-suited to these tools, like prototypes or timeboxed explorations. Use an AI coding tool as a first draft of your next task. Point your tool towards a gnarly bit of tech debt that you’ve never had the time to pay off, and ask it for a plan. Use the tools for what _you_ want to do in your codebase.

It’s okay to mourn your craft. It’s okay to have complicated feelings about all this. And it’s okay to be excited, too.
