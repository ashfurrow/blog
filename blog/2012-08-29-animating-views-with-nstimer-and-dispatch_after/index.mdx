---
title: Animating Views with NSTimer and dispatch_after
date: 2012-08-29
---


I wrote a component today that animates a small widget between a certain number of states every 4 seconds, with each state having a small pause following the transition.

There are a few different ways to approach this problem, and I chose a method that's a little unconventional with a small downside, which I'll discuss.

When I want to kick off a round of animation, I call the `animate` method; setting up an `NSTimer` to do this is easy:

```
[NSTimer scheduledTimerWithTimeInterval:4 target:self selector:@selector(animate) userInfo:nil repeats:YES];
```

I use `NSTimer` because we're repeating this _every_ 4 seconds; it's the standard approach to solve this sort of problem.

The second problem, kicking off a series of state transitions with a small delay between each one, is a little weirder. In the past, you would be forced to either use `performSelector:withObject:afterDelay:` or another `NSTimer`, which is thrown away after the last transition. However, this is modern Objective-C and we have a new option: `dispatch_after`.

```
-(void)animate
{
    const NSTimeInterval intervalBetweenSteps = 0.1f;

    __weak PXWidget *blockWidget = self.widget;

    for (PXWidgetState state = 0; state < PXWidgetNumberOfStates; state++)
    {
        double delayInSeconds = intervalBetweenSteps * state;
        dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, delayInSeconds * NSEC_PER_SEC);
        dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
            blockWidget.animationState = state;
        });
    }
}
```

This may seem a little peculiar, especially if you haven't used `dispatch_after` before. Essentially, what it does is take a parameter representing a time interval, a Grand Central Dispatch queue, and a block object to be executed after that time interval has passed. The block is enqueued onto the GCD queue, but it isn't dequeued right away, as usual. Instead, GCD waits for the time interval to pass before dequeuing and executing the block.

What we're doing here is dispatching a series of blocks onto the main queue with intervals ranging from 0 to the time interval multiplied by the number of state transitions. We take care of creating each block object upfront and we don't worry about dealing with them later.

Another option, a colleague pointed out, is spinning up your own thread, executing a state transition, and then `sleep`ing for the pause. This would also work, but `sleep` is uncommon in Objective-C.

A drawback with this approach is that, like all GCD dispatching, you can't cancel the operation (if, say, the view controller this method belonged to was dismissed). We also incur a tiny memory deficit that each block object occupies before it is executed. However, since the number of state transitions is relatively small, neither of these problems is significant. We use a `__weak` variable to avoid having the blocks make a strong reference to the widget.

Here we see two common methods for delaying the execution of some code in Objective-C. One is used for recurring invocations of a method, and the other is used for small delays of a fixed number of blocks to be executed.


  