---
title: "Background Threads"
date: 2011-04-01 00:00
index: true
---

Today I helped a student with their software engineering project. In their actionPerformed() method, they do some server communication that blocks. Not a great design, but it's also a second-year course that focuses on the design process and not network communication. The blocking call would stop the main thread from redrawing their GUI until after the actionPerformed() method returned. A quick search yielded the official [Java solution](http://java.sun.com/products/jfc/tsc/articles/threads/threads1.html):

```java
Runnable doWorkRunnable = new Runnable() {
  public void run() { doWork(); }
};

SwingUtilities.invokeLater(doWorkRunnable);
```

Java is so entrenched in OO design. Their solution is to create an instance of an&nbsp;anonymous&nbsp;inner class implementing the Runnable interface before calling some Swing-specific method to invoke it "later." It's kind of hack-y, but maybe anonymous inner classes are supposed to be used in Java more often than I thought. I just always considered them an impairment to maintainable code.

I would strongly prefer the Objective-C approach, which uses a multithreaded paradigm designed with just this sort of thing in mind.

`dispatch_queue_t q = dispatch_queue_create("com.appname.bgqueue", NULL);
dispatch_async(q, ^{doWork();};`

I dunno - maybe I'm just being a zealot but it seems like the Java way is like trying to fool the API into doing what you want. Thoughts?

<!-- more -->
