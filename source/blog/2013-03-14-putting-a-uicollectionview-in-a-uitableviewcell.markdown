---
title: "Putting a UICollectionView in a UITableViewCell"
date: 2013-03-14 00:00
link_to: collectionview
---

<p>So you want to put a collection view inside of a table view cell, eh? Sounds easy, right? Well, to do it right requires a little bit of work. We want a clear separation of concerns so that the <code>UITableViewCell</code> isn't acting as the data source or delegate for the <code>UICollectionView</code> (because that would be very, very bad). You can follow along by downloading the <a href="https://github.com/AshFurrow/AFTabledCollectionView">sample code</a>.</p>

<p>We're going to build a view hierarchy like the one below. Each <code>UITableViewCell</code> will contain a <code>UICollectionView</code> instead in its <code>contentView</code>. (For reasons we'll get into momentarily, this collection view needs to be a custom subclass.) Each collection view contains a certain number of cells, defined by its datasource. </p>

<img src="/img/import/blog/putting-a-uicollectionview-in-a-uitableviewcell/AFE11F3C86B04CDF9EDB1F080C6668EB.png" class="img-responsive" />

<p>Each collection view will have the same data source and delegate as the table view, necessitating the requirement to use a custom <code>UICollectionView</code> subclass. </p>

<img src="/img/import/blog/putting-a-uicollectionview-in-a-uitableviewcell/E26436B73EEE4D06A38646AEDAFC9692.png" class="img-responsive" />

<p>The diagram should show you that the tricky part here is going to be getting the <code>UICollectionView</code> to see the view controller as the delegate. That's fine, we'll just subclass <code>UICollectionView</code> to get it to have an <code>index</code> property. Subclassing <code>UICollectionView</code> isn't common, but it's perfectly acceptable here.</p>

<p>Adding the collection view to the cell is very strait forward. We'll create an instance of <code>AFCollectionView</code> using a standard <code>UICollectionViewFlowLayout</code> in our cell's designated initializer. </p>

<pre><code>- (id)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    if (!(self = [super initWithStyle:style reuseIdentifier:reuseIdentifier])) return nil;

    UICollectionViewFlowLayout *layout = [[UICollectionViewFlowLayout alloc] init];
    layout.sectionInset = UIEdgeInsetsMake(10, 10, 10, 10);
    layout.itemSize = CGSizeMake(44, 44);
    layout.scrollDirection = UICollectionViewScrollDirectionHorizontal;
    self.collectionView = [[AFIndexedCollectionView alloc] initWithFrame:CGRectZero collectionViewLayout:layout];
    [self.collectionView registerClass:[UICollectionViewCell class] forCellWithReuseIdentifier:CollectionViewCellIdentifier];
    self.collectionView.backgroundColor = [UIColor whiteColor];
    self.collectionView.showsHorizontalScrollIndicator = NO;
    [self.contentView addSubview:self.collectionView];

    return self;
}
</code></pre>

<p>We'll adjust the side of the collection view to fill the cell in <code>layoutSubviews</code>. </p>

<pre><code>-(void)layoutSubviews
{
    [super layoutSubviews];

    self.collectionView.frame = self.contentView.bounds;
}
</code></pre>

<p>Next, we'll set up our model in the view controller. We'll use <code>UIColor</code>s because they're easy. Each cell will display a different, random colour. </p>

<p>This model is going to represent the table view <em>and</em> each collection view. We'll use an array; each object represents a table cell. These objects are themselves arrays, with each of their objects representing a collection view cell.</p>

<pre><code>-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return self.colorArray.count;
}
</code></pre>

<p>Next we'll implement our <code>UICollectionViewDataSource</code> methods.</p>

<pre><code>-(NSInteger)collectionView:(AFIndexedCollectionView *)collectionView numberOfItemsInSection:(NSInteger)section
{
    NSArray *collectionViewArray = self.colorArray[collectionView.index];
    return collectionViewArray.count;
}

-(UICollectionViewCell *)collectionView:(AFIndexedCollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath
{    
    UICollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:CollectionViewCellIdentifier forIndexPath:indexPath];

    NSArray *collectionViewArray = self.colorArray[collectionView.index];
    cell.backgroundColor = collectionViewArray[indexPath.item];

    return cell;
}
</code></pre>

<p>You'll see we're using the <code>index</code> property of the collection view to determine the appropriate model to use. Notice that the view controller doesn't retain references to any of the collection views – they belong to the <code>UITableViewCell</code>s only. This is great, since they'll be re-used and save memory.</p>

<p>But where is the <code>index</code> getting set? We'll need to do that, too.</p>

<pre><code>-(void)tableView:(UITableView *)tableView willDisplayCell:(AFTableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath
{
    [cell setCollectionViewDataSourceDelegate:self index:indexPath.row];
}
</code></pre>

<p>The only thing left to do is "remember" the content offset of each cell as we end displaying it to reset it when we begin displaying it again. I we don't do this, newly displayed collection views will have non-zero content offsets and returning collection views will be in different positions. We'll use an <code>NSMutableDictionary</code> to remember the content offsets.</p>

<pre><code>-(void)tableView:(UITableView *)tableView willDisplayCell:(AFTableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath
{
    [cell setCollectionViewDataSourceDelegate:self index:indexPath.row];
    NSInteger index = cell.collectionView.index;

    CGFloat horizontalOffset = [self.contentOffsetDictionary[[@(index) stringValue]] floatValue];
    [cell.collectionView setContentOffset:CGPointMake(horizontalOffset, 0)];
}

-(void)tableView:(UITableView *)tableView didEndDisplayingCell:(AFTableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath
{
    CGFloat horizontalOffset = cell.collectionView.contentOffset.x;
    NSInteger index = cell.collectionView.index;
    self.contentOffsetDictionary[[@(index) stringValue]] = 
        @(horizontalOffset);
}
</code></pre>

<img src="/img/import/blog/putting-a-uicollectionview-in-a-uitableviewcell/1DA58865F87F4E9696A16088F491E04D.png" class="img-responsive" />

<p>That's it. Not a lot of code, but to do it right, it requires a little bit of planning ahead. You can <a href="https://github.com/AshFurrow/AFTabledCollectionView">download the entire sample code on GitHub</a>.</p>

<p>If you've enjoyed this tutorial, and I sincerely hope you have, then I'd recommend my ebook, <a href="http://click.linksynergy.com/fs-bin/click?id=3JVIZPzOhac&amp;subid=&amp;offerid=145238.1&amp;type=10&amp;tmpid=3559&amp;RD_PARM1=http%253A%252F%252Fwww.informit.com%252Fstore%252Fios-uicollectionview-the-complete-guide-9780133410945"><code>UICollectionView</code>: The Complete Guide</a>. In the book, I go into far more detail on every aspect of using <code>UICollectionView</code>. You can pre-order it now and get access to all the draft chapters immediately. </p>

<!-- more -->

