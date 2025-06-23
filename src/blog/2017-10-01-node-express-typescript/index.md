---
title: 'Weekend Hack Project: Twelease'
date: 2017-10-01
banner: background.jpg
bannerAttribution: https://twitter.com/CrookedCosmos/status/914339934563127296
---

I've been using technologies like [Node.js][node], [Express][express], and [TypeScript][ts] at Artsy for a while now, contributing new features or fixing bugs to various codebases. But I haven't ever gone through the full process of having an idea, starting a new project, building a minimum-deployable-product, and shipping it off to a server. I was less prepared for this than I'd thought.

While I give an overview of steps I followed, this isn't a tutorial. It is a reflection on the contrasts between the iOS developer experience and the JavaScript developer experience. All the code is [available on GitHub][repo].

Let's go!

I like using small projects to learn new things. Limited-scope projects are great to build without getting too overwhelmed by complexity. An open source project [wanted to tweet when they pushed a new GitHub tag][issue]; only slightly more complicated than an IFTTT rule, perfect.

But where to start?

See, after opening Xcode and selecting a project template, you have an entire app. You can compile and run it as-is and there's tonnes of helpful comments about where to add certain pieces of code.

There is no Xcode for JavaScript, so how you decide to build your app is _entirely_ up to you. It can be difficult to choose a methodology because there is an entire community of strong opinions about how to build software. And while projects like [Create React Native App][crna] offer an equivalent experience of a new project template, what I've learned is that the frameworks you use in JavaScript are only the tip of the iceberg.

So I'm using Express, but I prefer using a strong type system. No problem, I'll use TypeScript! Okay, so now I have to integrate an entire build system into my workflows for developing, testing, and deploying, and holy shit I'm exhausted already.

I've used Express before, but I copy/pasted a basic Hello, World project anyway. Then I found [a library][express-github-webhook] that provides middleware to process and verify GitHub webhook events. Great! Let's smash the two together, LHC-style.

As I work, I'm getting tired of building, then running, my code. So I add [Gulp][gulp] to watch the filesystem and re-run the TypeScript compiler whenever I change `.ts` files. I also specify an output directory of `dist` because that seems to be what everyone else does. (`dist` isn't checked in to git, it's basically like your Xcode app archives.)

Gulp is configured via execution of [`gulpfile.js`][gulp_config] - like a Gemfile or Podfile, while TypeScript is configured through [`tsconfig.json`][ts_config]. Quirky difference – but it makes sense. It's amazing how flexible all the tools are – you can configure tools on the command line, through config files, or through environment variables. The easiest is through the config files, but they all need to be strictly valid JSON. The strictness of JSON was a bit frustrating, to be honest, especially the lack of comments.

I also needed to get fancy about how Heroku gets deployed by adding `["types": ["node"]]` to my TypeScript config. Oh, and also a [`postinstall` script][postinstall]. Otherwise, the TypeScript compilation would fail on Heroku. And I wanted to compile the TypeScript _on deploy_ and not as part of the server startup. Oh, and I made sure Heroku's `Procfile` points to the `dist` directory's `index.js` (which is the compiled version of `src/index.ts`).

So.

Depending on your background, these details might seem either so trivial as to be hardly worth mentioning, or so complex that you might feel overwhelmed. And with no community authority like Apple providing a clear path for beginners, it's very easy to get stuck on random configuration problems.

That said, I also happen to disagree with a lot of Apple's vision for how to develop software. Not just methodology, like MVC, but also build tools. For instance, Apple's [Xcode IDE is closed source][xcode], and has very minimal support for extensions. Many community projects, like [swiftlint][] and [sourcekitten][], do help improve the iOS development experience, but iOS developers tend to rely exclusively on Apple tooling.

In contrast, the JS tooling ecosystem is alive with a variety of linters, type-checkers, formatters, file watchers, test runners, and more. Yes, it is a little overwhelming, and yes, your initial project setup is a lot harder than a new project template from Xcode, but the JS community seems to believe that a little extra upfront work is well worth improving the development experience long term. Having worked in both the iOS and JS ecosystems, I'm inclined to agree with them.

