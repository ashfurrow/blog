---
title: 5 Years of iOS
date: 2014-12-21
socialImage: header.jpg
banner: header.jpg
---

In December, 2009, I started doing iOS development. That means that this month – almost to the day – I've been doing iOS for five years, meaning I'm finally qualified for an entry-level corporate job requiring 5-7 years experience. Kidding aside, I thought it would be nice to look back on the past half-decade of my life and pick out some events that were important to getting me where I am today.

This isn't meant to be a guide or advice in any way – this is just me reflecting on my experience and sharing it with you. I've had several personal revelations while writing this. It's been a really fun experience, but it's a pretty personal post, so feel free to skip it.

In the Fall of 2009, things seemed like they should be pretty good. In my third year of a five-year degree, I was a student volunteer: I helped with the student union to represent our faculty, the undergrad faculty association to organize social events, and as a peer mentor to assist first-year students with their homework. I was also doing some paid TA work to mark first-year assignments and help students in the computer labs. And finally, I was working part-time for Research in Motion.

But things were not good. My then fiancée had finally convinced me to see the university counsellor about some compulsive thoughts about hurting myself that I had been having for months. I had my intake appointment, but wouldn't start counselling until after the Christmas break.

Christmas breaks, I had learnt, are boring affairs. With no homework or term projects to work on, my mind would get restless. That year, we were spending the break with Ashley's family in rural Nova Scotia. I wanted to spend some time learning to make iOS apps. Ashley agreed to let me borrow her MacBook (mine was a G4, so I couldn't write iOS apps on it).

import xcode from './xcode.png'
import coffeetimericon from './coffeetimer.png'
import wwdc2010 from './wwdc2010.jpg'
import coffeetimer2 from './coffeetimer2.png'
import unb from './unb.png'
import simulator from './simulator.png'
import wedding from './wedding.jpg'
import graduated from './graduated.jpg'
import started500px from './started500px.jpg'
import \_500px from './500px.jpg'
import podcast from './podcast.jpg'
import storygram from './storygram.png'
import startedphotography from './startedphotography.jpg'
import apple from './apple.jpg'
import photohour from './photohour.png'
import wwdc2012 from './wwdc2012.jpg'
import fitc from './fitc.jpg'
import \_500pxiphone from './500pxiphone.jpg'
import springboard from './springboard.jpg'
import \_35mm from './35mm.png'
import notificationcenter from './notificationcenter.jpg'
import amsterdam from './amsterdam.jpg'
import artsy from './artsy.jpg'
import artbasel from './artbasel.jpg'
import conferences from './conferences.jpg'
import eidolon from './eidolon.jpg'
import film from './film.jpg'

<PersonalTimeline
entries={[
{ date: '2009' },
{
title: 'Opened Xcode',
img: xcode,
imgAlt: "Xcode's icon",
description: [
"I worked from the basement of Ashley's mother's house (there was no WiFi so I had to connect directly to their modem with ethernet). Armed with cs193p courses from Stanford (instructed that year by Evan Doll), I learnt the basics of iOS app structure.",
"I also had a few reference books and some help from a friend. <a href='http://twitter.com/jasonbrennan'>Jason Brennan</a> and I talked a lot over Google Wave. He helped me with everything from syntax of Objective-C to quirks of Xcode."
]
},
{
title: 'Coffee Timer',
img: coffeetimericon,
imgAlt: 'App icon with a steaming cup of coffee in the middle.',
description: [
'This was to be my first app. I wanted to create something that I would want to use. I really liked using a coffee press but would often forget it was brewing and spoil the coffee. A timer to make coffee would be perfect: simple enough to execute but meaningful enough to motivate me.',
"The app was pretty simple: some models were deserialized from NSUserDefaults, presented in a table view, blah blah blah. It wasn't much, but it was mine and I was proud of it. Seeing my software run on my iPod touch for the first time was as close to a religious experience as I've ever had."
]
},
{ date: '2010' },
{
title: 'WWDC Scholarship',
description: [
"Someone, I think on Twitter, recommended that students apply for a WWDC scholarship. I had no idea what it was, but I figured I'd throw my hat in. I wrote about CoffeeTimer and some background about me, and then I forgot about it.",
'Weeks or months later, I got an email from Apple saying that I had won. I Googled &ldquo;WWDC&rdquo;, realized that this was kind of a big deal, and asked Ashley what I should do. She encouraged me to accept the offer and my parents helped me pay for my plane ticket to San Francisco. I quickly applied for a passport – this would be my first ever flight.'
]
},
{
title: 'WWDC 2010',
img: wwdc2010,
imgAlt: 'Photo of me standing in front of large display of app icons.',
description: [
'WWDC was an amazing experience. From the city of San Francisco to the energy in the air – it was incredible. The trip really opened up my eyes to what else is out there in the world – it was the spark that drove me to keep travelling.',
"The conference itself was amazing. The line for the keynote had as many people as are in my hometown. I made some friends inline – particularly <a href='http://twitter.com/philippec'>Philippe Casgrain</a> and <a href='http://twitter.com/iKenndac'>Daniel Kennett</a>.",
'iOS 4 and the iPhone 4 were announced. Xcode 4 was announced. GCD was ported to iOS (this was important to me, as I had recently learnt Haskell and used LINQ in .Net). I dove in.',
"One presentation really stood out to me: Chris Parker giving his annual &quot;What's new in UIKit talk. I had never seen a professional developer care so much about design. In the labs, I was lucky enough to talk to him in-person.",
'Later that week, I visited the Design lab and got feedback on CoffeeTimer. It was the first time I had met a designer.'
]
},
{
title: 'Metric Mate',
description: [
"While at WWDC, I had another idea for an app. It wasn't anything too special: just a metric/imperial unit calculator. But I made it so that it uses fractions instead of decimals, as well as colloquial terms like &quot;a pinch of salt&quot; or &quot;a stick of butter.&quot; I even had a section of things like converting rainbows to smiles. It was the first time that I made delightfulness a priority when making software."
]
},
{
title: 'First iPhone',
description: [
"That Summer, I bought my first ever iPhone. It was a big deal since, as a student, my budget was tight. However, the iPhone 4's retina display – a first of its kind – was compelling enough as a developer to justify it."
]
},
{
title: 'Redesign CoffeeTimer',
img: coffeetimer2,
imgAlt: 'Screenshot of an iPhone app for helping you make coffee.',
description: [
'Later, I redesigned CoffeeTimer with some basic Photoshop skills I had picked up from some online tutorials. In hindsight, it looks atrocious, but I was trying and learning.',
'I also switched from using NSUserDefault to Core Data for object persistence – my first experience with the framework.'
]
},
{
title: 'First Contract',
description: [
'That Fall, in preparation for a provincial election, the youth organization of one of the parties hired me to make them an iPhone app. It was my biggest undertaking: postal code lookups, GPS, maps, pulling data from a JSON file I had on the Internet, localization, and more. I was given free reign over the branding and eventually charged my client for 100 hours of work.',
'It was the first time that I had worked as a freelancer. The experience was mixed – there were communication problems with the client, and of course it was a hassle to get paid. But I had avoided the biggest mistake freelancers make: I had them sign a contract.'
]
},
{
title: 'Second Contract',
img: unb,
imgAlt: 'Screenshot of an iPad app for collecting contact information.',
description: [
'Emboldened by my success of my first contract, I looked around for more opportunities. My university was interested in using an iPad to collect information from potential students at recruitment fairs.',
'The technical aspects of the job were not difficult – the information would be transferred off of the devices via email. But the design of the product was problematic. While the recruitment office wanted as much information as possible, the recruiters knew that more fields for recruits to fill out would mean fewer people filled them out at all. It was my first experience balancing priorities between two stakeholders.'
]
},
{
title: 'Solar System Simulator',
img: simulator,
imgAlt: 'Screenshot of a solar system simulation',
description: [
'That fall, I took a course on computer graphics. Our term project had a few basic requirements: it had to use OpenGL directly, demonstrate use of dynamic camera angles, and feature moving objects. A partner and I chose a solar system simulator – a common choice. However, we developed our project for the iPad.',
'The project was really fun – and frustrating. Learning OpenGL was hard enough. Learning the version for embedded devices was even more difficult.',
"After the project was completed, I continued to develop the project into a universal app with some features we didn't have time for during the project. I put it on the App Store for a few dollars; until recently, it made about $100/month and was often purchased in-bulk by schools.",
'Looking at the software now, it looks horribly outdated. The code is even worse. But users liked it and it was a tremendous learning experience. Having three apps on the store would be a big help later when I looked for my first job.'
]
},
{ date: '2011' },
{
title: 'Completed Counselling',
description: [
"That Winter, I finished my counselling. It was a big deal for me because I had worked so hard to overcome my depression. Still, I kept it a secret. Looking back, I don't know why. I guess I was afraid that people would judge me for it – I didn't want it to define me. Not even my parents knew."
]
},
{
title: 'First Development Blog',
description: [
"Throughout university, I maintained a blog where I discussed religion and atheism. Eventually, once I pulled my head out of my ass, I created a brand-new blog devoted to writing about what I was learning in iOS development. I was inspired by an<a href='http://thedailyshow.cc.com/guests/arianna-huffington/tkrgq6/arianna-huffington'> interview with Arianna Huffington</a> about blogging: she said that blogging was writing down your thoughts as you have them, sharing your passion for a subject, and creating an intimate connection with your readers."
]
},
{
title: 'Three-day Workshop',
description: [
'The Dean of my faculty had approached me about teaching a three-day instructional workshop at the university. I was really excited about the opportunity and devoted a lot of time over the academic year to creating material for the course.',
'I was required to take a course every Saturday for 8 weeks to prepare me to instruct the workshop. It was a fantastic experience – many of the techniques I use when writing or speaking now come directly from that course.'
]
},
{
title: 'Married',
img: wedding,
imgAlt: 'Photo of my wife and I being silly at our wedding.',
description: [
'Only a few days after I finished teaching the course on iOS, I got married.'
]
},
{
title: 'Short Term Subcontracting',
description: [
"There were two months between getting married and moving to Toronto and I decided to work as a subcontractor for a local company. The work environment was … not ideal. There were problems getting paid at the end of my six-week contract. Finally, when the boss literally threw a cheque at me, he tried to snidely remark &ldquo;Ash, if you need help finding a job–&rdquo;, at which point I cut him off. &ldquo;I don't need your help getting a job&rdquo;, I said, and I walked away.",
'It was the first time that I had ever needed to stand up for myself professionally. I regret getting myself into that situation, but I learned to recognize when things are going sour.'
]
},
{
title: 'Graduated',
img: graduated,
imgAlt: 'Photo of my wife and I with me wearing a graduation gown.',
description: [
'I graduated 5 years after I set foot at university, only happening to be there because my mother told me from a young age in no uncertain terms that I would be attending university and because I liked computers. I graduated with Honours in Software Systems with a minor in Mathematics.'
]
},
{
title: 'Moved to Toronto',
description: [
'Moving to the largest city in Canada from my rural province was a big step. We moved there because my wife had been accepted into a Masters degree at the University of Toronto, and I was looking forward to a more diverse job market. I interviewed with a bunch of companies, but one start-up caught my attention and was willing to pay me a handsome salary.'
]
},
{
title: 'Started Terrible Job',
description: [
"The company insisted I start as quickly as possible. I obliged, even though I was hoping for some time off after moving to Toronto. When I got to work, they didn't have anything for me to do. So we started off on a wrong foot. The next month was spent in a pretty miserable state. My hands were bound by processes and plans that were already in place, and even though I couldn't assist the web team, my boss insisted that I should stay late, too (even though I often had nothing to do).",
"So a month in, I decided to quit. Being on my own, professionally, in a big city left me feeling isolated and afraid. I met a recruiter who insisted I stay at my current job to give us more leverage for a better salary at potential employers. If the company I was working for knew I was shopping around, they'd have fired me on the spot. The next month was spent sneaking off to do interviews.",
"I felt bad. Really bad. I dreaded going in to work and I hated myself for deceiving my employer by expressing enthusiasm about future plans even though I knew I wouldn't be a part of them. For the first (and only) time in my life, I started drinking at home to relieve my anxiety. If I could go back and change anything about my life, I'd have quit immediately.",
"Eventually, I found 500px. I wasn't looking forward to quitting – it was my first time – but my manager was pretty upset with me, so he didn't make me work the two weeks notice, or even the rest of the day.",
"On the way home I stopped at a library to print off a contract then dropped it off at 500px. I'd start on Monday."
]
},
{
title: 'Started at 500px',
img: started500px,
imgAlt: 'Photo of my business cards at 500px.',
description: [
'I started at an awesome company with an existing product that needed a mobile developer to work alongside their designer to create an iPad app mirroring their website. For the first few months, we worked out of a cramped incubator. I loved every second of it – my coworkers became close friends.'
]
},
{
title: 'Released 500px for iPad',
img: \_500px,
imgAlt: 'Screenshot of the 500px iPad app.',
description: [
"7 weeks into my tenure at 500px, we released the iPad app. I hated it – it was missing features and it had bugs. Everyone else loved it – it was covered on<a href='http://techcrunch.com/2011/10/17/gorgeous-photos-tablet-browsing-500px-debuts-new-ipad-app/'>Tech Crunch</a> and a number of other tech rags. I was not used to this feeling – knowing that something I had made was imperfect but having it praised by others."
]
},
{
title: 'My First Podcast',
img: podcast,
imgAlt: 'Photo of a microphone',
description: [
"Encouraged by our coworker, three of us started a podcast. <a href='http://twitter.com/tomcreighton'>Tom</a>, <a href='http://twitter.com/adamshutsa'>Adam</a>, and I would take an hour or so on Friday afternoons to have some fun, record musings on startup life, tech news, and design. Our <a href='http://themasterbranch.com/2011/12/force-episode-three/'>early episodes</a> had terrible audio quality, but I would slowly get better at recording and editing podcasts. These first episodes were some of the most fun I'd ever had."
]
},
{
title: 'Storygram',
img: storygram,
imgAlt:
'Screenshot of an iPad app with rainbows and a Polaroid camera and spray paint.',
description: [
'At a hackathon organized by 500px, Tom and I worked together to create an app called Storygram. You would use it to collect photos from your Instagram account into a 500px photo blog post. Because we <del>are both immature children</del> have great senses of humour, we tried to make the design as ridiculous as possible. By the end of the weekend, we had something we would submit to the App Store. Since we were 500px employees and ineligible for a prize, the judging panel would award us an honourable mention.'
]
},
{ date: '2012' },
{
title: 'TACOW',
description: [
"I had been attending <a href='http://www.meetup.com/tacow-org/'>TACOW</a> a Toronto-based iOS/OS X/WebObjects developers meetup group. I began attending when I first moved to Toronto and in 2012, I started giving the occasional presentation. These were my first non-academic talks.",
'But TACOW was more than just an opportunity to practice my speaking skills – it was a place to learn in the company of friends. And then go out for beers and chicken wings. I learnt a lot at these meetings and made some great friends.'
]
},
{
title: 'Started Photography',
img: startedphotography,
imgAlt: 'Photo of a camera',
description: [
"Working at 500px, a website for photographers, meant that I worked with mostly photo-junkies. It wasn't long before I was bitten by the bug. I bought a used Canon Rebel on eBay and a fast prime lens. Photography would become my main creative outlet and a great source of both stress-relief and strength in some difficult times ahead."
]
},
{
title: 'Approached by Publisher',
description: [
"After finding my blog, a publisher approached me with a unique proposition: another author wanted to write a book on Objective-C but didn't want to write the (boring) early chapters. Would I be willing to write them?",
"I wasn't an expert at much, but I accepted. Through thorough research for the book, I'd become well-versed in the underpinnings of Objective-C and the Foundation framework."
]
},
{
title: 'Job Interview at Apple',
img: apple,
imgAlt: "Photo of Apple's corporate office entrance.",
description: [
"One day, I got an email from an Apple recruiter about a position on the Siri UI team. I had a few phone interviews and was flown down for a day of<a href='https://ashfurrow.com/blog/my-job-interview-with-apple/'> interviews in Cupertino</a>. Apple decided I wasn't ripe yet, and I decided that I didn't really want to work for Apple."
]
},
{
title: 'Photo Hour',
img: photohour,
imgAlt:
'An app icon that looks like the back of a camera with a sunrise on the camera screen',
description: [
'Being an iOS developer into photography as a hobby, I naturally wanted to make an app for photographers. I had just learnt the significance of the golden hour when taking photos, so I decided to make an app that would tell you the best time to take pictures. It was very focused – you hit one button to update to your current location and you hit another to switch between morning and evening.',
"With Adam's help, I designed the application before writing any code. He made me a wonderful icon and I put it on the<a href='https://itunes.apple.com/ca/app/photo-hour/id524263013?mt=8'> App Store</a>."
]
},
{
title: 'WWDC 2012',
img: wwdc2012,
imgAlt: 'Photo of my WWDC badge for 2012',
description: [
'I attended my second WWDC the year that iOS 6 was announced. I was excited by all of the new APIs and spent a lot of time that week playing with them in the labs. Collection views interested me in particular, since the 500px iPad app used a lot of grids.'
]
},
{
title: 'Blogging',
description: [
"In the weeks ahead of iOS 6's launch (remember kids, this was when you couldn't talk publicly about new APIs), I drafted several blog posts about new APIs in iOS 6. When the day of the launch came, I released them all, making my blog an oft-cited resource in the iOS community. Awesome."
]
},
{
title: 'New Publisher',
description: [
"Noticing my expertise in iOS 6 APIs, and wanted to capitalize on developer interest in the subject, a new publisher approached me about writing a book for them. The book is now in its<a href='http://www.amazon.com/iOS-UICollectionView-Complete-Mobile-Programming-ebook/dp/B00CFLTD50/ref=sr_1_2?ie=UTF8&amp;qid=1419356862&amp;sr=8-2&amp;keywords=uicollectionview'> second edition</a>."
]
},
{
title: 'Trouble at Work',
description: [
'Since shortly after the new year, things started to change. Slowly, I could feel something was different. Decisions were made that I disagreed with on a fundamental level. The company became a place where I was no longer happy.'
]
},
{
title: 'Spoke About 500px at FITC Screens',
img: fitc,
imgAlt: 'Photo of me presenting a slideshow.',
description: [
'In the Fall, I gave my first conference presentation at FITC Screens in Toronto. It was a talk looking back at what Adam and I had learnt over the past year working together on 500px for iPad. He designed the slides and helped write the content. The talk went well.'
]
},
{
title: 'Plunged Into Depression',
description: [
"The situation at work became more complex. I don't want to get into specifics. The consequence of the situation was that I was working 70+ hour weeks for two months under very stressful work conditions.",
"To make a bad situation worse, my wife was on a work placement in Thunder Bay during the two months I was working my ass off. Having been together six years at that point, I wasn't accustomed to handling stress by myself. I fell<a href='https://ashfurrow.com/blog/depression-sucks/'> further into depression</a> than I ever had before and nearly killed myself."
]
},
{
title: 'Released 500px iPhone App',
img: \_500pxiphone,
imgAlt: 'Photo of the 500px iPhone app.',
description: [
"Finally, after a monumental effort on the part of everyone on the mobile team, we launched the 500px iPhone application. I felt triumphant, but the management was not happy with my performance. I requested to attend a conference that had invited me to speak in the new year. The answer was no. I remember the words they used exactly: &quot;this is not a punishment – it's just not a reward.&quot;",
'I felt betrayed. So I made the decision to quit.',
'I wanted to work for a company that I respected and whose values matched mine. I looked at the companies around Toronto, and during the Christmas break, I confirmed details with Teehan+Lax to start working for them in the new year.'
]
},
{ date: '2013' },
{
title: 'Quit 500px',
description: [
'The first day after the break, I submitted my resignation, giving them three weeks notice.',
"Major changes to the management at 500px in the following two years leads me to believe that the things that made me unhappy there have been addressed. I'm still grateful for the opportunity I had to work there, and I'm still proud of everything that the team accomplished."
]
},
{
title: 'Objective-C Vitamins Talk',
description: [
"Between 500px and Teehan+Lax, I gave a talk called<a href='https://speakerdeck.com/ashfurrow/objective-c-vitamins'> Objective-C Vitamins</a>. This put me on the radar of the CocoaPods team."
]
},
{
title: 'Started at Teehan+Lax',
description: [
"In February, I started at <a href='http://teehanlax.com'>Teehan+Lax</a>, a digital agency in Toronto. Our values significantly overlapped, giving me an opportunity to contribute and create open source projects, as well as write technical blog posts. I also learnt a great deal about design and business, especially from Jon Lax. I felt privileged to work there."
]
},
{
title: 'Medication',
description: [
"Even though the stress of my previous job was no longer causing me anxiety, I was still in a depressive funk. Eventually, I saw a doctor and began medication. Over the next few months, I'd grow to understand just how bad things had been."
]
},
{
title: 'Started Springboard',
img: springboard,
imgAlt:
'Podcast icon with a microphone and a subtitle that says "Springboard".',
description: [
"While still producing the first podcast I cohosted with Tom and Adam, I branched out into doing a podcast of my own: an interview show discussing the origins of experienced developers. I called it <em><a href='http://springboardshow.com'>Springboard</a></em>, a pun on the name of the iOS system that starts apps when you tap them.",
'My goal was to help newcomers to iOS by letting them know that the kinds of cool developers they look up to were beginners once, too. By asking other developers to share their stories, and through careful use of inclusive language, Springboard grew to a height of over 5 000 active listeners.'
]
},
{
title: 'WWDC 2013',
description: [
'My coworker Brendan and I won the 71-second long WWDC lottery of 2013. We stayed in the same hotel as I had stayed in in 2010 – mostly because I wanted to relive my first year at the conference, but reality never lives up to nostalgic expectations. During the conference, I gave a talk on ReactiveCocoa at a side-event. I got to meet Josh Abernathy and Justin Spahr-Summers, two of the core contributors to ReactiveCocoa.',
"I also got to meet some of the CocoaPods team in-person that week, including <a href='http://twitter.com/alloy'>Eloy</a> and <a href='http://twitter.com/orta'>Orta</a>."
]
},
{
title: 'Crowdfund New Book',
description: [
"That Summer, I<a href='https://www.indiegogo.com/projects/your-first-ios-app'> crowdfunded a new book</a> about starting iOS development. It would feature everything from opening your first Xcode project to implementing code to submitting to the App Store. A new, Swift-based version is <a href='https://leanpub.com/yourfirstswiftapp'>being written now</a>."
]
},
{
title: '35mm app',
img: \_35mm,
imgAlt:
'Marketing image of a photo magazine with the title "Compelling Collections".',
description: [
'Over the Summer, I had worked with Tom and another former colleague from 500px named Debbie. We created a Newsstand app called 35mm that featured curated photography for a monthly subscription of $1. Tom designed it, I wrote it (including a rudimentary backend – a real accomplishment for me), and Debbie found photographers to feature.',
"We started the app later in the year, but shut it down after fewer than 10 issues due to lack of interest. We had about 120 subscribers worldwide. Our hypothesis that people wanted curated photography presented in a minimal, ad-free environment and were willing to pay literally the smallest amount of money we could charge for it didn't pan out.",
'But we had a great time, and I enjoyed working with my two friends.'
]
},
{
title: 'First Major conference Talk (360|iDev)',
description: [
"A talk proposal I had submitted to <a href='http://360idev.com'>360|iDev</a> had been accepted and I flew down to Denver. It was there that I met Mike Lee, who told me about the really great developer community in Amsterdam."
]
},
{
title: 'Teach Small Class in Toronto',
description: [
"I hadn't taught a workshop recently, but I was able to leverage code and content from my books to teach a small weekend workshop on iOS development. I realized that I had built up a small, but growing, repertoire of teaching material."
]
},
{
title: 'ReactiveCocoa Book',
description: [
'After the success of my crowdfunded, self-published book, I excitedly wrote another on ReactiveCocoa. My wife was away again, so the book took up most of my spare time. I finished in 6 weeks.'
]
},
{
title: 'Started Notification Center',
img: notificationcenter,
imgAlt: 'Podcast icon that with the title "Notification Center".',
description: [
"That Fall, I wanted to produce a talk show about the iOS world. No set agenda, just me and a friend talking shop. <a href='http://notificationcenter.tv'>Notification Center</a> has covered topics ranging from complex Core Data issues to the legitimacy of moon-landing conspiracies."
]
},
{
title: 'Decide to move to Amsterdam',
description: [
'On the first Friday in December, my wife and I decided to move to Amsterdam. We spent the weekend in an frenzy to look into what would be required. One of the biggest reasons to stay in Toronto was that I loved my job. Leaving Toronto would mean leaving Teehan+Lax. But we decided there would always be reasons <em>not</em> to move and we ought to go for it.',
"On Monday, I spoke with Jon and told him of our plan to move to Europe and gave him more than 2 months' notice: Valentine's Day would be my last day."
]
},
{
title: 'C-41',
description: [
"Over the Christmas break, I designed and implemented an <a href='https://github.com/ashfurrow/C-41'>open source</a> app called <a href='https://itunes.apple.com/ca/app/c-41/id789924103?mt=8'>C-41</a>. It was largely an exercise in ReactiveCocoa and MVVM. It had no reason not to be open source, so it was."
]
},
{ date: '2014' },
{
title: 'Leave Teehan+Lax',
description: [
"I thoroughly enjoyed working with everyone at Teehan+Lax and I'm proud of everything I accomplished there. I learnt a lot and grew as a professional."
]
},
{
title: 'Move to Amsterdam',
img: amsterdam,
imgAlt: 'Photo of a luggage cart.',
description: [
"Moving to Amsterdam is one of the biggest, scariest, most wonderful decisions that I've ever made. The experience of living in a whole new country has given me the broader perspective that I had hoped for."
]
},
{
title: 'Bump into Orta',
description: [
"I spoke at the <a href='http://mdevcon.com'>mdevcon</a> conference here in Amsterdam. While hanging around, I bumped into Orta and we hung out at the apartment some of his friends had rented. We did some pair programming on some open source stuff he was working on – it was, as the Dutch say, &ldquo;pretty gezellig.&rdquo; Orta mentioned if I was ever interested in working together at <a href='http://artsy.net'>Artsy</a> that I should get in touch."
]
},
{
title: 'Treehouse Course',
description: [
"I had been speaking with the fine folks at <a href='http://teamtreehouse.com/'>Treehouse</a> about teaching a course on Core Data. Shortly after arriving in Europe, I flew back to North America to record the course at Treehouse's Orlando studios."
]
},
{
title: 'Dutch Job',
description: [
"During my first week in Amsterdam, I went in to my soon-to-be employer to go over some details. As time went on, I reflected on our meeting. As my start date approached, I felt a greater and greater feeling of dread until I finally<a href='https://ashfurrow.com/blog/job-hunt/'> made the decision</a> to not start.",
'This was a really difficult decision for me – when I make a commitment, I intend to keep it. But I had learnt to trust my feelings.'
]
},
{
title: 'Freelance at Mindsea',
description: [
"In the meantime, I was able to do some freelance work for <a href='http://www.mindsea.com'>Mindsea</a>, a Canadian agency based in the region of Canada I grew up in. They were great to me and I learnt a lot from them and<a href='http://www.mindsea.com/2014/04/up-and-running-with-mindsea-doing-it-the-right-way/'> their approach</a> to iOS work."
]
},
{
title: 'DM Orta',
description: [
"I didn't know what I was going to do. I was in a foreign country with no job and a quickly draining bank account. I remember Orta's offer, so I took a look at Artsy's <a href='https://artsy.net/job/mobile-engineer'> job description</a> and was absolutely floored. It's description fit me so well that I couldn't believe it. They had a fantastic <a href='http://artsy.github.io/'>engineering blog</a>, and I had used some of their <a href='http://artsy.github.io/open-source/#iOS'> open source</a> libraries in my own apps.",
"I DM'd Orta, had a few Skype calls, flew to London to meet with one of their developers, and got the green-light while I was in Paris with my wife for her birthday. I started in April."
]
},
{
title: 'Start at Artsy',
img: artsy,
imgAlt: 'Photo of the Artsy logo at an art show.',
description: [
'Artsy is a unique company. They value things like compassion and love while working with an &ldquo;art meets science&rdquo; mentality to accomplish something really worthwhile.',
"I've never felt like I fit-in as much as I do at Artsy."
]
},
{
title: 'WWDC 2014',
description: [
"I attended WWDC again this year and it was a blast. I gave a talk at AltConf and met so many awesome people. And I was <a href='https://ashfurrow.com/blog/whelp./'>recognized</a> by other developers – something that still kind of freaks me out sometimes.",
'Most of my week was spent in Swift sessions or in Swift labs. I even got to meet Dave Addey.'
]
},
{
title: 'Art Basel',
img: artbasel,
imgAlt: 'Photo of a red 3D arrow going up and down, mostly up.',
description: [
"Shortly after WWDC, I got the opportunity to attend Art Basel, one of the most important art fairs in the world. It was an amazing experience that I can't do justice here, but it was here that Artsy's goals <a href='https://ashfurrow.com/blog/reflections-on-art-basel-2014/'>really clicked</a> for me."
]
},
{
title: 'Depression',
description: [
"Things were hard over the Summer. Through a series of random doctors prescribing different prescriptions (my medication isn't available in The Netherlands), I was on an emotional roller coaster. I wouldn't leave the house for days and I didn't even touch my cameras. Only in the Fall would I finally find a psychiatrist that I could see regularly. I feel much better now."
]
},
{
title: 'Blog Transition',
description: [
"By now, I had gained a solid understanding of a variety of web technologies. I felt confident in building my own site,<a href='https://ashfurrow.com/blog/fresh-coat-of-paint/'> so I did</a>. It was an amazing learning experience from the perspective of a developer and a designer."
]
},
{
title: 'European Conference Tour',
img: conferences,
imgAlt: 'Photo of me looking nonchalant on a large stage.',
description: [
"Since I arrived in Amsterdam, I've been contacted by a bunch of conferences and meetup groups all based in Europe. I accepted as many as possible. My wife accompanied me on a lot of trips, giving us a great reason to see new places. I am so grateful for the opportunity to<a href='https://ashfurrow.com/blog/lessons-learned-travelling-europe/'> travel</a> and meet so, so many new friends."
]
},
{
title: 'Eidolon',
img: eidolon,
imgAlt: 'Photo of an encased iPad at an art auction.',
description: [
"<a href='http://github.com/artsy/eidolon'>Eidolon</a> is Artsy's art auction kiosk application. It is completely open source, written in Swift, and built using the functional-reactive paradigm and ReactiveCocoa. I've got a<a href='http://artsy.github.io/blog/2014/11/13/eidolon-retrospective/'> write-up</a> describing the whole process, but sufficed to say that I had an <em>awesome</em> time building this."
]
},
{
title: 'Film Photography',
img: film,
imgAlt: 'Photo of me holding a very old camera with bellows.',
description: [
"I really love photography, but I hadn't done much during the Summer, even though I was surrounded by the totally awesome Dutch countryside. Oddly enough, it was an<a href='https://ashfurrow.com/blog/100-years-ago/'> ad campaign</a> that re-sparked my hobby. I started shooting again – shooting <em>a lot</em>. Mostly <a href='https://ashfurrow.com/blog/price-of-film/'>on film</a>. I even started developing at home again.",
"As a software developer, I spend so much of my time working on complex software problems and, I've often found taking a break to exercise my creativity helps me sort through problems. It's really gratifying to have a hobby that's not related to computers."
]
}
]}
/>

Our Dutch visas expire in February and without a Dutch employer, we can't stay any longer. Artsy is based in New York and Canadians have a pretty easy time getting work visas, so we'll be moving there in February. As much as I will miss Amsterdam and all the friends I have here, I am looking forward to a new adventure.
