---
title: The Case for React Native
date: 2018-06-15
banner: background.jpg
bannerAttribution: https://twitter.com/CloudyConway/status/1006792849990602753
---

It occurred to me that there is a missing piece to the conversations around React Native - the React abstraction itself! Rather than getting stuck in debates about [the quality of JavaScript][js_good], I'd like to talk about this aspect of the React Native choice. If you're open-minded, if you accept that the JavaScript language is as excellent as I say it is, and if you're curious about why some people just seem so excited to use JavaScript to write iOS apps, I would love to explain my perspective.

Let's dive in.

## React Itself is Amazing

Okay so in order to understand React, it helps to understand the history of why React was built. Programming user interfaces for the web browser has sucked, since forever, and over the decades different teams have tried different approaches to make it suck less. This sounds kind of crappy, and for a while it really was, but then something really curious happened: the pressure to find a better way to build web software kept building and building until it outweighed the difficulty of the constraints of web browsers. The overwhelming amount of pressure to mitigate the awfulness of web programming led to a lot of really innovative ideas. One of the most famous ones is [jQuery][].

jQuery made it really easy to interact with the HTML elements on the web page (called the DOM). Many cool frontend JavaScript frameworks are built atop jQuery. The only problem was that the DOM API itself – the API that jQuery sits atop – is really slow.

"Really slow" is a relative term, so let's unpack what that means. Certain changes to the DOM can trigger what's called a [reflow][] – basically, the layout of the website gets re-calculated by the browser. A reflow is a **synchronous** event that can be easily triggered inadvertently by programmers, and it's easy for web apps to have performance problems based on this bottleneck (you can [read more about layout thrashing here][thrash]). Browser makers go to great lengths to optimize their reflow algorithms, but the easiest win for web app performance is being smart about when to trigger a reflow.

A kind of arms race between frameworks for web performance has been going for years, and it's been really exciting! And that brings us to React. React solves the slow DOM API problem by abstracting away the _state_ of the application. There are lots of implementation details (like, people usually mention the [Virtual DOM][] when explaining React) but the most important thing is that React is _declarative_.

So what the heck is that? Well it takes a second to explain.

User interfaces are built in React by building and composing reusable _components_, which are little pieces of code that turn input properties (called props) into a user interface. A React app is really just a big tree of components; each parent passes its child components the props that the child needs to render itself, and so on. This is _declarative_ because if a component is passed the same props, it will produce the same user interface every time.

Because of the stateless nature of the components, aggressive optimizations can be made to minimize DOM updates. And holy smokes is it ever optimized. Plus, there are some amazing tools that can be built on top of a framework that abstracts state into a plain JavaScript object that be tracked over time.

