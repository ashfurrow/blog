---
title: ReactiveCocoa vs RxSwift
date: 2015-11-18 18:27:08 UTC
background_image: /img/blog/reactivecocoa-vs-rxswift/background.png
background_image_source: https://twitter.com/CloudyConway/status/660238972912803841
---

I've spoken in different venues about functional reactive programming in iOS, using either Objective-C or Swift. Now, before Swift came out, I told people to try ReactiveCocoa because that was the only FRP library available. And it's a great library, too!

Now there are several FRP libraries to choose from, and people have begun thinking that because I no longer recommend ReactiveCocoa, I no longer think it's a good project. That's just not true, ReactiveCocoa is demonstrably a great project. The reason that I'm no longer recommending it – or any other library – is because the frameworks themselves don't matter.

<!-- more -->

Well, they "don't matter" for beginners anyways. If you haven't tried using either one yet, then respectfully, you don't yet have the vocabulary necessary to discuss which is more suited for your needs.

It's far more interesting to discuss the _philosophy_ behind reactive programming than discussing any given implementation. I really couldn't care less which library you use, and neither should you.

But people are persistent! When I refuse to give a definitive answer about which library is better, they'll ask me which one I prefer. Well preferences are pretty personal – just because I _prefer_ one or the other shouldn't affect your decision on which to try.

Listen, if you're a beginner, it really doesn't matter. Yes, [of course there are technical differences](http://stackoverflow.com/a/32581824), but they aren't meaningful to newcomers. Try one framework, then try the other. See for yourself which one _you_ prefer! _Then_ you can figure out why you prefer it.

I tell people to flip a coin, but even that's a bit reductive: there are more libraries that follow principles of reactive programming than just RxSwift and ReactiveCocoa! 

So I'll make it easy for you. Click this button and try whichever FRP framework you get. I promise it'll be worth your time.

<script>

var libraries = ['PromiseKit', 'Bolts', 'RxSwift', 'ReactiveCocoa', 'Bond', 'Interstellar','ReactiveKit', 'VinceRP']

function goToRandomLibrary() {
	var index = Math.floor(Math.random() * libraries.length);
	window.location.href = 'https://cocoapods.org/pods/' + libraries[index];
}

</script>

<input type="button" onclick="goToRandomLibrary()" value="Go" class="btn btn-default center-block" />

(If you have suggestions for other FRP libraries to recommend, [send a pull request](https://github.com/ashfurrow/blog/edit/master/source/blog/2015-11-18-reactivecocoa-vs-rxswift.html.markdown).)

Remember, ideas matter more than implementations. The _idea_ of reactive programming is far more important than any implementation – try different frameworks and form an opinion for yourself.
