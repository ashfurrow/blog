---
title: Protocols and Swift
date: 2015-02-01 13:00:00 UTC
index: true
summary: "<p>The other day I posed this (somewhat cryptic) question to Twitter...</p>"
link_to: swift
---

The other day I posed this (somewhat cryptic) question to Twitter: 

<!-- more -->

<blockquote class="twitter-tweet" lang="en"><p>Best way for pure Swift objects to have optional conformance to some contract? Optional protocols/protocol members are <a href="https://twitter.com/objc">@objc</a>-only.</p>&mdash; Ash Furrow (@ashfurrow) <a href="https://twitter.com/ashfurrow/status/560436119956115456">January 28, 2015</a></blockquote>

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I heard back from a lot of different people with a lot of different opinions. Most were confused by my necessarily terse question (it may have been better to post a longer, more detailed question on a medium that provides more than 140 characters). 

I shared my [actual question](https://github.com/ashfurrow/Moya/issues/95#issuecomment-71834677) and with help from other developers, I found an [answer](https://github.com/ashfurrow/Moya/pull/96) for my specific case. 

So, hooray I guess? But something about the answer seemed unsatisfactory to me. It is too specific for the general case, so I thought I’d dig deeper to see if I could figure out something better. 

So let’s back it up a bit. 

Here’s the problem: you have two types that want to talk to each other. If you directly reference the type of one from within the other, you’ve just tightly coupled the two types together — and any software engineer worth their salt knows that Coupling is Bad. 

Most modern languages have a way to deal with this problem. In Objective-C — and indeed, in Swift — we call them protocols. As a high level concept, protocols are like contracts. If a type conforms to a protocol, it has essentially signed a contract to implement the methods specified in that protocol. Revisiting our earlier problem of the two types that want to talk to each other, we can use protocols so that they remain blissfully unaware of one another. All they care about is the protocol. Let’s look at a concrete, *incredibly pedagogical* example. 

Say we want to model some animals and food. Animals eat food. We can have each animal type be aware of all the different food types, but that would tightly couple the types together. Instead, we can use the following `Food` protocol. 

```swift
protocol Food {
    var caloriesPerGram: Double { get }
}
``` 

Then, we can define our `Cat` type. 

```swift
struct Cat {
    var calorieCount: Double = 0
    mutating func eat(food: Food, grams: Double) {
        calorieCount += food.caloriesPerGram * grams
    }
}
```

Nice. 

![Ode to Spot](/img/blog/protocols-and-swift/cat.gif)

In order to feed our cat, we need a type that conforms to the `Food` protocol. 

```swift
struct Kibble: Food {
    var caloriesPerGram: Double {
        return 40
    }
}
```

Super. Using the two together is really easy:

```swift
let catFood = Kibble()
var dave = Cat()

dave.eat(catFood, grams: 30)
```

Awesome. Note that we’re using pure Swift types – none of that Objective-C cruft. 

![This is my actual cat, Dave.](/img/blog/protocols-and-swift/play.gif)

(I know that this is fundamental stuff that you probably already know, but it’s important to make sure we’re on the same page before we continue.)

Here’s the problem I ran into: in a pure Swift environment, I want to have *optional methods* in my protocol so that objects that conform to it may opt-in to certain functionality. It turns out that this is really really hard. 

Let’s revisit our example of the cat and the food. Cats – turns out – have not evolved to eat kibble; they rely on moisture from their food to hydrate themselves. (That’s why kitties often have problems with urinary tract infections – they’re dehydrated.) Some foods, like canned cat food, have moisture. Some foods, like kibble, have none. Since I believe this difference is fundamental enough to different foods, I’d like to expand my protocol to have an *optional* amount of moisture. That way all the foods that don’t have any moisture don’t have to bother implementing those part of the protocol. Easy, right? 

```swift
protocol Food {
    var caloriesPerGram: Double { get }
    optional var milliLitresWaterPerGram: Double { get }
}
```

Er, no, actually. This code produces a compiler error advising you that the `’optional’ keyword can only be a applied to members of an @objc protocol`. Huh, that’s weird. 

![omg swift](/img/blog/protocols-and-swift/cry.gif)

Fine, so we put `@objc` at the beginning of our protocol declaration. 

```swift
@objc protocol Food {
    var caloriesPerGram: Double { get }
    optional var milliLitresWaterPerGram: Double { get }
}
```

But then we run into another problem: Swift structs, like `Kibble`, cannot conform to Objective-C protocols. 

It seems like quite the pickle. I *want* to use all the cool awesome new Swift features, but my solution requires the use of legacy Objective-C. So what do I do? 

I tried creating a second protocol and *asking* if the `food` parameter conformed to it, like so. 

```swift
protocol WetFood: Food {
    var milliLitresWaterPerGram: Double { get }
}

struct Cat {
    var calorieCount: Double = 0
    var hydrationLevels: Double = 0
    mutating func eat(food: Food, grams: Double) {
        calorieCount += food.caloriesPerGram * grams

        if let wetFood = food as? WetFood {
            // do something here
        }
    }
}
```

But the compiler still errors: `Cannot downcast from ‘Food’ to non-@objc protocol type ‘WetFood’`. Swift protocols are just not designed to be used in this way.

![Whomp whomp.](/img/blog/protocols-and-swift/sad.gif)

<hr />

After playing around for a while, things seemed a bit hopeless. Eventually, I realized that I was trying to solve a Swift problem using Objective-C methodology – something that can only lead to tears. I’ve been saying for a while that we need to reevaluate our approaches to familiar problems with Swift, and it was time to follow my own advice. 

Let’s revisit the high-level problem I’m trying to solve: I have two types and I want them to talk to each other *without coupling*. Justin Spahr-Summers, as usual, has an answer: 

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/ashfurrow">@ashfurrow</a> Split out the optional bits into one or more separate protocols that can be conformed to if desired.</p>&mdash; Justin Spahr-Summers (@jspahrsummers) <a href="https://twitter.com/jspahrsummers/status/560493854374113280">January 28, 2015</a></blockquote>

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

OK, cool. I can see that being really useful for table views, for example. He even later [pointed out](https://twitter.com/jspahrsummers/status/560498081162993665) that was the case. So let’s take a break from `Cat` and `Food` and look at table views. How might they look in pure Swift?  

The table view delegate/datasource protocols have always mystified me – no one has ever given me a satisfactory rule  dividing what is a datasource method from what is a delegate method. The datasource protocol alone has eleven methods, all but two of which are `optional`. 

The methods are `optional` because the creators of `UITableView` wanted the behaviour to be opt-in (hey, just like our `Food` example!). By having `optional` components of their contract, table views behave differently. If you don’t implement the methods to reorder the table view, it doesn’t show the reordering controls (for example). 

So let’s take Justin’s advice. 

Imagine Apple has hired you to rewrite `UITableView` in pure Swift. Let’s start with the existing protocol implementation. Currently, `UITableView` has an optional `dataSource` property. 

```swift
unowned(unsafe) var dataSource: UITableViewDataSource?
```

Ok, now how about that `UITableViewDataSource` protocol? 

BEGIN_WIDE

```swift
protocol UITableViewDataSource : NSObjectProtocol {
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int
    
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell
    
    optional func numberOfSectionsInTableView(tableView: UITableView) -> Int
    
    optional func tableView(tableView: UITableView, titleForHeaderInSection section: Int) -> String? 
    optional func tableView(tableView: UITableView, titleForFooterInSection section: Int) -> String?
    
    // Editing
    
    optional func tableView(tableView: UITableView, canEditRowAtIndexPath indexPath: NSIndexPath) -> Bool
    
    // Moving/reordering
    
    optional func tableView(tableView: UITableView, canMoveRowAtIndexPath indexPath: NSIndexPath) -> Bool
    
    // Index
    
    optional func sectionIndexTitlesForTableView(tableView: UITableView) -> [AnyObject]! 
    optional func tableView(tableView: UITableView, sectionForSectionIndexTitle title: String, atIndex index: Int) -> Int 
    
    // Data manipulation - insert and delete support
    
    optional func tableView(tableView: UITableView, commitEditingStyle editingStyle: UITableViewCellEditingStyle, forRowAtIndexPath indexPath: NSIndexPath)
    
    // Data manipulation - reorder / moving support
    
    optional func tableView(tableView: UITableView, moveRowAtIndexPath sourceIndexPath: NSIndexPath, toIndexPath destinationIndexPath: NSIndexPath)
}
```

END_WIDE

Yikes! I’ve included some of the comments from Apple’s header files to show you how complex this protocol is. For example, the “Moving/reordering” function determines if a given row can be moved, but is only invoked if the datasource *also* implements the final method in the protocol. One wonders why these two interdependent methods are so far apart in the header file. 

If we were going to write a new, purely Swift `TableView` type, we’ll need a data source to get information about the content we’ll be displaying. By following Justin’s advice, it’s not hard to see how things could be rewritten (let’s assume we have Swift equivalent types for `NSIndexPath`, `UITableViewCell`, etc). 

BEGIN_WIDE

```swift
class TableView {
    var numberOfSections: Int = 1

    weak var dataSource: TableViewDataSource?
    weak var titlesDataSource: TableViewTitlesDataSource?
    weak var editingDataSource: TableViewEditingDataSource?
    weak var reorderingDataSource: TableViewReorderingDataSource?
    weak var indexSataSource: TableViewIndexDataSource?

    // TODO: Finish re-implementing UITableView
}

protocol TableViewDataSource: class {

    func tableView(tableView: TableView, numberOfRowsInSection section: Int) -> Int
    func tableView(tableView: TableView, cellForRowAtIndexPath indexPath: IndexPath) -> TableViewCell
}

protocol TableViewTitlesDataSource: class {

    func tableView(tableView: TableView, titleForHeaderInSection section: Int) -> String?
    func tableView(tableView: TableView, titleForFooterInSection section: Int) -> String?
}

protocol TableViewEditingDataSource: class {
    func tableView(tableView: TableView, canEditRowAtIndexPath indexPath: IndexPath) -> Bool
    func tableView(tableView: TableView, commitEditingStyle editingStyle: TableViewCell.EditingStyle, forRowAtIndexPath indexPath: IndexPath)
}

protocol TableViewReorderingDataSource: class {
    func tableView(tableView: TableView, canMoveRowAtIndexPath indexPath: IndexPath) -> Bool
    func tableView(tableView: TableView, moveRowAtIndexPath sourceIndexPath: IndexPath, toIndexPath destinationIndexPath: IndexPath)
}

protocol TableViewIndexDataSource: class {
    func sectionIndexTitlesForTableView(tableView: TableView) -> [String]!
    func tableView(tableView: TableView, sectionForSectionIndexTitle title: String, atIndex index: Int) -> Int
}
```

END_WIDE

I’m not saying that this is necessarily how I would actually write things – it’s only supposed to show you how dividing areas of concern into separate protocols makes things a lot more clear. 

First, we moved the section count into the `TableView` type itself. All we need to populate the table view is to give it an object that conforms to the `TableViewDataSource` protocol. 

Extending behaviour is very easy: you want to have cell reordering in your table view? Then set the table view’s `reorderingDataSource` property to something that will handle reordering. You want titles? Go ahead and use `TableViewTitlesDataSource`. And so on. 

Sure, you’ll probably have only one object that conforms to all the protocols you need (and be honest – it’s probably a [view controller](http://chris.eidhof.nl/posts/lighter-uiviewcontrollers.html), isn’t it?). But the power of this technique is *not* that we can divide the various data sources into different objects. Instead, the advantage is that we don’t have additional semantic coupling between functions in the protocol. *Of course* `canMoveRowAtIndexPath` can only be called if `moveRowAtIndexPath` is also implemented – they’re *in the same protocol*. 

(Of course, `UITableViewDelegate` could benefit from a similar rewriting, but as it contains no fewer than thirty three functions – *all optional* – I will leave that as an exercise for the reader.)

(Also note that the `: class` suffix of the protocols. This specifies that the protocols may only be conformed to by classes and not structs or enums – those two types cannot be weakly referenced.)

OK, so `UITableView` sucks and like most things that suck in Objective-C, they’re way better in Swift. So what? 

So, Swift programmers, you have a choice now. The next time you write a protocol and it needs `optional` functions, *don’t* just add `@objc` to the declaration. Split it out into multiple protocols like a responsible adult. There, that’s better. Your mother and I are so proud of you. 

![We really are.](/img/blog/protocols-and-swift/proud.gif)

<hr />

But wait – what about my first example? With the cat and the food and everything? What do we do there? Well, just like my Twitter question the other day, the answer isn’t so simple. 

Remember, the *problem* isn’t “I need optional protocol functions blah blah blah” – those are a means to an end. The problem is “I need two types to talk to one another without coupling.” Let’s solve this problem the Swift way: with protocols. 

(Wait, weren’t we just using protocols? Didn’t protocols get us into this mess? Yes, but protocols are like XML – if they don’t solve your problem, then you’re not using enough of them.)

Our problem before is that the `Cat` struct didn’t know if the `Food` it was passed in contained water it should keep track of. Not all foods have water in them, after all. But wait a second – everything that consumes food has a current calorie count and hydration. Let’s flip things around: instead of making the `Cat` responsible for updating its state when it eats something, let’s make the `Food` responsible for updating the state of whatever is consuming it. 

```swift
protocol FoodConsumer {
    var calorieCount: Double { get set }
    var hydrationLevel: Double { get set }
}

protocol Food {
    func beConsumedBy(consumer: FoodConsumer, grams: Double) -> FoodConsumer
}

struct Cat: FoodConsumer {
    var calorieCount: Double = 0
    var hydrationLevel: Double = 0
}

struct Kibble: Food {
    let caloriesPerGram: Double = 40

    func beConsumedBy(consumer: FoodConsumer, grams: Double) -> FoodConsumer {
        var newConsumer = consumer
        newConsumer.calorieCount += grams * caloriesPerGram
        return newConsumer
    }
}

struct FancyFeast: Food {
    let caloriesPerGram: Double = 80
    let milliLitresWaterPerGram: Double = 0.2

    func beConsumedBy(consumer: FoodConsumer, grams: Double) -> FoodConsumer {
        var newConsumer = consumer
        newConsumer.calorieCount += grams * caloriesPerGram
        newConsumer.hydrationLevel += grams * milliLitresWaterPerGram
        return newConsumer
    }
}
```

This is a lot better. The different foods are responsible for doing their own thing to whatever consumer comes their way and the consumer itself is only responsible for things that are common to all food consumers: calorie count and water levels. 

(We could have also opted to use an `inout` `FoodConsumer` parameter to pass in `&dave` and modify the struct itself. I prefer this immutable approach.)

And how might we use this code? Well, we have a few options. Here’s one that I like. 

```swift
extension Cat {
    func eat(food: Food, grams: Double) -> FoodConsumer {
        return food.beConsumedBy(self, grams: grams)
    }
}

let catFood = Kibble()
let wetFood = FancyFeast()
var dave = Cat()

dave = dave.eat(catFood, grams: 30) as Cat
dave = dave.eat(wetFood, grams: 20) as Cat
```

You get a lot more flexibility with this method, since you can have foods that don’t have calories (diet soda) or don’t have either calories or water (as far as I know, twist ties contain neither, but it’s possible that my cat knows something I do not). 

(It would be nice to be able to extend the `FoodConsumer` protocol to add an `eat(Food)` method that could just call through for us, but Swift doesn't support such an extension – at least [not yet](https://github.com/ksm/SwiftInFlux#moving-functionality-from-global-functions-to-methods).) (**Update**: this is actually now possible! See the [note](#update) at the end of this article.)

![Om nom nom.](/img/blog/protocols-and-swift/eating.gif)

This approach obviously isn’t suited for every case, but it is a useful tool to have at your disposal. 

---

Remember that the general problem is “how do I get different types to talk to one another without coupling?” 

The answer is “it depends.”

Swift and Objective-C are interoperable, but are still fundamentally different languages. One prefers static typing and the other is dynamic. Solutions that work well in one aren’t necessarily going to work well in the other. However  natural it is for us to try and use Objective-C solutions to solve Swift problems, we should always be on the lookout for new or better ways to solve problems. If something is difficult in Swift (and it’s not related to constant compiler crashes), it’s likely that you’re trying to use it in a way it is not intended to be used. Pay attention to the friction you experience when writing Swift – if something feels overly difficult, there probably is a better way. 

---

### Update

Since Swift 2, it's bee possible to provide protocol extensions that solve this problem even more elegantly. Even a naïve improvement would be to provide an extension on `FoodConsumer`. In order to do this, we need to be a little smarter about how we define the `Food` protocol.

```swift
protocol Food {
    func beConsumedBy<T: FoodConsumer>(consumer: T, grams: Double) -> T
}

extension FoodConsumer {
    func eat(food: Food, grams: Double) -> Self {
        return food.beConsumedBy(self, grams: grams)
    }
}
```

And then remove the `Cat` extension. The complete new code looks like the following. 

BEGIN_WIDE

```swift
protocol FoodConsumer {
    var calorieCount: Double { get set }
    var hydrationLevel: Double { get set }
}

protocol Food {
    func beConsumedBy<T: FoodConsumer>(consumer: T, grams: Double) -> T
}

extension FoodConsumer {
    func eat(food: Food, grams: Double) -> Self {
        return food.beConsumedBy(self, grams: grams)
    }
}


struct Cat: FoodConsumer {
    var calorieCount: Double = 0
    var hydrationLevel: Double = 0
}

struct Kibble: Food {
    let caloriesPerGram: Double = 40

    func beConsumedBy<T: FoodConsumer>(consumer: T, grams: Double) -> T {
        var newConsumer = consumer
        newConsumer.calorieCount += grams * caloriesPerGram
        return newConsumer
    }
}

struct FancyFeast: Food {
    let caloriesPerGram: Double = 80
    let milliLitresWaterPerGram: Double = 0.2

    func beConsumedBy<T: FoodConsumer>(consumer: T, grams: Double) -> T {
        var newConsumer = consumer
        newConsumer.calorieCount += grams * caloriesPerGram
        newConsumer.hydrationLevel += grams * milliLitresWaterPerGram
        return newConsumer
    }
}


let catFood = Kibble()
let wetFood = FancyFeast()
var dave = Cat()

dave = dave.eat(catFood, grams: 30)
dave = dave.eat(wetFood, grams: 20)
```

END_WIDE

Very cool! We no longer need to force cast the return value of `dave.eat()` to be `Cat` because of the `eat` function's use of `Self` as a return type. Brilliant!