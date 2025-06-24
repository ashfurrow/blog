---
title: Passing NSManagedObject Instances Between Contexts with Ordered Relationships
date: 2012-08-24
---

Core Data is awesome. It's probably the most awesome thing about developing in Objective-C. Well, maybe not, but it's up there. However, it doesn't come without its frustrations.

Recently, a colleague and I were having trouble with the new iOS 5 Core Data child managed object contexts. To recap, all of your Core Data objects exist in a context that is specific to a thread. Access any properties of these objects whatsoever in a different thread can lead to a crash, and iOS 5 introduced a new way to create child contexts to perform operations in a background thread. Hurray!

In our case, when parsing the JSON downloaded from our servers, we wanted to see if there were an existing `PXPhotoModel` in our Core Data store based on the photo ID returned from the API. We do so in a child managed object context:

```
NSFetchRequest *request = [[NSFetchRequest alloc] initWithEntityName:@"PXPhotoModel"];
request.predicate = [NSPredicate predicateWithFormat:@"identifier == %@", [photoDict objectForKey:@"id"]];
NSArray *existingPhoto = [[self managedObjectContext] executeFetchRequest:request error:nil];

PXPhotoModel * photo;
if (existingPhoto.count < 1)
{
    photo = ...;//insert new photo

}
else
{
    photo = [existingPhoto lastObject];
}
```

There is nothing wrong with this code, and most of the time, it worked. Most of the time. Sometimes, however, we would end up with a `nil` photo. Curious!

After extensive debugging, we found that the photo assigned here was never `nil`. We were always finding a photo or inserting it, as you'd expect, but for some reason, the property we were setting it to was being nilled out.

I've looked through our code, and we never removed `PXPhotoModel` entities from our Core Data store, so the problem isn't that the object is being removed. Somehow, when the child context saved, the change was not being propagated up to the main context. Very weird.

We solved the problem by grabbing the `PXPhotoModel`'s `objectID` from the main context and retrieve the equivalent model from our child context:

```
NSFetchRequest *request = [[NSFetchRequest alloc] initWithEntityName:@"PXPhotoModel"];
request.predicate = [NSPredicate predicateWithFormat:@"identifier == %@", [photoDict objectForKey:@"id"]];
__block NSManagedObjectID *objectID;

[AppDelegate.managedObjectContext performBlock:^{
    objectID = [[[AppDelegate.managedObjectContext executeFetchRequest:request error:nil] lastObject] objectID];
}];

PXPhotoModel * photo;
if (objectID)
{
    photo = (PXPhotoModel *)[[self managedObjectContext] objectRegisteredForID:objectID];
}
else
{
    photo = ...;//insert new photo
}
```

It's still bothering me that I don't understand why it wasn't working before. Setting a relationship between two managed objects in a child context _should_ propagate that change to the main context when saved as long as the two objects belong in the child context.

What's strange is my colleague said he had a similar issue a few months ago and only solved it by making the relationship unordered in the Core Data schema.

Something is fishy with `NSOrderedSet` and Core Data. We tried using both the generated Core Data accessors and setting the relationship preoprty to a newly created set, but both yielded similar results.

If anyone has any hypothesis as to why this might have been happening, please do get in touch.
