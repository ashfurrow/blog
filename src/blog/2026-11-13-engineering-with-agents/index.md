---
title: Engineering with Agents
date: 2026-11-13
banner: ./banner.jpg
---

// TODO: I was sceptical until the tools started to work

(Aghast) "How could you trust code written by an LLM???"

(Curious) "What would you need to trust code written by an LLM?"

The key here is to stay curious. It has to be a choice IMO because LLMs make us really anxious, threatened. Needs to counter that.

Software development with AI is often described as a series of steps that developers take, to become convinced. I don't love this for two reasons: this narratives assumes everyone has had and will have the same path; and because it describes an end state (where we are so far). But no one knows where we're going, and how we get there is largely of up to us.

But, I have to admit that it's useful. And I've seen myself and peers follow roughly the same path. You use agents directly, trusting them more over time as you get more familiar with what they can actually do. Eventually you give them more decision-making roles, moving up the [Trust Ladder](https://barnabyrobson.org/on-pstack/#earned-trust). But importantly, the environment needs to support that trust. Software verifiability, strongly-enforced patterns, instant rollbacks, etc. These are all ways to trust _human_ code, and they work for agentic code too.

I mean, _you could_ just let agents lose in your codebase, willy nilly, but the results would be disastrous. The key question is: what would have to be true in oder to trust agents to write code?

LLMs aren't that smart. Their strength is that they work quickly and are inexhaustible. So you need very supports, guardrails, and monitoring to get good results. I've [written before](TODO) that smart teams were already investing in CI etc.

Bill Hammack (aka The Engineering Guy) has [a fantastic playlist about the Engineering Method](https://www.youtube.com/playlist?list=PL0INsTTU1k2X4kCPqmi1eJBgmYJUth_2s). He describes the Engineering Method as:

> Solving problems using rules of thumb that cause the best change in a poorly understood situation using available resources.

The current software development industry is as much a "poorly understood situation" as you'll find.

So we have this situation where suddenly, code generation becomes way faster and easier than it has been. If we put on our Senior Engineer hat here, we can intuit that the best change we can make in this system is to improve software verifiability.
