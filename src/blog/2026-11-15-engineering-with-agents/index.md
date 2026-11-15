---
title: Engineering with Agents
date: 2026-11-15
banner: ./banner.jpg
---

I think it's healthy to have scepticism. Extraordinary claims require extraordinary evidence, etc etc. And I also think it's important to change your mind when new evidence arises. That's why I'm totally comfortable with saying that [I was _very_ sceptical of AI-driven coding tools until early 2025](/blog/ai-coding-tools/). It's not that I didn't _believe_ they couldn't work; it's that I tried them and _they didn't work_, at least for me.

But the tools did get good enough, and are now more than good enough for code generation. The question now has become what will software development look like? What _should_ it look like? How does agentic coding change software engineering?

If you want an answer... that sucks, because no one knows! But you can help find an answer _if_ you keep an open mind. Staying curious is quite difficult here because the capabilities of these tools fundamentally challenge many software development best practices. They threaten our idea of what software development is. Curiosity tends to give way to fear when we feel threatened, and agentic coding tools are very threatening to coders.

So when you feel yourself thing:

> (Aghast) "How could I trust code written by an LLM???"

My advice is to take a deep breath and centre yourself. Then remember the goal of staying curious. Try reframing your thoughts:

> (Curious) "What would I need in order to trust code written by an LLM?"

I can't answer that question in a single blog post. Instead, I want to describe how I'm staying grounded during this tumultuous time in our industry.

