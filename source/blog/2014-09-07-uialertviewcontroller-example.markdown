---
title: "Exploring UIAlertController"
date: 2014-09-07 00:00
---

<import><p>This morning, I was working on the <a href="https://github.com/AshFurrow/Moya/issues/39">sample app</a> for <a href="https://github.com/AshFurrow/Moya">Moya</a>, a network abstraction framework that I’ve built on top of <a href="https://github.com/Alamofire/Alamofire">Alamofire</a>. I needed a way to grab some user text input, so I turned to <code>UIAlertView</code>. Turns out that that’s deprecated in favour of <code>UIAlertController</code>. Hmm. </p>

<!-- more -->

<p>Looking around the internet, there weren’t very many examples of how to use this cool new class, and the <a href="https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAlertController_class/">documentation</a> was sparse at best. Let’s take a look at the high-level API and then get into some of the nitty-gritty. (I’m going to write this in Swift because I am not a <a href="http://t.co/Q2hvacChLu">dinosaur</a>.)</p>

<p><code>UIAlertController</code> is a <code>UIViewController</code> subclass. This contrasts with <code>UIAlertView</code>, a <code>UIView</code> subclass. View controllers are (or at least, should be) the main unit of composition when writing iOS applications. It makes a lot of sense that Apple would replace alert views with alert view <em>controllers</em>. That’s cool. </p>

<p>Creating an alert view controller is pretty simple. Just use the initializer to create one and then present it to the user as you would present any other view controller. </p>

```swift
let alertController = UIAlertController(title: "Title", message: "Message", preferredStyle: .Alert)
presentViewController(alertController, animated: true, completion: nil)
```

<p>Pretty straightforward. I’m using the <code>.Alert</code> preferred style, but you can use the <code>.ActionSheet</code> instead. I’m using this as a replacement for <code>UIAlertView</code>, so I’ll just discuss the alert style. </p>

<p>If you ran this code, you’d be presented with something like the following (on beta 7).</p>
<img src="/img/import/blog/uialertviewcontroller-example/C47E5C761A24426CB34230DBB2A7AF7C.png" class="img-responsive"><p>Weird. The title is there, but the message is not present. There are also no buttons, so you can’t dismiss the controller. It’s there until you relaunch your app. Sucky. </p>

<p>Turns out if you want buttons, you’ve got to explicitly add them to the controller before presenting it. </p>

```swift
let ok = UIAlertAction(title: "OK", style: .Default, handler: { (action) -> Void in
})
let cancel = UIAlertAction(title: "Cancel", style: .Cancel) { (action) -> Void in
}
alertController.addAction(ok)
alertController.addAction(cancel)
```

<p>This is <em>worlds</em> better than <code>UIAlertView</code>, despite being much more verbose. First of all, you can have multiple cancel or destructive buttons. You also specify individual closures to be executed when a button is pressed instead of some shitty delegate callback telling you which button <em>index</em> was pressed. (If anyone out there makes a <code>UIAlertController+Blocks</code> category, I will find you, and I <em>will</em> kill you.)</p>
<img src="/img/import/blog/uialertviewcontroller-example/2A03E60C605A42789A6FAF704BB9A130.jpg" class="img-responsive"><p>If we added the above configuration to our code, we’d get the following. </p>
<img src="/img/import/blog/uialertviewcontroller-example/08BE65FFF6E243CAAD311D4115EC75B6.png" class="img-responsive"><p>Way better. Weird that the message is now showing up. Maybe it’s a bug, or maybe it’s intended behaviour. Apple, you so cray cray. Anyway, you should also notice that the “OK” and “Cancel” buttons have been styled and positioned according to iOS conventions. Neato. </p>

<p>What <em>I</em> needed, however, was user input. This was possible with <code>UIAlertView</code>, so it should be possible with <code>UIAlertController</code>, right? Well, kinda. There’s an encouraging instance method named <code>addTextFieldWithConfigurationHandler()</code>, but using it is not so straightforward. Let me show you what I mean. </p>

```swift
alertController.addTextFieldWithConfigurationHandler { (textField) -> Void in
    // Here you can configure the text field (eg: make it secure, add a placeholder, etc)
}
```

