---
title: "Switching from GMail to FastMail"
date: 2012-03-01 00:00
---

<import><p>I'm beginning a switch from GMail to my own hosted IMAP service at <a href="http://www.fastmail.fm/?STKI=7977317" target="_blank">FastMail.fm</a>. This represents a larger shift in my online presence that began over a year ago. It started with a move away from Blogger to my own hosted WordPress blog, and is representative of my desire to have more control over my data. "Control" isn't the right word - I am becoming more selective over who I choose to allow access to my data.<!--more-->
I've been avoiding it for some time now - about 6 months, in fact. Google came out with Google+, their half-assed attempt at a social networking. Their effort to force me to be social in the way I search has been getting creepier and creepier the whole time, at once collecting more information while making it harder and harder to use their services. A combination of recent changes to their site designs and services, and an explanation by <a href="http://wiki.5by5.tv/wiki/Kindacritical_(5by5_Specials_4)" target="_blank">Marco Arment</a> about how he would switch if he were on GMail, finally got me to take the plunge.</p>
<p>All of my GMail inbound mail is forwarded to <a href="mailto:ash@ashfurrow.com" target="_blank">ash@ashfurrow.com</a>. I was going to go with "me@ashfurrow.com", but Paddy and Jason pointed out that, from their perspective, it really should be "you@ashfurrow.com", so I've avoided pronouns altogether.</p>
<p>It's a different feeling. I <em>own</em> my data. Yes, I am responsible for it, but I'm <em>the only person who can read my email</em>.</p>
<p>I'm having GMail retain a copy of forwarded messages for now to make sure everything is working correctly. I'll be using 1Password to determine which sites I use my old GMail address to log in with and change those profiles. Hopefully, by the end of March, I'll be ready to have GMail delete all forwarded messages. I also want to move any archived mail to a personal IMAP backup. By the end of 2012, I'm planning on being able to delete my Google Account altogether.</p>
<p>Why so long? Because it's not just mail: it's my Google Analytics for my websites and iOS apps; It's the Google Documents that I share with my wife; It's our monthly budget that Google has access to. It's everything they have.</p>
<p>Let me be perfectly clear here: Google has never let me down. For years - as long as I've been a user - they have provided improvement after improvement and haven't asked for a dollar in return. They kept making their services better and better, and I've never once had a problem getting access to my data. But lately, they've been creeping me out: removing features from Google Documents without any prior notice, for instance. They can just make a decision and it could affect <em>any part</em> of my life. That kind of stresses me out, man! If I host my own mail, yes it's a pain, but it's also a delight to know that I am bound only to a domain to which I own the rights.</p>
<p>If you're thinking of making the switch and moving to FastMail, please use my <a href="http://www.fastmail.fm/?STKI=7977317" target="_blank">affiliate link</a>. Their user interface isn't exactly <em>great</em>, but I managed to figure out what to do. These instructions are for changing from GMail to FastMail at a custom domain you already own:</p>
<ol>
<li>Create an account. To use email at an existing domain, like I'm doing, you'll need their "Enhanced" plan. It's $40/year and includes 10GB of email storage, full access to POP/IMAP/SMTP/Jabber, and lots of other features (like using your own host).</li>
<li>Options -&gt; Virtual Domains -&gt; Add Domain. In my case, this was ashfurrow.com.</li>
<li>Options -&gt; Virtual Domains -&gt; Add Alias. Here you set up the email address at which you want to receive mail. Wildcards are acceptable here, as well.</li>
<li>If you're currently using Google Accountshttp://google.com/a/cpanel/<em>ashfurrow.com</em>, replacing my domain with yours and delete all of your users and then under Account Settings, delete your account.</li>
<li>Add custom MX records to your DNS provider. I host over Dreamhost, so I logged into the Panel, clicked "Mail" to open their sidebar menu, clicked "Custom MX/Gmail" and finally "edit" beside my domain. You want to add "Custom MX Records." <em><strong>Do not</strong></em> change your name server DNS records unless you want to host your website with FastMail, too. The MX records are:
<ul type="disc">
<li>in1-smtp.messagingengine.com, priority=10</li>
<li>in2-smtp.messagingengine.com, priority=20</li>
</ul>
</li>
<li>Wait.</li>
<li>Eventually, FastMail will email you to let you know the transfer was successful. At this point, you can set up your mail client using <a href="https://www.fastmail.fm/help/remote_email_access_server_names_and_ports.html?MLS=VD-*&amp;Ust=82c0e469.8cbc41d7&amp;MSS=!OP-*&amp;UDm=49" target="_blank">their settings</a>.</li>
<li>Start forwarding any email to your new address.</li>
</ol>
<p>In a month's time, I'll let you know how I'm faring.</p></import>

<!-- more -->

