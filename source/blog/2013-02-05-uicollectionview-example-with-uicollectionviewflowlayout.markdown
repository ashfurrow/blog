---
title: "UICollectionView Example with UICollectionViewFlowLayout"
date: 2013-02-05 00:00
link_to: collectionview
---

<import><p>I'm waiting for some friends to come into town tonight so I thought I might throw together a very <a href="https://github.com/AshFurrow/UICollectionViewFlowLayoutExample">basic <code>UICollectionViewFlowLayout</code> example</a>. </p>

<p>It demonstrates proper use of:</p>

<ul>
<li>
<code>UICollectionViewFlowLayout</code> properties and basic subclassing.</li>
<li>How to properly implement <code>UICollectionViewCell</code> subclasses.</li>
<li>How to change layouts (with animation).</li>
<li>How to set up a collection view without a <code>.xib</code> or Storyboard.</li>
</ul>

<p>Important things to note:</p>

<ul>
<li>Always invalidate a layout before setting giving it to a collection view to use. This is really important if your app supports more than one orientation.</li>
<li>Always reset <code>UICollectionViewCell</code>s to neutral when you override <code>prepareForReuse</code>.</li>
<li>Always use <code>setCollectionViewLayout:animated:</code> to change a layout with animation – <em>never</em> set the property in an animation block and assume it will work.</li>
</ul>

<p>These are just a few of the gems I've picked up while writing a short book on <code>UICollectionView</code>. I'll let you know when it's available for sale. </p>
<img src="/img/import/blog/uicollectionview-example-with-uicollectionviewflowlayout/B62F5B2D6C2F49469A7C0EC8F5FE3C6A.png" class="img-responsive"><img src="/img/import/blog/uicollectionview-example-with-uicollectionviewflowlayout/AB89F722D59045A080987447EFE6BFE6.png" class="img-responsive"><p>I'll probably add more layouts to it other than small and large ones. If anyone has anything they want to add or suggestions, let me know. </p></import>

<!-- more -->

