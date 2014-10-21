---
title: "Exploring UIBarButtonItem"
date: 2012-08-24 00:00
---

<import><p>Yesterday, I was going through the 500px iPad app looking to update some graphics used in our navigation bars. I think that the existing navigation bar is too boring.</p>
<img src="/img/import/blog/exploring-uibarbuttonitem/36A0D5D3B0B24483B02E652F53987E58.png" class="img-responsive"><p>I've decided that the push notifications button should be red so more users tap on it. I think this design decision's a winner, so I'm not even going to run it by the designer first.</p>

<p>However, after some light digging around in the code, I spent a lot of time learning more and more about <code>UIBarButtonItem</code> and I'm not really impressed. </p>

<h2 id="contraintsonuibarbuttonitem">Contraints on UIBarButtonItem</h2>

<p><code>UIBarButtonItem</code> and <code>UITabBarItem</code> are the two common subclasses of <code>UIBarItem</code>. The former is for use in <code>UINavigationBar</code>s and the latter is used in <code>UITabBar</code>s. I'm going to be speaking mostly about <code>UIBarButtonItem</code>, but my complaints mostly transfer to <code>UITabBarItem</code>. </p>

<p>The first thing you'll notice about <code>UIBarItem</code> is that it extends <code>NSObject</code>, not <code>UIView</code>. That means that you can't manipulate its frame, you can't access its background colour and other appearence properties, you can't attach a gesture recognizer to it, and when you use the target/action of the <code>UIBarButtonItem</code>, the sender is not in a view hierarchy. </p>

<p>That last point is kind of important. If I create a <code>UIBarButtonItem</code> and point it to a selector on <code>self</code> called <code>userDidPressBarButtonItem:</code>, the parameter is the bar button item that was pressed. Pretty easy so far. But since it's not actually a view, I can't get its frame or bounds to present a popover from it.</p>

<p>Not so bad, you counter, since <code>UIPopover</code> can be presented from a <code>UIBarButtonItem</code> directly instead of an arbitrary view. OK, fine, but if I have a custom popover implementation or other UI that I want to present from the pressed button, I'm fucked. </p>

<h2 id="historicalreasons">Historical Reasons</h2>

<p>So, <code>UIBarButtonItem</code> has some serious and fucked up limitions, but you need to use it. Why are these limits imposed by Apple's framework? Because the class has been around since forever. If you're familiar with OS X development, the idea of a kind of proxy class to set up custom containers would seem familiar. </p>

<p>However, that techique is <em>not common</em> in iOS. Additionally, its popularity in App Kit on OS X is fading as Apple moves to a more modern library.</p>

<p><code>UIBarButtonItem</code> is as messed up as it is because some engineer at Apple wrote it when that was the accepted way to write it. The world has moved on while <code>UIBarButtonItem</code> has stayed where it is.</p>

<h2 id="convenience">Convenience</h2>

<p>I can see the rationale behind this class; you supply a black and white image and the bar item renders it appropriately. As a developer, it seems really easy to use. Provide a simple image and your app looks like it belongs in the rest of UIKit. However, if you want to customize the appearance at all, welcome to a world of pain, as we'll see shortly.</p>

<p>In the above screenshot, the image used to create the notifications <code>UIBarButtonItem</code> looks something like the following:</p>
<img src="/img/import/blog/exploring-uibarbuttonitem/F8D3867C5BC4452DAC0C9BE2584016D8.png" class="img-responsive"><p><code>UIBarButtonItem</code> would take this image and figure out what it was <em>supposed</em> to look like, given the properties of the bar it was contained in. </p>

<p>As another example, <code>UITabBar</code> renders images with a blue gradient and nice overlay depending on if its tab was selected:</p>
<img src="/img/import/blog/exploring-uibarbuttonitem/A3390B33CC1D4BA6AF60B1A7EEF861B8.jpg" class="img-responsive"><p>Those tab bar buttons are all drawn using a single, black and white <code>png</code> and are re-rendered if they become selected, as "Songs" currently is.</p>

<p>If you want to circumvent the default appearence of the bar button item, then you can provide a custom view to be placed within the <code>UIBarButtonItem</code> without any custom drawing performed on it. The easiest way to do this is provide a <code>UIImageView</code> with your new custom image in it. For example, if I took the notification icon used above and replaced it with a red icon, I could achieve this effect in the 500px iPad app:</p>
<img src="/img/import/blog/exploring-uibarbuttonitem/BEE259C5A030421CB65C5D8012123F70.png" class="img-responsive"><p>Using this new icon as a <code>UIImageView</code> custom view with <code>UIBarButtonItem</code>'s <code>initWithCustomView:</code> initializer, I'll get the following effect:</p>
<img src="/img/import/blog/exploring-uibarbuttonitem/9E6BCEDFF1564134A3449996EDA4205B.png" class="img-responsive"><p>Awesome! I think this is a huge improvement. I can't wait to show it to Adam to see what he thinks.</p>

