---
title: "The Value of Cocoapods"
date: 2013-04-27 00:00
---

<import><p>Lately, I've been exploring more of the open source community and examining how it is interacted with by the Objective-C community. I think that iOS and OS X developers tend to be afflicted by the "not invented here" syndrome, which is ironic considering Objective-C's creators originally intended for compiled objects to be bought and sold as commodities. </p>
<p>This tendency to eschew open source software comes from the top, though: just look at how hard it is to integrate open source software in Xcode projects. </p>
<p>Recently, however, there is a new player in the open source iOS and OS X community: <a href="http://cocoapods.org">Cocoapods</a>. This tool, written in Ruby, manages the dependencies and versioning of third party, open source libraries, integrating them into an Xcode workspace. Traditionally, this has been lot of work and a headache. </p>
<p>Many developers are sceptical of the tool – and rightly so. After all, this is a huge shift in the way we do our work and can demand a lot of time and effort – and therefore cost – in switching. That's hard to swallow if you're not completely convinced of the value of the tool. </p>
<p>Using Cocoapods means never having to worry about per-file compiler flags (e.g.: for ARC) again. It means not having to set linker flags or header search paths for every library you incorporate into a project. It makes upgrading libraries later a breeze. To me, that's worth the amount of work it takes to get up and running. </p>
<p>However, there are drawbacks. Using Cocoapods makes it difficult to contribute back to open source projects (when compared with git submodules). Cocoapods represents another step to follow when cloning a repository, and the initial setup can be nontrivial. It's also not perfect – the current version, 0.18.1, still has some bugs. </p>
<p>Cocoapods is a maturing tool that's come a long way and shows a lot of promise. If you've previously looked at the tool but passed on it, I would encourage you to look again. It's a great way to easily incorporate lots of open source goodness into your project. As my friend <a href="http://twitter.com/jasonbrennan">Jason</a> puts it, don't think of it as "not invented here", but rather "proudly discovered elsewhere."</p>
<p></p></import>

<!-- more -->

