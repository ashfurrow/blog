---
title: "Your First Objective-C Unit Test with OCMock"
date: 2013-01-04 00:00
---

<p>I've been making a lot of noise about unit testing in Objective-C lately, so I thought I'd put my money where my mouth is and write a primer. This tutorial is going to take you through, step-by-step, how to write your first unit test.</p>

<p>I'm going to be writing tests for an open source 500px iOS SDK I wrote for the company. You can follow along by <a href="https://github.com/AshFurrow/500px-iOS-api/tree/before-unit-tests">downloading a tag of the repo I made before writing unit tests</a>. It only has integration tests right now, which we'll turn off. Open the <code>PXAPI</code> project, click "PXAPI" in the project bar to the right of the run/stop buttons, and click "Edit Scheme". Select "Test" in the left hand pane and deselect each individual test (but not the top-level "Tests").</p>

<img src="/img/import/blog/your-first-objective-c-unit-test/14DAD99F83FE46A5AD96B86CA5D2230B.png" class="img-responsive" />

<p>We'll add the <a href="http://ocmock.org">OCMock</a> mock object toolkit. Follow their documentation to install it. </p>

<p>Let's write some tests for <code>PXRequest</code>. </p>

<p>The first thing you need to do when writing unit tests for network code is make a private instance method in the class you're testing that will create all of your <code>NSURLConnection</code> objects. This is how we will replace real url connection objects with our own, stubbed versions. </p>

<p>The old code looked like this:</p>

<pre><code>#pragma mark - Public Instance Methods

-(void)start
{
    if (self.requestStatus != PXRequestStatusNotStarted)
    {
        NSLog(@"Attempt to start existing request. Ignoring.");
    }

    _requestStatus = PXRequestStatusStarted;

    connectionMutableData = [NSMutableData data];

    urlConnection = [[NSURLConnection alloc] initWithRequest:self.urlRequest 
                                                    delegate:self];
    [urlConnection scheduleInRunLoop:[NSRunLoop mainRunLoop] 
                             forMode:NSDefaultRunLoopMode];

    [urlConnection start];

    [PXRequest addRequestToInProgressMutableSet:self];
}
</code></pre>

<p>Let's change it to look like this, instead.</p>

<pre><code>#pragma mark - Private Instance Methods

-(NSURLConnection *)urlConnectionForURLRequest:(NSURLRequest *)request
{
    return [[NSURLConnection alloc] initWithRequest:request delegate:self];
}

#pragma mark - Public Instance Methods

-(void)start
{
    if (self.requestStatus != PXRequestStatusNotStarted)
    {
        NSLog(@"Attempt to start existing request. Ignoring.");
    }

    _requestStatus = PXRequestStatusStarted;

    connectionMutableData = [NSMutableData data];

    urlConnection = [self urlConnectionForURLRequest:self.urlRequest];
    [urlConnection scheduleInRunLoop:[NSRunLoop mainRunLoop] 
                             forMode:NSDefaultRunLoopMode];

    [urlConnection start];

    [PXRequest addRequestToInProgressMutableSet:self];
}
</code></pre>

<p>Notice how we call an instance method in order to generate a url connection. We're going to generate a partial mock instance that will return a different value. </p>

<p>Create a <code>SenTestCase</code> class to test the <code>PXRequest</code> class. In the implementation file, we need to tell the compiler that there is a method named <code>urlConnectionForRequest:</code>.</p>

<pre><code>#import "PXRequest.h"
#import "OCMock.h"
#import "PXPXRequestTests.h"

@interface PXRequest (UnitTestAdditions)

-(NSURLConnection *)urlConnectionForURLRequest:(NSURLRequest *)request;
-(id)initWithURLRequest:(NSURLRequest *)urlRequest completion:(PXRequestCompletionBlock)completion

@end

@implementation PXPXRequestTests

@end
</code></pre>

<p>We're adding the custom, private initializer <code>initWithURLRequest:completion:</code> because we only want to test the <code>PXRequest</code> class. The class methods to create ’PXRequest’s are all contained in another file. We'll test those separately, later.</p>

<p>Great. Let's write our first test. This will make sure that the <code>start</code> method starts the URL connection instance. </p>

<pre><code>-(void)testURLConnectionStart
{
    NSURLRequest *dummyURLRequest = [NSURLRequest requestWithURL:
        [NSURL URLWithString:@"http://example.com"]];
    PXRequest *requestUnderTest = [[PXRequest alloc] initWithURLRequest:dummyURLRequest completion:nil];

    id mockConnection = [OCMockObject niceMockForClass:[NSURLConnection class]];
    [[mockConnection expect] start];

    id partialRequestMock = (PXRequest *)[OCMockObject 
                                partialMockForObject:requestUnderTest];
    [[[partialRequestMock stub] andReturn:mockConnection] 
        urlConnectionForURLRequest:OCMOCK_ANY];

    [partialRequestMock start];

    [mockConnection verify];
}
</code></pre>

<p>I'm going to go through this example one line at a time. </p>

<p>First, in order to create an instance of <code>PXRequest</code>, we'll need some URL request. We'll just create a dummy one.</p>

<pre><code>NSURLRequest *dummyURLRequest = [NSURLRequest requestWithURL:[NSURL URLWithString:@"http://example.com"]];
</code></pre>

