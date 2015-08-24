---
title: "Challenging Established Dogma"
date: 2014-09-14 00:00
---

<p>I’ve been a longtime believer in the power of challenging established dogma and authority. Just ask my mom – she’ll tell you what a little pest I was growing up. </p>

<p>When I was young, my grandmother was a huge influence on me and encouraged me to question the authoritative aspects of society. Later, I met a high school teacher who introduced me to literary critical theory, which kind of sparked everything about who I am today. </p>

<p>So it’s with some disgust that I recently realized that <em>I</em> have become an “authority” in my field. Ew.</p>

<p>Let’s back up a minute. </p>

<!-- more -->

<p>There is a concept in psychology called the <a href="http://en.wikipedia.org/wiki/Dreyfus_model_of_skill_acquisition">Dreyfus model of skill acquisition</a>. It’s awesome – I think about it a lot when teaching, because depending on my audience, I’ll present the same material differently. For example, beginners in a field tend to see things through a lens that polarizes solutions as “good” or “bad” depending on how those solutions adhere to principles taught by experts. Beginners adhere rigidly to these principles. As learners progress in their field – towards competence, proficiency, and expertise – they learn that knowledge is <em>not</em> absolute and that the things experts teach are only well-informed opinions. Solutions to problems aren’t “good” or “bad” based on how well they adhere to a principle, but rather how well they solve the problem. </p>

<p>This is really useful to me as an educator. If I’m speaking to a beginner, confidently making generalizations will help them learn the fundamentals. Beginners need simplified models. Later, with intermediate students, I try not to make these generalizations because they’re no longer useful – I try and show them that what I teach is really just my opinion, and that they ought to question it. But if I try and tell someone that a fundamental principle is just an opinion too early, they won’t have confidence in what they’re learning. It’s a tricky balancing act.</p>

<p>So anyway, I came to the realization that I am part of “the man” of iOS developers – pushing my dogma wherever I write – when a reader wrote in with a question. (I am publishing their question here anonymously with their permission.)</p>

<blockquote>
  <p>I was reading your blog post here: <a href="http://ashfurrow.com/blog/putting-a-uicollectionview-in-a-uitableviewcell">http://ashfurrow.com/blog/putting-a-uicollectionview-in-a-uitableviewcell</a> - and had a question. You mention it would be "very, very bad" to make the UITableViewCell the delegate/dataSource of the UICollectionView, but you give no reasons. Why?! (but seriously, I am very curious - what are your reasons for that declaration?)</p>
  
  <p>I look forward to hearing from you!</p>

</blockquote>

<p>What an excellent question. </p>

<p>Why is it excellent? Because here in this moment, we see them question the established dogma of iOS. I wanted to encourage the person who wrote me to ask more questions like this one, so I gave them a thorough answer. </p>

<blockquote>
  <p>Thanks for writing me with this question. I think that questioning dogma is important in our field. </p>
  
  <p>In this case, the dogma is something fundamental to the way that Apple, and most of the community, recommend architecting iOS apps: <a href="https://developer.apple.com/library/ios/documentation/general/conceptual/devpedia-cocoacore/MVC.html">Model-View-Controller</a>. In MVC, all objects are classified as either a model, view, or controller, and only one of those. So a view isn’t a controller, etc. In general, controllers serve as datasources for views because they have access to the model objects, which views do not. These controllers mediate the conversation between views and models. </p>
  
  <p>So a view acting as a datasource implies that the view has access to the model data, which should not happen in MVC. </p>
  
  <p>Why does this matter? Well, MVC isn’t something extra to be added to app code. It’s a framework that restricts what we can do. It’s certainly possible to write an entire app using a single file, or only a few classes, but we don’t do that because it makes it hard for us to reason about what code lives where. It may be more convenient or faster to write code using fewer, larger files, but maintaining this code is very time-intensive. So we use MVC to restrict how we structure code. </p>
  
  <p>Sometimes, it’s convenient or even necessary to break the rules of a framework like MVC, but we should only do so as a last resort, with solid justification, and proper documentation about our reasoning. </p>

</blockquote>

<p>Instead of just saying “because of MVC”, I chose to give an opinion. Remember, that’s all rules are – opinions – and opinions, no matter how well-informed they are, should be questioned. <em>Especially</em> in our field, where the environment that opinions are formed in changes so quickly. </p>

<p>I find helping developers learn and grow to be incredibly rewarding and I’m always trying to improve my teaching skills. If you’re a blogger or an OSS contributor or you answer questions on Stackoverflow, remember the Dreyfus model of skill acquisition. Sometimes a generalized rule is what a beginner needs, but eventually, those beginners are going to start challenging those generalizations, and <em>that is awesome</em>. <strong>Do not</strong> discourage this behaviour. </p>

