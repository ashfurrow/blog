---
title: "objc_msgSend Is Not Your Bottleneck"
date: 2013-02-04 00:00
---

<import><p>I got a lot of feedback from dot-syntax-haters over my <a href="http://ashfurrow.com/blog/seven-deadly-sins-of-modern-objective-c">Seven Deadly Sins</a> post. They argued that, compared to direct instance variable access, dot syntax – and, implicitly, message-passing – are an order of magnitude slower. </p>

<p>Well, they're right. Not that it matters much.</p>

<p>Under ARC, <code>objc_msgSend</code> takes <em>9 whole cycles</em>. That isn't many cycles. Compared to the 1 cycle it takes to access an instance variable, sure, it's an order of magnitude slower. Fine. But it doesn't matter.</p>

<p><code>objc_msgSend</code> has never been a bottleneck for me. Ever. </p>

<p>I've been trying to structure my code more to use private properties defined in the implementation file, like this.</p>

<pre><code>@interface AFController ()

@property (nonatomic, strong) UILabel *label;

@end

@implementation

-(void)viewDidLoad
{
    self.label = [[UILabel alloc] initWithFrame:CGRectWhatever];
    self.label.backgroundColor = [UIColor clearColor];
    self.label.font = [UIFont systemFontOfSize:17];
    self.label.text = @"Suck it, dot-syntax-haters.";
    [self.view addSubview:self.label];
}

@end
</code></pre>

<p>Now, I could structure this code more efficiently:</p>

<pre><code>-(void)viewDidLoad
{
    _label = [[UILabel alloc] initWithFrame:CGRectWhatever];
    _label.backgroundColor = [UIColor clearColor];
    _label.font = [UIFont systemFontOfSize:17];
    _label.text = @"Suck it, dot-syntax-haters.";
    [self.view addSubview:_label];
}
</code></pre>

<p>I could even do something like this:</p>

<pre><code>-(void)viewDidLoad
{
    UILabel *newLabel = [[UILabel alloc] initWithFrame:CGRectWhatever];
    newLabel.backgroundColor = [UIColor clearColor];
    newLabel.font = [UIFont systemFontOfSize:17];
    newLabel.text = @"Suck it, dot-syntax-haters.";
    [self.view addSubview:newLabel];
    self.label = newLabel;
}
</code></pre>

<p>Either of which would save me about 50 cycles on the CPU.</p>

<p>I could not care less.</p>

<p>And neither should you.</p>

<p>You know how long 50 cycles is? Like, nothing. It's so small you can pretend it doesn't exist.</p>

<p>Using the synthesized instance variable (the one with the <a href="http://stackoverflow.com/questions/719788/property-vs-instance-variable"><code>_</code> prefix</a>) to access a property is not an inherently <em>bad</em> idea, but it can be problematic if you don't use it consistently. On teams with multiple developers, you'll run into that problem quickly. Are you accessing an instance variable? You sure? Is it backing a property? Don't know? Does it matter for this case? Is the property lazily loaded? Hmm?</p>

<p>That's a lot of cognitive overhead. At least with dot syntax, I always know where I stand.</p>

<p>I've never thought to myself "gee, I wish I was consistently accessing these properties with their backing instance variable." I've often thought to myself "shit. I wish I was consistently accessing this property with its synthesized getter."</p>

<p>Generally, I reserve accessing instance variables backing properties only for cases where calling the getter or setter won't work. For example, a lazily-loaded fetched results controller.</p>

<pre><code>-(NSFetchedResultsController *)fetchedResultsController
{
    if (_fetchedResultsController)
    {
        return _fetchedResultsController;
    }

    _fetchedResultsController = ...;

    return _fetchedResultsController;
}
</code></pre>

<p>The balancing act between cost of cycles on the CPU and cost for developers to read code does not have a one-size-fits-all answer. It's up to each team to decide what's more valuable to them and their product.</p>

<p>tl;dr Don't waste time trying to diagnose problems associated with too many calls to <code>objc_msgSend</code>. You almost certainly have bigger performance problems your time would be better spent addressing.</p></import>

<!-- more -->

