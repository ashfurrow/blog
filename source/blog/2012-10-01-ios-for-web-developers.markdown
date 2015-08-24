---
title: "iOS for Web Developers"
date: 2012-10-01 00:00
---

<p>I was asked by a reader on Twitter to do an article describing Objective-C for web developers. This is a <em>huge</em> topic, so rather than try to teach you everything, I'm going to point out some similarities and differences between writing web apps and writing iOS apps. </p>

<p>This isn't a tutorial, but I'm hoping to clear some common misconceptions web developers I've known have had about iOS development. I'm going to assume some basic knowlege of object-oriented programming.</p>

<p>We're going to be pretending that server-side web technologies don't exist since it will make it explaining the similarities and differences a little easier. This means I'm comparing iOS development to web development that's completely done in Javascript. </p>

<h2 id="thedomanduiview">The DOM and <code>UIView</code>

</h2>

<p>Let's take a minute to review the HTML Document Object Model, or DOM. The following image, courtesy of <a href="http://www.w3schools.com/htmldom/default.asp">W3Schools</a>, represents an example HTML document.</p>

<img src="/img/import/blog/ios-for-web-developers/0592FD6876B24EF5AD3CBF8C64F5F07D.gif" class="img-responsive" />

<p>The DOM is a tree structure with a root node as the document. Elements of the DOM have exactly one parent and zero or more children. The elements represent laid out on a webpage as HTML tags. Elements have attributes, like the <code>href</code> of the <code>&lt;a&gt;</code> tag. These attributes define how the elements appear and behave.</p>

<p>The elements themselves can either be laid out in static HTML, or generated completely by Javascript, or somewhere in between. Often, you'll have lots of static HTML that is modified by Javascript.</p>

<p>Now let's take a look at a simple iOS app example. </p>

<img src="/img/import/blog/ios-for-web-developers/614DEB35A7A54927BFD128009FAC44E5.png" class="img-responsive" />

<p>There isn't a lot going on here, visually, but there <em>is</em> a lot going on behind the scenes. I've labeled the elements with their <em>class name</em> (what kind of element they are). </p>

<p>Certain aspects of the interface, like the status bar, don't belong to <em>our</em> view hierarchy, but are accessible through special interfaces I'll touch on later. You can think of these like the scrolls bars on a web page; you don't <em>create them</em>, but you have <em>access</em> to them so you can modify their appearance.</p>

<p>A simplified diagram of what is going on in the above view is laid out below.</p>

<img src="/img/import/blog/ios-for-web-developers/BA5ECBB142C94ADF90776AA88ACE5B9D.png" class="img-responsive" />

<p>The basics are similar - there is a tree hierarchy, like the HTML DOM. Elements are visisble on the screen, and they have attributes that define how they appear and how they behave. </p>

<p>Notice that not everything visible on the screen is visible in the graph, and there are things in the graph that aren't visible on the screen. As we'll see, views in iOS apps are more complicated than they appear.</p>

<p>Like in web development, views can be created statically or dynamically using code. Files called <code>.xib</code>s and "Storyboards" (sometimes, by old-schoolers, called <code>.nibs</code>) are used to store "freeze dried" interfaces that are thawed and displayed when the user runs your app. This is like serving a bare HTML file to a browser. Developers can choose to construct their views completely in code, as well, which would be the equivalent to having an HTML file with only a <code>&lt;head&gt;</code> and <code>&lt;body&gt;</code> whose DOM is constructed entirely with Javascript. </p>

<p>Each approach has its benefits and its drawbacks. <code>.xib</code>s are easier to approach for beginners, but more complicated interactions and appearance customizations require the use of code anyway. A common approach is, like with web development, use a little bit of each approach. We'll assume that we're using <code>.xib</code>s and take a look at how to change aspects of the view.</p>

<p>But first, I want to touch on positioning. Something that's baffled web developers I've worked with about view layout in iOS is that we have to take very special care about how things are laid out on the screen. There is no "re-flowing" of a view layout when a view resizes (like on orientation change). <em>Everything</em> in the view hierarchy has the equivalent to the CSS <code>position: absolute</code> property.</p>

<p>iOS lets us use things like autoresizing masks and auto layout (new in iOS 6) to define how these objects stretch and slide when the main window changes. Detailing how to use autoresizing masks and auto layout is a topic for another day.</p>

<h2 id="architecture">Architecture</h2>

<p>In web development, we have the concept of pages that a user visits. In iOS, we make heavy use of the <a href="http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller">Model View Controller</a> pattern, and so instead of pages, we display discrete chunks of interface to the user in what are called <em>view controllers</em>.</p>

<p>Typically, each instance of a <code>UIViewController</code> has a root view (what you see on the screen) and one set of files containing Objective-C code. These files come in pairs, an <code>.h</code> file (called the header) and a <code>.m</code> file (called the implementation). These are like the codebehind of an ASP page. </p>

