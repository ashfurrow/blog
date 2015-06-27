---
title: "Structuring Modern Objective-C"
date: 2014-01-20 00:00
link_to: swift
---

<import><p>When learning a new skill, like a programming language, we often just mash together whatever works in order to get it running. Later, we'll return to these habits and re-evaluate, adopting best practices from the community and making better, more well-structured code. </p>

<p>Lately, the Objective-C language has received a plethora of new features, but the community's best practices hasn't consistently stayed up to date. This goes beyond just "style" and into "structure". </p>

<p>Lately, I've taken a critical look at my own coding practices to evaluate where I can do better, so I thought I'd share my findings with you. </p>

<p>Welcome to modern Objective-C. </p>

<h2 id="accessinginstancevariables">Accessing Instance Variables</h2>

<p>Instance variables. Where to begin. Basically, instance variables are bad. If you're currently doing this:</p>

<pre><code>@interface MyClass : NSObject {
    BOOL someVariable;
}

@end
</code></pre>

<p>Stop. Right now. </p>

<p>Don't declare instance variables and <em>please</em> don't declare them in headers. Instead, you should be declaring them as <em>properties</em>, and then <em>accessing</em> them through message-passing or dot syntax. </p>

<p>I've <a href="http://ashfurrow.com/blog/objcmsgsend-is-not-your-bottleneck">covered before</a> how accessing properties through instance variables doesn't give you any discernible benefits. In fact, accessing them through getters/setters has a few advantages. </p>

<ul>
<li>Consistency: you no longer have to guess if a getter/setter's side-effects, if any, are going to be invoked because they always will be.</li>
<li>Debugging: you're able to easily set breakpoints on getters/setters instead of making watchpoints on instance variable addresses at runtime.</li>
</ul>

<p>Really, there is no reason to declare instance variables or access those variables backing properties directly, except in an overridden getter/setter itself, and the <a href="https://github.com/NYTimes/objective-c-style-guide/issues/6">initializer/dealloc method</a>, depending on how defensive you want to be (Thanks to <a href="https://twitter.com/irace">Bryan</a> for the link). Except habit, which you should break, as I did. </p>

<p><em>Update</em>: I found a link to an <a href="https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/MemoryMgmt/Articles/mmPractical.html#//apple_ref/doc/uid/TP40004447-SW6">official document</a> suggestion that you should <em>not</em> use setters/getters in dealloc. The more you know. </p>

<p>What about readonly properties? Don't you need to access the instance variable because the setter doesn't exist? Good question. That leads me to my next point. </p>

<h2 id="usereadonlypropertiesinheaders">Use Read-only Properties in Headers</h2>

<p>Read-only properties are great for exposing properties or components in your public interface, but how does one set their value without accessing the instance variable directly? The answer is to define a private class extension in your .m file. </p>

<p>In your header, you'd declare the following. </p>

<pre><code>@interface MyClass : NSObject

@property (nonatomic, readonly) Type propertyName;

@end
</code></pre>

<p>Then, in your implementation file, <em>above</em> the implementation itself, declare the following:</p>

<pre><code>@interface MyClass ()

// Private Access
@property (nonatomic, strong, readwrite) Type propertyName;

@end
</code></pre>

<p>You've just defined a <em>public</em> getter but a <em>private</em> setter. Congrats! Now you no longer need to access the instance variable. </p>

<p>Schwa adds one more suggestion:</p>
<blockquote class="twitter-tweet">
<p><a href="https://twitter.com/ashfurrow">@ashfurrow</a> re: “Use Read-only Properties in Headers”. I’d also add do not expose mutable objects in headers too.

Good article btw.</p>— Jonathan Wight (@schwa) <a href="https://twitter.com/schwa/statuses/426760500056047616">January 24, 2014</a>
</blockquote>
<script async="" src="//platform.twitter.com/widgets.js" charset="utf-8"></script><h2 id="properlydefineboolproperties">Properly Define <code>BOOL</code> properties</h2>
<p>It's always been a good idea to follow <a href="https://developer.apple.com/library/ios/documentation/Cocoa/Conceptual/CodingGuidelines/Articles/NamingMethods.html#//apple_ref/doc/uid/20001282-1004202-BCIGGFCC">Apple's Guidelines</a> when declaring properties. But I admit I haven't always been diligent. Remember that when declaring <code>BOOL</code> properties to define a custom getter. </p>
<pre><code>@property (nonatomic, assign, getter = isSomething) BOOL something;
</code></pre>
<h2 id="dontimportinheaderfilesunnecessarily">Don't <code>#import</code> in Header Files Unnecessarily</h2>
<p>I see this a lot in code written by Objective-C newcomers. Basically, the crux of it is that most <code>#import</code> statements should only be written in <code>.m</code> files, not <code>.h</code> headers. </p>
<p>Consider the following example. </p>
<pre><code>#import "MyOtherClass.h"

@interface MyClass : NSObject

@property (nonatomic, strong) MyOtherClass property;

