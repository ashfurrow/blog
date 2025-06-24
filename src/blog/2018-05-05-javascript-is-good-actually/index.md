---
title: JavaScript is Good, Actually
date: 2018-05-05
banner: background.jpg
bannerAttribution: https://twitter.com/CloudyConway/status/992763019968045056
---

The subtext of many discussions around building software in Electron and React/Native involve this assumption that _JavaScript is bad_. There is a kind of unspoken understanding that JavaScript developers are _stuck_ writing it, that either:

- given the choice, they would move to a "better" language, or
- they have a kind of Stockholm syndrome and like JavaScript.

That's not true. This framing discounts a tonne of developers – thousands and thousands of us – that _enjoy_ writing JavaScript. Not because it just happens to be popular or that we are forced to, either. Language like this robs JavaScript developers of our agency, treating us/our decisions/our preferences as invalid or even accidental.

The fact is, we enjoy writing JavaScript because JavaScript is a good language. I'll explain later.

Oh wait, I'll explain now.

## The Syntax

JavaScript syntax is a joy to use. It's clear, concise, and tailored to the kinds of tasks that JavaScript developers tend to write code for. Here is an example, [taken from Artsy's React Native app][emission]:

<Wide>

```ts
submitFinalSubmission = async () => {
  this.showConfirmationScreen()

  const submission = this.state as ConsignmentSetup
  let hasSubmittedSuccessfully = true
  try {
    await updateSubmission({ ...submission, state: "SUBMITTED" }, this.state.submission_id)
    await AsyncStorage.removeItem(consignmentsStateKey)
    this.submissionDraftSubmitted()
  } catch (error) {
    console.error("Overview final submission: " + error)
    hasSubmittedSuccessfully = false
  }

  this.setState({ hasSubmittedSuccessfully })
}
```

</Wide>

If you've never worked with modern JavaScript before, it might look a little weird. But I would bet that you understand the _gist_ of what this code is and does. And that's pretty important, I think.

I really like modern JavaScript syntax. Check out the [ES6 Cheatsheet][cheat] for a bunch of examples of how modern syntax makes JavaScript really nice to code in. Here is another great article describing [modern syntax][modern], aimed at folks more familiar with older JavaScript.

