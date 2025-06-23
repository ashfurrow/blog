---
title: "Projections on NSArray using valueForKey:"
date: 2011-05-24
---


A coworker of mine recently told me about how valueForKey: works on an NSArray instance. It will enumerate the contents of the array and invoke valueForKey: on each element, returning an autoreleased array instance of the response of the elements. Formally, valueForKey: on an NSArray is a projection of your data to specific values. This is the same as a Select() on a .Net collections object. The following code:

```objc
NSArray *array = [[NSArray alloc] initWithObjects:
  [NSDictionary dictionaryWithObjectsAndKeys:
    @"First Object", kNameKey, 
    [NSNumber numberWithInt:0], kNumberKey, 
    nil],
  [NSDictionary dictionaryWithObjectsAndKeys:
    @"Second Object", kNameKey, 
    [NSNumber numberWithInt:1], kNumberKey, 
    nil],
  [NSDictionary dictionaryWithObjectsAndKeys:
    @"Third Object", kNameKey, 
    [NSNumber numberWithInt:2], kNumberKey, 
    nil],
  nil];

NSArray *selectedArray = [array valueForKey:kNameKey];
for (id obj in selectedArray)
    NSLog(@"%@", obj);
```

Produces the expected output: First Object Second Object Third Object

This is pretty cool! We used it for retrieve JSON parsed to an array of dictionaries used for contents of a UIPickerView. Each element had a user-displayed value and an internal value. This saved us from having to write a method to convert from the user-visible to the corresponding internal value.

This got me thinking what other things the Objective-C collections API would let you do to avoid writing unnecessary code; I don't have time to summarize my results now, but take a look at the [Collections Operators](http://developer.apple.com/library/ios/#documentation/Cocoa/Conceptual/KeyValueCoding/Articles/CollectionOperators.html). How many for loops could those save in _your_ code?


  