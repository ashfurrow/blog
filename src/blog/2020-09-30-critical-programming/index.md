---
title: Critical Programming
date: 2020-09-30
banner: background.jpg
bannerAttribution: https://twitter.com/CloudyConway/status/1311240685396389888
---

When I was in the eleventh grade, I had a horrible English class. My teacher was uninspiring and I was inattentive. It sucked. Meanwhile, my friend was in an Advanced Placement class and it sounded like _a lot_ more fun. He eventually convinced me to talk to the AP teacher to request transferring up for my senior year.

I'm so glad I did because it's hard to overstate the impact that this decision has had on my career and my entire adult life. This is the story of how I learned to think critically.

Mrs. (now Dr.) Jane McLean was open to me transferring in as long as I caught up over summer on everything I'd missed in the eleventh grade. She gave me a stack of poems and books, along with a list of essays to write about them. We would check in over the course of the summer to make sure I was on track.

The first essay I wrote was about a poem by Edwin Arlington Richardson titled [_Richard Cory_](https://www.poetryfoundation.org/poems/44982/richard-cory). I remember writing about four pages about it and sending it to her. This did not go well. My thesis was, essentially, that the poem was great. Mrs. McLean asked me "Ash, you wrote that this poem is really great but, realistically, how many poems have you actually read?"

I felt a bit humiliated, to be honest, but that taught me an important lesson: the importance of perspective. The truth is, I _hadn't_ read many poems (and since we're being honest, I still haven't). Re-reading my essay, it was suddenly, glaringly obvious that I didn't really have anything interesting to say at all about the poem. The point of writing the essay, I learned, was not to appraise the text but rather to deconstruct it. To tease it apart and figure out how it worked. To uncover the historical context the text was written in. To offer an explanation for the character motivations. And so on.

My second attempt went a lot better – that's why they're called "essays" (_essayer_ is French for "to attempt").

Mrs. McLean gave me essays that the students in the past year had already written, students I'd be joining in the fall. I learned that the deconstruction was only a first step. When you deconstruct a text, you can figure it out. When you deconstruct _two_ texts next to each other, you can compare them and say something interesting. One of the other student essays I read deconstructed the Wall from _The Handmaid's Tale_ (where bodies of executed dissidents were put on display) and compared it with Pink Floyd's _The Wall_. I can't remember what the essay ultimately said but I remember feeling like this was a kind of magic trick – to take two things that aren't related at all, to break them down, and to connect them to each other and show how they're actually quite related after all.

First you need to understand a thing, and then several things, and then you can compare them. Abstractly, this is what thinking critically means.

So let's talk about computer programming.

Programmers solve problems and the more types of problems you can solve, the more effective of a programmer you can be. Different problems are best solved by different tools, and so one way to have a successful career is to learn a variety of tools and to develop informed opinions about which tools are best suited to solve which types of problems.

Let's look at an example. Programming languages are probably the most important kind of tool in a programmer's toolbox. If I were building an iPhone app, I might reach for Swift because the programming language is well-suited for building iPhone apps. And if I were building a server API for my iPhone app to talk to, I might use Ruby for the same reason. Each language is suited to those specific problem domains. Sure, [I _could_ write an iPhone app in Ruby](http://www.rubymotion.com), but I would face a lot of problems that I wouldn't face if I used Swift. And sure, [I _could_ write a server in Swift](https://perfect.org), but I would miss out on a lot of opportunities that I would otherwise have access to with Ruby (namely, its massive library of helpful dependencies).

(There are totally valid reasons to use Ruby to write an iPhone app, and to use Swift to write a server. My point is not that you can't or shouldn't do this, but only that these languages are generally _best_ suited for their respective problem domains.)

You can kind of see where I'm going with this, right? If all I knew was Ruby, I'd face trouble with my iPhone app. If all I knew was Swift, writing a server would be a lot more difficult.

Generally, if all I knew was one tool, I'm going to encounter problems and miss opportunities that I would otherwise be able to navigate effectively around and towards, respectively. This "navigation", knowing several tools and using opinions to make decisions, is actually a form of critical thinking! First I have to understand Swift and Ruby (deconstruct them) and then I can compare them and say something interesting: "Ruby is great at servers and Swift isn't. Swift is great at iPhone apps and Ruby isn't."

The point I'm trying to make is that, as a programmer, you really should be learning a diverse set of tools and you should be forming opinions about those tools. Which works when? And why? [I've written a whole blog post about this before](/blog/perspective-of-the-polyglot/).

Programming languages are an important part of your toolbox, but the skill of thinking critically and knowing _which_ language to use _when_ and _why_, is far more important.

From my experience, this message of "Hey programmers! You should learn other programming languages!" is a very tough sell. When I tell programmers this, they resist. "But programmers should be all about learning programming languages, right? That's their whole deal.", you might think. But from the perspective of programmers, it actually makes a lot of sense.

There are two reasons that make programmers reluctant to learn new languages.

The first is that learning a new language is difficult. I mean, yeah! It is! If you're a new programmer, you're already inundated with learning your _first_ language, so the idea of learning _another_ language (and then another! another!) is going to feel completely overwhelming. If you're an experienced programmer, you'll face a similar problem: you are so used to being an expert with the tool you already know that learning a new language _feels_ bad. You aren't as productive as you were with the tool you already know. You get frustrated. It sucks feeling like a beginner!

So beginners don't learn new tools because they're already overwhelmed, and experts don't learn new tools because they don't want to _feel_ overwhelmed. Everyone in between those two endpoints feels some combination of both. And yet, it's crucial to developing your toolbox.

The second problem that makes programmers reluctant to learn new languages is the deep, personal connection we form with our tools. I was _in the room_ at WWDC in 2014 when Swift was announced, _just months_ after I wrote a blog post titled [_We Need To Replace Objective-C_](/blog/we-need-to-replace-objective-c/). I wanted this to happen and then it did! I used every beta of the Swift 1.0 that summer. It was painful. I loved it. I still do. When my team at Artsy even _suggested_ using anything other than Swift for new feature development, [I was aghast](/blog/swift-vs-react-native-feels/)! I felt almost _personally_ offended. This wasn't rational, it caused me stress that I could have avoided, and it hampered my career growth.

So I understand why programmers are reluctant to branch out, to learn new things. It's difficult and it sucks, but it's worth it. Programmers who are really deeply rooted in one specific community experience these problems compounded even further. Since iOS is what I know best, I have tended to focus on iOS developers when I talk about branching out and learning new tools. I've tried to avoid that in this blog post and speak from my own experiences. If I've ever [been critical](/blog/thinking-critically-about-apple/) of the tools you know and love, and it's made you feel bad, I'm sorry. I promise that it came from a place of caring, of respect, and of wanting you to reach your full potential as a craftsperson.

With all that said, and with full knowledge of the humiliation I felt that summer in high school, of the humility it helped me ultimately find, and coming from a place of genuine care and compassion, I'll ask you the same question that Mrs McLean asked me: "You say that your favourite programming language is really great but, realistically, how many languages have you actually learned?"