@end
</code></pre>
<p>You can re-write this to be the following, then <code>#import</code> the <code>MyOtherClass.h</code> header in your <code>MyClass.m</code> implementation file. </p>
<pre><code>@class MyOtherClass;

@interface MyClass : NSObject

@property (nonatomic, strong) MyOtherClass property;

@end
</code></pre>
<p>The <code>@class MyOtherClass</code> is a <em>forward class declaration</em>. </p>
<p>The <a href="http://qualitycoding.org/file-dependencies/">benefits</a> are numerous. Forward class declarations in lieu of <code>#import</code>ing headers will lead to faster compile times, will avoid circular <code>#import</code> statements, and will keep your headers lightweight, the way they were meant to be. </p>
<p>The one real exception is when subclassing another custom class, you'll need to <code>#import</code> its header. </p>
<p>Now, let's talk about the elephant in the room. You <em>do not</em> need to <code>#import</code> either Foundation or UIKit headers in your header, almost ever. That's right – the template classes that Apple includes in Xcode are <em>wrong</em>. </p>
<p>I first picked this tip up from <a href="https://github.com/lemurs/guide2/blob/master/ObjCStyle.md">Mike Lee</a>. Take a read on his style guide. It's great. </p>
<p>If we take a look in the precompiled header (named <code>AppName-Prefix.pch</code>), what will be find? </p>
<pre><code>#import &lt;UIKit/UIKit.h&gt;
#import &lt;Foundation/Foundation.h&gt;
</code></pre>
<p>A-ha! They're already <em>de facto</em> <code>#import</code>ed by default, anyway, so there is no need to <code>#import</code> them a second time. </p>
<p>Unless you're writing a framework or other third-party component, most <code>#import</code>s in header files are just unnecessary. </p>
<p><em>Update</em>: Steve Streza points out that the precompiled header really isn't <a href="http://clang.llvm.org/docs/PCHInternals.html">meant</a> to be used like this. I'm not sure I completely agree, but wanted to let you all make an informed decision. </p>
<blockquote class="twitter-tweet">
<p><a href="https://twitter.com/ashfurrow">@ashfurrow</a> pch files are optimizations. Projects should build without them. So leave Foundation import in if your code depends on them.</p>— Derpy Streza (@SteveStreza) <a href="https://twitter.com/SteveStreza/statuses/425430707419103232">January 21, 2014</a>
</blockquote>
<script async="" src="//platform.twitter.com/widgets.js" charset="utf-8"></script><h2 id="groupingimportstatements">Grouping <code>#import</code> statements</h2>

<p>Here's one we've all done from time-to-time. How often have you written a (probably) long implementation file only to have ten or twenty randomly-ordered <code>#import</code> statements at the top of your file? Tsk-tsk-tsk. That's ok! We're here to help. </p>

<p>Whether or not the order of the <code>#import</code>s matter is up for debate, so I won't touch on that. What matters is that you <em>group</em> them. And <em>comment</em> those groups. </p>

<pre><code>// Frameworks
#import &lt;QuartzCore data-preserve-html-node="true"/QuartzCore.h&gt;

// Views
#import "ASHButton.h"
#import "ASHUserView.h"

// View Controllers
#import "ASHOtherViewController.h"
#import "ASHThisViewController.h"
</code></pre>

<p>Don't wait until it's already a mess to fix it – start right away! Then, adding them later is a breeze and it keeps your code clean. </p>

<h2 id="dontusedefineforconstants">Don't use <code>#define</code> for Constants</h2>

<p>Here's one I expect to get some blowback on. The thing with constants is that they're, well, <em>constant</em>. Constant in name and constant in value. When you <code>#define</code> a constant, it's defined in every other file the compiler looks at until (if) it's <code>#undef</code>'d. Yikes! That's not constant at all, and, like, global variable type stuff. </p>

<p>Avoid it. </p>

<p>Instead, <em>declare</em> constants in headers as <code>extern</code> variables which are defined in the corresponding implementation file. </p>

<p>In the header:</p>

<pre><code>extern const CGFloat ASHHeaderViewHeight;
</code></pre>

<p>Then, in the implementation, </p>

<pre><code>const CGFloat ASHHeaderViewHeight = 44.0f;
</code></pre>

<p>Now your constant is visible to anyone who wants it (who <code>#import</code>s the header), but isn't visible to the rest of the app. It also can't be <code>#undef</code>'d and re-defined later (a definite code smell). </p>

<p>Note: <a href="http://twitter.com/italoarmstrong">Michael</a> points out that we should technically be using <a href="http://stackoverflow.com/questions/10953221/foundation-export-vs-extern"><code>FOUNDATION_EXPORT</code></a> instead of <code>extern</code>. </p>

<h2 id="properlynameconstants">Properly Name Constants</h2>

<p>I don't care whether you prefix your constants with 'k' or a class name, or just a prefix, but <em>do</em> be consistent. And descriptive. Otherwise, you'll run into naming conflicts when your codebase grows. Trust me on this one. </p></import>

<!-- more -->

