---
title: Second-Mover Advantage
date: 2026-11-17
banner: ./banner.jpg
---

I’m very excited about agentic coding and the future of software development, but that doesn’t mean that I endorse the attitude of loud AI boosters. When I hear things like “get on board with AI coding now! or you’ll get left behind!!”, to me it rhymes with the “have fun staying poor!” taunts from NFT bros. It’s the same presumptive importance of being first, the same FOMO-driven in-group signalling. I don’t like it, and it’s just factually not true that developers will get left behind.

Being first can be great. But it can also suck.

[First-Mover Advantage](https://en.wikipedia.org/wiki/First-mover_advantage) describes the benefits conferred by getting to a market first. It’s an envious position, in theory, since you define the market while your competitors catch up. You’re in the lead! Yay! But, getting in the lead can require _a lot_ of resources. It’s expensive to be first. And your competitors get to learn from your successes, and your mistakes. [Second-Mover Advantage](https://en.wikipedia.org/wiki/First-mover_advantage#Second-mover_advantage) describes these benefits. Apple released the first modern smartphone but how long did it take Samsung to copy it? Not long! Both companies built massively successful smartphone businesses but only one of them had to actually invent the smartphone.

Developers who have been using AI coding tools for several years _do_ have an advantage in deeper familiarity with those tools, but this has also cost them a lot of time. A lot of failed experiments. And, at the rapid pace of AI, many of the once-popular tools and techniques have already fallen out of favour. I remember the six-month period where everyone was excitedly optimizing their `CLAUDE.md` files. Nowadays, Claude Code can update its own memories. Anyone who hadn’t started using Claude Code during that period didn’t waste time curating the perfect markdown file.

I tried using Cursor _multiple times_ but could never get onboard with a slow LLM that needed my approval on each line of code (this was 2024). It never felt like a speed-up to me so I didn’t use it. A lot of my peers did, though. _They adapted themselves to the tool_. When Claude Code came out, I was immediately hooked because _it met me where I was at_ and _it actually sped me up_. Those same peers have had to _un_-learn Cursor so they could get comfortable with Claude Code. That churn, of learning and un-learning, is one cost of being an early adopter of AI coding, a kind of first-mover. It’s a cost I avoided by evaluating the tools empirically, according to my goals.

As I’ve listened to developers closer to the bleeding edge of AI coding, I’ve heard many of them [describe burnout symptoms labelled as “AI Psychosis.”](https://www.youtube.com/watch?v=EnbqwpkmoCM&t=996s) When agents can work independently, _your direction to them_ can become the bottleneck to your work. So you spin up multiple sessions in parallel, you check your agents when you’re not at work, maybe you even check them overnight. It can feel very powerful, but your ability to direct the agents worsens when you’re exhausted.

So. Over the summer when my use of agents was really accelerating, when [I was getting excited about developing new features against the iOS beta for the first time in years](/blog/my-slow-return-to-a-swift-career/), when I was so excited about my work that I forgot to take time off over the summer… I noticed the early signs of burnout. But something more, too. I recognized the behaviours that I’d heard other developers label as AI Psychosis. I scheduled time off at the earliest opportunity (I’m feeling much better now!) and I re-evaluated how I was using agents.

Here’s what I changed.

I had been running multiple worktrees with one agent each. I would bounce between them all, kind of like keeping many plates spinning. Moving from one agent to two doubled my throughput, but adding a third agent only sped me up by 50%. As I added more agents I saw diminishing returns, and the mental load became too taxing. It was hard to keep track of what agent was doing what, and I would find myself mistakenly talking to one instead of the other. There was never a natural stopping point, for me to take a breath or take a break. It was intoxicating! In every sense. Small setbacks would frustrate me more than usual. I became irritable.

I totally gave up on managing multiple agent sessions across worktrees. It didn’t scale. Today, I typically only have _one_ agent running and _it_ manages worktrees and subagents for me. I keep the main agent queued up with tasks. It is the single agent I give direction. There still isn’t a natural stopping point but it’s easier to step back when the actual work is abstracted away from me, by the subagents. And importantly, I gave myself some boundaries around my work.

Ironically, the solution involved both using AI more _and_ less. I’m interacting with fewer agents, but using far more agents indirectly.

I had avoided some of the costs of being a first-mover (having to unlearn workflows which turned out to be fads). But without realizing it, I had moved up the curve of what the tools can do. Working at the bleeding edge can be really fun, but the bleeding edge is where you get cut.

So here’s some advice from someone who’s been on all sides of this.

Ignore anyone who tells you you’re going to get left behind if you don’t get onboard _right now_. It is _so easy_ to become proficient at these tools with the right attitude, in the right environment. The best time to learn is when someone is paying you to do it, so make use of whatever tools your employer offers. Just try to keep an open mind.

If you want to be on the cutting edge, cool! [Share what you learn, for your own sake](/blog/contemporaneous-blogging/). But if you don’t, that’s okay too. Embrace the advantages of a second-mover. Learn from others. Know yourself and how you learn best, and stay curious.
