import React from 'react'
import {
  Timeline as ReactTimeline,
  Events,
  Event,
  themes,
  createTheme
} from '@merc/react-timeline'

import xcode from './xcode.png'
import coffeetimer from './coffeetimer.png'
import wwdc2010 from './wwdc2010.jpg'
import coffeetimer2 from './coffeetimer2.png'
import unb from './unb.png'
import simulator from './simulator.png'
import wedding from './wedding.jpg'
import graduated from './graduated.jpg'
import started500px from './started500px.jpg'
import _500px from './500px.jpg'
import podcast from './podcast.jpg'
import storygram from './storygram.png'
import startedphotography from './startedphotography.jpg'
import apple from './apple.jpg'
import photohour from './photohour.png'
import wwdc2012 from './wwdc2012.jpg'
import fitc from './fitc.jpg'
import _500pxiphone from './500pxiphone.jpg'
import springboard from './springboard.jpg'
import _35mm from './35mm.png'
import notificationcenter from './notificationcenter.jpg'
import amsterdam from './amsterdam.jpg'
import artsy from './artsy.jpg'
import artbasel from './artbasel.jpg'
import conferences from './conferences.jpg'
import eidolon from './eidolon.jpg'
import film from './film.jpg'

import Theme from '../../config/Theme'
import Wide from '../../src/components/Wide'
import { camelCase } from 'lodash'

const customTheme = createTheme(themes.default, {
  card: {
    backgroundColor: '#eee'
  },
  date: {
    backgroundColor: Theme.colors.primary
  },
  marker: {
    borderColor: Theme.colors.primary
  },
  timelineTrack: {
    backgroundColor: Theme.colors.primary
  }
})

const Entry: React.FC<{ img?: string; title: string }> = ({
  img,
  title,
  children
}) => {
  const anchorName = camelCase(title).toLowerCase()
  return (
    <Event date={img && (() => <img src={img} className="eventImage" />)}>
      {title && (
        <>
          <h3 id={anchorName}>
            {title}
            <a
              href={`#${anchorName}`}
              onClick={event => {
                event.preventDefault()
                ;(event.target as any).parentNode.scrollIntoView(true)
              }}
            >
              #
            </a>
          </h3>
        </>
      )}
      {children}
    </Event>
  )
}

export class Timeline extends React.Component {
  componentDidMount() {
    if (window.location.hash) {
      const element = document.getElementById(
        window.location.hash.replace('#', '')
      )
      if (element) {
        setTimeout(() => (element as any).parentNode.scrollIntoView(true), 150)
      }
    }
  }

