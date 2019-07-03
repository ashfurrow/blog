---
title: "One of the Worst Bits of Programming Advice I ever Got"
date: 2011-09-26 00:00
---

(EDIT: wow my wordpress theme needs work. Sorry for the overflow!) I read this article on [avoiding class names that end in "-er"](http://objology.blogspot.com/2011/09/one-of-best-bits-of-programming-advice.html?spref=tw) this morning. Things like "Helper", "Controller", and so on (not nouns like "Number").

The author's rational is essentially that it's antithetical to Object-Oriented Programming as defined in the context of what the "Founding Fathers" thought it should be.

... right.

This is completely silly.

I don't really care what some neck-bearded old computer scientists thought a few decades ago about how I should program. The second you try to tell me that OOP is the One True Way to program, I've lost all confidence in your ability to give reasonable advice.

OOP isn't a methodology you have to use in a silo. To ignore other paradigms of computer programming is ignoring other, possibly better (possibly WAY better), ways to do something. &nbsp;The people who envisioned OOP were living in a land of procedural programming and they were probably, understandably, driven crazy by it. Of course they'd encourage me to think only in terms of nouns. But I'm not going to.

Consider a real world example. I have my iOS application that mostly runs in the main thread. I have an APIHelper that sits in the bowels of my app making _synchronous_&nbsp;HTTP requests to the server. Why synchronous? Because it was fastest and easiest to code. Now, I can't wait on an API fetch in the main thread, so in between my main app code and my API fetching code sits a ModelFetcher class. It's only responsibility is to abstract away the need to offload things into background threads. Its a singleton and its only two instance methods are an NSCache instance and a few dispatch\_queue\_t's.

A typical use is the following:<script src="https://pastebin.com/embed_js.php?i=GhpyDjbn"></script>And the invoked method looks like the following:<script type="text/javascript" src="https://pastebin.com/embed_js.php?i=HKY2unXV"></script>I rather like this way of fetching since it keeps each class focused only on what it has to do\*.

\*This is the firs time I've shared this code, and I'd appreciate any feedback on it :)

Either I'm only changing the class names to adhere to some silly piece of advice or I'm being antithetical to OOP. In either case, it works for me.

One of the best piece of programming advice I'll probably ever give is learn from your own experiences and beware of anyone espousing the virtues of the One True Way.

(READMORE)
