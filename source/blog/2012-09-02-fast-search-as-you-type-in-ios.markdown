---
title: "Fast Search-As-You-Type in iOS"
date: 2012-09-02 00:00
---

Today I was writing a new feature for a client involving search-as-you-type. Searching in iOS, according to the [HIG](http://developer.apple.com/library/ios/#DOCUMENTATION/UserExperience/Conceptual/MobileHIG/UEBestPractices/UEBestPractices.html#//apple_ref/doc/uid/TP40006556-CH20-SW14), should be "quick and rewarding", so I wanted to make sure I get this right.

It's a data-collection app the client uses to get people to enter information such as their address. My client wants an autocomplete-esque experience of typing in your city and province.

The easiest way to do this on an iPad was a popover with a table view controller displaying a list representing models of city/province combinations. A naïve approach _that works_ would be filtering a list of these models every time the text in their city box changes. The following model and predicate for filter would work.

```
@interface CityModel

@property (nonatomic, copy) NSString *cityName;
@property (nonatomic, copy) NSString *provinceName;

@end

...

filteredCityModelArray = [cityModelArray filteredArrayUsingPredicate:[NSPredicate predicateWithFormat:@"cityName like[c] %@", inputText]];
```

Anyone who has done much SQL (and could incidentally read `NSPredicate`s) would tell you this is a bad idea. `like` is a pretty slow operation and the `[c]` operator makes the comparison diacritically insensitive (this encompasses, among other things, case insensitivity). That means each element of the array is going to have it's `cityName` turned into lower case for the comparison. That's additional work that the predicate has to perform every time the user enters a letter; depending on the length of the `cityModelArray`, this could cause UI stuttering.

What's better is to have a canonical version of each search term (the city) that we can compare against.

```
@interface CityModel

@property (nonatomic, copy) NSString *cityName;
@property (nonatomic, copy) NSString *provinceName;
@property (nonatomic, copy) NSString *canonicalSearchTerm;

@end
```

This `canonicalSearchTerm` will be a lower-case version of the `cityName` (though, in your implementations, you could use whatever canonical search term you like). The predicate would now look something like this:

```
NSString *lowerCaseInputText = [inputText lowerCaseString];
filteredCityModelArray = [cityModelArray filteredArrayUsingPredicate:[NSPredicate predicateWithFormat:@"canonicalSearchTerm beginsith %@", lowerCaseInputText]];
```

The predicate no longer uses the `like` operator, so we'll get faster performance there. The predicate also no longer has to turn each city name into lower case for each comparison; the input text is made lower case _once_ and compared against the canonical, lower case search term. Way faster.

These techniques apply to both bare `NSObject` models and Core Data `NSManagedObjects`. They lead to a slight increase in the amoutn of memory your app takes up, but the performance gains will be noticable to the user (_especially_ if you have a large number of items to filter through).

It might not seem like a big deal, but this didn't take up hardly any extra time and will scale really well. I think that these sorts of small but user-noticable improvements should always be in an iOS developer's toolbelt.

**Update** : Ryder Mackay points to another performance improvement:

<blockquote class="twitter-tweet" data-in-reply-to="242382610611978240">
	<p><a href="https://twitter.com/ashfurrow"><s>@</s><b>ashfurrow</b></a> consider using -predicateWithSubstitutionVariables: to avoid expensive format string parsing: <a href="http://t.co/mXRmjFrg" title="http://stackoverflow.com/a/7713512/1034477">stackoverflow.com/a/7713512/1034…</a></p>— Ryder Mackay (@rydermackay) <a href="https://twitter.com/rydermackay/status/242393643154022400" data-datetime="2012-09-02T22:48:42+00:00">September 2, 2012</a>
</blockquote>
<script src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Nice! We can create the predicate once and then save it for later to avoid having to parse the format string (a not-inexpensive operation).

```
//put this in viewDidLoad
//filteringPredicate is an instance variable
filteringPredicate = [NSPredicate predicateWithFormat:@"canonicalSearchTerm beginsith $searchTerm", lowerCaseInputText]

...

//later, when we want to filter
NSDictionary *substitutionDictionary = @{ @"searchTerm" : [inputText lowerCaseString] };
filteredCityModelArray = [cityModelArray filteredArrayUsingPredicate:[filteringPredicate predicateWithSubstitutionVariables:substitutionDictionary];
```
 ![](/img/import/blog/fast-search-as-you-type-in-ios/C11B981EB6C442618B44A5F754E8DC66.jpg)<!-- more -->
