---
title: Asking for Help as a Software Developer
date: 2024-10-07
---

I was talking with a software developer friend the other day. They were asking for suggestions on how to increase their coding output. They keep finding themselves getting stuck and taking "too long" with their tasks, and they wanted advice on how to get more code written.

My advice was to ask for help better. By that I mean: ask for help sooner and ask for help in a way that makes it easier to get help. I want to share what I told them because I think that a lot of developers face the same problem as they grow from junior to intermediate, or intermediate to senior.

I remember facing this problem myself. I solved the problem by asking for help sooner and by getting better at asking for that help.

## Why you need to ask for help

Developers hit this problem where they can get stuck and stay stuck for too long. They're not making progress and they're not learning. They become _unproductively stuck_. I think this happens when developers over-index on persistence. Computers are exacting, fickle, and pedantic; you need persistence to learn how to program computers.

In fact, I believe that the process of becoming a good software developer _is_ the process of encountering many roadblocks and finding a way around them. And that takes persistence.

However, that same persistence can backfire as you face more challenging and complex problems. Orders of magnitude more complex. It's relatively easy to get unstuck by searching google when the problem is solved by understanding `for` loops. It's a lot harder to get unstuck by searching google when the problem is rooted in your company's weird multi-tenant microservice infrastructure, or virtual DOM reconciliation bottlenecks, or any number of weird and frustrating problems.

As your job becomes more difficult, relying solely on persistence to solve problems can backfire. The problems you have to solve grow and grow in complexity, so your toolbox for solving those problems need to grow too. Persistence is necessary, but insufficient.

Think about it another way: if you got stuck on a problem for two days when asking for help would have gotten you unstuck in a half hour, was that a good use of two days? Did it help you improve your skills? Did it help you accomplish your task?

You probably work on a team. That team depends on you. When you get _unproductively stuck_, your team is depending on you to ask them for help. Try not to let your own persistence and determination get in the way of your goals, and of your team's goals.

## When to ask for help

There is a bit of a paradox. You need to ask for help, but not too soon because you need to be persistent. But not too late, either, because it's not productive to stay stuck too long.

When do you give up and ask for help?

My answer is: asking for help is not "giving up." Asking for help doesn't mean asking for the solution to your problem; it's asking for a new direction to look in. And we'll see later how asking for help doesn't mean that you stop working on the problem.

Story time. As an intern, I was told that I give up too easily and needed to stick with problems longer on my own before asking for help. I needed more persistence. That was a tough thing to hear, but I took it to heart.

But when _should_ you ask for help, then? I got the following advice, and I think that it's a great starting point.

**Timebox yourself to a half hour. When you haven't made a meaningful progress on your task for 30 minutes, that is when to ask for help.**

A lot of developers tend to avoid asking for help because they don't want to interrupt someone, either because they're intimidated or because they're afraid of asking a silly question. But let me tell you something: [high-performing teams ask questions](/blog/building-better-software-by-building-better-teams/). High-performing individuals ask questions. If you want to increase your performance and productivity, like my friend did, asking questions is something that you need to do. Even and especially when you get unproductively stuck.

I am one of the most senior engineers on my team, and I intentionally make it a habit to ask questions that I am fairly certain I already know the answer to, in front of my team. Part of this is to confirm my understanding and get more context, but part of this is to demonstrate to everyone that asking questions is normal and good. To show that even someone with my experience and seniority still asks "silly" questions.

If you're still nervous about asking someone for help too often, then tell your team that you're open to feedback about that.

Help them help you.

## How to ask for help

Asking for help is something that you can follow a recipe for. You will refine your recipe over time, but here is my recommended starting point.

1. **Describe the problem**. First, you need to describe the problem that you're trying to solve. Describe where you're stuck, but avoid describing all the context. Instead, link to that context. If you're stuck on a ticket, link to that ticket. Focus on describing the part that you're stuck on.
2. **List what you have tried so far**. Write out summaries of your approaches so far and why you think they failed. This helps the other person get a sense of how you're approaching the problem, so they can help give feedback and help you grow.
3. **Describe your next step**. Finally, you need to pick a next step and describe it. This is crucial because it keeps you working on the problem while the other person gets back to you. This makes it so "asking for help" is not "giving up."

Make sure to compose the whole message upfront and send it all at once.

Here's an example:

> Hi there. I've been working on [this ticket](https://example.com/) but when I showed up to work this morning, Xcode just stopped compiling code. Here is the compiler error:
>
> `/* compiler error goes here */`
>
> When I google the compiler error, I get a lot of results but none of them seem relevant to our code. I even tried including the framework listed in the compiler error, but couldn't find anything relevant. I think maybe this error just has so many causes that I'm looking for a needle in a haystack.
>
> I also tried pulling the from the repo to see if that would fix it, but I was already on the latest changes. I also tried rebooting, because why not?
>
> I'm not sure what could have caused this, since the code was compiling fine yesterday. I didn't change anything on my computer. Any ideas on where I should look next? I'm going to keep going down the rabbit hole searching for the compiler error for now.

If I got this message from a coworker, I would immediately recognize the problem. My guess is that some readers recognize it too, but only based on their experience. It would take us a few minutes to respond and unblock you, saving you from an unproductive rabbit hole.

You can see how this message follows the recipe. It describes the problem in an appropriate level of detail and links context. It lists the approaches taken so far and the results. And it describes your next step so you can keep at it while the other person takes time to get back to you.

This message is also concise and to the point. This is actually really important, so let me explain.

The same person who told me, as an intern, that I ask for help too soon also suggested that I ask for help _in writing_ (even thought we sat directly next to each other). He taught me that the process of organizing my thoughts would often lead me to new ideas when I had previously been stuck. Often, the process of writing to him to ask for help would lead me to realize the solution so I would never actually end up asking for help at all. [Communicating effectively is actually a great way to solve problems](/blog/communication-as-problem-solving/)!

## Conclusion

As you can see, asking for help isn't something that you do _instead of_ trying to solve a problem yourself. It is just one tool in your problem-solving toolbox. It's often the best tool to reach for when you're unproductively stuck, but my friend Steve Hicks describes some other tools in this excellent talk:

<YouTube videoID="3XscuivvUzI" />

A lot of developers get stuck in the trap of persistence as they grow in experience and responsibility. It might be one of those things that just naturally happens as we grow from one level of responsibly to the next. I'm not sure. It's a behaviour that I continue to look out for in myself.

--

By the way, [I wrote my first blog post about how to ask for help](/blog/how-to-ask-for-developer-help/) over ten years ago. It wasn't great, and the resource I linked to in that post is no longer available. [I tried writing the post again two years later](/blog/asking-for-help-in-open-source/), but that advice was too specific to open source communities. Neither post captured what I told my friend, but this one does. I hope it's helpful for you, too.