More than just a variety of tools is the size of the community that builds them. Because JavaScript developers mainly use tools written _in JavaScript_, the initial barrier of contributing to those tools is enormously lowered. The community empowers its members to improve the shared tooling, and the results are spectacular.

<Tweet tweetID="914247587984687104" />

The cycle of compiling Swift/Objective-C to run unit tests adds a lot of time to my iOS development process. It takes time to compile, install, and run tests. If you have to wait fifteen seconds to see if your code works, you won't check as often. In contrast, [VSCode][vscode] and [Jest][jest] make testing _unbelievably fast_. Using Jest to test fundamentally changed how I write code, and I miss the near-instant feedback cycle when I return to iOS native development.

The JavaScript community moves at a blistering pace. That means I can't just learn the current JS syntax because most tutorials, StackOverflow answers, and blog posts use older syntaxes that I also need to learn. For example, dependencies used to be loaded into a file with `require()` but now most folks seem to use `import`. But `import` won't work for me in the Node REPL, I had to still use `require`.

Something I really dig about JavaScript is how you import all your dependencies explicitly; you import specifically "exported" functions and such from modules. Some modules export named functions, while other modules export a "default" function. Some do both. Here are a few examples of how to import stuff in JS:

```js
import { info, error } from './lib/loggers'
import * as auth from 'auth'
import tweet from './twitter'
```

It all makes sense to read, but I still don't have the mechanics internalized enough to write the syntax right on the first try.

One neat thing I like about working in Artsy's JS codebases is their use of git pre-commit hooks. Often, these hooks will lint and reformat your code for you to adhere to the repo's standard. Or maybe they'll run any tests related to your staged changes. Very handy stuff for catching mistakes earlier in the development process. For whatever reason, automatic code formatters just haven't been popular among iOS developers.

Okay, so I have my app set up and working, but with all the experimentation with tools and frameworks, I'm certain that I've left in some orphaned configuration or dependencies that I no longer need. Or maybe I have some developer dependencies in my [`package.json` file][package]. Or some leftover `scripts`. It's pretty easy to accumulate all this stuff. Maybe I'll go shake it out. If you see anything funky [in the repo][repo], let me know in an issue.

I still have a few mysteries I'm looking to solve, like precisely how `es-lint`, `ts-lint`, and `prettier` relate to one another. Stuff like that, quirks I've noticed or other common knowledge that people don't tend to write blog posts about. I've still got a lot to learn.

---

The JavaScript and iOS developer communities are very different places. iOS developers have Apple setting the vision for how to build apps, whereas JS developers have an _overwhelming_ number of options. I'm glad I can work in both communities – I like and dislike things about each.

The initial setup of the project, toolchain, and workflows was difficult enough to frustrate me a few times. It will be a lot easier next time. But the improved development workflow makes writing software way easier, way faster, and way more fun.

If any of this has resonated with you, Mozilla has some [comprehensive documentation][docs] around setting up a development environment to write a `Hello, World` app in Express. Don't worry about TypeScript for now.

Think of something you'd like to build, and try to build it. Make sure your idea is really easy, because building it will probably actually be hard, and you might not finish, but that's okay because you'll have learned a lot. Hopefully you'll have some fun. I sure did.

[node]: http://nodejs.org
[express]: http://expressjs.com
[ts]: https://www.typescriptlang.org
[repo]: https://github.com/ashfurrow/twelease
[crna]: https://github.com/react-community/create-react-native-app
[express-github-webhook]: https://github.com/Gisonrg/express-github-webhook
[package]: https://github.com/ashfurrow/twelease/blob/master/package.json
[gulp_config]: https://github.com/ashfurrow/twelease/blob/master/gulpfile.js
[ts_config]: https://github.com/ashfurrow/twelease/blob/master/tsconfig.json
[postinstall]: https://github.com/ashfurrow/twelease/blob/1f233ba4aa8004958379e073232cc9b72b395c47/package.json#L41
[vscode]: https://code.visualstudio.com
[jest]: https://facebook.github.io/jest/
[swiftlint]: https://github.com/realm/SwiftLint
[sourcekitten]: https://github.com/jpsim/SourceKitten
[docs]: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs
[issue]: https://github.com/danger/danger-js/issues/332
[gulp]: https://gulpjs.com
[xcode]: http://isxcodeopensourceyet.github.io
