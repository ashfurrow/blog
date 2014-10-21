---
title: "Unit Testing with Core Data Models"
date: 2014-01-05 00:00
---

<import><p>I've been experimenting with <a href="https://github.com/ReactiveCocoa/ReactiveViewModel#model-view-viewmodel">Model-View-ViewModel</a> lately; one of the benefits of using MVVM is that your code becomes more testable. In a nutshell, you take all of the presentation logic in view controllers, which are infamously hard to unit test, and put them in a <em>view model</em> that is easy to unit test. Then you can test that logic. </p>

<p>Great. </p>

<p>But the thing is that the view model also has a reference to your model object, which contains all your data. Because I'm something of a wimp, I like to use Core Data for my persistence layer. Core Data is, famously, unit tested by Apple (See: <a href="https://developer.apple.com/library/mac/documentation/cocoa/conceptual/coredata/articles/cdTechnologyOverview.html">Why should you use Core data</a>). So as long as you don't put business logic in your model objects, you don't have to test them because, ostensibly, Apple already has. </p>

<p>Here's the thing. Ever looked in a <code>.m</code> file of a managed object and see all those <code>@dynamic</code> directives? They're there because Core Data actually adds getters and setters for your properties at runtime, not at compile time. This matters because you <a href="http://stackoverflow.com/questions/1876568/ocmock-with-core-data-dynamic-properties-problem">can't mock Core Data models</a>. I was raised in .Net land where mocking is the <em>de facto</em> unit testing approach, so I looked for alternatives. </p>

<p>There are two options. First, you can create a protocol that has all of your model's properties defined. Then, make your <code>NSManagedObject</code> subclass conform to that protocol. Core Data will still add those properties at runtime because of the <code>@dynamic</code> directives. Next, create a new model object – just for testing – that conforms to that same protocol and <code>@synthesize</code>s all of the protocols properties. </p>
<img src="/img/import/blog/unit-testing-with-core-data-models/010D82037DB646D8B46A97F8692BAB16.png" class="img-responsive"><p>Not <em>terrible</em>, but it's messy just for the sake of getting managed object mocks to work. I don't like having two code paths for testing and the actual runtime – it defeats the purpose of unit testing in the first place. </p>

<p>The other option is to create an entire Core Data stack just for testing, and reset it frequently. This is the approach I took on a <a href="http://ashfurrow.com/blog/c-41">recent project</a> and I quite like the results. </p>

<pre><code>static ASHRecipe *recipe;

beforeEach(^{
    NSManagedObjectContext *context = [[ASHCoreDataStack defaultStack] managedObjectContext];
    [context reset];

    recipe = setupRecipe(context);
});
</code></pre>

<p><code>ASHCoreDataStack</code> is a singleton where all the Core Data logic goes, so it can be used by the test suite and the app. The <code>reset</code> ensures that each test has a fresh context, and <code>setupRecipe</code> creates a new instance of <code>ASHRecipe</code> that can be used by the tests. </p>

<p>Now, instead of mocking <code>NSManagedObject</code>s, I can use them themselves and rely on the data they contain. A weakness of this approach is that relies on the data in the model instead of mocks, so if your tests just happen to pass because of that data, you might be getting false positives. </p>

<p>I'm still completing the tests for this project, so I'm open to suggestions on how to improve the tests. Feel free to open an issue or pull request on the <a href="https://github.com/AshFurrow/C-41">GitHub project page</a>. </p></import>

<!-- more -->

