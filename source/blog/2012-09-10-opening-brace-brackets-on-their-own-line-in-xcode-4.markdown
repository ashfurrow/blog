---
title: "Opening Brace Brackets on Their Own Line in Xcode 4"
date: 2012-09-10 00:00
---

<import><p>If you're like me, you like your brace backets on their own lines, like this:</p>

<pre><code>if (condition)
{
    statements
}
</code></pre>

<p>If you're even more like me, you make heavy use of Xcode's autocomplete and snippets, like the following:</p>
<img src="/img/import/blog/opening-brace-brackets-on-their-own-line-in-xcode-4/EB56DB5A74DD42C390BEDBDC90529BDB.png" class="img-responsive"><p>And finally, if you're <em>just</em> like me, you get really disappointed when this happens:</p>

<pre><code>if (condition) {
    statements
}
</code></pre>

<p>What the hell, Xcode? Even the project templates have brace brackets on their own lines. What gives?</p>

<p>Thanks to <a href="http://stackoverflow.com/questions/5324622/how-to-change-autocomplete-braces-in-xcode-4">some research</a>, I found the <a href="http://forrst.com/posts/Put_that_where_it_might_belong_Xcode-PNL">file</a> you need to edit. The problem is, Xcode is now distributed through the Mac App Store, so the steps are a little different. Here's what you do.</p>

<ol>
<li>Open the terminal. </li>
<li>Type <code>cd /Applications/Xcode.app/Contents/PlugIns/IDECodeSnippetLibrary.ideplugin/Contents/Resources</code> and hit Enter.</li>
<li>We're editing <code>SystemCodeSnippets.codesnippets</code>, but let's make a backup first. Type <code>sudo cp SystemCodeSnippets.codesnippets SystemCodeSnippets.codesnippets.backup</code> and hit Enter.</li>
<li>Use your text editor of choice to open the file as the root user.
<ul>
<li>Using vim, the command is <code>sudo vim SystemCodeSnippets.codesnippets</code>
</li>
<li>Using anything else, like TextMake, it's <code>sudo open -a TextMate SystemCodeSnippets.codesnippets</code>
</li>
</ul>
</li>
<li>
<p>Do a "Find" for the word "condition" and you should find almost all the instance of the snippets you want to modify. It'll look like this:</p>

<pre><code>    &lt;key&gt;IDECodeSnippetVersion&lt;/key&gt;
    &lt;integer&gt;1&lt;/integer&gt;
   &lt;key&gt;IDECodeSnippetCompletionPrefix&lt;/key&gt;
    &lt;string&gt;if&lt;/string&gt;
    &lt;key&gt;IDECodeSnippetContents&lt;/key&gt;
    &lt;string&gt;if (&amp;lt;#condition#&amp;gt;) {
&amp;lt;#statements#&amp;gt;
}&lt;/string&gt;
</code></pre>

<p>Just put a new line before the opening brace bracket.</p>

<pre><code>    &lt;key&gt;IDECodeSnippetVersion&lt;/key&gt;
    &lt;integer&gt;1&lt;/integer&gt;
    &lt;key&gt;IDECodeSnippetCompletionPrefix&lt;/key&gt;
    &lt;string&gt;if&lt;/string&gt;
    &lt;key&gt;IDECodeSnippetContents&lt;/key&gt;
    &lt;string&gt;if (&amp;lt;#condition#&amp;gt;)
{
&amp;lt;#statements#&amp;gt;
}&lt;/string&gt;
</code></pre>

<p>This will find all the if statements and most loops; search for the text "forin" to modify the fast enumeration snippet.</p>
</li>
</ol>

<p>Save the file and restart Xcode. That's it!</p>

<p><strong>Update</strong>: My friend Zev is maintaining an up-to-date version of <code>SystemCodeSnippets.codesnippets</code> for the latest Xcode version <a href="https://github.com/sveinungkb/ios-convenience">on GitHub</a>. Go check it out.</p></import>

<!-- more -->

