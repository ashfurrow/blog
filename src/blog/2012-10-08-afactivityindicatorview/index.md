---
title: AFActivityIndicatorView
date: 2012-10-08
---


I had some fun this evening re-implementing `UIActivityIndicatorView`, a commonly used class in iOS. These are used to denote to the user that something is happening, but in situations where a progress bar is inappropriate or just too gauche. The code for my implementation is [up on GitHub](https://github.com/AshFurrow/AFActivityIndicatorView).

![](D438BB7AC6174F9F96C24AAF9350833D.png)

I originally intended to implement the basics of the class, then add my own styles. Unfortunately, everything I did to the spinner just made it look worse. In its current form, it is simple and beautiful and connotes everything it is designed to (and, to the point, nothing more). Everything I added took away from the simplicity, so I decided not do.

Still, it could be useful to someone and serves as a neat example of drawing code.


  