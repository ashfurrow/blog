---
title: "Stop Saying 'No' to Your Designers"
date: 2012-05-03 00:00
index: true
---

So many times while building the 500px iPad app, Adam (our app designer) would suggest something and I'd hesitate. Not because his suggestion was a bad idea, but because it would be hard to implement.



Well, not hard, just harder than absolutely necessary. Eventually I'd cave and do it anyway and it would look awesome.

That's why Adam suggested it. Because it was a good idea. And I resisted because it's a small amount of extra effort.

Jesus.

That's really stupid. If Adam has a bad idea, which happens, I should debate the merits of the idea. The effort involved in implementing something shouldn't be the first thing I think about when helping to design a product.

Yesterday, I hummed and hawed over a small interface animation that took all of 12 lines and 4 minutes to implement.

``

```
if (passwordPromptWidth > emailPromptWidth)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [UIView animateWithDuration:0.5f animations:^{
            twitterEmailTextField.frame = 
                CGRectMake(passwordPromptWidth+40, 
                           0, 
                           480-40-passwordPromptWidth, 
                           44);
        }];
    });
}
else if (passwordPromptWidth 

Looking back, I'm asking myself what was wrong with me. Well-designed apps don't just happen, they're created by people who give a damn, something that is antithetical to being lazy.
```
<!-- more -->
