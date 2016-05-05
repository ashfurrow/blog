---
title: Building Popular Projects
date: 2016-03-08 02:42:36 UTC
background_image: /img/blog/building-oss-frameworks/background.jpg
background_image_source: https://twitter.com/CloudyConway/status/706465122202603522
---

We're seeing an explosion in the number of server-side Swift frameworks, which is _awesome_. The community needs to go in many directions to find out which ideas it should standardize on. Not all of these new libraries will be long-lived: some will fade out while others will become pillars of the server-side Swift community. _Which_ libraries the community centres around won't depend solely on code quality; it'll depend heavily on _community_ quality.

So if you've recently created a server-side Swift library (or if you want to (and statistically, you _probably_ do)) then I have some suggestions on how to win the server-side Swift library arms race.

<!-- more -->

Now, the longevity and popularity of your library depends on both the quality of its code and of its community. I won't tell you how to measure code, but here are some tips to create a quality community and increase the chances that _your_ library is the _the_ library the community chooses.

### A Great Readme

This is really easy, right? Like, a good readme, sure how hard could that be? Well, it's not hard! But it's often not a priority either, so it gets skipped. That's a shame, because your readme is the most important piece of marketing your library has.

A good readme (in my opinion) has the following pieces:

1. A description of the problem your library solves.
1. An explanation of how your library solves the problem in a really nice way.
1. A _very_ brief example, with a link to more examples or documentation.
1. Installation steps and where to go if they have a question.
1. A GIF of the library in use (or, if not applicable, just any random awesome GIF).

The primary goal of your readme is to convince developers to try out your library so that they might become users.

### Add Contributors Early and Often

The biggest existential threat to your library is this: you get burned out and stop working on it – and no one else contributes to it – so it doesn't get maintained, and your users leave. Mitigating this risk is pretty simple: add contributors early, and add them often.

After watching [this talk](https://www.youtube.com/watch?v=e_-qV8waPVM), I became convinced of the idea that a project should add contributors as early as possible. What that means is up to you. My answer is this: After any pull request – any one at all – I offer an invitation to its author to join the library's contributors. This happens often enough that I have Text Expander snippets, like this one:

BEGIN_WIDE

> Hey there! Thanks a lot for contributing to Moya! I've invited you to join the Moya GitHub organization – no pressure to accept! If you'd like more information on what that means, check out our [contributor guidelines](https://github.com/Moya/contributors) and feel free to reach out with any questions.

END_WIDE

You might be thinking "wow, contributor access after a _single_ merged PR sounds pretty risky", but you'd be wrong. What could possibly go awry? Are you're worried that something that shouldn't could get into `master`? Just protect the `master` branch from force pushes (in your repository's settings) so that you have a guaranteed-to-be-unbroken history on master, and then you can revert anything if it ever comes up. And you know what? It probably won't come up.

Remember, your goal is to create a community of people to contribute to the library _with_ you. If you want your idea to take off, you'll need help.

### Code of Conduct

Whether or not _you_ think your library needs a code of conduct, it does.

Why? 

Because your library need contributors (see above). 

Prospective contributors will feel more comfortable if they know they won't be bullied for making a mistake (for example), so they'll be more likely to contribute.

I really like [the contributor covenant](http://contributor-covenant.org), which is written around this promise:

BEGIN_WIDE

> In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

END_WIDE

Amazing, that is an awesome pledge, count me in.

The necessary implication of having a code of conduct is actually enforcing it. This is a serious responsibility, so take it seriously. But here's a tip: the easiest way to _avoid_ having to enforce a CoC is to prevent situations where the CoC would be need to be enforced. Seems kind of obvious, eh? Here are some steps:

- Through example, set a high bar for behaviour. Use [gratuitous positivity](/blog/gratuitous-positivity/).
- On contentious issues, offer to moderate a Google Hangout where people can speak face-to-face (and are more likely to be empathetic).
- Intervene in discussions where a heated argument is brewing, and remind everyone of the CoC.

There are probably resources useful for OSS maintainers on enforcing a CoC, but I couldn't find any. Let me know if you know of some.

### A Positive Attitude

I've written about [positivity in open source before](/blog/minswan-for-ios/) and [gratuitous positivity](/blog/gratuitous-positivity/): a positive attitude is a great way to attract contributors and then keep them contributing. Remember, your library need a community of contributors to help your make your idea popular.

### Contributor Guidelines

What are contributor guidelines? Well, remember the code of conduct? It's a _bare minimum_ level of accepted behaviour. Contributor guidelines are everything _on top_ of that bare minimum. It's a place for you to describe how the community operates, like instructions to start contributing, expectations of contributors, and day-to-day stuff like any preferences you have for code reviews or CI unit testing or whatnot.

You don't strictly _need_ these, but they help. I usually link to [Moya's contributor guidelines](https://github.com/Moya/contributors), which is versioned so you can reference it semantically.

---

These suggestions are focused on what your _library_ needs to be awesome; they're not focused on you. That may sound harsh, but I'd rather be honest than lead you on. The truth is, building an awesome library has a lot less to do with code than you might think. If you don't want to deal with building a community – if you just wanna code – that's totally cool, but you should consider finding a library already out there and contributing to it. 

And sending the maintainers this blog post couldn't hurt either 😉
