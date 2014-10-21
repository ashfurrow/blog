---
title: "Default Initializer Style"
date: 2013-01-25 00:00
---

<import><p>I just created a new class, subclassing <code>UITableViewCell</code>, and this is the initializer Xcode gave me:</p>

<pre><code>- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
        // Initialization code
    }
    return self;
}
</code></pre>

<p>Garbage. Never mind the fact that the brace bracket style isn't even consistent, but you're adding an entire level of indentation for nothing!</p>

<pre><code>- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    if (!(self = [super initWithStyle:style reuseIdentifier:reuseIdentifier])) return nil;

    // Initialization code

    return self;
}
</code></pre>

<p>Holy balls that's better. </p>

<p>Am I crazy here? Or am I just the last sane developer left?</p></import>

<!-- more -->