Bill Hammack (aka The Engineering Guy) [describes the Engineering Method as](https://www.youtube.com/playlist?list=PL0INsTTU1k2X4kCPqmi1eJBgmYJUth_2s):

> Solving problems using rules of thumb that cause the best change in a poorly understood situation using available resources.

"Poorly understood situation"? Sounds like software development in 2026 to me! So what are the rules of thumb here? Well, if we're talking about trust in LLM code, then "trust but verify" will be key.

We have this situation where suddenly code generation has become far faster than it has ever been. If we put on our Engineering Method hats here, we can intuit that the best change we can make in this system is to improve software verifiability. If you've been on rapidly expanding engineering teams, then this should sound familiar. You have more code getting written, faster, and you need a way to make sure it's actually good: automated testing, CI, linters, etc.

One of the mental frameworks that's been helpful here, for myself and many others, is the ["Trust Ladder"](https://barnabyrobson.org/on-pstack/#earned-trust). This is one of those ideas I talked about [in this post](/blog/linkedin-for-ai/) and I realized after that it might not be commonly known. That's why I'm writing this post; I think it's that important.

The trust ladder encapsulates a common (but not universal!) progression that developers tend to move through as they adopt agentic coding tools. I'm modifying [the original explanation](https://x.com/poteto/status/2102050467505430555) a bit here, but basically:

- First, you micromanage agents line-by-line. Think of Cursor-style development. You don't trust the agent to write even a single line of code without your review _first_. But over time, _if_ it gets things more right than wrong...
- Next, you trust agents with a whole commit. Instead of reviewing code _before_ it's even written, you review it after it's written (but before it gets committed). You're still looking at the code, just later. _If_ the agent gets things more right than wrong...
- Then, you trust them with a whole pull request. You're still looking at the code, but not until it's up for review. You're trusting the agent to write the correct code for the ticket, but you're still verifying their work. _If_ over time, the agent needs fewer and fewer passes until it gets it right...
- Eventually, you trust agents to merge their own work. This is the top of the trust ladder, and getting here is a lot of work. The payoff promises to be extraordinary speed ups, but the risk is also extraordinary.

At some point in this progression, you probably start running multiple agents at once. This can lead to burnout. If you find yourself moving up this ladder, try to find ways to minimize your own multitasking without restricting your agents' multitasking.

[Importantly, your setup needs to support trust](https://karun.me/blog/2026/11/08/ai-maturity-is-a-lagging-indicator-of-engineering-maturity/). The "push" up the ladder comes from the positive feedback loop of quality output from agents; if you tend not to get the output you want, then you won't see the appeal in moving up the ladder. Software verifiability, strongly-enforced patterns, instant rollbacks, etc. These are all existing ways to trust human-written code and they work for agentic code too. With agents, though, you need infrastructure to fill in the gaps. Agents _can_ access iOS simulators via Xcode MCP, or `xcrun simctl`, or tools like [Argent](https://argent.swmansion.com). _But you need to set up that access_. LLMs got good at coding when they started being able to check their own work, so you need to give them that capability for your project.

Climbing up the trust ladder _doesn't just happen_, it requires tooling and work. When an agent messes up, it's tempting to just tell it to fix the problem. But in order to move up the trust ladder, you need to add whatever guardrail would have prevented that mistake in the first place. I have fallen into this trap, where I get too focused just completing the ticket or the project, of "working hard instead of smart." This is also not a new problem. Before you may have fixed a bug by created a new abstraction to prevent it; now you may fix a bug by improving the harness that generated it in the first place.

As a counter-example, _you could_ just let agents lose in your codebase willy nilly, but the results would be disastrous. That would be... sloppy. I think a key skill for software engineering over the next few years will be an ability to move up and down that trust ladder as needed. To create the necessary guardrails when needed to move up that ladder, and to know when to move back down the ladder as appropriate.

Here's a story of where I moved down the trust ladder. I recently worked on a personal project using Claude Code. It is an untyped, untested JavaScript codebase. Yikes. I never even trusted myself to write good code in this repo, opting to review my own work in pull requests. But _I do care_ about quality here, so I moved to a low rung on the trust ladder and reviewed Claude's code in pull requests too. This was important because I knew I couldn't trust it otherwise. It didn't have the guardrails to be trustworthy. Now, if I were planning to do a lot of work in that repo, I would have taken some time to add types and tests and whatnot, so that I wouldn't _need_ to look at the code as much. But as I was only making a few changes, I just reviewed the code manually. I adapted my workflow for the repo and the outcomes I wanted.

LLMs aren't that smart. Their strength is that they are fast and inexhaustible. So you need strong supports, guardrails, and monitoring to get good results. Agents will lie and cheat to work around instructions in a markdown file, so strongly-worded `CLAUDE.md` files are not going to cut it. LLMs are non-deterministic so their work needs to be guarded by deterministic checks: linters, tests, and other guardrails. The goal is not to make an LLM deterministic; that's impossible. The goal is to make them _deterministic enough to be useful_.

As I've worked with more agentic coding tools, I've found myself enforcing stricter and stricter coding standards. One of the best parts about having LLMs write code is that _they don't complain about having to type more_ which was often a counter-argument when I'd try to enforce stricter patterns in the past. For example, I have a custom lint rule on a Swift project to prevent singleton accesses inside methods. Swift relies a lot on convention so I forbid access to `shared`, `standard`, and other common singletons accessor properties. Instead, I use instance properties that get set by initializers (which _can_ default to singleton instances). This makes it far easier to write unit tests for the code, but it's annoying for humans to write.

```swift
class MyClass {
  // Before
  func myFunction() {
    UserDefaults.standard.setValue(true, forKey: "called")
  }

  // After
  let userDefaults: UserDefaults
  init(userDefaults: UserDefaults = .standard) {
    self.userDefaults = userDefaults
  }

  func myFunction(){
    userDefaults.setValue(true, forKey: "called")
  }
}
```

This is a small difference, but it's one of many that add up.

So that's the trust ladder. It's a useful rule of thumb when engineering code with agents. In many ways, agentic coding tools don't actually change that much about software engineering, they just shift the bottleneck. I see some developers lamenting the death of software engineering, and I kind of chuckle. Engineering has been crucial to human civilization and it's never going away. We'll always have poorly-understood situations and we'll always need to rely on experience to guide us to make positive changes.

Software engineering isn't going away, it's just changing. If you stay curious, you can get really excited about the future. I'm not going to say it's easy, or that I don't feel anxious too. But I try not to let the anxiety take away from my excitement.

What next? Well, I've [written before](/blog/ai-coding-tools/) that smart teams were already investing in CI etc. But existing approaches to verifiability with CI, unit tests, merge queues etc cannot survive the huge increase in pull request throughput that we're seeing. The bottleneck used to be code generation and now it's become code verification. I don't know what best practices we'll settle on. It's a very exciting space to watch.
