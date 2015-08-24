---
title: "Swift Initializers"
date: 2014-06-06 00:00
link_to: swift
---

<p>Swift, Apple's new programming language for iOS and OS X, makes several significant departures from Objective-C. What I found to be particularly interesting are the new semantics surrounding object lifecycles. Here are the key points:</p>

<ul>

<li>Formalizing convenience and designated initializers.</li>

<li>Formalizing sequence of operations for initializers.</li>

<li>Enforcing language-level, compile-time enforcement of these new semantics.</li>

</ul>

<p>I'm going to cover each of these in depth, with examples. Let's dive in!</p>

<h2>Initializers In-Depth</h2>

<p>In Objective-C, things are pretty loosey-goosey when it comes to how you construct your initializers. For instance, you <em>could</em> call <code>super</code>, or not, or call init on an entirely different class. You can set up ivars and properties before you init, even though you're not supposed to, and while you're actually not supposed to access methods or properties inside any init method, everybody does. It's really the wild west. </p>

<p>That's not the case in Swift. Swift has a very clear, specific sequence of operations that are done in initializers. Let's start with some basic examples are work our way up to a general case. </p>

<p>Let's take an object A. We'll define it as follows. </p>

<pre><code>class A {
    var x: Int
    init(x: Int) {
        self.x = x
    }
}
</code></pre>

<p>Notice that A does <em>not</em> have a superclass, so it cannot call a <code>super.init()</code> function as it does not exist. </p>

<p>OK, so now let's subclass A with a new class named B. </p>

<pre><code>class B: A {
    var y: Int
    init(x: Int, y: Int) {
        self.y = y
        super.init(x: x)
    }
}
</code></pre>

<p>This is a departure from Objective-C where <code>[super init]</code> would typically be called <em>first</em> before anything else. Not so in Swift. You are responsible for ensuring that <em>your</em> instance variables are in a consistent state before you do <em>anything else</em>, including calling methods (which includes your superclass' initializer). Neato. </p>

<p>But there's one more hitch. Say that we want to make sure that <code>x</code> is always set to a value computed by a method in our class? We can't call a method on B until we call super's init. We'd actually write something like this. </p>

<pre><code>class B: A {
    var y: Int
    init(x: Int, y: Int) {
        self.y = y
        super.init(x: x)
        self.x = self.generate()
    }

    func generate() -&gt; Int {
        /* return some value */
    }
}
</code></pre>

<p>That's right. If you want to access a superclass' property,you <em>must</em> do so <em>after</em> calling <code>super.init()</code> in order to give the superclass a chance to set them first. </p>

<p>In general, a Swift object initializer looks like the following:</p>

<pre><code>init(/*parameters*/) {
    // set own properties, if necessary
    // call super.init()
    // set superclass' properties, if necessary
}
</code></pre>

<h2>Convenience and Designated Initializers</h2>

<p>Swift formalizes the common Objective-C pattern of designated initializers into something checked at compile-time. This is actually really, really cool. Let's take a look at a new class hierarchy. </p>

<pre><code>class A {
    var x: Int
    convenience init() {
        self.init(x: 0)
    }
    init(x: Int) {
        self.x = x
    }
}
</code></pre>

<p><code>init(x: Int)</code> is the designated initializer for this class and all other initializers in A <em>must</em> have the <code>convenience</code>. Convenience initializers can call other convenience initializers, or the designated initializer. </p>

<p>Let's take a look at a subclass. This is where things get interesting.</p>

<pre><code>class B: A {
    var y: Int
    convenience init() {
        self.init(y: 0)
    }
    convenience init(y: Int) {
        self.init(x: 0, y: y)
    }
    init(x: Int, y: Int) {
        self.y = y
        super.init(x: x)
    }
}
</code></pre>

<p>Convenience initializers in a subclass may <em>only</em> call other initializers in <em>their own class</em>. Only the designated initializer may call an initializer on the superclass.</p>

<h2>Missing Objective-C-Style Semantics</h2>

<p>Swift departs from Objective-C initializers. Consider the old style initializer. </p>

<pre><code>-(instancetype)init {
    self = [super init];
    if (self) {
        // setup
    }
    return self;
}
</code></pre>

<p>There are a few distinctive parts to a classic Objective-C initializer. First, you need to assign <code>self</code> to something, either your superclass' initializer or another initializer on <code>self</code>. Then we check if the reference to <code>self</code> is valid (maybe the initializer that <em>we</em> called returned <code>nil</code>). We do some setup, then we must return <code>self</code>. </p>

<p>In contrast, Swift initializers are very straightforward. Initializers don't return <code>self</code>, so you don't need to return <code>self</code>. Cool! However, this has a implication. In Objective-C, if initialization fails, we can return <code>nil</code> in order to indicate that failure. Since Swift initializers don't return a reference to <code>self</code>, this approach is not possible. </p>

<p>I spoke with an Apple engineer at the Swift Lab at WWDC and asked about the pattern. He indicated that this was not currently possible. Instead, we should use factory methods that return an <em>optional</em> type. </p>

<pre><code>class A {
    class func anything() -&gt; A? {
        return A()
    }
}
</code></pre>

<p>He indicated that they're working on building something into the language, since initializers are the preferred way to create instances (as opposed to factory class methods). For now, this works well if you need this kind of failing initializer pattern.</p>

<p>Neat! Swift has really embraced the conventions that Cocoa and CocoaTouch developers already know and incorporated them into the language-level with compile-time checks. </p>

<!-- more -->

