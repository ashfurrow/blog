---
title: Bias Towards Helpfulness
date: 2025-06-23
---

I've been using Cursor for coding tasks lately, trying to explore what kinds of work it performs well and poorly. It's pretty good at most simple tasks. It's good-to-okay at some complicated tasks. But then, some simple tasks can stump it – usually in very niche domains. Other tasks are _so big_ that they need to be broken into smaller pieces first – a classic project management problem.

I ran into this last kind of problem recently, when I tried to prototype a large idea for this blog, my personal website. I told Cursor what we're doing and it started strong. It was making great progress when suddenly it got stuck, in a loop, on a _very_ simple change to a config file.

My approach had been too much, too fast. To refine my approach, I tried using a conversational LLM instead of Cursor. I've generally not used conversational LLMs like ChatGPT until a few months ago, because I hadn't found them to be that useful and because it's rational to be skeptical of tech hype. But people _are_ using them, for all kinds of things. Conversational LLMs are replacing search, in terms of user behaviour. I had heard of developers using them to help think through ideas and plans, so why not try?

I talked my idea through with the LLM and... it was actually pretty helpful! It was a bit like "rubber duck debugging" if the rubber duck could answer you. And lookup GitHub issues, and quote documentation, etc. I was pretty impressed. It validated my idea was a good idea and suggested some alternatives.

The next day, I was meeting another developer for a coffee and my idea came up in our conversation. I explained my idea, asked his opinion, and the _first_ thing he said _didn't answer my question at all_. Instead, he responded with a question of his own. (A _really good_ question, too. Incisive.) I gave him my answer, and he asked a very good followup question: how much time was I interested in spending on this idea? Only when he understood the full context and my motivation did he give me his perspective.

Conversational AI's have a _bias towards helpfulness_. That may sound absurd, but it's true: LLMs have been trained on helpful conversations from the internet (StackOverflow, for example). LLMs are given system prompts instructing them to answer user questions. They "want" to help us and it's important to be aware of that. This bias prevents LLMs from being able to distinguish prompts that are vague on purpose (users looking for general answers) and vague incidentally (users needing followup questions and/or pushback). LLMs are designed to help users _by answering their prompts_, not telling them when they're trying to do something really stupid.

It's as though LLMs are bound by a local maxima of helpfulness. Sure, they're helping users with their requests. But they can easily, silently fail to consider the bigger picture. People are messy and they have messy problems.

The developer I spoke to had the experience, expertise, and relationship with me to cut straight to the heart of my question. I hadn't meant this as an experiment, but it's interesting to think about: when asked the same question, the LLM responded with an answer but the developer responded with a question of his own. I think this is another case of learning what tasks an LLM can help with, or rather, learning the limitations of using an LLM for this kind of task.

I want to clarify my stance here because I don't want to be labelled as either a hater or a booster. (Or labelled at all, thanks.) LLMs _do_ have limitations, they _have_ improved, and I _am_ open to the idea that an LLM could be built that is capable of this kind of intentional, selective <em>un</em>helpfulness. To ask clarifying questions or push back on bad ideas. That an LLM product could even use previous interactions with me as context to tailor responses, similar to how a coworker or collaborator might. Indeed, _a lot_ of companies are spending _a lot_ of time and money trying to build AI assistants which develop a "relationship" with users. Maybe they will build something genuinely as helpful and incisive as another skilled human. But I would have to use it to believe it.

Incidentally, both the developer and the LLM ultimately arrived at the same answer. But, the developer was better company.
