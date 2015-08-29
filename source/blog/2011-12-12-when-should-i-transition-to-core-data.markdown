---
title: "When Should I Transition to Core Data?"
date: 2011-12-12 00:00
---

Let's take it as read that if you're a seasoned Cocoa Developer and you're considering using Core Data in your project, you probably should be using Core Data.<!--more-->Why wouldn't you already be using Core Data? I think there are two common reasons:

1. 

You're new at it and Core Data is _hard_.

It is! Learning Core Data is like taking everything you know about database design and use, throwing away a very specific chunk of it, and then replacing it with unfamiliar-sounding words with not-immediately-apparent meanings like NSManagedObjectContext. It's a hard framework to learn and your first attempt at using it is almost certainly going to suck.

2. 

You've been writing your project with a rapid application development approach.

Your project started simple, with simple data models. As the project grew, so did the models, and maybe you weren't so strict with the MVC. So what? Rules were made to be broken, amirite? But now you're spending a lot of time maintaining that logic in models. Getters and setters have side-effects, you need to be careful about what order you access properties in, etc.

Whatever your reasons for not already using Core Data (maybe you're data model is really simple - take a look [here](https://github.com/nulayer/NULevelDB)), using Core Data might make things a lot easier for you when writing or maintaining your app. But when do you know to switch?

I'm just finishing up a refactoring job that's taken 3 days; in the process of transition to using Core Data, I've noticed a lot of code getting deleted, indicating that it was definitely time to make the switch. This is code that shouldn't have been written in the first place, but I wasn't using Core Data. I'd like to enumerate some indicators that you should already be using Core Data.

(Naturally, I would _never_ admit to ever having any of these in _my_&nbsp;code.)

1. Model objects are observers of&nbsp;UIApplicationDidReceiveMemoryWarningNotification.
2. NSMutableSet or NSMutableDictionary instances behaving as caches.
3. For that matter, any nontrivial amount of application logic in your models.
4. Getters and setters in models having side-effects.
5. Contrived application logic between your view controllers and your models. You're VC's shouldn't be importing the data to populate your models, you should have a tailor-made class for that.
6. Models that conform to NSCoding (I'm looking at you two, NSKeyArchiver/NSUserDefaults). If you're saving model data to disk or NSUserDefaults, you're probably already going to larger pains than a Core Data transition would be.
7. Saving NSData blobs to disk.

The transition is also a fantastic opportunity to do things in your code that you probably already should have been doing, like the following.

1. Centralize access to external data sources, such as a web API.
2. More clearly define the divisions between models and view controllers.
3. Separate transient-ish properties of the view controllers from the models. Maybe your model remembers what cell index it corresponds to when that information belongs in a view controller.

When you're done your transition, you'll look back at how you were doing things before and wonder why you waited so long. I know I did.

<!-- more -->
