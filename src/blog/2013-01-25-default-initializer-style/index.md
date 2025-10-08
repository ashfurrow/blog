---
title: Default Initializer Style
date: 2013-01-25
---

I just created a new class, subclassing `UITableViewCell`, and this is the initializer Xcode gave me:

```
- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if (self) {
        // Initialization code
    }
    return self;
}
```

Garbage. Never mind the fact that the brace bracket style isn't even consistent, but you're adding an entire level of indentation for nothing!

```
- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    if (!(self = [super initWithStyle:style reuseIdentifier:reuseIdentifier])) return nil;

    // Initialization code

    return self;
}
```

Holy balls that's better.

Am I crazy here? Or am I just the last sane developer left?