<p>Straightforward. Run the code, get the following.</p>
<img src="/img/import/blog/uialertviewcontroller-example/9EA0E4E86AB54891A9A27BC24D1C8889.png" class="img-responsive"><p>The question now is this: how do you, in the closure for the “OK” button, access the contents of the text field?</p>
<img src="/img/import/blog/uialertviewcontroller-example/0E7A01300D2F49C6947664D55AC91803.gif" class="img-responsive"><p>There is no way for you to directly access the text field from the closure invoked when a button is pressed. <a href="http://stackoverflow.com/questions/24172593/access-input-from-uialertcontroller">This</a> StackOverflow question has two possible answers. You can access the <code>textFields</code> array on the controller (assuming that the order of that array is the same as the order which you added the text fields), but this causes a reference cycle (the alert action has a strong reference to the alert view controller, which has a strong reference to the alert action). This <em>does</em> cause a memory leak for each controller that you present. </p>
<img src="/img/import/blog/uialertviewcontroller-example/31715566B57649FF8B277A3063191734.png" class="img-responsive"><p>The other answer suggests storing the text field that’s passed into the configuration closure in a property on the presenting controller, which can later be accessed. That’s a <em>very</em> Objective-C way of solving this problem. </p>
<p>So what do we do? Well, I’ve been writing Swift lately, and whenever I come across a problem like this, I think “if I had <a href="http://instagram.com/p/rWyQdUDBhH">five years of Swift experience</a>, what would <em>I</em> do?” My answer was the following. </p>
<p>Let’s create a local variable, a <code>UITextField?</code> optional. In the configuration closure for the text field, assign the local variable to the text field that we’re passed in. Then we can access that local variable in our alert action closure. Sweet. The full implementation looks like this. </p>

```swift
var inputTextField: UITextField?
let alertController = UIAlertController(title: "Title", message: "Message", preferredStyle: .Alert)
let ok = UIAlertAction(title: "OK", style: .Default, handler: { (action) -> Void in
    // Do whatever you want with inputTextField?.text
    println("\(inputTextField?.text)")
})
let cancel = UIAlertAction(title: "Cancel", style: .Cancel) { (action) -> Void in
}
alertController.addAction(ok)
alertController.addAction(cancel)
alertController.addTextFieldWithConfigurationHandler { (textField) -> Void in
    inputTextField = textField
}
presentViewController(alertController, animated: true, completion: nil)
```

<p>I like this a lot. It avoids polluting our object with unnecessary properties, avoids memory leaks, and seems pretty “Swift”. I’ve created a <a href="https://github.com/AshFurrow/UIAlertController-Example">GitHub repo</a> that I’ll keep up to date with future betas, etc. </p>
<img src="/img/import/blog/uialertviewcontroller-example/09B8BCEA8BBE48239C07298CD4112B53.jpg" class="img-responsive"><p>So yeah. The new <code>UIAlertController</code> has some great benefits:</p>

<ul>
<li>It’s explicit</li>
<li>It conforms to iOS composability conventions</li>
<li>It’s got a clear API</li>
<li>It’s reusable in different contexts (iWatch vs iWatch mini)</li>
</ul>

<p>The drawbacks are:</p>

<ul>
<li>It’s unfamiliar</li>
</ul>

<p>As we march forward into this brave new world of Swift, we need to reevaluate our approaches to familiar problems. Just because a solution that worked well in Objective-C might work OK in Swift doesn’t make it a solution <em>well</em> suited for use in Swift. As developers, we should keep an open mind about new ideas and experiment. The way I look at it is like this: right now, the community is pretty new at Swift. We’re racing in all different directions because <a href="http://robnapier.net/i-dont-know-swift">no one</a> really knows what the best practices are, yet. We need this expansion in all directions, even if a lot of those directions are going to turn out to be bad ideas. If we don’t throw it all against the wall, we won’t figure out what sticks. </p>

<p>So next time you try and do something and get confused because Swift is unfamiliar, try all kinds of things. Could be you end up creating a brand new convention that’s adopted by the whole iOS community for years to come. </p></import>

