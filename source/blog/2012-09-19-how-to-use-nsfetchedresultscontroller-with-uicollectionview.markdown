---
title: "How to Use NSFetchedResultsController with UICollectionView"
date: 2012-09-19 00:00
link_to: collectionview
---

<p>If you're looking for how to get around the <code>NSInternalInconsistencyException</code> runtime exception with <code>UICollectionView</code>, I have an <a href="https://github.com/AshFurrow/UICollectionView-NSFetchedResultsController">example on GitHub</a> detailing how to queue updates from the <code>NSFetchedResultsControllerDelegate</code>.</p>

<p>The problem is that the existing <code>UITableView</code> class uses <code>beginUpdates</code> and <code>endUpdates</code> to submit batches to the table view. <code>UICollectionView</code> has a new <code>performBatchUpdates:</code> method, which takes a block parameter to update the collection view. That's sexy, but it doesn't work well with the existing paradigm for <code>NSFetchedResultsController</code>.</p>

<!-- more -->

