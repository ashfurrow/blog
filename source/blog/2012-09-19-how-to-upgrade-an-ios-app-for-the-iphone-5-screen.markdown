---
title: "How to Upgrade an iOS App for the iPhone 5 Screen"
date: 2012-09-19 00:00
---

<import><p>Creating a new project with Xcode 4.5 will automatically add support for the iPhone 5's larger screen. However, it's not immediately obvious how to <em>add</em> support for the larger screen. Let's jump right in.</p>

<p>Since this is just to illustrate the basics of how to add support for the taller screen, I'm going to walk you through the actual migration I've made to <a href="http://itunes.apple.com/us/app/photo-hour/id524263013?ls=1&amp;mt=8">Photo Hour</a>, an actual app I sell in the App Store. It's fairly simple and has only one view controller.</p>

<p>Before I make any changes to the project, Xcode looks something like this:</p>
<img src="/img/import/blog/how-to-upgrade-an-ios-app-for-the-iphone-5-screen/39E5B64D143A4203AA391A912AC2CC66.png" class="img-responsive"><p>If I ran the app right now, I would get the following letterbox/pillarbox effect from the OS:</p>
<img src="/img/import/blog/how-to-upgrade-an-ios-app-for-the-iphone-5-screen/F07E5C57D6384F8D852EDEDB890D8999.png" class="img-responsive"><img src="/img/import/blog/how-to-upgrade-an-ios-app-for-the-iphone-5-screen/67CD16741AAD4872960F38619B079032.png" class="img-responsive"><p>This is <em>not</em> the experience we stylish iOS developers want to provide for our users.</p>

<p>The <em>only</em> clue about what to do next is a compiler warning </p>
<img src="/img/import/blog/how-to-upgrade-an-ios-app-for-the-iphone-5-screen/56C93D758CBD4DC889CFB028D0915D4E.png" class="img-responsive"><p>The iPhone 5 has a screen of 640x1136 pixels (or, more accurately, 320x568 point). Remeber that on a Retina screen, 1 point is equal to 2 pixels. What apple is doing here is being cute; they know that a screen that is 568pt high <em>must</em> be Retina, but they're reminding us through the file name that even though the image we provide should be 640x1136px, it's still only 568 points tall.</p>

<p>Adding this <code>Default-568h@2x.png</code> launch image will enable iPhone 5 support for your app.</p>

<p>The way that I generate launch images is by actually using my app and hide all the UI componenets, then taking a screenshot. It's a sort of chicken-and-egg problem: you need the larger launch image to enable support, but you need support enabled to take the screenshot. Let's just throw in <em>any</em> launch image to get iPhone 5 support. </p>

<p>Open the project file in Xcode's File pane, select your target, and drag any random <code>.png</code> onto the "Retina (4-inch)" space.</p>

<p>If I run the app now, it looks like this:</p>
<img src="/img/import/blog/how-to-upgrade-an-ios-app-for-the-iphone-5-screen/CF671B33AAC64E1DB520130DFB19E295.png" class="img-responsive"><img src="/img/import/blog/how-to-upgrade-an-ios-app-for-the-iphone-5-screen/AD8EB78623D24F0A88390FAE216646C7.png" class="img-responsive"><p>iOS is just taking the springs and struts defined by the <code>UIViewAutoresizingMask</code> supplied on the views that make up the interface. In landscape, that's exactly what I want. In portrait, though, it looks like I've totally entirely forgotten about a whole 88pt of my app's interface. I can't ship this! What do I look like, an Android developer?</p>

<p>Let's open the nib (or storyboard) and deal with this mess.</p>

<p>If you select the main <code>UIView</code> and open the Attributes inspector (⌘⎇4), you'll see a new dropdown under "Simulated Metrics."</p>
<img src="/img/import/blog/how-to-upgrade-an-ios-app-for-the-iphone-5-screen/60AE31BB2BAE4158B6297BDFD4B1238B.png" class="img-responsive"><p>This is the first time that developers have been able to specify any size other than 320c640pt for a view controller with a simulated status bar. Nice!</p>

<p>Since I only want to do this work once, I'm going to select "Freeform" so I can resize my nib and see visually how the springs and struts are being used to layout the interface. This would be a great time to migrate to Auto Layout, but that's iOS 6 only and a topic for another blog post.</p>

<p><strong>Protip</strong>: Hold down ⌘ while resizing interface elements on a nib or Storyboard to get the views to resize and reposition in accordance with their springs and struts.</p>

<p>Don't forget to repeat these steps for any localized nibs you have!</p>
<img src="/img/import/blog/how-to-upgrade-an-ios-app-for-the-iphone-5-screen/A8B17D70B6C7422DBDF436F67D0D1FFD.png" class="img-responsive"><p>Luckily, the rest of my app is using <code>resizableImageWithCapInsets:</code> and <code>colorWithPatternImage:</code>, so I don't need to regenerate any assets besides the launch image.</p>

<p>That's it! Take some new screenshots of your app in the iPhone 5 simulator (assuming you don't <em>have</em> an iPhone 5, yet) and upload them to iTunes Connect; there is a special spot for screenshots of the iPhone 5. Submit, and know that you've done your due diligence and your users will get the best experience possible.</p></import>

<!-- more -->

