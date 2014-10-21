---
title: "UITableView ShrinkTo"
date: 2011-05-21 00:00
---

<import><p><object style="float: right; break: none;" width="425" height="349" value="http://www.youtube.com/v/Xak3xqGKvqc?fs=1&amp;hl=en_GB"><param name="allowFullScreen" value="true">
<param name="allowscriptaccess" value="always">
<embed type="application/x-shockwave-flash" width="425" height="349" src="http://www.youtube.com/v/Xak3xqGKvqc?fs=1&amp;hl=en_GB" allowfullscreen="true" allowscriptaccess="always"></embed></object>
Consider  a UISegmentedControl at the top of the table view that lets users list table view cells in either category. A user can switch which category a cell belongs to.</p>
<p>I thought it'd be cool to animate the table view cell moving into the other side of the segmented control - much like moving an email to another folder in the Mail app. 12 seconds later, I realized it would take a little more than a UIView animation block, and would be out of scope. Google didn't yield any easy results, unfortunately.</p>
<p>So I wrote it myself. The resulting UITableViewCell category (called ShrinkTo).</p>
<p>The code is freely available on <a href="https://github.com/AshFurrow/UITableViewCell-ShinkTo">GitHub</a>.</p></import>

<!-- more -->

