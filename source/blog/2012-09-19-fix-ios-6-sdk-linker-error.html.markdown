---
title: "Fix iOS 6 SDK Linker Error"
date: 2012-09-19 00:00
---

If you download the latest Xcode 4.5 with iOS 6 SDK, existing projects no longer compile. A common one might be the Google Analytics library; it will give the following error:

```
ld: file is universal (3 slices) but does not contain a(n) armv7s slice: /Users/ash/Dropbox/500px/500px-ios/500px/ExternalLibraries/Google Analytics SDK/Library/libGoogleAnalytics.a for architecture armv7s
clang: error: linker command failed with exit code 1 (use -v to see invocation)
```

This is due to the fact that the new Xcode specifics the A6 (`armv7s`) as a valid architeture which libraries need to build for. However, any statically compiled frameworks need to be built including support for the A6. Since this chip is brand new, no libraries include that support.

 ![](/img/import/blog/fix-ios-6-sdk-linker-error/88FE0C083DF344C291DB1F4E5BAB2C6F.png)

The solution is to remove `armv7s` as a valid architecture the Xcode project. Open the File Inspector (⌘⎇1), select the project, then the Build Settings tab. Find "Valid Architectures".

 ![](/img/import/blog/fix-ios-6-sdk-linker-error/3FA67A3329D14076BF9F1B115F881945.png)

Double-click on "armv7 armv7s" and then select the "armv7s" row and click the minus sign.

 ![](/img/import/blog/fix-ios-6-sdk-linker-error/6E04343357884D05AFDC088AFF7039EF.png)

That's it! Make a mental note to check back with your statically compiled libraries to see when they update to incorporate A6 support.

(READMORE)
