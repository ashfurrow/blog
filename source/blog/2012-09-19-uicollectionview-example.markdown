---
title: "UICollectionView Example"
date: 2012-09-19 00:00
link_to: collectionview
---

<p>We're going to take a look at the new <code>UICollectionView</code> class Apple introduced in iOS 6. It's used to display a grid of cells, and what better to display in those cells than some beautiful photos from 500px?</p>

<p>I've got an example project completed and hosted <a href="https://github.com/AshFurrow/UICollectionViewExample">on github</a> that you can check out and play with. Don't forget to <a href="http://developers.500px.com/settings/applications?from=developers">register yourself with 500px</a> first to get a consumer key and consumer secret, or else the API won't work for you. Copy these into a text file because you'll need them later.</p>

<p>Xcode might introduce a new template for collection view apps, but in the mean time, we'll have to modify an existing project that uses <code>UITableView</code>.</p>

<p>Create a new Xcode project using the "Master-Detail Application" template.</p>

<p>Open the main Storyboard file. We're going to throw away the existing table view and replace it with a sexy new collection view. The easiest way to do that is to select the existing Master View Controller, shown below, and hit the delete key.</p>

<img src="/img/import/blog/uicollectionview-example/D64FDC4D8F644D60A15675757BC8EA95.png" class="img-responsive" />

<p>Now that the Master View Controller is missing, we need to re-add it. Go to your Master View Controller's <code>.h</code> file and change it from inheriting from <code>UITableViewController</code> to <code>UICollectionViewController</code>. You'll get some compiler errors; ignore them for now.</p>

<p>Drag a new <code>UICollectionViewController</code> form the library. Right click and drag from the Navigation Controller onto the collection view controller and select the "root view controller" outlet.</p>

<img src="/img/import/blog/uicollectionview-example/BDF26DDF70744C57813ED87D31033FAF.png" class="img-responsive" />

<p>Right. Almost there. Open the identity inspector (⌘⎇3) and give the new UICollectionViewController the class name of your Master View Controller.</p>

<img src="/img/import/blog/uicollectionview-example/3B0B5635D36F497B84851AA27A9494C7.png" class="img-responsive" />

<p>We'll worry about the segues later. For now, go to the <code>UICollectionViewController</code> subclass' <code>.m</code> file. We'll fix those compiler errors now.</p>

<img src="/img/import/blog/uicollectionview-example/8A0115CB76E64B218DCD9E158D6AF93D.png" class="img-responsive" />

<p>It's always something with you, isn't it, Xcode? </p>

<p>We're going to gut the contents of the master view controller that deal with the <code>tableView</code> property (which we replaced). For this example, I'm deleting the following method:</p>

<pre><code>- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath
</code></pre>

<p>Everywhere else you see <code>tableView</code> cuasing a problem, replace it with <code>collectionView</code>. The two classes behave almost identically, so it'll be an easy conversion.</p>

<p>The only problem I had was</p>

<pre><code>[self.collectionView indexPathForSelectedRow];
</code></pre>

<p><code>UICollectionView</code> doesn't have the method <code>indexPathForSelectedRow</code>, so replace that line with the following:</p>

<pre><code>[[self.collectionView indexPathsForSelectedItems] lastObject];
</code></pre>

<p>You'll also need to modify the <code>insertSections:withRowAnimation:</code> method calls, since <code>UICollectionView</code> doesn't have row animations; just remove the second part of the selector name.</p>

<p>Once you deal with all of the transition, you have a an app that runs, but is empty. Let's fill it with beautiful photos.</p>

<img src="/img/import/blog/uicollectionview-example/226450BE3A464F44B4A4B8706BDC0612.png" class="img-responsive" />

<p>We need a data model. Since we're smart, accomplished, and handsome developers, let's use Core Data. Create the following Core Data model.</p>

<img src="/img/import/blog/uicollectionview-example/3E628B26764C4ACDA973588CAE0C2678.png" class="img-responsive" />

<p>All we need is a <code>photoRating</code> to sort by and <code>photoImageData</code> to display actual images, but let's add a <code>photoName</code> for the detail view.</p>

