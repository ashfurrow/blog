---
title: "Contributing Again"
date: 2012-08-06 00:00
---

<import><p>I made my first sizeable contribution to the Open Source community over the past week or so. It's been interesting.<!--more--></p>
<p>Usually, I scheme ways to make money off the code I'm writing. Also, I need to believe in what I'm making or I won't be motivated.</p>
<p>In reality, my schemes almost never make me money; I've learnt that the easiest way to make money programming (for me at this moment in time) is to hire a boss or client to pay me.</p>
<p>But that doesn't mean I can't contribute.</p>
<p>I <a href="http://ashfurrow.com/2011/12/oauth_sucks/">hate OAuth</a> with the fiery and eternal hatred of a thousand burning stars, and I know other Objective-C developers do, too. I've also heard from coworkers that developers are looking for a drop-in API library to the 500px API service.</p>
<p>So I <a href="https://github.com/AshFurrow/500px-iOS-api/">wrote one</a>.</p>
<p>My goal was to make something I could be proud of, and I'm halfway there. Requests can be signed with OAuth, but still need to be loaded over the network. Now that I have the request creation taken care of, I'm going to write a layer to abstract the network requests away altogether. Oh, and it's completely tested, as well. (Maybe not with unit tests, more like integration tests, but tested nonetheless.)</p></import>

<!-- more -->