<p>iOS organizes the content displayed to the user in these view controllers. Like pages on the web, we typically think of a view controller as a place for the user to accomplish <em>one task</em> or view <em>one piece of content</em>. </p>

<p>When using a web app, a user can click links to navigate to a new page and click the back button to go to a previous page. This has a very strong analogue in the iOS world we call a navigation stack. It's called a "stack" because viewing new controllers places that controller at the top of the stack, and the user can only see the top controller. The user can tap then back button to return to the controller below it, until they reach the bottom controller, called the root view controller.</p>

<p>In the most common type of iOS app, you'll see a navigation bar at the top of the screen. Tapping on some element (usually a row of a table view) takes you to the <em>next</em> page, just like a link on a web page. Unlike web apps, however, it is <em>expected</em> that the user will tap the back button.  </p>

<p>There is one place where we write code in an iOS application that doesn't have a equivalent in the web world. This is called the application delegate. This app delegate is a singleton, meaning there is only ever exactly one of them in each application. The app delegate is responsible for launching the application and is used to store code that different view controllers all need access to. For example, the setup for a database used by the application lives in the app delegate. </p>

<p>Because it is conventient and easy to put things there, the app delegate often gets bloated. Keep whatever you put there to a minimum. The specifics of the kinds of things that you should put in the app delegate (Core Data storage, In-App Purchase code, and responding to low-memory warnings) is beyond the scope of this article.</p>

<h2 id="outletsandactions">Outlets and Actions</h2>

<p>Elements on the screen have attributes which are accessible in code, like how Javascript can set and read attributes of HTML elements on a page. </p>

<p>In Javascript, elements in the DOM are accessible via <code>getElementsByClassName</code> or <code>getElementByID</code>. In Objective-C, you <em>can</em> access views with a similar approach, but we typically opt to store <em>references</em> to these views as <em>instance variables</em> of a view controller. We access and change the properties of views within our hierarchy by using these instance variables.</p>

<p>In Objective-C, instance variables are declared either in the header or implementation file between brace brackets after the keywork <code>@interface</code> or <code>@implementation</code>, respectively. </p>

<pre><code>@implementation MyViewController : UIViewController
{
    UIButton *myButton;
}
</code></pre>

<p>Here we see an instance variable of a <code>UIButton</code>. However, since we're using <code>.xib</code>s or Storyboards, there's an additional step we need to do in order to access this button. Put the keyboard <code>IBOutlet</code> in front of the instance variable declaration.</p>

<pre><code>@implementation MyViewController : UIViewController
{
    IBOutlet UIButton *myButton;
}
</code></pre>

<p><code>IBOutlet</code> is a slightly anachronistic keyword that was born when a separate program, called Interface Builder, was used to lay out interface files. In the interface file (either the <code>.xib</code> or Storyboard), option-click the view controller in the left pane to get the view controller's list of outlets. Drag from the circle beside <code>myButton</code> onto the button on the view. That's it!</p>

<img src="/img/import/blog/ios-for-web-developers/2CF509714C4D48138550C828114B2A46.png" class="img-responsive" />

<p>That is only half the story. Now that you can access and modify views in your hierarchy, you need to know where to put code to do it. There are two places. </p>

<p>First, <code>UIViewController</code> has several methods that you (may) override in your view controllers. These are called during documented events. This is a lot like attaching methods onto events in Javascript, like whena document has loaded. For example, the method <code>viewDidLoad</code> is called once all the outlets have been set (the interface has been "thawed"), so it's often used to customize their appearance. <code>viewDidAppear:</code> is called when a view has appeared, and so on. Check the <a href="http://developer.apple.com/library/ios/#documentation/uikit/reference/UIViewController_Class/Reference/Reference.html"><code>UIViewController</code> class reference</a> for a list of all of these methods.</p>

<p>For example, the following code would customize the title of the button once the view has been loaded.</p>

<pre><code>-(void)viewDidLoad
{
    [super viewDidLoad];

    [myButton setTitle:@"This is my button title" forState:UIControlStateNormal];
}
</code></pre>

<p>The other place to put code is in methods that respond to user interaction. This is very much like using Javascript to attach methods to events, like <code>onClick</code>. These methods are where the bulk of Objective-C code is written. Methods that are connected to <code>.xib</code>s and Storyboards have to return a specific type: <code>IBAction</code>. We connect these <code>IBAction</code> outlets to controls in the view the same way we connected the button.</p>

<pre><code>-(IBAction)myButtonWasPressed
{
    NSLog(@"My button was pressed!");
}
</code></pre>

<h2 id="conclusion">Conclusion</h2>

<p>So those are the basics. We've covered the similarities and differences of iOS and Web development, where code lives in an iOS project, and how to access members of the view hierarchy. If you have any other suggestions for blog articles, reach out to me on <a href="http://twitter.com/ashfurrow">twitter</a>.</p>

<!-- more -->

