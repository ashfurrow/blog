---
title: Git & Xcode
date: 2012-09-15
---

I got a new MacBook Air from work yesterday. The command line tools of Xcode weren't transferred over from my old machine, so when I typed `git status`, nothing happened.

Hrm.

[Frédéric Sagnes](http://twitter.com/ndfred) sent me [this Cocoanetics](http://www.cocoanetics.com/2012/07/you-dont-need-the-xcode-command-line-tools/) article explaining how git is contained _inside Xcode_ and you don't need to install the command line tools at all. Further, the git version in Xcode is _newer_ than the one in the command line tools.

Enter the following command into the Terminal to get the latest and great git version that Xcode is running itself.

```
echo alias "git=xcrun git" >> ~/.bashrc
```
