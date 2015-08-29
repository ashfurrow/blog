---
title: "The OAuth Chronicles"
date: 2011-12-01 00:00
---

I write iOS apps. Which is to say, I write native apps that run on, you know, actual hardware. iOS also implies Cocoa Touch and the Cocoa networking libraries (which suck). Not really awful, just really bad. Enter OAuth.<!--more-->

OAuth is a a three-legged authentication framework that is designed to give users maximum control over what data third-party applications have access to without giving their password to anyone but the first-party service. Sounds awesome, right? It is! _If_ you're writing server applications.

Writing native client applications gets a little trickier. First thing first: you either present a web view and screen-scrape for your OAuth tokens (which is an awful solution that needs to die in a fire) or you use XAuth or some other compromise of real OAuth. Both solutions give up most of the flexibility and security that is afforded users when using OAuth.

XAuth on iOS sucks. _ **Really badly** _. If you want any meaningful error messages, you need to opt for the asynchronous URL connection methods. Why does that suck? Because it takes a really easily architected,&nbsp;synchronously-called API layer that is run in a background queue with Grand Central Dispatch and turns it into a bloated, complicated asynchronous pile of&nbsp;spaghetti&nbsp;code. I opted for no meaningful output, thank you, which means on an invalid OAuth request, I get the following:

`Error Domain=NSURLErrorDomain Code=-1012 "The operation couldn’t be completed. (NSURLErrorDomain error -1012.)" UserInfo=0x8893bf0 {NSErrorFailingURLKey=https://someURL.com, NSErrorFailingURLStringKey=https://someURL.com, NSUnderlyingError=0x88935c0 "The operation couldn’t be completed. (kCFErrorDomainCFNetwork error -1012.)"}`

My old friend,&nbsp;kCFErrorDomainCFNetwork error -1012. It's always -1012, by the way, no matter what's wrong. Earlier today, the issue was that I wasn't url-encoding the url-encoded '['. You see, '[' is encoded as "%5B." However, when you're constructing an OAuth base string, you need to _double_&nbsp;url-encode the attributes (encode them individually then encode their concatenation). So the '%' in "%5B" has to be encoded, making the whole thing "%255B" - but wait! You need to escape the '%' in your NSString literal, so it's actually something like @"%%255B".

Huh.

I'm not a stupid developer, but this kind of problem drives me nuts.

The other piece of the iOS-OAuth shit sandwich is the fact that there are no decent generic OAuth libraries for iOS. [GTMOAuth](http://code.google.com/p/gtm-oauth/)&nbsp;is probably your best bet, but has it's own problems and assumes standard OAuth workflow (which few APIs actually adhere to when they use XAuth). The eventual solution is to write your own OAuth/XAuth library, which is complicated and ties up a lot of time.

OAuth also complicates things, since it's incompatible with HTTP multipart form uploading, adding another layer of complication if you're trying to upload files. It has other issues, too, like problems with DELETE and PUT HTTP methods in Rails servers. (\_method, anyone?)

The last problem is a lack of documentation. Not OAuth documentation, however; I've seen enough overview flow charts of how it's _supposed_&nbsp;to work to last a lifetime. No, I mean API documentation. Most say "standard OAuth" and give a 4-line Ruby code example of how it works.&nbsp;Well great. Now I know how to do it in Ruby. I guess I'll just go write my iOS app in Ruby, right? 'Cause that's totally a thing. Who wouldn't document their API sufficiently? [Tumblr](http://www.tumblr.com/docs/en/api/v2), I'm looking at you.

OAuth just wasn't designed with native apps in mind. XAuth is a bad compromise that gives up most of the benefits of OAuth in exchange for a headache reminiscent of having your head squeeze in a bench vice for three days.

I am not stupid. I'm a good developer who is smart, curious, and likes to solve problems. However, OAuth has caused me so many problems writing iOS apps that when I see it being used for a service's authentication, I get nervous and consider whether or not I want to use that API at all.

So what's the solution?

If you're not willing to settle for HTTP Basic Authentication, and there's every reason not to, then you're going to have to think a bit about security and write something appropriate. Instagram has a great API for client developers; I used it a few weekends ago at [Pixel Hack Day](http://pixelhackday.com/). It's easy to use and took 20 minutes to implement the sign-in logic. Another great solution is Facebook's OAuth support where they provide a wrapper for using screen-scraping-ish techniques to authenticate you. It works great, it's secure, and it'ss easy for third-party developers to use. This is why Facebook as a single-sign-on for iOS apps is so popular.

If you're developing an API and actually want developers to use it, then consider not using standard OAuth and please, please, please, please write documentation that doesn't make assumptions about the framework and language I'm using.

<!-- more -->