<p>We need to configure the prototype cell used by the collection view. Create a new class, subclassing <code>UICollectionViewCell</code>, create a <code>UIImageView</code> outlet and appropriate instance methods to set the image.</p>

<p>Go to the Storyboard and select the protoype cell in the collection view. In the identity inspector, set it's class to the <code>UICollectionView</code> subclass you just created. Add a <code>UIImageView</code> to the prototype cell and connect the outlet. </p>

<img src="/img/import/blog/uicollectionview-example/2E0D5ECB395F41DEA921597398D5E79E.png" class="img-responsive" />

<p>Make sure to set the <code>Identifier</code> in the Storyboard or the collection view won't dequeue the proper class.</p>

<p>We need to queue up the updates from our <code>NSFetchedResultsController</code>, since <code>UICollectionView</code> can <em>only</em> perform batch updates (with animation). Serious oversight on Apple's here, in my opinion, since it makes using <code>NSFetchedRsultsController</code> with <code>UICollectionView</code> very sticky.</p>

<p>You basically need to cache the updates to the sections and objects individually until the fetched results controller is finished with the updates. This is because of the <a href="https://ash-furrow.squarespace.com/blog/how-to-use-nsfetchedresultscontroller-with-uicollectionview">limitations imposed on <code>UICollectionView</code></a>.</p>

<p><em>Note</em>: We're using batch updates because we are inserting more than one cell at a time, and we want that nice animation when adding each individual cell. You could call <code>reloadData</code> once all the results are loaded, but you wouldn't have any animations, which are part of the delight of <code>NSCollectionVIew</code>. </p>

<p>Creating the <code>NSFetchedResultsController</code> is almost the exact same as the project template:</p>

<pre><code>- (NSFetchedResultsController *)fetchedResultsController
{
    if (_fetchedResultsController != nil) {
        return _fetchedResultsController;
    }

    NSFetchRequest *fetchRequest = [[NSFetchRequest alloc] init];
    // Edit the entity name as appropriate.
    NSEntityDescription *entity = [NSEntityDescription entityForName:@"AFPhotoModel" inManagedObjectContext:self.managedObjectContext];
    [fetchRequest setEntity:entity];

    // Set the batch size to a suitable number.
    [fetchRequest setFetchBatchSize:20];

    // Edit the sort key as appropriate.
    NSSortDescriptor *sortDescriptor = [[NSSortDescriptor alloc] initWithKey:@"photoName" ascending:NO];
    NSArray *sortDescriptors = @[sortDescriptor];

    [fetchRequest setSortDescriptors:sortDescriptors];

    // Edit the section name key path and cache name if appropriate.
    // nil for section name key path means "no sections".
    NSFetchedResultsController *aFetchedResultsController = [[NSFetchedResultsController alloc] initWithFetchRequest:fetchRequest managedObjectContext:self.managedObjectContext sectionNameKeyPath:nil cacheName:@"Master"];
    aFetchedResultsController.delegate = self;
    self.fetchedResultsController = aFetchedResultsController;

    NSError *error = nil;
    if (![self.fetchedResultsController performFetch:&amp;error]) {
         // Replace this implementation with code to handle the error appropriately.
         // abort() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development. 
        NSLog(@"Unresolved error %@, %@", error, [error userInfo]);
        abort();
    }

    return _fetchedResultsController;
}    
</code></pre>

<p>Create two <code>NSMutableArray</code> instance variables and instantiate them in <code>viewDidLoad</code>. Implement the following <code>NSFetchedResultsControllerDelegate</code> methods.</p>

<pre><code>- (void)controller:(NSFetchedResultsController *)controller didChangeSection:(id &lt;NSFetchedResultsSectionInfo&gt;)sectionInfo
           atIndex:(NSUInteger)sectionIndex forChangeType:(NSFetchedResultsChangeType)type
{

    NSMutableDictionary *change = [NSMutableDictionary new];

    switch(type) {
        case NSFetchedResultsChangeInsert:
            change[@(type)] = @[@(sectionIndex)];
            break;
        case NSFetchedResultsChangeDelete:
            change[@(type)] = @[@(sectionIndex)];
            break;
    }

    [_sectionChanges addObject:change];
}

