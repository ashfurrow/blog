---
title: "How to Use NSFetchedResultsController with UICollectionView"
date: 2012-09-19 00:00
link_to: collectionview
---

If you're looking for how to get around the `NSInternalInconsistencyException` runtime exception with `UICollectionView`, I have an [example on GitHub](https://github.com/AshFurrow/UICollectionView-NSFetchedResultsController) detailing how to queue updates from the `NSFetchedResultsControllerDelegate`.

The problem is that the existing `UITableView` class uses `beginUpdates` and `endUpdates` to submit batches to the table view. `UICollectionView` has a new `performBatchUpdates:` method, which takes a block parameter to update the collection view. That's pretty good, but it doesn't work well with the existing paradigm for `NSFetchedResultsController`.

(READMORE)