  render() {
    return (
      <Wide>
        <ReactTimeline theme={customTheme}>
          <Events>
            <Event className="year" date="2009" />

            <Entry title="Opened Xcode" img={xcode}>
              <p>
                I worked from the basement of Ashley's mother's house (there was
                no WiFi so I had to connect directly to their modem with
                ethernet). Armed with cs193p courses from Stanford (instructed
                that year by Evan Doll), I learnt the basics of iOS app
                structure.
              </p>
              <p>
                I also had a few reference books and some help from a friend.{' '}
                <a href="http://twitter.com/jasonbrennan">Jason Brennan</a> and
                I talked a lot over Google Wave. He helped me with everything
                from syntax of Objective-C to quirks of Xcode.
              </p>
            </Entry>

            <Entry title="Coffee Timer" img={coffeetimer}>
              <p>
                This was to be my first app. I wanted to create something that I
                would want to use. I really liked using a coffee press but would
                often forget it was brewing and spoil the coffee. A timer to
                make coffee would be perfect: simple enough to execute but
                meaningful enough to motivate me.
              </p>
              <p>
                The app was pretty simple: some models were deserialized from
                NSUserDefaults, presented in a table view, blah blah blah. It
                wasn't much, but it was mine and I was proud of it. Seeing my
                software run on my iPod touch for the first time was as close to
                a religious experience as I've ever had.
              </p>
            </Entry>

            <Event className="year" date="2010" />

            <Entry title="WWDC Scholarship">
              <p>
                Someone, I think on Twitter, recommended that students apply for
                a WWDC scholarship. I had no idea what it was, but I figured I'd
                throw my hat in. I wrote about CoffeeTimer and some background
                about me, and then I forgot about it.
              </p>
              <p>
                Weeks or months later, I got an email from Apple saying that I
                had won. I Googled "WWDC", realized that this was kind of a big
                deal, and asked Ashley what I should do. She encouraged me to
                accept the offer and my parents helped me pay for my plane
                ticket to San Francisco. I quickly applied for a passport – this
                would be my first ever flight.
              </p>
            </Entry>

            <Entry title="WWDC 2010" img={wwdc2010}>
              <p>
                WWDC was an amazing experience. From the city of San Francisco
                to the energy in the air – it was incredible. The trip really
                opened up my eyes to what else is out there in the world – it
                was the spark that drove me to keep travelling.
              </p>
              <p>
                The conference itself was amazing. The line for the keynote had
                as many people as are in my hometown. I made some friends in
                line – particularly{' '}
                <a href="http://twitter.com/philippec">Philippe Casgrain</a> and{' '}
                <a href="http://twitter.com/iKenndac">Daniel Kennett</a>.
              </p>
              <p>
                iOS 4 and the iPhone 4 were announced. Xcode 4 was announced.
                GCD was ported to iOS (this was important to me, as I had
                recently learnt Haskell and used LINQ in .Net). I dove in.
              </p>
              <p>
                One presentation really stood out to me: Chris Parker giving his
                annual &quot;What's new in UIKit talk. I had never seen a
                professional developer care so much about design. In the labs, I
                was lucky enough to talk to him in-person.
              </p>
              <p>
                Later that week, I visited the Design lab and got feedback on
                CoffeeTimer. It was the first time I had met a designer.
              </p>
            </Entry>

            <Entry title="Metric Mate">
              <p>
                While at WWDC, I had another idea for an app. It wasn't anything
                too special: just a metric/imperial unit calculator. But I made
                it so that it uses fractions instead of decimals, as well as
                colloquial terms like &quot;a pinch of salt&quot; or &quot;a
                stick of butter.&quot; I even had a section of things like
                converting rainbows to smiles. It was the first time that I made
                delightfulness a priority when making software.
              </p>
            </Entry>

            <Entry title="First iPhone">
              <p>
                That Summer, I bought my first ever iPhone. It was a big deal
                since, as a student, my budget was tight. However, the iPhone
                4's retina display – a first of its kind – was compelling enough
                as a developer to justify it.
              </p>
            </Entry>

            <Entry title="Redesign CoffeeTimer" img={coffeetimer2}>
              <p>
                Later, I redesigned CoffeeTimer with some basic Photoshop skills
                I had picked up from some online tutorials. In hindsight, it
                looks atrocious, but I was trying and learning.
              </p>
              <p>
                I also switched from using NSUserDefault to Core Data for object
                persistence – my first experience with the framework.
              </p>
            </Entry>

            <Entry title="First Contract">
              <p>
                That Fall, in preparation for a provincial election, the youth
                organization of one of the parties hired me to make them an
                iPhone app. It was my biggest undertaking: postal code lookups,
                GPS, maps, pulling data from a JSON file I had on the Internet,
                localization, and more. I was given free reign over the branding
                and eventually charged my client for 100 hours of work.
              </p>
              <p>
                It was the first time that I had worked as a freelancer. The
                experience was mixed – there were communication problems with
                the client, and of course it was a hassle to get paid. But I had
                avoided the biggest mistake freelancers make: I had them sign a
                contract.
              </p>
            </Entry>

            <Entry title="Second Contract" img={unb}>
              <p>
                Emboldened by my success of my first contract, I looked around
                for more opportunities. My university was interested in using an
                iPad to collect information from potential students at
                recruitment fairs.
              </p>
              <p>
                The technical aspects of the job were not difficult – the
                information would be transferred off of the devices via email.
                But the design of the product was problematic. While the
                recruitment office wanted as much information as possible, the
                recruiters knew that more fields for recruits to fill out would
                mean fewer people filled them out at all. It was my first
                experience balancing priorities between two stakeholders.
              </p>
            </Entry>

            <Entry title="Solar System Simulator" img={simulator}>
              <p>
                That fall, I took a course on computer graphics. Our term
                project had a few basic requirements: it had to use OpenGL
                directly, demonstrate use of dynamic camera angles, and feature
                moving objects. A partner and I chose a solar system simulator –
                a common choice. However, we developed our project for the iPad.
              </p>
              <p>
                The project was really fun – and frustrating. Learning OpenGL
                was hard enough. Learning the version for embedded devices was
                even more difficult.
              </p>
              <p>
                After the project was completed, I continued to develop the
                project into a universal app with some features we didn't have
                time for during the project. I put it on the App Store for a few
                dollars; until recently, it made about $100/month and was often
                purchased in-bulk by schools.
              </p>
              <p>
                Looking at the software now, it looks horribly outdated. The
                code is even worse. But users liked it and it was a tremendous
                learning experience. Having three apps on the store would be a
                big help later when I looked for my first job.
              </p>
            </Entry>

            <Event className="year" date="2011" />
            <Entry title="Completed Counselling">
              <p>
                That Winter, I finished my counselling. It was a big deal for me
                because I had worked so hard to overcome my depression. Still, I
                kept it a secret. Looking back, I don't know why. I guess I was
                afraid that people would judge me for it – I didn't want it to
                define me. Not even my parents knew.
              </p>
            </Entry>

            <Entry title="First Development Blog">
              <p>
                Throughout university, I maintained a blog where I discussed
                religion and atheism. Eventually, once I pulled my head out of
                my ass, I created a brand-new blog devoted to writing about what
                I was learning in iOS development. I was inspired by an{' '}
                <a href="http://thedailyshow.cc.com/guests/arianna-huffington/tkrgq6/arianna-huffington">
                  interview with Arianna Huffington
                </a>{' '}
                about blogging: she said that blogging was writing down your
                thoughts as you have them, sharing your passion for a subject,
                and creating an intimate connection with your readers.
              </p>
            </Entry>

            <Entry title="Three-day Workshop">
              <p>
                The Dean of my faculty had approached me about teaching a
                three-day instructional workshop at the university. I was really
                excited about the opportunity and devoted a lot of time over the
                academic year to creating material for the course.
              </p>
              <p>
                I was required to take a course every Saturday for 8 weeks to
                prepare me to instruct the workshop. It was a fantastic
                experience – many of the techniques I use when writing or
                speaking now come directly from that course.
              </p>
            </Entry>

            <Entry title="Married" img={wedding}>
              <p>
                Only a few days after I finished teaching the course on iOS, I
                got married.
              </p>
            </Entry>

            <Entry title="Short Term Subcontracting">
              <p>
                There were two months between getting married and moving to
                Toronto and I decided to work as a subcontractor for a local
                company. The work environment was … not ideal. There were
                problems getting paid at the end of my six-week contract.
                Finally, when the boss literally threw a cheque at me, he tried
                to snidely remark "Ash, if you need help finding a job–", at
                which point I cut him off. "I don't need your help getting a
                job", I said, and I walked away.
              </p>
              <p>
                It was the first time that I had ever needed to stand up for
                myself professionally. I regret getting myself into that
                situation, but I learned to recognize when things are going
                sour.
              </p>
            </Entry>

            <Entry title="Graduated" img={graduated}>
              <p>
                I graduated 5 years after I set foot at university, only
                happening to be there because my mother told me from a young age
                in no uncertain terms that I would be attending university and
                because I liked computers. I graduated with Honours in Software
                Systems with a minor in Mathematics.
              </p>
            </Entry>

            <Entry title="Moved to Toronto">
              <p>
                Moving to the largest city in Canada from my rural province was
                a big step. We moved there because my wife had been accepted
                into a Masters degree at the University of Toronto, and I was
                looking forward to a more diverse job market. I interviewed with
                a bunch of companies, but one start-up caught my attention and
                was willing to pay me a handsome salary.
              </p>
            </Entry>

            <Entry title="Started Terrible Job">
              <p>
                The company insisted I start as quickly as possible. I obliged,
                even though I was hoping for some time off after moving to
                Toronto. When I got to work, they didn't have anything for me to
                do. So we started off on a wrong foot. The next month was spent
                in a pretty miserable state. My hands were bound by processes
                and plans that were already in place, and even though I couldn't
                assist the web team, my boss insisted that I should stay late,
                too (even though I often had nothing to do).
              </p>
              <p>
                So a month in, I decided to quit. Being on my own,
                professionally, in a big city left me feeling isolated and
                afraid. I met a recruiter who insisted I stay at my current job
                to give us more leverage for a better salary at potential
                employers. If the company I was working for knew I was shopping
                around, they'd have fired me on the spot. The next month was
                spent sneaking off to do interviews.
              </p>
              <p>
                I felt bad. Really bad. I dreaded going in to work and I hated
                myself for deceiving my employer by expressing enthusiasm about
                future plans even though I knew I wouldn't be a part of them.
                For the first (and only) time in my life, I started drinking at
                home to relieve my anxiety. If I could go back and change
                anything about my life, I'd have quit immediately.
              </p>
              <p>
                Eventually, I found 500px. I wasn't looking forward to quitting
                – it was my first time – but my manager was pretty upset with
                me, so he didn't make me work the two weeks notice, or even the
                rest of the day.
              </p>
              <p>
                On the way home I stopped at a library to print off a contract
                then dropped it off at 500px. I'd start on Monday.
              </p>
            </Entry>

            <Entry title="Started at 500px" img={started500px}>
              <p>
                I started at an awesome company with an existing product that
                needed a mobile developer to work alongside their designer to
                create an iPad app mirroring their website. For the first few
                months, we worked out of a cramped incubator. I loved every
                second of it – my coworkers became close friends.
              </p>
            </Entry>

            <Entry title="Released 500px for iPad" img={_500px}>
              <p>
                7 weeks into my tenure at 500px, we released the iPad app. I
                hated it – it was missing features and it had bugs. Everyone
                else loved it – it was covered on{' '}
                <a href="http://techcrunch.com/2011/10/17/gorgeous-photos-tablet-browsing-500px-debuts-new-ipad-app/">
                  Tech Crunch
                </a>{' '}
                and a number of other tech rags. I was not used to this feeling
                – knowing that something I had made was imperfect but having it
                praised by others.
              </p>
            </Entry>

            <Entry title="My First Podcast" img={podcast}>
              <p>
                Encouraged by our coworker, three of us started a podcast.{' '}
                <a href="http://twitter.com/tomcreighton">Tom</a>,{' '}
                <a href="http://twitter.com/adamshutsa">Adam</a>, and I would
                take an hour or so on Friday afternoons to have some fun, record
                musings on startup life, tech news, and design. Our{' '}
                <a href="http://themasterbranch.com/2011/12/force-episode-three/">
                  early episodes
                </a>{' '}
                had terrible audio quality, but I would slowly get better at
                recording and editing podcasts. These first episodes were some
                of the most fun I'd ever had.
              </p>
            </Entry>

            <Entry title="Storygram" img={storygram}>
              <p>
                At a hackathon organized by 500px, Tom and I worked together to
                create an app called Storygram. You would use it to collect
                photos from your Instagram account into a 500px photo blog post.
                Because we <del>are both immature children</del> have great
                senses of humour, we tried to make the design as ridiculous as
                possible. By the end of the weekend, we had something we would
                submit to the App Store. Since we were 500px employees and
                ineligable for a prize, the judging panel would award us an
                honourable mention.
              </p>
            </Entry>

            <Event className="year" date="2012" />
            <Entry title="TACOW">
              <p>
                I had been attending{' '}
                <a href="http://www.meetup.com/tacow-org/">TACOW</a> a
                Toronto-based iOS/OS X/WebObjects developers meetup group. I
                began attending when I first moved to Toronto and in 2012, I
                started giving the occasional presentation. These were my first
                non-academic talks.
              </p>
              <p>
                But TACOW was more than just an opportunity to practice my
                speaking skills – it was a place to learn in the company of
                friends. And then go out for beers and chicken wings. I learnt a
                lot at these meetings and made some great friends.
              </p>
            </Entry>

            <Entry title="Started Photography" img={startedphotography}>
              <p>
                Working at 500px, a website for photographers, meant that I
                worked with mostly photo-junkies. It wasn't long before I was
                bitten by the bug. I bought a used Canon Rebel on eBay and a
                fast prime lens. Photography would become my main creative
                outlet and a great source of both stress-relief and strength in
                some difficult times ahead.
              </p>
            </Entry>

            <Entry title="Approached by Publisher">
              <p>
                After finding my blog, a publisher approached me with a unique
                proposition: another author wanted to write a book on
                Objective-C but didn't want to write the (boring) early
                chapters. Would I be willing to write them?
              </p>
              <p>
                I wasn't an expert at much, but I accepted. Through thorough
                research for the book, I'd become well-versed in the
                underpinnings of Objective-C and the Foundation framework.
              </p>
            </Entry>

            <Entry title="Job Interview at Apple" img={apple}>
              <p>
                One day, I got an email from an Apple recruiter about a position
                on the Siri UI team. I had a few phone interviews and was flown
                down for a day of{' '}
                <a href="https://ashfurrow.com/blog/my-job-interview-with-apple/">
                  interviews in Cupertino
                </a>
                . Apple decided I wasn't ripe yet, and I decided that I didn't
                really want to work for Apple.
              </p>
            </Entry>

            <Entry title="Photo Hour" img={photohour}>
              <p>
                Being an iOS developer into photography as a hobby, I naturally
                wanted to make an app for photographers. I had just learnt the
                significance of the golden hour when taking photos, so I decided
                to make an app that would tell you the best time to take
                pictures. It was very focused – you hit one button to update to
                your current location and you hit another to switch between
                morning and evening.
              </p>
              <p>
                With Adam's help, I designed the application before writing any
                code. He made me a wonderful icon and I put it on the{' '}
                <a href="https://itunes.apple.com/ca/app/photo-hour/id524263013?mt=8">
                  App Store
                </a>
                .
              </p>
            </Entry>

            <Entry title="WWDC 2012" img={wwdc2012}>
              <p>
                I attended my second WWDC the year that iOS 6 was announced. I
                was excited by all of the new APIs and spent a lot of time that
                week playing with them in the labs. Collection views interested
                me in particular, since the 500px iPad app used a lot of grids.
              </p>
            </Entry>

            <Entry title="Blogging">
              <p>
                In the weeks ahead of iOS 6's launch (remember kids, this was
                when you couldn't talk publicly about new APIs), I drafted
                several blog posts about new APIs in iOS 6. When the day of the
                launch came, I released them all, making my blog an oft-cited
                resource in the iOS community. Awesome.
              </p>
            </Entry>

            <Entry title="New Publisher">
              <p>
                Noticing my expertise in iOS 6 APIs, and wanted to capitalize on
                developer interest in the subject, a new publisher approached me
                about writing a book for them. The book is now in its{' '}
                <a href="http://www.amazon.com/iOS-UICollectionView-Complete-Mobile-Programming-ebook/dp/B00CFLTD50/ref=sr_1_2?ie=UTF8&amp;qid=1419356862&amp;sr=8-2&amp;keywords=uicollectionview">
                  second edition
                </a>
                .
              </p>
            </Entry>

            <Entry title="Trouble at work">
              <p>
                Since shortly after the new year, things started to change.
                Slowly, I could feel something was different. Decisions were
                made that I disagreed with on a fundamental level. The company
                became a place where I was no longer happy.
              </p>
            </Entry>

            <Entry title="Spoke about 500px at FITC Screens" img={fitc}>
              <p>
                In the Fall, I gave my first conference presentation at FITC
                Screens in Toronto. It was a talk looking back at what Adam and
                I had learnt over the past year working together on 500px for
                iPad. He designed the slides and helped write the content. The
                talk went well.
              </p>
            </Entry>

            <Entry title="Plunged into depression">
              <p>
                The situation at work became more complex. I don't want to get
                into specifics. The consequence of the situation was that I was
                working 70+ hour weeks for two months under very stressful work
                conditions.
              </p>
              <p>
                To make a bad situation worse, my wife was on a work placement
                in Thunder Bay during the two months I was working my ass off.
                Having been together six years at that point, I wasn't
                accustomed to handling stress by myself. I fell{' '}
                <a href="https://ashfurrow.com/blog/depression-sucks/">
                  further into depression
                </a>{' '}
                than I ever had before and nearly killed myself.
              </p>
            </Entry>

            <Entry title="Released 500px iPhone app" img={_500pxiphone}>
              <p>
                Finally, after a monumental effort on the part of everyone on
                the mobile team, we launched the 500px iPhone application. I
                felt triumphant, but the management was not happy with my
                performance. I requested to attend a conference that had invited
                me to speak in the new year. The answer was no. I remember the
                words they used exactly: &quot;this is not a punishment – it's
                just not a reward.&quot;
              </p>
              <p>I felt betrayed. So I made the decision to quit.</p>
              <p>
                I wanted to work for a company that I respected and whose values
                matched mine. I looked at the companies around Toronto, and
                during the Christmas break, I confirmed details with Teehan+Lax
                to start working for them in the new year.
              </p>
            </Entry>

            <Event className="year" date="2013" />

            <Entry title="Quit 500px">
              <p>
                The first day after the break, I submitted my resignation,
                giving them three weeks notice.
              </p>
              <p>
                Major changes to the management at 500px in the following two
                years leads me to believe that the things that made me unhappy
                there have been addressed. I'm still grateful for the
                opportunity I had to work there, and I'm still proud of
                everything that the team accomplished.
              </p>
            </Entry>

            <Entry title="Objective-C Vitamins talk">
              <p>
                Between 500px and Teehan+Lax, I gave a talk called{' '}
                <a href="https://speakerdeck.com/ashfurrow/objective-c-vitamins">
                  Objective-C Vitamins
                </a>
                . This put me on the radar of the CocoaPods team.
              </p>
            </Entry>

            <Entry title="Started at Teehan+Lax">
              <p>
                In February, I started at{' '}
                <a href="http://teehanlax.com">Teehan+Lax</a>, a digital agency
                in Toronto. Our values significantly overlapped, giving me an
                opportunity to contribute and create open source projects, as
                well as write technical blog posts. I also learnt a great deal
                about design and business, especially from Jon Lax. I felt
                privileged to work there.
              </p>
            </Entry>

            <Entry title="Medication">
              <p>
                Even though the stress of my previous job was no longer causing
                me anxiety, I was still in a depressive funk. Eventually, I saw
                a doctor and began medication. Over the next few months, I'd
                grow to understand just how bad things had been.
              </p>
            </Entry>

            <Entry title="Started Springboard" img={springboard}>
              <p>
                While still producing the first podcast I cohosted with Tom and
                Adam, I branched out into doing a podcast of my own: an
                interview show discussing the origins of experienced developers.
                I called it{' '}
                <em>
                  <a href="http://springboardshow.com">Springboard</a>
                </em>
                , a pun on the name of the iOS system that starts apps when you
                tap them.
              </p>
              <p>
                My goal was to help newcomers to iOS by letting them know that
                the kinds of cool developers they look up to were beginners
                once, too. By asking other developers to share their stories,
                and through careful use of inclusive language, Springboard grew
                to a height of over 5 000 active listeners.
              </p>
            </Entry>

            <Entry title="WWDC 2013">
              <p>
                My coworker Brendan and I won the 71-second long WWDC lottery of
                2013. We stayed in the same hotel as I had stayed in in 2010 –
                mostly because I wanted to relive my first year at the
                conference, but reality never lives up to nostalgic
                expectations. During the conference, I gave a talk on
                ReactiveCocoa at a side-event. I got to meet Josh Abernathy and
                Justin Spahr-Summers, two of the core contributors to
                ReactiveCocoa.
              </p>
              <p>
                I also got to meet some of the CocoaPods team in-person that
                week, including <a href="http://twitter.com/alloy">Eloy</a> and{' '}
                <a href="http://twitter.com/orta">Orta</a>.
              </p>
            </Entry>

            <Entry title="Crowdfund new book">
              <p>
                That Summer, I{' '}
                <a href="https://www.indiegogo.com/projects/your-first-ios-app">
                  crowdfunded a new book
                </a>{' '}
                about starting iOS development. It would feature everything from
                opening your first Xcode project to implementing code to
                submitting to the App Store. A new, Swift-based version is{' '}
                <a href="https://leanpub.com/yourfirstswiftapp">
                  being written now
                </a>
                .
              </p>
            </Entry>

            <Entry title="35mm app" img={_35mm}>
              <p>
                Over the Summer, I had worked with Tom and another former
                colleague from 500px named Debbie. We created a Newsstand app
                called 35mm that featured curated photography for a monthly
                subscription of $1. Tom designed it, I wrote it (including a
                rudimentary backend – a real accomplishment for me), and Debbie
                found photographers to feature.
              </p>
              <p>
                We started the app later in the year, but shut it down after
                fewer than 10 issues due to lack of interest. We had about 120
                subscribers worldwide. Our hypothesis that people wanted curated
                photography presented in a minimal, ad-free environment and were
                willing to pay literally the smallest amount of money we could
                charge for it didn't pan out.
              </p>
              <p>
                But we had a great time, and I enjoyed working with my two
                friends.
              </p>
            </Entry>

            <Entry title="First major conference talk (360|iDev)">
              <p>
                A talk proposal I had submitted to{' '}
                <a href="http://360idev.com">360|iDev</a> had been accepted and
                I flew down to Denver. It was there that I met Mike Lee, who
                told me about the really great developer community in Amsterdam.
              </p>
            </Entry>

            <Entry title="Teach small class in Toronto">
              <p>
                I hadn't taught a workshop recently, but I was able to leverage
                code and content from my books to teach a small weekend workshop
                on iOS development. I realized that I had built up a small, but
                growing, repertoire of teaching material.
              </p>
            </Entry>

            <Entry title="ReactiveCocoa Book">
              <p>
                After the success of my crowdfunded, self-published book, I
                excitedly wrote another on ReactiveCocoa. My wife was away
                again, so the book took up most of my spare time. I finished in
                6 weeks.
              </p>
            </Entry>

            <Entry title="Started Notification Center" img={notificationcenter}>
              <p>
                That Fall, I wanted to produce a talk show about the iOS world.
                No set agenda, just me and a friend talking shop.{' '}
                <a href="http://notificationcenter.tv">Notification Center</a>{' '}
                has covered topics ranging from complex Core Data issues to the
                legitimacy of moon-landing conspiracies.
              </p>
            </Entry>

            <Entry title="Decide to move to Amsterdam">
              <p>
                On the first Friday in December, my wife and I decided to move
                to Amsterdam. We spent the weekend in an frenzy to look into
                what would be required. One of the biggest reasons to stay in
                Toronto was that I loved my job. Leaving Toronto would mean
                leaving Teehan+Lax. But we decided there would always be reasons{' '}
                <em>not</em> to move and we ought to go for it.
              </p>
              <p>
                On Monday, I spoke with Jon and told him of our plan to move to
                Europe and gave him more than 2 months' notice: Valentine's Day
                would be my last day.
              </p>
            </Entry>

            <Entry title="C-41">
              <p>
                Over the Christmas break, I designed and implemented an{' '}
                <a href="https://github.com/ashfurrow/C-41">open source</a> app
                called{' '}
                <a href="https://itunes.apple.com/ca/app/c-41/id789924103?mt=8">
                  C-41
                </a>
                . It was largely an exercise in ReactiveCocoa and MVVM. It had
                no reason not to be open source, so it was.
              </p>
            </Entry>

            <Event className="year" date="2014" />

            <Entry title="Leave Teehan+Lax">
              <p>
                I thoroughly enjoyed working with everyone at Teehan+Lax and I'm
                proud of everything I accomplished there. I learnt a lot and
                grew as a professional.
              </p>
            </Entry>

            <Entry title="Move to Amsterdam" img={amsterdam}>
              <p>
                Moving to Amsterdam is one of the biggest, scariest, most
                wonderful decisions that I've ever made. The experience of
                living in a whole new country has given me the broader
                perspective that I had hoped for.
              </p>
            </Entry>

            <Entry title="Bump into Orta">
              <p>
                I spoke at the <a href="http://mdevcon.com">mdevcon</a>{' '}
                conference here in Amsterdam. While hanging around, I bumped
                into Orta and we hung out at the apartment some of his friends
                had rented. We did some pair programming on some open source
                stuff he was working on – it was, as the Dutch say, "pretty
                gezellig." Orta mentioned if I was ever interested in working
                together at <a href="http://artsy.net">Artsy</a> that I should
                get in touch.
              </p>
            </Entry>

            <Entry title="Treehouse Course">
              <p>
                I had been speaking with the fine folks at{' '}
                <a href="http://teamtreehouse.com/">Treehouse</a> about teaching
                a course on Core Data. Shortly after arriving in Europe, I flew
                back to North America to record the course at Treehouse's
                Orlando studios.
              </p>
            </Entry>

            <Entry title="Dutch Job">
              <p>
                During my first week in Amsterdam, I went in to my soon-to-be
                employer to go over some details. As time went on, I reflected
                on our meeting. As my start date approached, I felt a greater
                and greater feeling of dread until I finally{' '}
                <a href="https://ashfurrow.com/blog/job-hunt/">
                  made the decision
                </a>{' '}
                to not start.
              </p>
              <p>
                This was a really difficult decision for me – when I make a
                commitment, I intend to keep it. But I had learnt to trust my
                feelings.
              </p>
            </Entry>

            <Entry title="Freelance at Mindsea">
              <p>
                In the meantime, I was able to do some freelance work for{' '}
                <a href="http://www.mindsea.com">Mindsea</a>, a Canadian agency
                based in the region of Canada I grew up in. They were great to
                me and I learnt a lot from them and{' '}
                <a href="http://www.mindsea.com/2014/04/up-and-running-with-mindsea-doing-it-the-right-way/">
                  their approach
                </a>{' '}
                to iOS work.
              </p>
            </Entry>

            <Entry title="DM Orta">
              <p>
                I didn't know what I was going to do. I was in a foreign country
                with no job and a quickly draining bank account. I remember
                Orta's offer, so I took a look at Artsy's{' '}
                <a href="https://artsy.net/job/mobile-engineer">
                  job description
                </a>{' '}
                and was absolutely floored. It's description fit me so well that
                I couldn't believe it. They had a fantastic{' '}
                <a href="http://artsy.github.io/">engineering blog</a>, and I
                had used some of their{' '}
                <a href="http://artsy.github.io/open-source/#iOS">
                  open source
                </a>{' '}
                libraries in my own apps.
              </p>
              <p>
                I DM'd Orta, had a few Skype calls, flew to London to meet with
                one of their developers, and got the green-light while I was in
                Paris with my wife for her birthday. I started in April.
              </p>
            </Entry>

            <Entry title="Start at Artsy" img={artsy}>
              <p>
                Artsy is a unique company. They value things like compassion and
                love while working with an "art meets science" mentality to
                accomplish something really worthwhile.
              </p>
              <p>I've never felt like I fit-in as much as I do at Artsy.</p>
            </Entry>

            <Entry title="WWDC 2014">
              <p>
                I attended WWDC again this year and it was a blast. I gave a
                talk at AltConf and met so many awesome people. And I was{' '}
                <a href="https://ashfurrow.com/blog/whelp./">recognized</a> by
                other developers – something that still kind of freaks me out
                sometimes.
              </p>
              <p>
                Most of my week was spent in Swift sessions or in Swift labs. I
                even got to meet Dave Addey.
              </p>
            </Entry>

            <Entry title="Art Basel" img={artbasel}>
              <p>
                Shortly after WWDC, I got the opportunity to attend Art Basel,
                one of the most important art fairs in the world. It was an
                amazing experience that I can't do justice here, but it was here
                that Artsy's goals{' '}
                <a href="https://ashfurrow.com/blog/reflections-on-art-basel-2014/">
                  really clicked
                </a>{' '}
                for me.
              </p>
            </Entry>

            <Entry title="Depression">
              <p>
                Things were hard over the Summer. Through a series of random
                doctors prescribing different prescriptions (my medication isn't
                available in The Netherlands), I was on an emotional roller
                coaster. I wouldn't leave the house for days and I didn't even
                touch my cameras. Only in the Fall would I finally find a
                psychiatrist that I could see regularly. I feel much better now.
              </p>
            </Entry>

            <Entry title="Blog Transition">
              <p>
                By now, I had gained a solid understanding of a variety of web
                technologies. I felt confident in building my own site,{' '}
                <a href="https://ashfurrow.com/blog/fresh-coat-of-paint/">
                  so I did
                </a>
                . It was an amazing learning experience from the perspective of
                a developer and a designer.
              </p>
            </Entry>

            <Entry title="European conference tour" img={conferences}>
              <p>
                Since I arrived in Amsterdam, I've been contacted by a bunch of
                conferences and meetup groups all based in Europe. I accepted as
                many as possible. My wife accompanied me on a lot of trips,
                giving us a great reason to see new places. I am so grateful for
                the opportunity to{' '}
                <a href="https://ashfurrow.com/blog/lessons-learned-travelling-europe/">
                  travel
                </a>{' '}
                and meet so, so many new friends.
              </p>
            </Entry>

            <Entry title="Eidolon" img={eidolon}>
              <p>
                <a href="http://github.com/artsy/eidolon">Eidolon</a> is Artsy's
                art auction kiosk application. It is completely open source,
                written in Swift, and built using the functional-reactive
                paradigm and ReactiveCocoa. I've got a{' '}
                <a href="http://artsy.github.io/blog/2014/11/13/eidolon-retrospective/">
                  write-up
                </a>{' '}
                describing the whole process, but sufficed to say that I had an{' '}
                <em>awesome</em> time building this.
              </p>
            </Entry>

            <Entry title="Film Photography" img={film}>
              <p>
                I really love photography, but I hadn't done much during the
                Summer, even though I was surrounded by the totally awesome
                Dutch countryside. Oddly enough, it was an{' '}
                <a href="https://ashfurrow.com/blog/100-years-ago/">
                  ad campaign
                </a>{' '}
                that re-sparked my hobby. I started shooting again – shooting{' '}
                <em>a lot</em>. Mostly{' '}
                <a href="https://ashfurrow.com/blog/price-of-film/">on film</a>.
                I even started developing at home again.
              </p>
              <p>
                As a software developer, I spend so much of my time working on
                complex software problems and, I've often found taking a break
                to exercise my creativity helps me sort through problems. It's
                really gratifying to have a hobby that's not related to
                computers.
              </p>
            </Entry>
          </Events>
        </ReactTimeline>
      </Wide>
    )
  }
}