(Components can maintain their own internal state independent of React, but it's totally private to that component and can only be modified through a centralized, asynchronous API.)

I've always liked ([and advocated for][frp]) iOS functional reactive frameworks like [RxSwift][], [ReactiveSwift][], [Interstellar][], etc on iOS. However, I've never felt _entirely_ satisfied by them. They are an excellent way to handle state, but they themselves operate within and are built atop a stateful abstraction layer (UIKit). Subsequently, the complexity of these frameworks is fundamentally constrained on the lower bounds in a way that React isn't.

There's just too much incidental complexity to how these frameworks need to integrate with the rest of the app. Contrast that complexity with React, where there are no observables or flat maps or signal transforms; you just write components in declarative way and you get all the benefits of reactive UIs for free.

Yeah, for free.

It's like a functional reactive programmer's dream. Unidirectional data flow, asynchronous everything, everything, it's so good. The declarative abstraction that React provides is elegant and thoughtful, and the React developers have continuously improved the API and tooling for React over the past five years.

If you're keen to learn more, you should check out the [React tutorial][tut]; it includes a great, in-depth explanation of why immutability and declarative APIs are so important. You can also read [more about why React is so popular here][codecamp].

My point is: React is unbelievably good. But it's not the only reason to use React Native.

## The JavaScript Ecosystem is Also Amazing

iOS developers are a smaller community than web developers, who tend to specialize more. The web has also been around longer, too, and it's lacked any authority to direct its development. How cool is that! A whole other community of developers, evolving under totally different constraints.

JavaScript tools are often written _in_ JavaScript themselves, so what you get is a really low barrier to entry for people to build new tools, experiment with ideas, and of course, to make the everyday incremental improvements necessary for an ecosystem to thrive. Just like with iOS, the quality of any given OSS framework or tool is going to vary, but the sheer size of the web developer community and a more open perspective on tool building has produced a _lot_ of great tools.

And if you build your iOS app in React Native, you get access to that ecosystem. That means [Relay][]/[Apollo][], [styled components][], [Jest][], [Enzyme][], [prettier][], [Husky][], many other great tools, and a long tail of less well-known but nonetheless very useful tools. I cannot do justice to this feeling, you just need to experience it to understand.

People will validly complain about JavaScript developers relying on too many dependencies. When the native iOS developers at Artsy discuss the downsides of using React Native, we will tell you first thing about the dependencies. You kind of just... adjust to it.

There are big culture differences in OSS between the iOS and JavaScript developer communities. I think that JavaScript developers go a little too far, but I also think that iOS developers don't go far enough. At Artsy, we see those differences on our engineering team. Sometimes, tensions surface between web and native developers contributing to the shared React Native codebase. It's so fascinating to see how we approach the same problems from different perspectives. Each one of these tensions is an opportunity for us to learn from each other.

So yes, you'll have a lot of dependencies. But you'll also learn to see building software from a new perspective. That learning experience alone, to me, is a worth a few hundred node modules.

---

The thing is: this is all just what I think. Different people with different backgrounds and different priorities are going to come to different conclusions. I think that's totally okay. There are lots of reasons not to use React Native; when my colleague Eloy [describes why Artsy adopted it][rn_artsy], he literally begins with a bunch of React Native downsides. We're not hiding anything!

A lot of iOS apps (many? most?) can be entirely described as "software that turns API calls into user interfaces, and user interactions into API calls." That's a problem that React is tailored to solve, and React Native adopts that solution to iOS and Android really really well.

React Native isn't perfect, and it's not suitable for every app. But nothing is! UIKit isn't perfect for every app, either. There simply are no silver bullets in programming. React solves the problem of programming UIs to such a degree of success that, when combined with a fantastic language and a vibrant ecosystem, it makes a compelling case for use in a lot of apps.

[js_good]: /blog/javascript-is-good-actually/
[rn_artsy]: http://artsy.github.io/blog/2016/08/15/React-Native-at-Artsy/
[styled components]: https://www.styled-components.com
[Jest]: https://facebook.github.io/jest/
[Relay]: https://facebook.github.io/relay/\
[Apollo]: https://www.apollographql.com
[Enzyme]: https://github.com/airbnb/enzyme
[prettier]: https://prettier.io
[Husky]: https://github.com/typicode/husky
[jquery]: https://jquery.com
[reflow]: https://developer.mozilla.org/en-US/docs/Archive/Misc_top_level/Notes_on_HTML_Reflow
[thrash]: http://kellegous.com/j/2013/01/26/layout-performance/
[Virtual DOM]: https://reactjs.org/docs/faq-internals.html
[tut]: https://reactjs.org/tutorial/tutorial.html
[RxSwift]: https://github.com/ReactiveX/RxSwift
[ReactiveSwift]: https://github.com/ReactiveCocoa/ReactiveSwift
[Interstellar]: https://github.com/JensRavens/Interstellar
[frp]: https://ashfurrow.com/blog/reactivecocoa-vs-rxswift/
[React]: https://reactjs.org
[codecamp]: https://medium.freecodecamp.org/yes-react-is-taking-over-front-end-development-the-question-is-why-40837af8ab76