<p>Not so fast, however. I noticed that the notification popover no longer appears when I tap the button. What gives?!</p>

<p><em>Turns out</em>, <code>UIBarButtonItem</code> doesn't invoke it's target/action when tapped if you use a custom view. </p>

<p>Huh. </p>

<p>The solution is to replace the <code>UIImageView</code> as the custom view for the bar button item with a <code>UIButton</code> which <em>contains</em> the image. All I need to do is add the target/action previously assigned to the bar button item to the <code>UIButton</code> and set the <code>UIButton</code>'s <code>showsTouchWhenHighlighted</code> property to <code>YES</code> to get the standard glow applied when the user touches it. This isn't a hard change, and I even wrote a convenient category method on <code>UIBarButtonItem</code>:</p>

<pre><code>+ (id)barButtonWithImage:(UIImage *)image style:(UIBarButtonItemStyle)style target:(id)target action:(SEL)action
{
    UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
    [button addTarget:target action:action forControlEvents:UIControlEventTouchUpInside];
    button.frame = CGRectMake(0, 0, MAX(44, image.size.width), 44);
    button.contentMode = UIViewContentModeCenter;
    [button setShowsTouchWhenHighlighted:YES];

    [button setImage:image forState:UIControlStateNormal];

    UIBarButtonItem *barButtonItem = [[UIBarButtonItem alloc] initWithCustomView:button];

    return barButtonItem;
}
</code></pre>

<p>Sure, I take some liberties with the size of the button (I wouldn't publish this to GitHub), but I know that it'll suit our needs perfectly. I drop it into my Xcode project and hit the play button and try out my app.</p>

<p>Crash.</p>

<p>Well well well. Whenever I tap the notifications button, my app crashes!</p>

<pre><code>2012-08-24 11:42:02.688 500px[72157:c07] *** Terminating app due to uncaught exception 'NSInvalidArgumentException', reason: '-[UIAccessibilityBundle view]: unrecognized selector sent to instance 0x92438c0'
*** First throw call stack:
(0x2b13022 0x22becd6 0x2b14cbd 0x2a79ed0 0x2a79cb2 0x18c21fe 0xa44a4 0x2b14e99 0x142414e 0x14240e6 0x14caade 0x14cafa7 0x14ca266 0x14493c0 0x14495e6 0x142fdc4 0x1423634 0x3c2fef5 0x2ae7195 0x2a4bff2 0x2a4a8da 0x2a49d84 0x2a49c9b 0x3c2e7d8 0x3c2e88a 0x1421626 0x683dc 0x2f15)
terminate called throwing an exception(lldb) 
</code></pre>

<p>Wow, thanks Xcode. As usual, super helpful stack trace. But no worries; since I follow <a href="http://www.fruitstandsoftware.com">Michael Fey's blog</a>, I know about a useful tip for <a href="http://www.fruitstandsoftware.com/blog/2012/08/quick-and-easy-debugging-of-unrecognized-selector-sent-to-instance/">debugging these types of errors</a> and I find the line that's crashing my app:</p>

<pre><code>[self.pushNotificationsPopoverController presentPopoverFromBarButtonItem:sender permittedArrowDirections:UIPopoverArrowDirectionAny animated:YES];
</code></pre>

<p>Everything appears to be fine... wait! There it is! I was using <code>sender</code> to present the popover, but now the sender isn't a <code>UIBarButtonItem</code> anymore, it's my custom <code>UIButton</code>! Fuck! Well, not a hard change; I'll just create a new instance variable in my view controller and use it to present my popover:</p>

<pre><code>[self.pushNotificationsPopoverController presentPopoverFromBarButtonItem:notificationBarButtonItem permittedArrowDirections:UIPopoverArrowDirectionAny animated:YES];
</code></pre>

<p>Finally, everything works. I've got my slick new red notification button, which responds to touches, and it doesn't even crash my app. Not bad.</p>

<p>It would have been a lot easier if, say, <code>UIBarButtonItem</code> wasn't such a fucking enigma of pain and sublcassed <code>UIView</code> like any other self-respecting member of UIKit, but I digress. </p>

<h2 id="conclusion">Conclusion</h2>

<p>There are historical reasons for using this pattern to create standard icons, and it makes the job of developers easy if the look they're going for fits within the existing interface paradigm (ie: their app looks like it shipped with the user's device). However, for advanced customization, you'll have to break out some advanced techniques to convince <code>UIBarButtonItem</code> to behave. </p></import>

<!-- more -->

