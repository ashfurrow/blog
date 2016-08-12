---
title: "Your First Objective-C Unit Test with OCMock"
date: 2013-01-04 00:00
---

I've been making a lot of noise about unit testing in Objective-C lately, so I thought I'd put my money where my mouth is and write a primer. This tutorial is going to take you through, step-by-step, how to write your first unit test.

I'm going to be writing tests for an open source 500px iOS SDK I wrote for the company. You can follow along by [downloading a tag of the repo I made before writing unit tests](https://github.com/AshFurrow/500px-iOS-api/tree/before-unit-tests). It only has integration tests right now, which we'll turn off. Open the `PXAPI` project, click "PXAPI" in the project bar to the right of the run/stop buttons, and click "Edit Scheme". Select "Test" in the left hand pane and deselect each individual test (but not the top-level "Tests").

 ![](/img/import/blog/your-first-objective-c-unit-test/14DAD99F83FE46A5AD96B86CA5D2230B.png)

We'll add the [OCMock](http://ocmock.org) mock object toolkit. Follow their documentation to install it.

Let's write some tests for `PXRequest`.

The first thing you need to do when writing unit tests for network code is make a private instance method in the class you're testing that will create all of your `NSURLConnection` objects. This is how we will replace real url connection objects with our own, stubbed versions.

The old code looked like this:

```
#pragma mark - Public Instance Methods

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
```

Let's change it to look like this, instead.

```
#pragma mark - Private Instance Methods

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
```

Notice how we call an instance method in order to generate a url connection. We're going to generate a partial mock instance that will return a different value.

Create a `SenTestCase` class to test the `PXRequest` class. In the implementation file, we need to tell the compiler that there is a method named `urlConnectionForRequest:`.

```
#import "PXRequest.h"
#import "OCMock.h"
#import "PXPXRequestTests.h"

@interface PXRequest (UnitTestAdditions)

-(NSURLConnection *)urlConnectionForURLRequest:(NSURLRequest *)request;
-(id)initWithURLRequest:(NSURLRequest *)urlRequest completion:(PXRequestCompletionBlock)completion

@end

@implementation PXPXRequestTests

@end
```

We're adding the custom, private initializer `initWithURLRequest:completion:` because we only want to test the `PXRequest` class. The class methods to create ’PXRequest’s are all contained in another file. We'll test those separately, later.

Great. Let's write our first test. This will make sure that the `start` method starts the URL connection instance.

```
-(void)testURLConnectionStart
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
```

I'm going to go through this example one line at a time.

First, in order to create an instance of `PXRequest`, we'll need some URL request. We'll just create a dummy one.

```
NSURLRequest *dummyURLRequest = [NSURLRequest requestWithURL:[NSURL URLWithString:@"http://example.com"]];
```

Now we need to create an object to test.

```
PXRequest *requestUnderTest = [[PXRequest alloc] initWithURLRequest:dummyURLRequest completion:nil];
```

Everything until now has been standard Objective-C and you should be comfortable with it. The next line gets a little tricky.

```
id mockConnection = [OCMockObject niceMockForClass:[NSURLConnection class]];
    [[mockConnection expect] start];
```

What we've done is create a mock connection. It mocks `NSURLConnection`. We're going to tell it to expect the `start` method to be called. We're making it a "nice" mock so that other methods can be invoked on it, too. You can use the `mockForClass:` instead, if you want stricter tests.

So now we have a mock `NSURLConnection` instance that expects `start` to be called on it. We need some way to "give" this mock object to our `requestUnderTest`. We're going to do that using a partial mock. This is a special kind of mock object. We can stub out methods that will be called and replace them with our own return values. Any methods we don't stub out will be passed onto the original instance.

We're going to stub the `urlConnectionForURLRequest:` method.

```
id partialRequestMock = (PXRequest *)[OCMockObject partialMockForObject:requestUnderTest];
[[[partialRequestMock stub] andReturn:mockConnection] urlConnectionForURLRequest:OCMOCK_ANY];
```

We're telling the partial mock that when `urlConnectionForURLRequest:` is called with any parameter, return `mockConnection`.

You should read the code from the start, then after "stub", from the back: "stub ’urlConnectionForURLRequest:’and return ’mockConnection’."

Now lets run the test.

```
[partialRequestMock start];
```

This is the method we want to test. It will call `urlConnectionForURLRequest:`, which we've replaced with our own implementation. Now we want to make sure that calling this method actually called `start` on the connection. That's what the last line is for.

```
[mockConnection verify];
```

Calling this method verifies that all the expected methods have been called. If they haven't, your test will fail here.

Let's do another test. This time, let's test to make sure our completion block is invoked when there is a failure. First, we need to make sure that the `connection:didReceiveResponse:` method only calls `statusCode` on the url response once, since we OCMock only handles each `expect` call once.

That refactoring is very minor. Onto the test!

```
-(void)testCompletionBlockIsCalledOnConnectionFailure
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
```

First, we declared a `__block` variable to record if the completion block is invoked at all. In the completion block, we assert that the arguments to the block are what we expect. Arguably, this could go in its own test depending on how granular you want to test.

Next, we create a mock connection, just like last time, except now we tell it to also expect a call to `cancel`.

In addition to calling `start`, we're also going to manually invoke the `NSURLConnectionDataDelegate` method `connection:didReceiveResponse:`. This means we'll need a response to pass in as the second parameter. That's where the `mockResponse` object comes in. We'll create a mock `NSHTTPURLResponse` that returns 404 when ask for its status code. This is how we will simulate the connection failure.

That's it! That's a basic primer on how to begin unit testing your network code. There is a lot more subtlety to unit testing and I would suggest you check out the [OCMock Documentation](http://ocmock.org).

<style>
.header, .content-wrapper
{
  max-width: 780px;
}
.collection-type-blog.view-item article .post
{
width: 720px;
}
</style>(READMORE)