I'm not going into more detail because syntax is... well it's not _that_ important to a language. Syntax is (I'm waving my hand dismissively here) just syntax. What matters more is the context in which syntax is used. Modern JavaScript syntax is very effective and suited to the kinds of problems that JavaScript developers solve. Don't even get me started on how cool [JSX][] is.

You may have noticed that the code above isn't even JavaScript, it's [TypeScript][], which brings me to my next point.

## The Toolchains

Okay so one of the key parts of why JavaScript is great is the toolchains that surround it. Tools like TypeScript and [Flow][] bring type safety to the language. Editors like [Visual Studio Code][code] bring IDE-level features like autocomplete, inline documentation, an extension API, and more. Tools like [Prettier][], [ESLint][], and [Jest][] exist to make writing code easier and faster.

It's really difficult for me to describe just how foundational a paradigm shift I experienced when I began writing in JavaScript. My entire perspective on how code should be written changed. So it's hard to describe in words how effective and how powerful these toolchains are. So let's take a look at one small example.

One argument against JavaScript that exemplifies how developers who are unfamiliar with JavaScript complain about problems that are obviated by toolchains is the `==` operator. Ah yes, the humble equality check. Because of early design choices – I'd call them mistakes but I don't have the full context – equality in JavaScript is a bit bizarre.

<Tweet tweetID="992755305426685952" />

(Note: Aaron is really really funny and you should give him a follow. He's not the kind of developer to make facile complaints against JavaScript, I really enjoyed his tweet.)

Since JavaScript is used all over the internet, you can't really just _change_ the semantics around equality without breaking everything. JavaScript has harder constraints around backwards compatibility than many other popular languages; constraints like this are as much an opportunity as they are a liability. To wit: JavaScript introduced `===` to solve this problem, which is just `==` but it works as you expect.

Using `==` in a modern JavaScript codebase is pretty rare. And the toolchains are aware of this context, so you get warnings and errors when you use it by accident. ESLint does this, for example. Tool builders in the JavaScript community are aware of the language's peculiarities, and newcomers to JavaScript are supported by the tools, to avoid pitfalls. It isn't a matter of shooing away the problem and expecting developers to just learn the quirks – it's a matter of the tooling helping guide developers to best practices.

It's as though the tooling community looked at JavaScript and – in a very non-judgemental way – said "isn't that interesting?" There's no attachment to the way things should be, there's no lamenting about how things could have been better. Things are just... interesting. After understanding that context, without judging it, tool builders get to work.

## The Community

So tooling. JavaScript developers contribute back to their own tooling in a way that (and I can _only_ speak from my experience) iOS developers don't. I'm not judging in any way, I'm just observing. As much as iOS developers can – [and should][jp] – fix their own problems and improve their own tools, we don't tend to.

A big part of that is that the tools iOS developers use are [closed source][xcode], so they can't _be_ contributed to. But there are plenty of other tools – like [Jazzy][], [CocoaPods][], and [Sourcery][] – that _are_ open source and they don't enjoy the same level of community contributions as tools in the JavaScript world. iOS developers happily contribute to libraries and frameworks they use to write code, but they contribute to _tools_ less frequently.

There's an argument to be made that because most of the tools that JavaScript developers use are written _in_ JavaScript, that developers tend to contribute back more. I'm not really going to make the argument because it makes a bunch of assumptions around developer motivation. And I'm not trying to judge the iOS developer community – I'm only saying that the JavaScript community is engaged in participatory tool-building in a way that the iOS community is not. I find it genuinely fascinating.

Let's see what tool building in the JavaScript world can look like in practice:

- Facebook builds a [GraphQL server in Node.js][graphql] and open sources it. The community helps improve it.
- Facebook also builds [GraphiQL][], a small, in-browser IDE for debugging GraphQL queries on your server. The community helps here, too; the IDE has over sixty contributors.
- Someone embeds GraphiQL [into an Electron app][gapp], which can be pointed to _any_ GraphQL server. You can use GraphiQL to explore another developer's API, cool!
- Someone else embeds GraphiQL into a [JSON-to-GraphQL playground generator][gcollege]. It's a small-but-important part of a larger educational app to teach people about GraphQL and it accompanies an open source book about GraphQL.
- Someone else further remixes GraphiQL into [GraphQL Playground][gplayground], a more powerful and feature-rich IDE than GraphiQL alone.

This is just a small example of how tools built and released into the OSS community proliferate and are composed into other, even more powerful tools. Here is a case where Facebook, a large company that makes developer tools, builds something. Then they release it and developers remix that thing for their own needs, helping the entire community in the process.

Tool building in JavaScript operates in an entirely different way than in iOS. Than in any community I've been a part of, actually. To be absolutely clear: this isn't a complaint against the iOS developer community; this is a strong endorsement of the JavaScript developer community.

---

People who enjoy hating JavaScript tend to point to oddities in the language or quirks of its syntax/inheritance model. That kind of stuff. They'll say things like "well JavaScript was broken from the beginning" or point to the (very funny, I laugh every time!) [Wat][] video. Those arguments can sound convincing, especially if you've never really worked in a production JavaScript environment.

But here's the thing: every language is weird. And every language makes regrettable design choices early on that it has to reckon with. How and when these mistakes are dealt with is a part of the language, too. Just because you disagree with the decisions doesn't make the language _bad_. These choices by the language authors are also informed by the community, the environments the language is used in, and the constraints it has to operate under. That's a lot of context, and it's hard for outsiders to have a clear picture of why certain decisions were made.

<Tweet tweetID="991723030702379009" />

_Tout comprendre c'est tout pardonner_. I understand JavaScript, so I forgive it. And in doing so, I give myself permission to _enjoy_ it. I hope you give it a shot.

[wat]: https://www.destroyallsoftware.com/talks/wat
[emission]: https://github.com/artsy/emission/blob/365d34cba3bf96c74c6ae7f2615f37c82c669920/src/lib/Components/Consignments/Screens/Overview.tsx#L135-L150
[typescript]: https://www.typescriptlang.org
[flow]: https://flow.org
[cheat]: https://github.com/DrkSephy/es6-cheatsheet
[code]: https://code.visualstudio.com
[prettier]: https://prettier.io
[eslint]: https://eslint.org
[jest]: https://facebook.github.io/jest/
[jp]: https://www.youtube.com/watch?v=flSMEw_Hxik
[xcode]: http://isxcodeopensourceyet.github.io
[graphiql]: https://github.com/graphql/graphiql
[gapp]: https://github.com/skevy/graphiql-app
[gcollege]: https://www.graphql.college/practice-graphql/
[gplayground]: https://github.com/graphcool/graphql-playground
[jazzy]: https://github.com/realm/jazzy
[cocoapods]: https://github.com/CocoaPods/CocoaPods
[sourcery]: https://github.com/krzysztofzablocki/Sourcery
[graphql]: https://github.com/graphql/graphql-js
[modern]: https://medium.com/the-node-js-collection/modern-javascript-explained-for-dinosaurs-f695e9747b70
[jsx]: https://reactjs.org/docs/introducing-jsx.html
