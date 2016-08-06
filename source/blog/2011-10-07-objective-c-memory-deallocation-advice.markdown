---
title: "Objective-C Memory Deallocation Advice"
date: 2011-10-07 00:00
index: true
---

Hey iOS nerd friends, I need your help. I fetched, store, and display models to the use in batches of twelve. A batch is represented by an NSArray instance and is stored in a cache which responds to low memory warnings by clearing out the batches no currently in use. The models themselves form a doubly-linked list (ie: each one has an \_\_unsafe\_unretained property to each previous and next). I navigate through the models this way sometimes, and through the "batches" way others.

My problem is memory management. If I were building for iOS 5, I could use the zeroing-weak reference properties in the model class and not worry about it. But I'm not, so I have to. The two options I've thought of are:

- When releasing a batch from the cache, remove the references into and out of it.

Something like:

```objc
NSArray *keys = [sharedCache allKeys];
for (NSString *key in keys)
{
	[[[[sharedCache objectForKey:key] objectAtIndex:0] previousModel] setNextModel:nil];
	[[[[sharedCache objectAtIndex:key] objectAtIndex:11] nextModel] setPreviousModel:nil];
	[sharedCache removeObjectForKey:key];
}
````

And then not worry about zero-ing out the next/previous references individually within the batch.

- When dealloc'ing a model instance, use a static NSLock to remove the references to each model.

Something like:

```objc
static NSLock *deallocLock = nil;
if (!deallocLock)
	deallocLock = [[NSLock alloc] init];
[deallocLock lock];
self.nextPhotoModel.previousPhotoModel = nil;
self.previousPhotoModel.nextPhotoModel = nil;
[deallocLock unlock];
````

Which guarantees two neighbouring models in the list don't accidentally try to dereference one another while dealloc'ing.

I don't like the first option because it leaves the possibility that two models within the batch will do something funky. I don't like the second option because locking in the dealloc method scares the shit out of me.

I haven't implemented either of these solutions, yet. I'm currently getting infrequent crashes from my beta testers in the dealloc method of my model (trying to dereference a dangling pointer to previous/next).

Any suggestions?

<!-- more -->
