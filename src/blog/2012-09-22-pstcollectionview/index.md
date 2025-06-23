---
title: PSTCollectionView
date: 2012-09-22
---


Interesting [project over on GitHub](https://github.com/steipete/PSTCollectionView) that aims to provide a drop-in, API-compatible replacement for [`UICollectionView`](/blog/uicollectionview-example), one piece of the new hawtness in iOS 6. It's still a work in progress and they're looking for help.

iOS 6 is very interesting, since it drops support for the first generation iPad while maintaining support for the older iPhone 3GS, which can't even support all of iOS 6's features. There is nothing about `UICollectionView` that would prevent its use on iOS 5 except for the fact that it "requires" iOS 6.

Huh.

It's kind of frustrating as an app developer who wants to continue to support iOS 5 and the first generation iPad to do so at the sustantial cost of writing his own grid view library.

That's where `PSTCollectionView` comes in.

I think that, moving forward, we may see a growing number of these types of open-source projects aiming to replicate user interface implemented in newer version of iOS which not available on older hardware.


  