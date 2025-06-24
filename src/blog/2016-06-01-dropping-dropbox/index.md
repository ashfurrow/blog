---
title: Dropping Dropbox
date: 2016-06-01
banner: background.jpg
bannerAttribution: https://twitter.com/CloudyConway/status/737620064803934208
---

Over the weekend, I [lamented the death of Dropbox](https://ashfurrow.com/blog/bittorrent-sync/). Well, they're not _dead_, just dead _to me_. I discussed setting up [BitTorrent Sync](https://getsync.com) and some of the security problems with common setup tutorials, and got some great feedback. A few people pointed to [Sync](https://www.sync.com/?_sync_refer=a140360) (referral link), which after investigating, I'm pleased to say is awesome and has become my Dropbox replacement.

My goal online is to minimize the surface area I expose to internet mass surveillance. An absolutist approach would be to only use open source software, with keys that I generate, and on a server that I physically control. That's just... way too much work. The reason that Dropbox is so popular is that it's so convenient, and I was hoping to get something _like_ Dropbox in terms of convenience, but with a reduced risk of being surveilled.

And this is why I like Sync: it's premise is really simple. It's a folder, and that folder syncs. Oh, and it's end-to-end encrypted.

Nice.

Their site is really targeted at normal users who are looking for a turn-key encrypted sync product, which makes a lot of sense. For us nerds who want to know the more technical details, they [have a white paper](https://www.sync.com/pdf/sync-privacy.pdf) available. It explains a lot of the technical decisions and implementation details of an end-to-end encrypted sync solution that supports web access. I'd recommend reading it, but the tl;dr is that the web interface is a completely client-side app. It downloads your encrypted data and encrypted keys from their servers, uses your password's BCRYPT hash to decrypt the keys, and then uses the keys to decrypt your data. At no point are the plaintext keys or data on their server, which is easy to verify by looking at the browser's source code and network activity.

Like BitTorrent Sync, Sync is a commercial product, so there's some amount of trust that you're putting in them. That's part of the compromise I mentioned earlier, and Sync is the right level of compromise for me.

Oh, and they're based in Toronto, so there's a bit of patriotism involved for me (and the fact that it's not America).

My requirements for a Dropbox replacement were: a folder that securely syncs, that I can access on my phone, and that I can selectively share with others. Sync gets everything right. I'd [recommend trying them out](https://www.sync.com/?_sync_refer=a140360).