<p>Now we need to create an object to test. </p>

<pre><code>PXRequest *requestUnderTest = [[PXRequest alloc] initWithURLRequest:dummyURLRequest completion:nil];
</code></pre>

<p>Everything until now has been standard Objective-C and you should be comfortable with it. The next line gets a little tricky.</p>

<pre><code>id mockConnection = [OCMockObject niceMockForClass:[NSURLConnection class]];
    [[mockConnection expect] start];
</code></pre>

<p>What we've done is create a mock connection. It mocks <code>NSURLConnection</code>. We're going to tell it to expect the <code>start</code> method to be called. We're making it a "nice" mock so that other methods can be invoked on it, too. You can use the <code>mockForClass:</code> instead, if you want stricter tests.</p>

<p>So now we have a mock <code>NSURLConnection</code> instance that expects <code>start</code> to be called on it. We need some way to "give" this mock object to our <code>requestUnderTest</code>. We're going to do that using a partial mock. This is a special kind of mock object. We can stub out methods that will be called and replace them with our own return values. Any methods we don't stub out will be passed onto the original instance.</p>

<p>We're going to stub the <code>urlConnectionForURLRequest:</code> method.</p>

<pre><code>id partialRequestMock = (PXRequest *)[OCMockObject partialMockForObject:requestUnderTest];
[[[partialRequestMock stub] andReturn:mockConnection] urlConnectionForURLRequest:OCMOCK_ANY];
</code></pre>

<p>We're telling the partial mock that when <code>urlConnectionForURLRequest:</code> is called with any parameter, return <code>mockConnection</code>.</p>

<p>You should read the code from the start, then after "stub", from the back: "stub ’urlConnectionForURLRequest:’and return ’mockConnection’."</p>

<p>Now lets run the test. </p>

<pre><code>[partialRequestMock start];
</code></pre>

<p>This is the method we want to test. It will call <code>urlConnectionForURLRequest:</code>, which we've replaced with our own implementation. Now we want to make sure that calling this method actually called <code>start</code> on the connection. That's what the last line is for.</p>

<pre><code>[mockConnection verify];
</code></pre>

<p>Calling this method verifies that all the expected methods have been called. If they haven't, your test will fail here.</p>

<p>Let's do another test. This time, let's test to make sure our completion block is invoked when there is a failure. First, we need to make sure that the <code>connection:didReceiveResponse:</code> method only calls <code>statusCode</code> on the url response once, since we OCMock only handles each <code>expect</code> call once. </p>

<p>That refactoring is very minor. Onto the test!</p>

<pre><code>-(void)testCompletionBlockIsCalledOnConnectionFailure
{
    __block BOOL completionBlockInvoked = NO;

    NSURLRequest *dummyURLRequest = [NSURLRequest requestWithURL:
        [NSURL URLWithString:@"http://example.com"]];
    PXRequest *requestUnderTest = [[PXRequest alloc] 
        initWithURLRequest:dummyURLRequest 
                completion:^(NSDictionary *results, NSError *error) {

        completionBlockInvoked = YES;

        STAssertNotNil(error, @"Completion block should have error on connection failure, but doesn't.");
        STAssertNil(results, @"Completion block should not have results for failed connection.");
    }];

    id mockConnection = [OCMockObject niceMockForClass:[NSURLConnection class]];
    [[mockConnection expect] start];
    [[mockConnection expect] cancel];

    id partialRequestMock = (PXRequest *)[OCMockObject 
        partialMockForObject:requestUnderTest];
    [[[partialRequestMock stub] andReturn:mockConnection] 
        urlConnectionForURLRequest:OCMOCK_ANY];

    id mockResponse = [OCMockObject mockForClass:[NSHTTPURLResponse class]];
    [[[mockResponse expect] andReturnValue:@(404)] statusCode];

    [partialRequestMock start];
    [partialRequestMock connection:mockConnection didReceiveResponse:mockResponse];

    [mockConnection verify];
    STAssertTrue(completionBlockInvoked, @"Completion block was not invoked when connection failed.");
}
</code></pre>

<p>First, we declared a <code>__block</code> variable to record if the completion block is invoked at all. In the completion block, we assert that the arguments to the block are what we expect. Arguably, this could go in its own test depending on how granular you want to test. </p>

<p>Next, we create a mock connection, just like last time, except now we tell it to also expect a call to <code>cancel</code>.</p>

<p>In addition to calling <code>start</code>, we're also going to manually invoke the <code>NSURLConnectionDataDelegate</code> method <code>connection:didReceiveResponse:</code>. This means we'll need a response to pass in as the second parameter. That's where the <code>mockResponse</code> object comes in. We'll create a mock <code>NSHTTPURLResponse</code> that returns 404 when ask for its status code. This is how we will simulate the connection failure. </p>

<p>That's it! That's a basic primer on how to begin unit testing your network code. There is a lot more subtlety to unit testing and I would suggest you check out the <a href="http://ocmock.org">OCMock Documentation</a>.</p>

<style>
.header, .content-wrapper
{
  max-width: 780px;
}
.collection-type-blog.view-item article .post
{
width: 720px;
}
</style>

<!-- more -->

