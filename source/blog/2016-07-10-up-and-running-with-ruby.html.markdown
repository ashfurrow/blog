---
title: Up and Running with Ruby
date: 2016-07-10 23:32:45 UTC
background_image: /img/blog/up-and-running-with-ruby/background.jpg
background_image_source: https://twitter.com/CloudyConway/status/748397745938010112
---

Ruby has always kind of intimidated me. Largely I think because I cut my teeth on Java, C++, C#, which are static-ish and Ruby's decidedly dynamic. And by the time I started writing Objective-C, even it had [started evolving to be less dynamic](https://ashfurrow.com/blog/adulterated-objective-c/). Ruby – and frameworks written in Ruby – involve _so much magic_ that's always kind of scared me away.

<!-- more -->

Working at Artsy has exposed me to Ruby in a lot of ways: a lot of the Artsy backend projects I'm interested in use Ruby; I've helped out with CocoaPods and other developer tools that happen to be written in Ruby; and now when I go to write a new tool, Ruby is the language I use because I have so many colleagues to help me. 

I've gotten a _tonne_ more competent in Ruby since I [complained about my lack of literacy in 2011](https://ashfurrow.com/blog/lingua-rubinus/). Since starting at Artsy, I've published [six Ruby gems](https://rubygems.org/profiles/ashfurrow) and I've contributed to lots of other projects.

After a recent crunch writing Swift, I needed a change of pace. I found some great projects to dig into with Ruby and I've learnt _so much_. It was kind of intense – packed over a long weekend – but I made sure to take lots of breaks and do non-programming things. Oh, and to reflect on what I've learnt. Which brings us to this blog post.

[Danger](http://danger.systems) is a tool from [Orta Therox](https://twitter.com/orta) and [Felix Krause](https://twitter.com/krausefx). I remember talking to Orta about ways to codify and automate team culture, and the next thing I knew the two of them had made something really awesome. Basically, Danger is a tool that runs as part of continuous integration which comments on pull requests if it notices any problems. You should definitely check out [this post detailing Danger's development](http://artsy.github.io/blog/2016/07/03/handling-big-projects/).

Using Danger has a number of advantages, here are my favourites:

- It saves the project maintainer time.
- It prevents overlooked problems from being accidentally merged.
- It softens the emotional impact of criticism (since it's automated and not from a person).

Super cool! Orta's been integrating Danger into as many repositories as he can – open source projects and Artsy ones. So I kind of got pulled into it too, and now use Danger on a lot of my own projects. Open source ones like [Moya](https://github.com/Moya/Moya) but also personal projects like this [blog](https://github.com/ashfurrow/blog). For example, Danger now runs my new blog posts through [proselint](https://github.com/amperser/proselint) and lets me know about spelling/grammar mistakes, awkward wording, mixed metaphors, unintentional sexism – all kinds of stuff.

I decided that if prose was worth linting with Danger, Swift code probably was too. Danger was designed with plugins as first-class citizens, and with the example [`danger-proselint`](https://github.com/dbgrandi/danger-prose) plugin by [Dave Grandinetti](https://twitter.com/dbgrandi), I wrote [`danger-swiftlint`](https://github.com/ashfurrow/danger-swiftlint). Copying Dave's repo was a great way to start because I had a blueprint of what to build, and just had to add the finer details. I really got into unit testing with Rspec, too.

So I had built a Danger plugin in Ruby and felt pretty good about myself. Later, when I added Danger to [Moya](https://github.com/Moya/Moya/pull/521#issuecomment-229961410), [Orta suggested](https://github.com/Moya/Moya/pull/521#issuecomment-229961410) that I have Danger point out when new contributors should be invited to our organization (inviting new members after their first PR is a [cornerstone of Moya's community guidelines](https://github.com/Moya/contributors)). That's a great idea, but since I was having so much fun with Ruby, I thought: what if I just automated the whole invitation process?

A quick DuckDuckGo search later, and I found that GitHub has some [awesome documentation](https://developer.github.com/webhooks/configuring/) on their WebHooks API, including a sample server written in Sinatra, a lightweight web framework for Ruby. From there, and a few tutorials, I experimented and slowly built [Aeryn](https://github.com/Moya/Aeryn). Building a new Ruby project from scratch was the next step up from copying an existing codebase and modifying it, like I did with `dander-swiftlint`.

Aeryn is really cool: new contributors get invited to join our organization and are sent a friendly message with details. This happens whenever someone has their first pull request merged. The project is fully unit tested, has been built so other organizations can use it out-of-the-box, and is easily deployable to free Heroku accounts.

And Aeryn uses Danger, including [Rubocop](https://github.com/bbatsov/rubocopp), a Ruby static analyzer. This led to _another_ Danger plugin called [`danger-rubocop`](https://github.com/ashfurrow/danger-rubocop).

So three new Ruby projects completed in as many days. Like I said, intense!

I struggled. A lot. When I couldn't figure something out on my own, I [asked for help](https://twitter.com/ashfurrow/status/749367814369214464). Orta offered a lot of [proactive advice](https://github.com/Moya/Aeryn/pull/9#discussion_r69395068) and used metaphors from Objective-C development to help explain concepts. Automated tools like [Rubocop](https://github.com/bbatsov/rubocop) were really helpful at showing me how to write idiomatic Ruby.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I still have much to learn. <a href="https://t.co/kl2FQUHv03">pic.twitter.com/kl2FQUHv03</a></p>&mdash; Ash Furrow (@ashfurrow) <a href="https://twitter.com/ashfurrow/status/750844591331500032">July 7, 2016</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

It's been really fun diving into a different community, where I'm inexperienced. I've felt angry when things don't work the way I expect them to, and I've felt gleeful when some things work on the first try. It's all part of the learning process. 

I am glad to have been knocked back on my ass: more experienced developers tend to forget what it's like to be a beginner, and this was a nice, small reminder. Having empathy for beginners is crucial to writing learning resources, and now that I have more free time, that's something I definitely want to start doing again.
