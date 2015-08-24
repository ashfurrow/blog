---
title: "iOS Developer Discomfort"
date: 2013-10-02 00:00
---

<p>Over the past year or so, I've noticed some trends in the code that's developed by some of the people I respect. People I look up to – people that I know are hella smart. </p>

<p>The code that these people put out is often seen as esoteric. Strange even. </p>

<p>When I first saw some of the approaches, which I'll outline below, I was uncomfortable. Things didn't feel natural. The abstractions that I was so used to working in were useless to me in the new world. </p>

<p>Smart people like these don't often propose new solutions to solved problems just because it's fun. They propose new solutions when they have <em>better</em> solutions. Let's take a look.     </p>

<p>Here are some practices that I've noticed have made me uncomfortable, but in practice have helped me become a better developer. </p>

<h1 id="declarativeprogramming">Declarative Programming</h1>

<p>Our first example is declarative programming. I've noticed that some experienced developers tend to shy away from mutating instance state and instead rely on immutable objects. </p>

<p>Declarative programming abstracts <em>how</em> computers achieve goals and instead focuses on <em>what</em> needs to be done, instead. It's the difference between using a <a href="http://ashfurrow.com/blog/stop-writing-for-loops">for loop and an enumerate function</a>.</p>

<p>Objective-C is an abomination (I love it anyway). It's a message-oriented language masquerading as an object-oriented language build on top of C, an imperative language. Ugh. Needless to say, abstracting common things in Objective-C can get hairy, but it's getter easier with things like blocks and object literals. </p>

<p>With the extreme of declarative programming, you would declare the entire behaviour of your application at startup and just let it run until completion. </p>

<h2 id="whyistartedusingdeclaritive">Why I Started Using It</h2>

<p>Declarative programming removes mutable state, leading to fewer runtime errors and behavioural problems. It also made my code easier to test, either with functional, integration, or unit tests (more on unit testing later). It freed me from the minutiae of how computers work, leaving that tedium up to the compiler. For most applications, the performance hit is trivial and not worthy of consideration.</p>

<h2 id="whyitwashardtoadoptdeclaritive">Why It Was Hard to Adopt</h2>

<p>It was hard to get into declarative programming because it stripped away everything I was used to and left me with tools I was unfamiliar with. My coding efficiency plummeted in the short term. It seemed like prematurely optimizing my code. It was uncomfortable. </p>

<p>However, I'd still recommend <a href="http://labs.teehanlax.com/project/upcoming">trying it out</a>. </p>

<h2 id="resourcesdeclaritive">Resources</h2>

<p>I've <a href="http://www.teehanlax.com/blog/reactivecocoa/">written</a> <a href="http://www.teehanlax.com/blog/getting-started-with-reactivecocoa/">about</a> ReactiveCocoa, or <a href="https://github.com/ReactiveCocoa/ReactiveCocoa">RAC</a>, before.  </p>

<p>If you're interested in getting started in RAC, read my articles above or check out the <a href="http://nshipster.com/reactivecocoa/">NSHipster</a> entry.  Also, everyone should read Rob Rix's <a href="https://github.com/robrix/Postmodern-Programming/blob/master/Postmodern%20Programming.md">Postmodern Programming</a>.</p>

<h1 id="dotsyntaxaccessing">Dot-Syntax Accessing</h1>

<p>Dot-syntax is a message-passing syntax in Objective-C that turns  <code>obj.property</code> into <code>[obj property]</code> under the hood. The compiler doesn't care either way, but people get in <a href="http://qualitycoding.org/dot-notation/">flame</a> <a href="http://qualitycoding.org/dot-notation-wins/">wars</a> over the difference. </p>

<p>I've seen a lot of smart people favour the dot-syntax expression for more than just properties, however. You can call any method with zero-arity (no arguments) with dot-syntax. Or you could eschew it completely. </p>

<p>In the middle of the spectrum, which I like, is the use of dot-syntax for <a href="https://github.com/github/objective-c-conventions#expressions">idempotent values</a>. That means things like <code>UIApplication.sharedApplication</code> or <code>array.count</code> but not <code>array.removeLastObject</code>. </p>

<h2 id="whyistartedusingitdot">Why I Started Using It</h2>

<p>It's a lot harder to argue that you should use dot-syntax in all idempotent cases. The best case I've heard for it is that it doesn't require knowledge of the header file declaration of the property/method. It's just always dot-syntax. </p>

<p>The trend is leaning toward using dot-syntax more and more for properties. Newcomers to iOS and OS X hardly even know about the dot-syntax war. In my opinion, this doesn't matter as much as long as you're relentlessly consistent. </p>

