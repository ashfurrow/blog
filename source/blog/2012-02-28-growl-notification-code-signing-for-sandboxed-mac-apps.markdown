---
title: "Growl Notification Code Signing for Sandboxed Mac Apps"
date: 2012-02-28 00:00
---

<import><p>I've spent the past few weeks writing a small Mac app, a first for me. The transition from Cocoa Touch to Cocoa has been ... interesting. Easy in many ways, but unexpected in others. I'm submitting this to the Mac App Store, so I'm using sandboxing and code signing. Everything was going fine until Xcode 4.3 was crashing whenever I tried to validate by archive. Something like <code>-[DVTFilePath compare:]: unrecognized selector sent to instance</code>.<!--more-->
I googled the problem and I wasn't alone. Using third-party frameworks seems to cause the crash. That's OK, because I can use <a href="http://hartcw.com/francis/building-for-the-mac-app-store/" target="_blank"><code>codesign</code> and <code>productbuild</code></a> to package the app together myself and submit using <a href="https://itunesconnect.apple.com/apploader/ApplicationLoader_2.5.1.dmg" target="_blank">Application Loader</a>.</p>
<p>But then I got a validation error; I wasn't signing Growl.framework with the same provisioning profile as the bundle. Uh oh.</p>
<p>After looking around and finding a bunch of references to some gntp-rename-move.rb ruby script. Forget about it. There's no description of how it works or how it uses it, and I wasted three hours trying to get it to work. What you want instead is to <a href="http://growl.info/downloads" target="_blank">download</a> the Growl source and build the Growl.framework target with your own code signature.</p>
<p>It's not a good solution, but it works. Replacing their version of Growl.framework with your compiled version will fix the validation error. You'll need to rebuild Growl.framework any time your certificate expires, once a year.</p>
<p>This solution is  a lot harder than it should have to be. I wish that Growl would improve their documentation on how to re-codesign the Growl framework with your own identity; their documented solution is an internal tool that they've published, but they don't offer much in the way of explanation of its context, how to use the tool, or what it is supposed to do.</p></import>

<!-- more -->

