---
title: "Stop Saying 'No' to Your Designers"
date: 2012-05-03 00:00
---

<p>So many times while building the 500px iPad app, Adam (our app designer) would suggest something and I'd hesitate. Not because his suggestion was a bad idea, but because it would be hard to implement.<!--more--></p>

<p>Well, not hard, just harder than absolutely necessary. Eventually I'd cave and do it anyway and it would look awesome.</p>

<p>That's why Adam suggested it. Because it was a good idea. And I resisted because it's a small amount of extra effort.</p>

<p>Jesus.</p>

<p>That's really stupid. If Adam has a bad idea, which happens, I should debate the merits of the idea. The effort involved in implementing something shouldn't be the first thing I think about when helping to design a product.</p>

<p>Yesterday, I hummed and hawed over a small interface animation that took all of 12 lines and 4 minutes to implement.</p>

<p><code></code></p>

<pre>
if (passwordPromptWidth &gt; emailPromptWidth)
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
<p></p>

<p>Looking back, I'm asking myself what was wrong with me. Well-designed apps don't just happen, they're created by people who give a damn, something that is antithetical to being lazy.</p></pre>

<!-- more -->