<h2 id="whyitwashardtoadoptdot">Why It Was Hard to Adopt</h2>

<p>Mostly, it was hard to adopt because I had a habit of calling methods the classical way. Like declarative programming, it's uncomfortable.</p>

<p>It's also hard because Xcode's autocomplete will not help you with methods like <code>UIColor.clearColor</code> when using the dot-syntax. Boo. </p>

<h1 id="unittesting">Unit Testing</h1>

<p>Apple made a big push for unit testing in Xcode 5, even if it seems half-hearted (still no mocking framework? Hello, <a href="https://github.com/allending/Kiwi">Kiwi</a>). I've <a href="http://ashfurrow.com/blog/objective-c-vitamins">talked before</a> about about the benefits of unit testing.</p>

<p>Unit testing is about testing the smallest unit of composable code. In order to unit test effectively, you need to write smaller chunks of code that are easier to test than larger ones. </p>

<h2 id="whyistartedusingittesting">Why I Started Using It</h2>

<p>The value of unit testing is two-fold. First, I've got automated tests that improved my confidence when making changes to an existing codebase. Second, I have my code in smaller chunks, hopefully with more abstractions, since that's what is easier to write unit tests against. Leaner, cleaner code is definitely a benefit I don't think anyone would argue with.</p>

<h2 id="whyitwashardtoadopttesting">Why It Was Hard to Adopt</h2>

<p>As mentioned earlier, Objective-C is a quagmire of object- and message-orientation with a dash of imperative C thrown in. It's harder to test imperative code compared to object-oriented code. </p>

<p>Additionally, with the Model-View-Controller paradigm on iOS, it's hard to reliably unit test anything but your models. There's little point to unit testing your view code, since it relies on UIKit (unless you feel like mocking all of UIKit out), and the view controller often bloom to be thousands of lines long. That makes it hard to suss out testable control logic from view-manipulation code. Then again, separating these from one another is kind of the point of unit testing. </p>

<h1 id="autolayout">Autolayout</h1>

<p>Autolayout has been around in iOS since iOS 6, and even longer on OS X. It's a way to declare (there's that word again) your layout's constraints and have them satisfied for you by UIKit at runtime. </p>

<p>It promised to be a magical land where programming layouts was easy and springs and struts (auto resizing masks) were a thing of the past. The reality was that it introduced problems of its own, and Autolayout's interface was non-intuitive for many developers. </p>

<h2 id="whyiwanttostartusingitautolayout">Why I Want to Start Using It</h2>

<p>Full disclosure: I'm no Autolayout ninja. I've only been using it in a few personal projects, in part because how hard it is to get started. However, I see it's benefits.</p>

<p>Declaring your interface is preferable to managing it yourself because you have less code to maintain. Autolayout lets you express interface layouts that were just not possible using springs and struts. </p>

<h2 id="whyitwillbehardtoadoptautolayout">Why It Will Be Hard to Adopt</h2>

<p>Springs and struts are familiar, while Autolayout is new and uncomfortable. Doing simple things like vertically centring a view within its superview is difficult in Autolayout because it abstracts so much away.</p>

<p>It's just never seems like a good time to switch over the Autolayout. But then, it never will. I've just got to bite the bullet.</p>

<h2 id="resources">Resources</h2>

<p>Check out Justin Williams' <a href="http://carpeaqua.com/autolayout/">Achieving Zen with Autolayout</a> page.</p>

<h1 id="conclusion">Conclusion</h1>

<p>Why do these coding practices make one uncomfortable? Certainly they're new, and change is always awkward. However, even small changes can make a big difference.</p>

<p>After recently working in-house with a client who prioritized a declarative programming approach in their code, I found myself exhausted. I spent the whole week fully taxed – never reaching <a href="http://en.wikipedia.org/wiki/Flow_(psychology">flow state</a>). Soon after starting, though, I saw the value in their approach. </p>

<p>Change is hard. Maybe the iOS community will resist declarative programming, as has the web development community for two decades. Maybe ReactiveCocoa will stay on the fringes of Objective-C development as ReactiveExtensions has with .Net and Lisp has with web development. </p>

<p>Maybe not. </p>

<p>We're in a golden age of tools – anyone can choose any tool that suits their task best – and the are concrete advantages of the approaches I've listed above. It makes one consider if some slight, temporary discomfort might be worth the gains in the long run. </p>

<p>If you avoid something just because it's unfamiliar or it disagrees with your currently held best practices, you're doing yourself a disservice by turning down an opportunity to rid yourself of ignorance. You're going to learn something new – either that you were right all along or that you still have more to learn. </p>

<!-- more -->

