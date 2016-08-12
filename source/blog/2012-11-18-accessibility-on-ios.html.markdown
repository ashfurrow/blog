---
title: "Accessibility on iOS"
date: 2012-11-18 00:00
---

I was invited to give a talk at the [Toronto Accessibility Meetup last night](http://www.meetup.com/a11yTo/events/90075082/) about a developer's perspective on making software accessible. It was an amazing experience and I took a lot away from the conversations I had with the people there.

I'm posting my script online, which I did deviate from quite a bit. However, these sum up my thoughts on accessibility.

I haven't always considered it as important as I do now, and shamefully, I know there are accessibility issues with software that I'm currently shipping. My goal is to make my existing software fully accessible as soon as possible and to ship only the highest standard of accessible software from now on. It won't be easy, but as I outline below, it's no longer something that we as an industry can ignore.

If you're around, I'm giving another talk at the [iOS Toronto](http://www.meetup.com/iOSToronto/) meetup Tuesday evening at the Victory Cafe. If you want to know where to get started on making apps accessible, be there.

# Accessibility on iOS

When the iPhone was first announced in 2007, there were concerns from accessibility advocates that without hardware buttons, the iPhone would not be accessible to people with visual impairments. Traditionally, these buttons had raised edges that would help users who couldn't read the buttons differentiate what was on them. Since the iPhone uses only "soft" buttons on the screen of the device, this was a valid reason for concern.

The launch of the iPhone validated some of these concerns, but since then, Apple has made strides in providing tools for app creators to make accessible software. The iPhone interprets the developers instructions to read the interface aloud using a technology called VoiceOver. iOS, the software that runs on iPhones and iPads, provides a comprehensive library of accessibility tools for developers to take advantage of.

Today, I'm going to talk about how software developers make iOS apps accessible. I'm going to take a look at ways it's easy for developers to make accessible software, the costs associated with doing so, and provide examples of what how to do it.

## How it's easy

In traditional PC software, accessibility in applications was something that was completely the responsibility of the software developer. There was no support from the operating system and everything had to be built by developers from scratch. When Apple's Macintosh OS X was released, it was celebrated because it provided system-level tools for developers to make their applications accessible.

iOS is based on OS X and Apple brought the same system-level tools with them. This makes it possible for any developer to build accessibility into their applications from day one. Combined with the garage-company revolution of smaller teams releasing software on iOS, we've seen an explosion of different types of applications come to market. All of these new apps have the ability to be fully accessible from day one.

Apple's accessibility tools are pretty comprehensive and easy to learn, and I'd like to talk about them now.

### Good Support from Apple

Apple's main library of tools supplied to developers to make software accessible on iOS is called UIAccessibility. These provide a built in list of traits that I can assign controls on the screen. Traits describe _what_ visual elements on the screen are and what interacting with them will do.

For instance, I can say that something on the screen is a button, and when the phone reads the interface to the user, it will indicate to them that it's a button.

The list of traits is pretty extensive, but are mostly unnecessary if developers use built-in controls. For example, the built-in system buttons already know that they are buttons, so making them accessible doesn't require adding that trait to them.

Mostly, traits are assigned to built-in controls that the programmer has customized in some way that the system is not expecting. For example, sometimes developers will put invisible buttons over top of other controls in order to capture tap events from the user. The button is only meant to be interacted with when users are strictly using the visual elements on the screen to use the app. When using VoiceOver, the button may get in the way of other accessibility features. It's important, then, to _disable_ the button for people using the app with VoiceOver.

Another situation that requires setting custom traits is when developers build their own controls. The built-in system controls offer a lot of functionality out of the box, but sometimes developers write their own for whatever reason. In this case, they need to explicitly tell the system what traits their custom controls have. If they don't, then the interface can be completely opaque to someone using their phone with VoiceOver.

In addition to traits, there is another thing developers need to know about making interface accessible. These are called properties, and they're very similar to traits. Traits describe what a control is or what it does when used; they don't change very often. Properties describe how VoiceOver should interact with individual controls and change frequently. Properties are a little more confusing, so I'd like to take a look at a few examples.

When a user changes the volume setting in iOS, a visual indicator of what the new volume setting is displayed on the screen and an audible noise is emitted by the speaker that reflects how load the ringer is. Since the visual indicator is already accompanied by an audible noise, the visual indicator shouldn't be read aloud by VoiceOver.

Another property is called the activation point. The activation point is the target that a user will try to tap in order to activate. This is usually the centre of a button. When deleting apps from the home screen of an iPhone or iPad, the activation point moves from the centre of the icon to the centre of the 'X' in the upper left corner. The activation point can move as the user changes the interface.

The last property I'd like to mention is the accessibility hint. The hint is used by VoiceOver to give a description to the user of what the control will do. An example is a button that plays music. The accessibility hint would be something like "plays the song."

iOS will read interfaces to users with VoiceOver if developers take the time to ensure their interfaces work correctly. People using VoiceOver can _enter_ text into any application out of the box with _no_ work from developers.

## Why it's Hard

Now that I've given an overview of the tools that make creating accessible applications easy, I'd like to talk about some of the ways that making them is difficult.

### Developers Don't Know

The biggest challenge in making iOS apps accessible is simply knowing what is necessary to do so. Developers might not know about VoiceOver or how iOS tries to make software accessible. If developers don't know about VoiceOver, then they haven't tried using their applications with it. That means that they don't know about the ways they need to customize their applications to work with VoiceOver.

There is also a cost associated with making accessible software. Software developers charge an hourly rate. Making an app accessible does take time, so it does have a cost. What I've tried to do with my own projects is to not look at accessibility as a cost at all. It's just another part of the necessary steps in making a piece of software. I wouldn't ship an application without a functioning visual interface, so why would I ship one without a functioning aural one?

To that end, I've started using VoiceOver to use my phone throughout the day. Not all the time, but often. Triple-tapping my home button will activate VoiceOver - it was a frustrating experience at first! I use my apps in VoiceOver, as well as other apps in order to see how it can be used. It's shown me that there are many popular applications either have poor support for VoiceOver, or none at all. I've decided that, for my applications, accessibility is not optional. It is just another, mandatory aspect of the software development process.

This is a big attitude change in myself, and trying to propagate this across an entire industry isn't easy. Recently, prominent independent iOS developers have spoken out in strong favour of making apps accessible, and I'm excited about what the future holds for accessibility.

### Implementation Details

Now that I've talked about the high-level challenges facing iOS software accessibility, I'd like to take a look at the low-level implementation details. These are specific details that make iOS accessibility difficult for developers to achieve.

When I create a button on an interface, the system will read that button using VoiceOver. If the button has the text "Send" on it, then VoiceOver will read it as "Send Button."

But what if the button doesn't have any text in it? What if it uses a picture to denote meaning? VoiceOver will do its best to discern what the button probably should read. The way it does this is by reading out the file name of the image, which is better than nothing, but certainly not good.

Now that iOS is run on a variety of devices with different screen resolutions and pixel densities, many developers are choosing not to use rasterized PNG images for buttons any more. There are modern libraries for using vector-based PDF assets in order to scale up or down to any size on any screen. The problem is that it makes buttons using these images even more opaque. Instead of reading off the file name, VoiceOver will just say the word "button."

The other challenge I want to talk about is scrolling text. Scrolling, especially on fancy or semi-transparent interfaces, is very difficult for an iPhone or iPad to do smoothly. With newer hardware giving developers more power, it's been more and more common to see slicker interfaces. In order to squeeze every bit of performance out of these scrolling views and achieve a higher frame refresh rate, developers have started using their own controls for displaying text instead of the built-in system labels. This makes for a wonderful visual experience, but developers often don't think of enabling VoiceOver in their custom controls. The system will try to do its best to piece together what it should read, but the experience is not good.

Apple has done a good job of providing a solid foundation on which developers can write accessible applications. It isn't trivially easy, but not interface design ever is.

### Localization

Everything that's made accessible also has to be localized so that people using VoiceOver in other languages can understand the interface as well.

## Closing

Making quality software is a measure of honour, and making software accessible is a measure of quality. Software developers need to recognize that there are other aspects of their interface exist beyond the visual. They need to understand how people use their software without the visual interface and they need to modify their apps to be congruent with these users' expectations.

The biggest challenge in raising the quality of accessibility in iOS apps is educating developers about how and why they need to worry about it.

(READMORE)
