---
title: "Getting Started with CocoaPods"
date: 2013-09-10 00:00
---

<import><p>CocoaPods is an open source library management tool for Objective-C (both iOS and OS X). This article is going to briefly take you through how to get started. This is meant t0 be a quick-fire demo – check out the <a href="http://docs.cocoapods.org/guides/getting_started.html">Getting Started</a> guide for more details.</p>

<p>A CocoaPod (singular) is a specification for a library, usually open source. CocoaPods (plural) is the tool for managing these specs.</p>

<p>First, you'll need to install CocoaPods. That's pretty easy since CocoaPods is a Ruby Gem, and all Macs ship with Ruby. Open a terminal and type the following (it'll ask you for your password):</p>

<pre><code>sudo gem install cocoapods
</code></pre>

<p>That'll install CocoaPods on your machine.</p>

<p>Next, you'll need an Xcode project that you want to integrate. Use <code>cd</code> to navigate to the working directory of your app. </p>

<pre><code>cd ~/Desktop/Demo
</code></pre>

<p>Next, type the following command:</p>

<pre><code>pod init
</code></pre>

<p>This command creates an empty Podfile for you. Open it in a text editor. It'll look like the following.</p>

<pre><code># Uncomment this line to define a global platform for your project
# platform :ios, "6.0"

target "Demo" do

end

target "DemoTests" do

end
</code></pre>

<p>Uncomment the second line to specify the platform (iOS) and the version (6). For your target (the first target), enter <code>pod "SVProgressHUD", "0.9"</code>.</p>

<pre><code>platform :ios, "6.0"

target "Demo" do

pod "SVProgressHUD", "0.9"

end

target "DemoTests" do

end
</code></pre>

<p>Save the file and return to the text editor. Enter the following command. </p>

<pre><code>pod install
</code></pre>

<p>This will produce the following output.</p>

<pre><code>&gt; pod install
Analyzing dependencies
Downloading dependencies
Installing SVProgressHUD (0.9)
Generating Pods project
Integrating client project

[!] From now on use `Demo.xcworkspace`.
</code></pre>

<p>Follow the last line's instruction and close your Xcode project and open the Xcode Workspace file that's been created for you. An Xcode workspace is like a folder for Xcode projects. Your Pods project contains all of the libraries (pods).</p>
<img src="/img/import/blog/getting-started-with-cocoapods-demo/C8A836A432F647E4BB3410FF4C499EA1.png" class="img-responsive"><p>Cool. </p>

<p>Now we need to import the <code>SVProgressHUD.h</code> header. Since it's in another Xcode project, make sure to use angle brackets. </p>

<pre><code>#import &lt;SVProgressHUD.h&gt;
</code></pre>

<p>That's it! We can now use our library. We've successfully integrated CocoaPods into our project. For each library you want to use, write <code>pod "POD_NAME", "POD_VERSION"</code> in your Podfile and re-run <code>pod install</code>. </p>

<p>There's an <a href="https://github.com/kattrali/cocoapods-xcode-plugin">Xcode plugin</a> for CocoaPods if you're not into the command line. </p>

<p>I gave a talk this morning on effectively using open source software. The slides are below. </p>
<script async class="speakerdeck-embed" data-id="bb7fb4c0fc510130bc6b32c793acd495" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script></import>

<!-- more -->