- (void)controller:(NSFetchedResultsController *)controller didChangeObject:(id)anObject
       atIndexPath:(NSIndexPath *)indexPath forChangeType:(NSFetchedResultsChangeType)type
      newIndexPath:(NSIndexPath *)newIndexPath
{

    NSMutableDictionary *change = [NSMutableDictionary new];
    switch(type)
    {
        case NSFetchedResultsChangeInsert:
            change[@(type)] = newIndexPath;
            break;
        case NSFetchedResultsChangeDelete:
            change[@(type)] = indexPath;
            break;
        case NSFetchedResultsChangeUpdate:
            change[@(type)] = indexPath;
            break;
        case NSFetchedResultsChangeMove:
            change[@(type)] = @[indexPath, newIndexPath];
            break;
    }
    [_objectChanges addObject:change];
}
</code></pre>

<p>These two methods queue the updates to the collection view. The following method waits for the fetched results controller to be finished before dequeuing those updates and applying them to our collection view.</p>

<pre><code>- (void)controllerDidChangeContent:(NSFetchedResultsController *)controller
{
    if ([_sectionChanges count] &gt; 0)
    {
        [self.collectionView performBatchUpdates:^{

            for (NSDictionary *change in _sectionChanges)
            {
                [change enumerateKeysAndObjectsUsingBlock:^(NSNumber *key, id obj, BOOL *stop) {

                    NSFetchedResultsChangeType type = [key unsignedIntegerValue];
                    switch (type)
                    {
                        case NSFetchedResultsChangeInsert:
                            [self.collectionView insertSections:[NSIndexSet indexSetWithIndex:[obj unsignedIntegerValue]]];
                            break;
                        case NSFetchedResultsChangeDelete:
                            [self.collectionView deleteSections:[NSIndexSet indexSetWithIndex:[obj unsignedIntegerValue]]];
                            break;
                        case NSFetchedResultsChangeUpdate:
                            [self.collectionView reloadSections:[NSIndexSet indexSetWithIndex:[obj unsignedIntegerValue]]];
                            break;
                    }
                }];
            }
        } completion:nil];
    }

    if ([_objectChanges count] &gt; 0 &amp;&amp; [_sectionChanges count] == 0)
    {
        [self.collectionView performBatchUpdates:^{

            for (NSDictionary *change in _objectChanges)
            {
                [change enumerateKeysAndObjectsUsingBlock:^(NSNumber *key, id obj, BOOL *stop) {

                    NSFetchedResultsChangeType type = [key unsignedIntegerValue];
                    switch (type)
                    {
                        case NSFetchedResultsChangeInsert:
                            [self.collectionView insertItemsAtIndexPaths:@[obj]];
                            break;
                        case NSFetchedResultsChangeDelete:
                            [self.collectionView deleteItemsAtIndexPaths:@[obj]];
                            break;
                        case NSFetchedResultsChangeUpdate:
                            [self.collectionView reloadItemsAtIndexPaths:@[obj]];
                            break;
                        case NSFetchedResultsChangeMove:
                            [self.collectionView moveItemAtIndexPath:obj[0] toIndexPath:obj[1]];
                            break;
                    }
                }];
            }
        } completion:nil];
    }

    [_sectionChanges removeAllObjects];
    [_objectChanges removeAllObjects];
}
</code></pre>

<p>These methods should work for any <code>UICollectionView</code> and <code>NSFetchedResultsController</code> data.</p>

<p>Now that the <code>NSFetchedResultsController</code> is hooked up the the <code>UICollectionView</code>, let's load some photos from 500px! </p>

<p>Use the consumer key and consumer secret from when you <a href="http://developers.500px.com/settings/applications?from=developers">registered your application</a> earlier. Follow the directions in the <a href="https://github.com/500px/500px-iOS-api">iOS 500px SDK</a> to add the 500px SDK to your Xcode project. Make sure to follow the instructions in the SDKs <code>README</code> to set up your project to use the SDK.</p>

