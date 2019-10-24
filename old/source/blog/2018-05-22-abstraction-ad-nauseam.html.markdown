---
title: Abstraction Ad Nauseam
date: 2018-05-22 01:31:50 UTC
background_image: /img/blog/abstraction-ad-nauseam/background.jpg
background_image_source: https://twitter.com/CrookedCosmos/status/997948621592068097
---

Okay so tell me if you've heard _this_ before:

(READMORE)

BEGIN_WIDE

> You can't use X abstraction, you need to understand/use/think in terms of Y technology that X sits on top of.

END_WIDE

Okay so that's pretty vague, right? So let's see some examples that help illustrate how widely used this kind of thinking is.

BEGIN_WIDE

> You shouldn't use open source libraries because you really should know how every line of code in your app works.
> 
> No one should learn ActiveRecord before learning SQL and understanding relational algebra.
> 
> Manual memory management is the only way to get really memory-efficient code. Garbage collectors and static automation just makes coders lazy.
> 
> Babel is fine and everything, but if you don't understand the actual JavaScript that gets run in the browser, then you're not really a web developer.
> 
> React Native is fine and everything, but if you want to write great apps, then you need to write them in native code.

END_WIDE

(And let's keep in mind that I'm not trying to dismiss these individual concerns, which are valid perspectives that people do hold. I mean, I kind of agree with them a little bit – or at least I see where they're coming from.)

I'm not dismissing these ideas; I'm trying to say that _in aggregate_, there's a kind of pattern and _that's_ what I'm  talking about. There's a perspective that's shared among these attitudes, and that perspective is: "**other people should work at the level of abstraction that _I_ want to work in**."

Okay, take a deep breath in. And out. Nice, let's talking about Math.

## There's Always Someone Lower-Stack Than You

Here's why this line of thinking makes no logical sense even though we all have these kinds of thoughts. Let's look at an example: sure someone might enjoy working at abstraction level Y and think others ought to work there to, but there's someone thinking "hey, Y is actually built on top of Z." And then there are probably discussions about whether Y is even an appropriate abstraction or if Z is better. My god, it just never ends!

Or does it?

It does actually end! It ends with [ZF Set Theory](https://en.wikipedia.org/wiki/Zermelo–Fraenkel_set_theory), the axioms of Mathematics from which every field in technology ultimately derive. These are _very_ abstract concepts, even though all higher levels of abstraction derive from them. Neat.

There's nothing under ZF Set Theory except for... philosophy I guess? I mean, these are _the_ most foundational building blocks of something as foundational as _Math_.

Let's see a very broad-strokes example, skipping over many many intermediate levels of abstraction:

- Code in compiled languages are built on top of assembly code.
- Assembly is built on top of zeroes and ones encoded in logic gates.
- Gates are etched into silicon using engineering and physics.
- Physics is built on top of Algebra.
- Algebra is built on top of ZF Set Theory.

You can do this with basically everything: start with a field of technology, pick one of its foundations, repeat, and you'll eventually end up at the same place. So cool! 

Wait... I guess _technically_ there's not "always" someone lower-stack than you if your field is philosophy. Damn, the Arts majors were right all along! It's the contemplation of the _self_, not the contemplation of `self`!

Okay so we've established that there's (almost) always someone lower-level than you, and their perspectives _also_ make sense, we can kind of zoom in and see how this is true in both broad strokes and true in specific instances. It's the idea that people _should_ work in _your_ preferred level of abstraction, wherever that preference falls along a spectrum of levels of abstraction. Whatever level you prefer, there's something lower-stack, and inductively, each perspective along this spectrum is arguable and makes sense to _someone_. So you have to admit that the chances that _any given perspective_ along this entire spectrum is somehow preferential to the rest is highly unlikely, right? Right???

So what, is this another one of my grand-equivocating "we're all the same so we should respect and learn from each other blah blah blah" blog posts? Well, yeah, it is, but it's more specific than that this time.

Why does anything that I just said matter? It's because...

## Abstractions Are Really Useful

Okay so we've got abstractions which, as concepts, are derived from other, lower abstractions. An abstraction is really a perspective, a way to think about something. Abstractions are really useful because they help us think about things; different kinds of problems lend themselves to being solved using certain perspectives. It would be silly to think about the quantum physics of the electrons being pushed through your CPU if the problem you're trying to solve is "I need a website for my band."

Abstractions are really useful, and when we build software, we actually switch between abstractions a lot. Sometimes it's helpful to think about view controllers, sometimes it's helpful to think in terms of specific lines of code within them.

I guess what this attitude I'm describing comes down to is a disagreement about which abstraction levels are "better", which is a question that's also reducible to Philosophy. Damn you again, Arts students!

So abstractions are useful, and we all jump between levels of abstraction all the time, and maybe we _should_ be curious about what our abstractions are built on, and _yeah okay I guess_ we should accept that some people are going to want to work at higher levels of abstraction.

And it's not just when we're working; it's when we're _learning_, too. Take for example the argument that Rails developers should learn SQL before using ActiveRecord. Learning useful applications of a tool is usually easier than learning its building blocks, and "usefulness" is strong motivation to keep learning. You can always come back later and learn more. Often, programming leads back to subjects we originally skimmed over anyway – you'll hit some limitation or bug that requires SQL instead of ActiveRecord and you fill in the gaps of your understanding when you need to.

That's the blog post. People have different perspectives and they're valid and also different abstractions are useful so learn a bunch, but don't worry about it too much and definitely don't feel obligated when someone tells you "well actually, _real_ programmers program in _my favourite thing_." 

Let's try to go easy on complaining when other people like different abstraction levels than the ones we like. And when we disagree with someone about something technical, we can save a lot of back-and-forth by asking ourselves "are we talking in the same abstraction level?" 

You'll figure this out, we all will. Just remember: expertise is only just informed opinion (and a little ZF Set Theory, I guess).