/*

<Entry img={xcode} title="Opened Xcode">
          <p>
            I worked from the basement of Ashley's mother's house (there was no
            WiFi so I had to connect directly to their modem with ethernet).
            Armed with cs193p courses from Stanford (instructed that year by
            Evan Doll), I learnt the basics of iOS app structure.
          </p>
          <p>
            I also had a few reference books and some help from a friend.{' '}
            <a href="http://twitter.com/jasonbrennan">Jason Brennan</a> and I
            talked a lot over Google Wave. He helped me with everything from
            syntax of Objective-C to quirks of Xcode.
          </p>
        </Entry>

        <Entry img={coffeetimer} title="CoffeeTimer">
          <p>
            This was to be my first app. I wanted to create something that I
            would want to use. I really liked using a coffee press but would
            often forget it was brewing and spoil the coffee. A timer to make
            coffee would be perfect: simple enough to execute but meaningful
            enough to motivate me.
          </p>
          <p>
            The app was pretty simple: some models were deserialized from
            NSUserDefaults, presented in a table view, blah blah blah. It wasn't
            much, but it was mine and I was proud of it. Seeing my software run
            on my iPod touch for the first time was as close to a religious
            experience as I've ever had.
          </p>
        </Entry>

        <Event date={() => <img src={springboard} className="eventImage" />}>
          <p>hi ther</p>
          <p>Why hello</p>
        </Event>

        <Event date={() => <img src={springboard} className="eventImage" />}>
          <p>hi ther</p>
          <p>Why hello</p>
        </Event>

        <ImageEvent
          date="4/13/19"
          text="You can embed images..."
          src="https://res.cloudinary.com/dovoq8jou/image/upload/v1564772194/jellyfish.jpg"
          alt="jellyfish swimming"
          credit="Photo by [@tavi004](https://unsplash.com/@tavi004)"
        >
          <div>
            <UrlButton href="https://unsplash.com/search/photos/undersea">
              View more undersea photos
            </UrlButton>
          </div>
        </ImageEvent>

        <YouTubeEvent
          date="6/18/19"
          id="6UnRHtwHGSE"
          name="General Tso's Chicken recipe"
          text="... and YouTube videos!"
        />
*/
