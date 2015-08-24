---
title: "Use Old Style iPhone Simulator"
date: 2011-04-18 00:00
---

<p>I'm writing the labs for the iPhone course I'm teaching next week and the machines on campus use an older version of Xcode. Since I'm on a newer version, when I take a screenshot of the simulator it's of an iPhone 4. I need to make sure that the students see in the labs exactly what's on the screen.</p>

<p>After spending some time trying to install older versions of Xcode, I've figured out a really easy way to make the new simulator (the iPhone 4) look like the old simulator (the iPhone 3G/3GS/1st gen). Grab a copy of the old simulator; I sftp'd into the school machines and downloaded a zipped copy of the app bundle. In Finder, right-click and "Show Package Contents" and in the Contents/Resources folder, you'll find a file named "frame.png". Replace the one in your simulator (/Developer/Platforms/iPhoneSimulator.platform/Developer/Applications) with the old one, backing up the original first. Next time you load the simulator, voila! I'm actually surprised it worked, considering the dimensions could have been different. Maybe Apple ... gasp! hardcoded screen dimensions?</p>

<!-- more -->

