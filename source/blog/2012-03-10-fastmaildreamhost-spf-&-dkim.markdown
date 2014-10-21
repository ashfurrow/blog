---
title: "Fastmail/Dreamhost SPF & DKIM"
date: 2012-03-10 00:00
---

<import><p>My boss pointed out that, with my new email provider, GMail is displaying a weird message in the "from" field:
</p>
<img src="/img/import/blog/2012/03/fastmaildreamhost-spf-dkim/15C1BA0E3B074A45851234727DD41140.png" class="img-responsive">Turns out I needed to add two custom TXT-type DNS records in Dreamhost. One is SPF and the other is DKIM. These custom records will get rid of "<code>via messaging engine.com</code>."<!--more--><p></p>
<p>Email, DNS, and the whole "system administration" thing is really <em>not</em> my thing. I'm an iOS guy, so I don't really like to fuck around with <em>servers</em>. But I managed to figure it out:</p></import>

<!-- more -->

