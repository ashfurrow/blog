---
title: "How to Stop Shipping Code with TODO Comments"
date: 2012-08-27 00:00
---

<p>If you use Xcode, you've probably used or seen the <code>TODO</code> comment. It looks something like this:</p>

<pre><code>//TODO: this isn't the most efficient. Refactor.
-(void)someMethod {
    ...
}
</code></pre>

<p>Here's another:</p>

<pre><code>//TODO: change to the production endpoint before shipping
#define kAPIURL @"http://staging.server.com"
//#define kAPIRUL @"http://server.com"
</code></pre>

<p>The <code>TOOD</code> commments will show up in the file's quick jump bar, making it really easy to find them.</p>

<p>However, there's nothing stopping you from forgetting to address the important <code>TODO</code> items before you ship. The first <code>TODO</code> is just that a method is inefficient. It should be looked at, but if you're on a deadline, sometimes improving performance has to wait for a point release. </p>

<p>However, the second line <em>will break your app</em>. It <strong>cannot</strong> be shipped to either beta testers or the App Store. And there is no way to distguish between the two severities of <code>TODO</code>s.</p>

<p>Until now.</p>

<p>If you have code that needs to be addressed, it should be documented in more than a code comment. If it's just a text file called BUGS.TXT or if you use Pivotal Tracker, you should be tracking what needs to be done to your code, like a gentleman. So what you want is that before you ship, you document what should be changed later and change what needs to be changed now. And now here is how you force yourself to do it:</p>

<p>We're going to add a Build Script to your Xcode target to find any <code>TODO</code> or <code>FIXME</code> comments and replace them with warnings (if we're building for Debug configuration) or replace them with errors (if we're building for Release, as you do when you Archive).</p>

<p>It's a simple script that I modified from its <a href="http://deallocatedobjects.com/posts/show-todos-and-fixmes-as-warnings-in-xcode-4">original source</a> It looks like the following:</p>

<pre><code>KEYWORDS="TODO:|\?\?\?:|\!\!\!:"
if [ "${CONFIGURATION}" = "Release" ]; then
    find "${SRCROOT}" \( -name "*.h" -or -name "*.m" \) -print0 | xargs -0 egrep --with-filename --line-number --only-matching "($KEYWORDS).*\$" | perl -p -e "s/($KEYWORDS)/ error: \$1/"
fi
if [ "${CONFIGURATION}" = "Debug" ]; then
    find "${SRCROOT}" \( -name "*.h" -or -name "*.m" \) -print0 | xargs -0 egrep --with-filename --line-number --only-matching "($KEYWORDS).*\$" | perl -p -e "s/($KEYWORDS)/ warning: \$1/"
fi
</code></pre>

<p>Just copy and paste it into a new Build Script, added through the target detail view in Xcode:</p>

<img src="/img/import/blog/how-to-stop-shipping-code-with-todo-comments/CAE77EC0DCEA4032947915A76A1A1196.png" class="img-responsive" />

<p>You'll never ship an accidental snaffoo again because your build <em>will break</em> instead. While you're developing, you'll still have access to the <code>TODO</code>s as warnings, so you can navigate to them easily in the Issue Navigator.</p>

<p>I'm integrating it into my work flow and I'll report back on how it works out.</p>

<!-- more -->

