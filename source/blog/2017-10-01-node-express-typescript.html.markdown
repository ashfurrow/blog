---
title: Node+Express+TypeScript
date: 2017-10-01 19:28:28 UTC
background_image: /img/blog/node-express-typescript/background.jpg
background_image_source: https://twitter.com/CrookedCosmos/status/914339934563127296
---

I've been using technologies like [Node][node], [Express][express], and [TypeScript][ts] at Artsy for a while now, contributing new features or fixing bugs to various codebases. But, I haven't ever gone through the full process of having an idea, starting a new project, building a minimum-deployable-product, and shipping it off to a server. I was less prepared for this than I'd thought.

While I give an overview of steps I followed, this isn't a tutorial; rather, it's a reflection on the contrasts between the iOS developer community and the JavaScript developer community. All the code is [available on GitHub][repo].

(READMORE)

I like using small projects to learn new things. They are limited-scope things to build without getting too overwhelmed by complexity. An open source project [wanted to tweet when they pushed a new GitHub tag][issue], perfect. 

After opening Xcode and selecting a project template, you have an entire app. You can compile and run it as-is and there's tonnes of helpful comments about where to add certain pieces of code.

There is no Xcode for JavaScript, so how you decide to build your app is _entirely_ up to you. It can be difficult to choose a methodology because there is an entire community of strong opinions about how to build software. And while projects like [Create React Native App][crna] offer an equivalent experience of a new project template, what I've learned is that the frameworks you use in JavaScript are only the tip of the iceberg.

So I'm using Express, but I prefer using a strong type system. No problem, I'll use TypeScript! Okay, so now I have to integrate a _build system_ into my workflows for developing, testing, and deploying, and holy shit I'm exhausted already.

I've used Express before, but I looked up a basic Hello, World project anyway. Then I found [a library][express-github-webhook] that provides middleware to process and verify GitHub webhook events. Great! Let's smash the two together, LHC-style.

As I work, I'm getting tired of building, then running, my code. So I add [Gulp][gulp] to watch the filesystem and re-run the TypeScript compiler whenever I change `.ts` files. I also specify an output directory of `dist` because that seems to be what everyone else does. (`dist` isn't checked in to git, it's basically like your Xcode app archives.) 

Gulp is configured via execution of [`gulpfile.js`][gulp_config], like a Gemfile or Podfile, while TypeScript is configured through a [`tsconfig.json`][ts_config] JSON config file. Interesting. It's amazing how flexible all the tools are – you can configure tools on the command line, through config files, or through environment variables. The easiest is through the config files, but they all need to be strictly valid JSON. The strictness of JSON was a bit frustrating, to be honest, especially a lack of comments.

I also needed to get fancy about how Heroku gets deployed by adding `["types": ["node"]]` to my TypeScript config. Oh, and also a [`postinstall` script][postinstall]. Otherwise, the TypeScript compilation would fail on Heroku. And you want to compile the TypeScript _on deploy_ and not as part of the server startup. Oh, and make sure Heroku's `Procfile` points to the `dist` directory's `index.js` (which is the compiled version of `src/index.ts`).

So.

Depending on your background, these technical details might seem either so trivial as to be hardly worth mentioning, or so complex that you might feel overwhelmed. And with no community authority like Apple providing a clear path for beginners, it's very easy to get stuck on randoms configuration problems.

That said, I also happen to disagree with a lot of Apple's vision for how to develop software. Not just methodology, but also build tools. For instance, Apple's [Xcode IDE is closed source][xcode], and has very minimal support for extensions. Many projects, like [swiftlint][] and [sourcekitten][], make improving the iOS development experience easier, but iOS developers tend to rely exclusively on Apple tooling.

In contrast, the JS tooling ecosystem is alive with a plethora of linters, checkers, formatters, file watchers, test runners, and more. Yes, it is a little overwhelming, and yes, your initial project setup is a lot harder than a new project template from Xcode, but the JS community apparently believes that a little bit of extra upfront work is well worth improving the development experience in the long run. Having worked in both the iOS and JS ecosystems, I'm inclined to agree with them.

More than just a variety of tools is the size of the community that builds them. Because JavaScript developers mainly build their tools _in JavaScript_, the initial barrier of contributing to those tools is enormously lowered. The community empowers its members to improve the tooling that everyone uses, and the results are spectacular.

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr">Let’s flip the tables: how empowering would it feel if your app’s API was written in Swift? You’d be able to fix your own bugs, add features</p>&mdash; Pablo Picasghost👻 (@ashfurrow) <a href="https://twitter.com/ashfurrow/status/914247587984687104?ref_src=twsrc%5Etfw">September 30, 2017</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

The cycle of compiling Swift/Objective-C to run unit tests adds a lot of time to my iOS development process. It takes time to compile, install, and run tests. If you have to wait fifteen seconds to see if your code works, you won't check as often. In contrast, [VSCode][vscode] and [Jest][jest] make testing _unbelievably fast_. Using Jest to test JS fundamentally changed how I write code and I miss the near-instant feedback cycle when I return to iOS native development.

The JavaScript community moves at a blistering pace. That means I can't just learn the current JS syntax because most tutorials, StackOverflow answers, and blog posts use older syntaxes that I also need to learn. For example, dependencies used to be loaded into a file with `require()` but now most folks (at least the ones I work with) use `import`. But you can't use `import` in the Node REPL, you have to still use `require`.

Something I really dig about JavaScript is how you import all your dependencies explicitly; you import specifically "exported" functions and such from modules. Some modules export named functions, while other modules export a "default" function. Some do both. Here are a few examples of how to import stuff in JS:

```js
import { info, error } from './lib/loggers'
import * as auth from 'auth'
import tweet from './twitter'
```

It all makes sense to read, but I still don't have the mechanics internalized enough to write the syntax right on the first try.

One need thing I like about working in Artsy's JS codebases is their use of git precommit hooks. Often, these hooks will lint and reformat your code for you to adhere to the repo's standard. Or maybe they'll run any tests related to your staged changes. Very handy stuff for catching mistakes earlier in the development process.

With all the experimentation of tools, I'm certain that I've left some orphaned configuration or dependencies that I no longer need. Or maybe I have some developer dependencies in my [`package.json` file][package]. Or some leftover `scripts`. It's pretty easy to accumulate all this stuff while you're learning. Maybe I'll go shake it out. If you see anything funky [in the repo][repo], let me know in an issue.

I still have a few mysteries I'm looking to solve, like how precisely it is that es-lint, ts-lint, and prettier relate to one another. Stuff like that. Still got a lot to learn.

---

The JS and iOS developer communities are very different places. iOS developers have a single company setting vision for how to build apps, whereas JS developers have an _overwhelming_ number of options.

Now that I've gone through the setup process, it will go a lot easier next time. The initial setup of the project, toolchain, and workflows was difficult enough to frustrate me a few times. But the development workflow makes writing software way easier, faster, and more fun.

If any of this has resonated with you, Mozilla has some [comprehensive documentation][docs] around setting up a development environment to write a `Hello, World` app in Express. Think of something you'd like to build, and try to build it. It'll be really hard, and you might not finish, but you'll learn a lot and hopefully have some fun. I sure did.

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
