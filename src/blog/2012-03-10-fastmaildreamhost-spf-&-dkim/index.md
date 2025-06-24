---
title: Fastmail/Dreamhost SPF & DKIM
date: 2012-03-10
---

My boss pointed out that, with my new email provider, GMail is displaying a weird message in the "from" field:

![](15C1BA0E3B074A45851234727DD41140.png)Turns out I needed to add two custom TXT-type DNS records in Dreamhost. One is SPF and the other is DKIM. These custom records will get rid of "`via messaging engine.com`."

Email, DNS, and the whole "system administration" thing is really _not_&nbsp;my thing. I'm an iOS guy, so I don't really like to fuck around with _servers_. But I managed to figure it out:
