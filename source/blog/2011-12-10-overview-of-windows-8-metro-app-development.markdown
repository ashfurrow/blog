---
title: "Overview of Windows 8 Metro App Development"
date: 2011-12-10 00:00
---

My employer, the fabulous [500px](http://500px.com/), was invited by Microsoft to attend a three-day workshop on writing Metro-style apps for Windows 8. Since this is a new mobile development field, and mobile is kind of my thing, I jumped at the opportunity to get it straight from the horse's mouth.<!--more-->

## Metro

Windows 8 is still a Developer Preview. Practically, this means "pre-beta." It's very rough around the edges. This was apparent while using it for three days. Three days on a French keyboard. Three days where Alt-Tab didn't work correctly. But I digress. It looks promising and I think they'll have it cleared up in a year when it goes public. Besides, there are other reviews of the OS; this is about developing Metro apps, not about Windows 8 itself.

Windows 8 Metro app templates encourage consumption of media. It is strongly encouraged that&nbsp;Metro-style apps support horizontal scrolling with very specific margins; these margins are one of the defining, consistent features Microsoft has decided for Metro apps. However, any non-trivial form is going to need vertical scrolling, too. In fact, all the Microsoft controls examples use vertical scrolling. I can't help but feel that this is going to lead to a kind of schizophrenic experience; consuming media means scrolling horizontally while creating it means scrolling vertically.

Microsoft is expecting that 10.7" tablets with a widescreen aspect ratio, running 1366x768 resolution, are going to be the most common form factor for tablets running Metro. They've designed their interface with this in mind, and provide the "snap" feature (where two applications can be open on the screen at once) only to users with screens at least 1366 pixels wide.

## Architecture

Contracts are amazing. They're a great way for users to use different apps in a standard, consistent way. There has been a lot [written about how they work](http://www.pcworld.com/article/239893/windows_8_going_indepth_with_microsofts_massive_update_to_windows.html), and they're widely regard as a great feature. Integrating Search and Share contracts into your app is almost trivially easy. Kudos to Microsoft for doing something so great for users and making it so easy for developers.

Metro drops a lot of APIs from .Net. They introduced asynchronous variants of a lot of their APIs and have removed their synchronous counterparts. Microsoft did a lot to remove crud to create a great developer experience, which is why I'm so frustrated to learn they're keeping support for Visual Basic. It makes sense to keep Visual Basic around, since there are developers familiar with it, and Microsoft needs those developers making apps for their platform. You could, even, write Metro apps in JavaScript, or even all three at once. That's right, Microsoft has made it possible for your JavaScript code to interact with your C# and VB classes. Very cool.

In regards to multitasking, iOS 4 made it easier to, say, write a blogging platform (like [Storygram](http://itunes.apple.com/us/app/storygram/id482507340?mt=8&ls=1)) by letting you continue to upload photos, for instance, after the user closes your app. The time limit is something like 10 minutes. Microsoft has chosen to limit your app to 5 seconds after the user leaves before it's suspended. Literally - suspended - it's program counter stops incrementing. You're notified about pending suspension, but the intention is that you stop what you're doing, not finish a task.

There _are_ background tasks available for Metro apps, but they're limited to real-time communication apps: VoIP, Instant Messaging, and Mail. The intention is that these tasks run to update UI present on the Start and Lock screen, like how many unread emails you have. There are exceptions, apparently, but Microsoft appears to be dealing with these on a case-by-case basis. As a developer, I'd be reluctant to make something like an image-uploading app if Microsoft decided to reject it. I wish they had better app store guidelines, but they beta isn't coming out until (late) February 2012.

Background tasks are very cool, though, since they can operate even after your app has been completely terminated. These tasks are triggered after a certain time interval or a network event. It's a great compromise for user performance, constant connectivity, and battery life.

A huge benefit of writing a Metro-style app is that you get a lot for very little work. Implementing the Search Contract, which takes only a few dozen lines of code, gets your app included in the OS-wide search. How cool would it be if iOS users could search data within my apps using spotlight?

The templates Microsoft has provided in the developer preview of the tools are rich, multimedia-centric apps for which you only need to drop in content. However, this makes writing apps that don't conform to one of the pre-made templates not immediately apparent. &nbsp;Visual Studio 2011 is currently only a developer preview and I hope they'll add some new templates as they receive feedback from developers.

 ![](/img/import/blog/2011/12/overview-of-metro-apps/50EABE3930B84B309A4AEEF35C302C7D.png)

I see this problem with iOS on Stack Overflow where developers are so used to Xcode templates providing the basic structure of their app that the developers have no concept of what's actually going on. Many iOS devs can't construct a navigation-based app from an empty Xcode file. With these more complete templates in Visual Studio, I think the problem is going to be even worse. Since developers will be more relying&nbsp;heavily on these templates, when they try to develop innovative interfaces outside of what Microsoft has envisioned (something Microsoft is ostensibly encouraging, within their guidelines, of course), they're not going to know how. More templates with graduated levels of sophistication could definitely help.

Apple introduced an architecture of app launching very similar to Metro's in 2008. They kind of yelled at developers "make sure you remember the app's state somehow so it can be restored!" and developers kind of shrugged and did whatever they wanted to. Many apps didn't bother and presented the user with the start screen every time the app was opened. While Apple said "do this somehow", Microsoft is being much more accommodating and saying "here's how you do it." They've actually built a system (with code demos) to show you how to launch your app from any state it could be in - re-entering the foreground, from a share or search contract, a pinned secondary tile, or a toast notification. I really appreciate how much support they're giving developers in terms of direction on how to do this, leading to a better customer experience in the end.

Microsoft's Push Notification Service (WNS) is a HTTP-based, which is awesome. Apple introduce a TCP-based approach to push notifications that basically requires you to write a dedicated sever (again, somehow, Apple didn't specify how to do) to send your push notifications through their APNS. No one rolls their own APNS server because it's too hard and there's [Urban Airship](http://urbanairship.com/). However, Microsoft has provided a simple POST endpoint that specifies how to push to a user's Windows Live account, which is pretty freaking amazing. Of course, parsing the notifications on the client-side is XML-based, but you knew it would be, didn't you? A quick poll I conducted on twitter yielded that developers would prefer a JSON, TCP/IP-based protocol to XML, though .Net's XML libraries are pretty robust.

Metro is based on the HTML-like XAML and CSS, which means that it scales well across devices with varying screen resolutions, aspect ratios, and pixel densities. Metro's runtime handles loading files very similarly to iOS' "@2x" designation: rasterized assets can be named at 100%, 140%, and 180% variants in order to accomodate different screens. These variants are automatically selected by the runtime on the developer's behalf. It's heavily suggested that developers use CSS primitives, Scalable Vector Graphics (SVG), and font-based glyphs as UI components, since they scale perfectly. Microsoft is developing Wingdings 3 (that's right) to include glyphs for common elements like a back button.

## Tools

I really missed Visual Studio. I last used Visual Studio 2008 two years ago and I was a huge advocate of .Net, specifically Linq. Coming back to Visual Studio, it hasn't changed much, but it turns out that _I_ had changed. While there are a few key features in Visual Studio that I really miss in Xcode, like "Find all References" and chords for keyboard shortcuts, I'm so used to Xcode that it was a big change to go back to Visual Studio.

I could criticize XAML or the concept defining so much of your app logic in XML, but that's just the nature of the .Net platform. XAML is Microsoft's new Windows Forms, so it makes complete sense to use it to build Metro apps. But I don't like it. It's everything I hated about ASP.Net.

Writing interface code means a lot of back-and-forth between the XAML file and the codebehind; it feels like a compromise just so they could define the UI in XML. It feels very unnatural and cumbersome to me. However, an experienced .Net developer might feel right at home. To me, defining an animation in a series of Obj-C blocks is far easier than defining them in XML.

 ![](/img/import/blog/2011/12/overview-of-metro-apps/F03A6746F8404EADA8C287DA1D2C5C70.png)

Designing an app is going to be really tricky. Designers could have access to the project in order to directly implement their designs in CSS (a good thing), but it's so tightly coupled to the codebehind that I think developers and designers might get in each others' ways.

## Interface

Coming from the Apple camp, I had to shed some of my preconceptions about how the interface should behave. Apple instills the idea that everything in your app should be intuitive and easily discoverable by the user. Microsoft has taken a slightly different approach; they dictate that in order to use a PC running Metro, you'll need to learn a few key gestures. After that, you're set. Swipe up from the bottom, to get a context menu. From the right to get to the "charms" (sharing, settings, seach). And so on.

I see the appeal of both approaches. Microsoft's solves the design problem of having no intuitive gestures that correspond to complex actions - and the gestures are consistent across all apps. Since Microsoft has a strangle hold on the Metro app market (and **will** be enforcing adherence to these conventions), I think it'll create a consistent user experience. &nbsp;This contrasts with the Android context menu button that few developers actually use, leading to its removal from new Android handsets

The kind of experience Microsoft is pushing in its templates isn't necessarily what you want. You're supposed to present the user with many items grouped into categories. Use Semantic Zoom (a neat concept) to zoom out to a higher level to navigate the vast sea of these items. When you tap any one item, you're taken to it's detail page. However, when you tap "back", you're taken to the summary of that item's category group, a level of navigation you passed over when you tapped the item. It's a little jarring at first, but I did get used to it.

## Conclusion

Microsoft is making a concerted effort to be inviting to developers so Metro users can get some great apps. This is really beneficial to Microsoft, but also to developers, particularly with the flexible store policies and gratuitous revenue sharing model. Microsoft has been inclusive (to a fault) towards many of their established technologies, including VB, C#, JavaScript, XAML, and HTML. They're trying hard to be inclusive to garner great app developers that will make their platform great.

I was admittedly intimidated by XAML because I'm used to defining my interfaces either graphically or completely in code, not in XML. Maybe an Android dev would be more comfortable designing Metro interfaces. I certainly feel comfortable in writing basic media-consumption applications, but not much more. If all Windows 8 developers are writing apps using the same layouts, then the only thing to differentiate apps will be the content they display. Maybe that will lead to the consistent user experience Microsoft wants, but it could lead to a lack of innovation with regards to the user interface.

Let's face it: Metro will be a success. As a company, Microsoft isn't going anywhere and they've learned lessons from Apple, Amazon, and Google on how to create an excellent app ecosystem. Personally, I'm too entrenched in the Obj-C/iOS ways to develop my own, personal &nbsp;Metro app. But based on what I've seen about Metro, I can see a lot of Enterprise ASP.Net corporate developers going home at night to tinker on their Metro apps, and who can argue against that?

<!-- more -->
