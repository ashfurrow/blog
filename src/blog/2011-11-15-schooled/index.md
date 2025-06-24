---
title: Schooled
date: 2011-11-15
---


This code was not working:`childViewController.currentIndex = currentPageIndex*kGalleryPageSize + photoIndex;`

When currentPageIndex was zero and photoIndex was 1, I got thirteen. Very strange. I took a look at kGalleryPageSize

`kGalleryPageSize [self isKindOfClass:[UserViewController class]] ? 9 : 12`

Originally, this was always 12, but becomes 9 sometimes in a newly added feature. The original code became, then, the following:

`childViewController.currentIndex = currentPageIndex*[self isKindOfClass:[UserViewController class]] ? 9 : 12 + photoIndex;`

It looks like currentIndex (zero), multiplied by the result of isKindOfClass: (which doesn't matter, the result is zero), is then evaluated as a boolean (false) which yields 12, plus 1, resulting in thirteen.

Oops.


  