<pre><code>[PXRequest setConsumerKey:@"your consumer key" consumerSecret:@"your consumer secret"];

[PXRequest requestForPhotoFeature:PXAPIHelperPhotoFeaturePopular completion:^(NSDictionary *results, NSError *error) {
    if (error)
    {
        [[[UIAlertView alloc] initWithTitle:@"Couldn't fetch from 500px." message:error.localizedDescription delegate:nil cancelButtonTitle:nil otherButtonTitles:@"OK", nil] show];
        return;
    }

    NSArray *photoArray = [results valueForKey:@"photos"];

    for (NSDictionary *photoDictionary in photoArray)
    {
        NSManagedObject *photoModel = [NSEntityDescription insertNewObjectForEntityForName:@"AFPhotoModel" inManagedObjectContext:AppDelegate.managedObjectContext];
        [photoModel setValue:[photoDictionary valueForKey:@"rating"] forKey:@"photoRating"];
        [photoModel setValue:[photoDictionary valueForKey:@"name"] forKey:@"photoName"];

        dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0), ^{
            NSString *urlString = [[[photoDictionary valueForKey:@"images"] objectAtIndex:0] valueForKey:@"url"];
            NSData *imageData = [NSData dataWithContentsOfURL:[NSURL URLWithString:urlString]];
            dispatch_async(dispatch_get_main_queue(), ^{
                [photoModel setValue:imageData forKey:@"photoImageData"];
            });
        });
    }
}];
</code></pre>

<p>The fetched results controller will take care of that magic for us. We just need to configure our cells.</p>

<pre><code>- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath
{
    AFCollectionViewCell *cell = (AFCollectionViewCell *)[collectionView dequeueReusableCellWithReuseIdentifier:CellIdentifier forIndexPath:indexPath];

    NSManagedObject *object = [self.fetchedResultsController objectAtIndexPath:indexPath];
    [cell setImage:[UIImage imageWithData:[object valueForKey:@"photoImageData"]]];

    return cell;
}
</code></pre>

<img src="/img/import/blog/uicollectionview-example/E8ECC8892EEB418D9FE04C6A04AD5436.png" class="img-responsive" />

<p>I went to the liberty of adjusting the sizes to make things pretty - nice app! Let's connect the detail view controller now.</p>

<p>Open the Storyboard and right-click on the prototype cell. We'll be connecting the <code>selection</code> triggered segue to the detail view controller. Drag the circle beside <code>selection</code> to the detail view controller and choose "push" from the menu that appears.</p>

<img src="/img/import/blog/uicollectionview-example/AF66949DE9D6407C8288A2B406292DB8.png" class="img-responsive" />

<p>Select the segue and make sure its identifier is set to "showDetail".</p>

<p>Replace the <code>UILabel</code> with a <code>UIImageView</code>, change the <code>IBOutlet</code> in the header file, reconnect the outlet, and modify <code>configureView</code> to look like the following:</p>

<pre><code>- (void)configureView
{
    // Update the user interface for the detail item.

    if (self.detailItem)
    {
        self.detailImageView.image = [UIImage imageWithData:[self.detailItem valueForKey:@"photoImageData"]];
        self.title = [self.detailItem valueForKey:@"photoName"];
    }
}
</code></pre>

<p>In the master view controller, <code>prepareForSegue:sender:</code> should look like the following:</p>

<pre><code>- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    if ([[segue identifier] isEqualToString:@"showDetail"]) {
        NSIndexPath *indexPath = [[self.collectionView indexPathsForSelectedItems] lastObject];
        NSManagedObject *object = [[self fetchedResultsController] objectAtIndexPath:indexPath];
        [[segue destinationViewController] setDetailItem:object];
    }
}
</code></pre>

<p>Run the app, tap on a photo, and you'll see the following:</p>

<img src="/img/import/blog/uicollectionview-example/2E826D143C214E178029F7B19AE16936.png" class="img-responsive" />

<p>Sexy! </p>

<p>If you have any questions, please let me know. Check out <a href="https://github.com/AshFurrow/UICollectionViewExample">the code</a> from GitHub and have fun!</p>

<!-- more -->

