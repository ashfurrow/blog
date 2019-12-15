import React from 'react'
import {
  Timeline as ReactTimeline,
  Events,
  Event,
  themes,
  createTheme
} from '@merc/react-timeline'
import Theme from '../../config/Theme'
import Wide from '../../src/components/Wide'
import { camelCase } from 'lodash'

import artworkpage from './artworkpage.png'
import pianocat from './pianocat.png'
import moya from './moya.png'
import comingout from './comingout.png'
import cultureamp from './cultureamp.png'
import cityguides from './cityguides.jpg'
import elephantfriend from './elephantfriend.png'
import peerlabcommunity from './peerlabscommunity.jpg'
import inputoutput from './inputoutput.jpg'
import buynow from './buynow.jpg'
import greencardend from './greencardend.jpg'
import lifeatartsy from './lifeatartsy.jpg'
import bidflow from './bidflow.png'
import jamsesh from './jamsesh.jpg'
import dotSwift from './dotSwift.jpg'
import leaving from './leaving.jpg'
import cats from './cats.jpg'
import armory from './armory.jpg'
import hamburg from './hamburg.jpg'
import uikonf from './uikonf.jpg'
import drawing from './drawing.jpg'
import officeatnight from './officeatnight.jpg'
import pragma from './pragma.jpg'
import film from './film.jpg'
import lai from './lai.png'
import thumbsup from './thumbsup.jpg'
import sinfo from './sinfo.jpg'
import lailaunch from './lailaunch.jpg'
import buttons from './buttons.jpg'
import stevenuniverse from './stevenuniverse.jpg'
import election from './election.jpg'
import posts from './posts.png'

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

// Agh! MDX relative imports share a single namespace so we need unique names.
export class Timeline2 extends React.Component {
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
            <Event className="year" date="2015" />

            <Entry title="Spreading the Word about Swift" img={dotSwift}>
              <p>
                By 2015, Swift was public and gaining in popularity. I was an
                early advocate for the language and based on my experience
                building the Kiosk for Artsy, I was writing blog posts and
                giving conference talks on Swift.
              </p>
              <p>
                This was really fun! Swift felt new and exciting, despite the
                rough edges of the early language betas. It felt nice to dig
                into a new language and figure things out for the first time.
              </p>
              <p>
                I didn't realize it at the time, but the process of learning a
                new language and learning its idioms would prepare me for
                learning yet more languages, on my path to becoming a
                generalist.
              </p>
            </Entry>

            <Entry title="Leaving Amsterdam" img={leaving}>
              <p>In February, my wife and I left Amsterdam.</p>
              <p>
                It was bittersweet. We'd lived there a year, and we always knew
                it would only ever be <em>a</em> year; Artsy hired me with the
                understanding that I would move to New York after my Dutch visa
                expired.
              </p>
              <p>
                Two weeks before I left Amsterdam, something really special
                happened: Artsy hired{' '}
                <a href="https://twitter.com/alloy">Eloy Durán</a> of CocoaPods
                and RubyMotion fame! I'd gotten to know Eloy as a friend through
                CocoaPods and, just before leaving Amsterdam, had the pleasure
                of getting to know him in-person as a colleague.
              </p>
            </Entry>

            <Entry title="Moving to New York" img={cats}>
              <p>
                I grew up in the 90's, a 15-minute drive from the border of the
                state of Maine. After 9/11 and the War on Terror, I stopped
                going "over across" – It felt like America was too scary. I
                never imagined I'd one day live there.
              </p>
              <p>
                Yet here I was, moving to New York. We spent 6 hours of limbo
                between our Airbnb and an apartment we'd found (no small feat
                for a foreigner with no Social Security Number or credit
                history). We brought everything we owned, and our cats, to the
                Artsy office to spend the Saturday.
              </p>
            </Entry>

            <Entry title="Peer Labs">
              <p>
                One thing I missed most from Amsterdam was the sense of
                developer community that{' '}
                <a href="https://appsterdam.rs">Appsterdam</a> created. My
                friend, <a href="https://twitter.com/samuelgoodwin">Samuel</a>,
                ran a "Peer Lab", a weekly meetup for developers to work
                independently, but in the same space. I looked forward to it
                each week.
              </p>
              <p>
                After moving to New York, I quickly{' '}
                <a href="http://artsy.github.io/blog/2015/08/10/peer-lab/">
                  set up a Peer Lab at Artsy
                </a>
                .
              </p>
            </Entry>

            <Entry title="Art" img={armory}>
              <p>
                Working at Artsy had already afforded me the opportunity to go
                to art fairs and auctions, and I kept this up. Here you can see
                me in profile in front of an artwork that Artsy commissioned
                from Hank Willis Thomas, an artist that I've since followed and
                gained a huge amount of respect for.
              </p>
            </Entry>

            <Entry title="Germany Tour" img={hamburg}>
              <p>
                Quickly after moving to New York, my wife and I returned to
                Europe so I could present at a few conferences. First to
                Istanbul, then to Berlin. The conferences were a month apart and
                so we spent a month touring around Germany, couch surfing with
                friends. I{' '}
                <a href="https://github.com/ashfurrow/EuroTrip-2015">
                  planned the trip on GitHub
                </a>{' '}
                and made a lot of friends along the way.
              </p>
            </Entry>

            <Entry title="Teaching & Learning at UIKonf" img={uikonf}>
              <p>
                In 2014, I attended UIKonf and had a great time. I returned the
                following year to present a talk titled{' '}
                <em>Teaching & Learning</em>. The thesis of my talk was that
                sharing knowledge is good, and you should do it for both
                altruistic and selfish reasons.
              </p>
              <p>
                In the years since my 2015 talk, I've only leaned harder into
                this "sharing knowledge is good" position. But at the time, this
                was as far as I had pushed into it.
              </p>
            </Entry>

            <Entry title="Learning to Draw" img={drawing}>
              <p>
                Over the Summer, I decided to{' '}
                <a href="https://ashfurrow.com/blog/drawing/">learn to draw</a>.
                I'd been a photographer for a while but I wanted to expand out
                and explore different forms of artistic expression. As I learned
                lessons from making art, I applied those lessons to other parts
                of my life – including software development.
              </p>
            </Entry>

            <Entry title="401 Broadway" img={officeatnight}>
              <p>
                Artsy's HQ is located at 401 Broadway, beside Manhattan's
                Chinatown. I'd been working at the office 5 days a week, with
                Peer Labs on Saturday, so I developed a bit of emotional
                connection to the space.
              </p>
              <p>
                My wife and I were renting one bedroom out of a two-bedroom
                apartment; it never quite felt like home. In the absense of a{' '}
                <em>real</em> home, I think I was drawn to the office as a place
                of stability.
              </p>
              <p>
                Attaching your personal sense of stability to your employer is
                never a good idea – businesses are inherently unstable and
                mooring your sense of self to them is a mistake. And, yet, I
                seem to make this mistake every time.
              </p>
            </Entry>

            <Entry title="Life at Artsy" img={lifeatartsy}>
              <p>
                After UIKonf uploaded the video recording of my{' '}
                <em>Teaching &amp; Learning</em> talk, I shared it within Artsy.
                That afternoon, Carter (Artsy's CEO) called me on the phone. He
                said "I watched your talk. Let's do it." And so Artsy created a
                new blog,{' '}
                <a href="https://www.artsy.net/life-at-artsy">
                  <em>Life at Artsy</em>
                </a>
                .
              </p>

              <p>
                My colleague, Remy Ferber, worked on the initial post,{' '}
                <a href="https://www.artsy.net/article/remy-ferber-open-sourcing-company-culture-at-artsy">
                  <em>Open-Sourcing Company Culture at Artsy</em>
                </a>
                . In it, she says &quot;By promoting openness, we mitigate fear
                of judgment and embrace our mistakes as positive experiences to
                learn from and share with others.&quot; This is really key – it
                speaks to a concept that I didn't yet have the vocabulary to
                describe: psychological safety.
              </p>
              <p>
                Since starting at Artsy, I understood that the "arts team" (as
                it was known then) had a strong influence on our engineering
                culture. The <em>Life at Artsy</em> blog was one of the first
                times I helped the engineering team export <em>our</em> culture
                back into the broader company. It was really rewarding.
              </p>
            </Entry>

            <Entry title="Product Work">
              <p>
                My product work in 2015 wasn't that focused. I worked on Artsy
                Engineering's "Mobile Team" (as opposed to its "Web Team") and I
                just build whatever mobile software Artsy needed. I had a tonne
                of leeway to decide what to work on, but I didn't always have
                the business context I needed to make that decision.
              </p>
              <p>
                Looking back, I notice that I was a bit incurious about that
                business context. I just wanted to make apps. Apps apps apps.
                But apps aren't made in a vacuum, and I would spend the next few
                years getting more and more interested in Artsy's business (and,
                critically, how technology can help it thrive).
              </p>
            </Entry>

            <Entry title="Loosely Held Strong Convictions" img={pragma}>
              <p>
                I gave a talked titled{' '}
                <a href="https://www.youtube.com/watch?v=hlLhtWLghGA">
                  <em>Loosely Held Strong Convictions</em>
                </a>{' '}
                in Italy in 2015. I wanted to talk about something that was more
                important than just programming computers. I spoke about why
                humans believe the things we do, how we think about our own
                beliefs, and why we divide ourselves into groups. Heavy stuff
                for a tehcnology conference.
              </p>
              <p>
                After the conference, I ran into some conference attendees at
                the airport. They told me something I'll never forget: they told
                me that my talk had made them think about the{' '}
                <a href="https://en.wikipedia.org/wiki/European_migrant_crisis">
                  migration crisis
                </a>
                with a new perspective.
              </p>
              <p>
                As time went on, I gave fewer and fewer conference talks. But
                each one became more and more important.
              </p>
            </Entry>

            <Entry title="Building Communities">
              <p>
                Near the end of the year, I realized how empty I felt about my
                purpose. Sure, I was building cool software, but that just{' '}
                <em>wasn't enough anymore</em>.
              </p>
              <p>
                I decided that the next skill that I wanted to master was{' '}
                <a href="https://ashfurrow.com/blog/building-online-communities/">
                  build online communities
                </a>
                . I considered Artsy Engineering one type of online community,
                while <a href="https://github.com/Moya/Moya">Moya</a> was
                another type.
              </p>
              <p>
                After making this decision, I told Artsy's CTO dB, who supported
                me. I started spending Artsy time researching team dynamics and
                skills to manage them. I had started down this path enough to
                realize how little I knew, and i was hungry for more.
              </p>
              <p>
                This was the very beginning of development of my philosophy of
                software development, which we'll see unfold over the next few
                years.
              </p>
            </Entry>

            <Entry title="The Auctions Team" img={inputoutput}>
              <p>
                I ended 2015 by helping to form Artsy Engineering's{' '}
                <em>Auctions Team</em>. My product work in 2015 hadn't been
                terribly focused, and I was excited to begin the new year on a
                new team, focused on building software for Artsy's burgeoning
                Auctions business.
              </p>
              <p>
                The new team also included a new manager, Alan. Over the next
                few years, I'd learn a lot from Alan, on both the technical and
                non-technical sides of software development.
              </p>
              <p>
                Our first big event was was{' '}
                <a href="https://www.artsy.net/article/sotheby-s-sotheby-s-first-online-only-auction-input-output">
                  Sotheby's Input/Output
                </a>{' '}
                auction. Sotheby's is a big player in the auction world, so
                working with them was a big deal for Artsy. This was kind of
                stressful! But was a good preparation for the stress that would
                come next year, building Live Auctions Integration.
              </p>
            </Entry>

            <Event className="year" date="2016" />

            <Entry title="Film!" img={film}>
              <p>
                I love photography. And since moving to New York, I doubled-down
                on my love of <em>film</em> photography, particularly. I was
                shooting mainly black-and-white film so I could develop and scan
                it myself. It had become an improtant part of my day-to-day life
                in New York.
              </p>
              <p>
                My day-to-day photography is now{' '}
                <a href="https://www.instagram.com/ashfurrow/">
                  on my Instagram account
                </a>{' '}
                and{' '}
                <a href="https://photos.ashfurrow.com">
                  I also have a photo blog
                </a>
                .
              </p>
            </Entry>

            <Entry title="Live Auctions Integration" img={lai}>
              <p>If 2015 lacked focus, 2016 made up for it (and then some).</p>
              <p>
                January kicked off six months of <em>intense</em> work on the
                nascent Auctions team, building Live Auctions Integration (LAI).
                At the time, Artsy only supported <em>timed auctions</em>: the
                auction had a pre-set end time and, when that time arrived,
                whoever was the highest bidder on each lot won that lot.
              </p>
              <p>
                LAI was different. We would be sending an Artsy employee to an
                actual auction room, to represent all Artsy online bidders.
                Anyone using Artsy could, in real-time, bid on lots as if they
                were in the room themselves.
              </p>
              <p>
                That was the idea, anyway. We had a lot of work ahead of us – we
                wanted to ship an MVP in 4 months.
              </p>
            </Entry>

            <Entry title="A New Look" img={thumbsup}>
              <p>
                Artsy offered headshots for our internal team navigator, and I
                took the opportunity to define a new, standardized avatar. This
                image <em>became</em> my representation online for over three
                years.
              </p>
              <p>
                The funny thing is, it was going to be a boring photo. But Orta
                was there, and encouraged me to give the thumbs up that
                ultimately became – quite literally – iconic.
              </p>
            </Entry>

            <Entry title="SINFO" img={sinfo}>
              <p>
                Early in the year, I took a trip around the world. First, to
                Lisbon for the <a href="https://sinfo.org">SINFO</a> conference,
                and then onto Tokyo for try! Swift.
              </p>
              <p>
                SINFO was a pretty formative experience for me because it was
                one of the first general-purpose tech conferences, not just
                targeted at iOS developers.
              </p>
              <p>
                The photo here depicts a billing with me and{' '}
                <a href="https://www.imdb.com/name/nm0270665/">
                  Danielle Feinberg
                </a>
                , a lighting artist and director of photography at Pixar. We got
                to chat over a few meals at the conference, she even attended my
                talk on functional reactive programming. She had a big impact on
                me and my career.
              </p>
              <p>
                Getting to speak on the same stage, I felt the difference in
                scale of what we were presenting. She talked about lighting
                Pixar films to achieve artistic and emotional affect. Like how
                our WALL•E’s eyes have a subtle difference in lighting from the
                other WALL•E robots, and how that difference gets taken away
                briefly when our main character forgets who he is.
              </p>
              <p>
                And I was talking about FRP. Important, I guess, but at a very
                different scale. Danielle Feinberg inspired me because the
                message she was telling was so much bigger than I was used to
                thinking about, in a conference talk context. Looking back, I
                can see a big turn in my own conference talks after I saw how
                Danielle's talk on combing technology and art.
              </p>
            </Entry>

            <Entry title="Green Card Process Starts">
              <p>
                So far, my wife and I had been living in the United States on a
                TN-1 visa ("the NAFTA visa"). It had some restrictions that we
                were initial okay with, but grew tired of as we continued living
                in the states. And border crossings were a consistently
                stressful, as it's kind of a weird visa. Especially entering
                from Europe, airlines get really fussy.
              </p>
              <p>
                Ashley and I decided to ask Artsy to look into our options.
                Artsy hired a lawyer and we decided to apply for our Green
                Cards; this would make us Permanent Residents of the United
                States.
              </p>
              <p>
                The decision wasn't easy. We'd been living away from our
                families for a few years, and missed home, but felt that being
                closer (than Amsterdam) would be a reasonable compromise. And
                living outside Canada already just made the prospect of
                continuing to do so... justified, somehow. That's how it felt,
                anyway.
              </p>
              <p>
                This kicked off three years of paperwork, appointments, and
                headaches. But I have to thank Artsy, especially Gray and
                Michelle, for always being there to help.
              </p>
            </Entry>

            <Entry title="LAI Setbacks">
              <p>
                Building something new is never easy, and we were trying to
                build something <em>very</em> new. The backend was written in
                Scala, using <a href="https://akka.io">Akka</a> for actor-based
                programming. The web front-end was written in React (a
                relatively new technology at Artsy, at the time) and the iOS
                front-end was written in Swift. Both front-ends communicated to
                our backend over GraphQL for static data (lot estimates, artist
                names, etc) and a websocket backend for realtime data (current
                number of bids, the current highest bid, etc).
              </p>
              <p>
                All this new technology took time to learn. The Auctions team
                started getting help from other Artsy engineers, especially Orta
                and <a href="https://github.com/craigspaeth">Craig Spaeth</a>. I
                would say that we had about half of Artsy Engineering working on
                the LAI launch, with the other half cheering us on.
              </p>
              <p>
                Despite our hard work, we had missed our 4-month launch target.
                The pressure was on.
              </p>
            </Entry>

            <Entry title="LAI Pressure">
              <p>
                At the time, I didn't think of the LAI work as a "crunch" time.
                Looking back, I still don't think the term fits the situation.
                It was more like, there were times that I had to get some space
                from my work. And that was unusual for Artsy. (I was always able
                to get that space, and avoided burning out.)
              </p>
              <p>
                Everyone on the team knew that LAI was important, but we also
                knew that we had to balance working hard with a sustainable
                pace. Alan and Devang made sure that everyone on the team knew
                that this was a one-off situation, that crunch time would{' '}
                <em>not</em> become the norm. The would keep their word.
              </p>
              <p>
                A nice side-effect of the intensity LAI development was the
                equal intensity of the bonds our team formed. I will never
                forget what it felt like working with Alan, Sarah, Erik, Chris,
                Katarina, and Barry (with help from Orta and Craig).
              </p>
            </Entry>

            <Entry title="LAI Launch" img={lailaunch}>
              <p>
                We launched LAI in June. I only found out later, but{' '}
                <em>a lot</em> was running on the success of this product. Alan,
                as well as our PM Devang, had worked hard to insulate us from
                this pressure. Like, I knew launching LAI quickly was important,
                but I didn't really understand the consequences of what would
                happen if we failed. And I'm glad I didn't, to be honest.
              </p>
              <p>
                I was handling the stress <em>okay</em>. Not the best, but not
                the worst for sure. If I'd known how much was riding on this
                going well, it would have only made me feel worse.
              </p>
              <p>
                Looking back, as a more leadership-y engineer, I have a profound
                appreciation for how Alan and Devang handled that stress, with
                what seemed like unwavering grace. That's a kind of grace I try
                to imbue now.
              </p>
              <p>
                The launch was a total success.{' '}
                <a href="https://artsy.github.io/blog/2016/08/09/the-tech-behind-live-auction-integration/">
                  Our software worked like a charm
                </a>
                , and after the launch, we were all encouraged to take as much
                time off as we needed.
              </p>
            </Entry>

            <Entry title="Missing WWDC" img={buttons}>
              <p>
                This was the first year that I didn't go to WWDC. It felt sad, I
                suppose. But mostly sad I didn't get to see my friends.
              </p>
              <p>
                Orta went to AltConf, and made these cool pins of his iOS
                friends to pass out. I still have a complete set! And my mom
                uses one of my pins as a keychain.
              </p>
              <p>
                At the time of writing, I still haven't been back to WWDC. I
                don't miss it as much as I thought I would. However, ever since
                I attended on a student scholarship in 2010 (which helped launch
                my entire career), WWDC will always have a special place in my
                heart.
              </p>
            </Entry>

            <Entry title="Steven Universe" img={stevenuniverse}>
              <p>
                In 2016, my wife recommended that I check out a show called{' '}
                <em>Steven Universe</em>. I did, and was instantly hooked.
              </p>
              <p>
                I{' '}
                <a href="https://ashfurrow.com/blog/steven-universe-and-masculinity/">
                  started writing about the show
                </a>{' '}
                pretty quickly. This came at a pretty important time for me,
                since I was earnestly researching team dynamics, which is an
                important theme of the show. Orta called{' '}
                <em>Steven Universe</em> "the most 'Ash Furrow' show", which I
                took as quite the compliment.
              </p>
              <p>
                If I had to boil <em>Steven Universe</em> down, really far, I
                would say that the show's message is a coming-of-age story that
                questions the idealism-versus-pragmatism dichotomy. Steven has
                his ideals, and the entire world around him pushes him to be
                pragmatic. The show's answer to this conflict is: "no, these
                ideals <em>are</em> pragmatic. It's the world that needs to
                change."
              </p>
            </Entry>

            <Entry title="Scaling LAI">
              <p>
                After building a successful LAI product, we had to scale it.
                That involved a lot more work that scaling a typical software
                product; the bottleneck to running a LAI sale was operational,
                rather than technical.
              </p>
              <p>
                Our focus turned from building out LAI to scaling it, and
                scaling tools for our colleagues in Auctions Ops. I found this
                work really fulfilling. Something about making my colleague's
                jobs easier just felt satisfying in a new, fresh way to me.
              </p>
            </Entry>

            <Entry title="The 2016 Election" img={election}>
              <p>
                I was in Switzerland during the 2016 election. I remember waking
                up to the news and thinking "well, maybe I just won't go back."
              </p>
              <p>
                But I had to, of course – my wife and cats were back in New
                York. Over the next six months, I toyed with the idea of moving
                back to Canada. It felt like I was obligated to, somehow. But I
                worked through those feelings. Moving to Canada would solve
                nothing, and I desperately wanted to continue my work at Artsy.
              </p>
            </Entry>

            <Entry
              title="A Cohering Philosophy of Software Development"
              img={posts}
            >
              <p>
                When you go to my website's homepage,{' '}
                <a href="https://ashfurrow.com">ashfurrow.com</a> <em>used</em>{' '}
                to just show a list of recent blog posts, but{' '}
                <a href="https://github.com/ashfurrow/blog/pull/285">
                  as of this pull request
                </a>
                , it links to what I considered "important" blog posts.
              </p>
              <p>
                These initial "important" blog posts were each an attempt to
                apply what I had learned about team dynamics and turn them into
                a coherent narrative. I have since taken on the term
                "compassionate software developer", which I discovered from{' '}
                <a href="https://twitter.com/aprilwensel">April Wensel</a> of{' '}
                <a href="https://compassionatecoding.com">
                  Compassionate Coding
                </a>
                . I'm a big fan of her work.
              </p>
              <p>
                Even though I had these initial blog posts, it would still be
                some time before my thoughts cohered around a central set of
                ideas. In 2018, I would give a talk (also transcribed it into a
                blog post) called{' '}
                <a href="/blog/building-better-software-by-building-better-teams/">
                  Building Better Software by Building Better Teams
                </a>
                . In it, I lay out the evidence-based business value of
                compassionate software development, with instructions to get
                started and links to jumping off points.
              </p>
            </Entry>

            <Entry title="Peer Lab Community" img={peerlabcommunity}>
              <p>
                After starting my own Peer Lab in 2014, I realized that I wanted
                to expand the idea. I can only run one peer lab, so I started{' '}
                <a href="https://peerlab.community">peerlab.community</a> that I{' '}
                <a href="https://ashfurrow.com/blog/building-static-sites-with-middleman/">
                  built with Middleman
                </a>
                . It includes a list of peer labs and instructions to start one.
              </p>
              <p>
                We now have almost 40 peer labs worldwide, in many different
                countries. One of the cooler things to come out of this effort
                is that peer lab organizers are sharing ideas and improving the
                concept itself. For example, when a San Francisco peer lab
                organizer visited us in New York, they told us how a small
                standup helped attendees get to know one another. So now, we do
                a standup too.
              </p>
            </Entry>

            <Event className="year" date="2017" />

            <Entry title="Retrieval Errors">
              <p>
                2017 was a really difficult year for me. I was still suffering
                from depression and that impacted my ability to form longterm
                memories. If this section is shorter than the other years, I'll
                blame it on that. I'm grateful that I was able to write down
                what had happened on this blog.
              </p>
            </Entry>

            <Entry title="React Native Feels">
              <p>
                In 2016, Artsy had introduced React Native into our iOS app. I
                had largely ignored it because I thought, and hoped, that it
                would fizzle out. To my dismay at the time, it didn't. I
                eventually wrote{' '}
                <a href="https://ashfurrow.com/blog/swift-vs-react-native-feels/">
                  this blog post
                </a>{' '}
                early 2017 about dealing with these feelings, but in my opinion,
                the post hasn't aged well. It still has me holding on to Swift
                as the future of iOS at Artsy.
              </p>
              <p>
                The problem is – rather, <em>my</em> problem <em>was</em> – that
                I was too attached to my tools. I had the strong convictions,
                but they were too tightly held. I ignored React Native because I
                assumed it would be worse than what I was using. I had my head
                in the sand and missed out on a huge opportunity to help define
                what React Native at Artsy would look like. Since Artsy's app is
                open source, it became a popular resource for how to build React
                Native apps <em>for everyone</em>. Even now, years later, I
                still feel like I'm playing catch-up to our technology stack. I
                missed my chance to be there on the ground floor, and it's one
                of my biggest professional regrets.
              </p>
            </Entry>

            <Entry title="Mastodon" img={elephantfriend}>
              <p>
                Early in 2017,{' '}
                <a href="/blog/mastodon/">I created a Mastodon instance</a>{' '}
                called{' '}
                <a href="https://mastodon.technology">mastodon.technology</a>.
                I'm not going to go into detail here, about how Mastodon works
                or what an instance is, but my experiences administrating
                mastodon.technology have been pretty positive.
              </p>
              <p>
                I moved to Mastodon because{' '}
                <a href="https://www.vice.com/en_us/article/783akg/mastodon-is-like-twitter-without-nazis-so-why-are-we-not-using-it">
                  Twitter had too many Nazis
                </a>{' '}
                (it still does) and when I created my own instance, I got to
                establish a <a href="</a>">Code of Conduct</a>. I made sure to
                include a "no Nazis" policy. Cool! It felt nice to say "no" to
                fascists. But it also made my instance (and by extension, made{' '}
                <em>me</em>) a target.
              </p>
              <p>
                I would later{' '}
                <a href="/blog/contributing-to-mastodon/">get involved</a>{' '}
                deeper with Mastodon, contributing code fixes to its React and
                Rails code, as well as documentation. It was a very different
                kind of open source project than I was used to, and I learned a
                lot.{' '}
              </p>
              <p>
                I still remember when a serious, immediate problem with the
                federation behaviour was uncovered and the creator of Mastodon
                asked me on Discord for help (I was the only one around). "I'm
                just an iOS developer", I said. "Whatever, you know code", he
                responded. And I was like "huh, <em>yeah</em>." And we figured
                out the problem together.
              </p>
            </Entry>

            <Entry title="Stepping Back from Moya" img={moya}>
              <p>
                In 2017,{' '}
                <a href="https://ashfurrow.com/blog/stepping-back-from-moya/">
                  Stepped back from Moya
                </a>
                , which was a big deal. Moya had become a huge project – one of
                the most popular open source iOS libraries – and I had
                successfully deprecated my involvement in the project. Since my
                departure, the project has continued to grow and evolve.
              </p>
              <p>
                I can't think of a better success for an open source project
                than setting it up to survive the end of your own interest in
                it.
              </p>
            </Entry>

            <Entry title="Learning React">
              <p>
                Weirdly enough, I started doing work in React (for the web)
                before I ever touch React Native. Part of this is because of how{' '}
                <a href="https://artsy.github.io/blog/2018/04/17/making-a-components-pod/">
                  Artsy divided the React Native and native iOS parts of our app
                </a>{' '}
                – I just didn't need to know React Native to work in our app,
                because components I worked in were all Objective-C or Swift.
                Rather, I began contributing to web projects on the Auctions
                team which were in React. Specifically, they were using React
                and Redux, with GraphQL and websocket backends. Compared to the
                sophisticated tooling I'm using to now, it was quite primitive.
                But because it was so close to vanilla JavaScript, it was easy
                to dive into. I enjoyed contributing to the Auctions team
                software, whether it was in Scala or Rails or Swift, but
                especially in React. It was so fun!
              </p>
              <p>
                As an added bonus, when I <em>did</em> eventually start
                contributing to our React Native app, I <em>really</em> noticed
                all of the nice things that the tooling provided. Tools like
                TypeScript and Relay seemed so obvious in hindsight.
              </p>
            </Entry>

            <Entry title="Guitar Debut">
              <p>
                Late in 2016, I learned the Ukulele and later the guitar. At
                Artsy's annual employee art show (the <em>Artsy Salon</em>),{' '}
                <a href="/blog/guitar-debut/">
                  I performed guitar in front of a live audience for the first
                  time
                </a>
                .
              </p>
              <p>
                I was used to performing music from back in high school, when I
                played piano and saxophone. But this was different, mainly
                because <em>I was signing</em> and I really hated my voice. If
                you{' '}
                <a href="https://www.youtube.com/watch?v=582iYsdMHjA&list=PLBygl72DbBTHb0kIkmmzOx9gUyNvEwaUO&index=2&t=0s">
                  watch the recordings
                </a>
                , you can see my legs shaking.
              </p>
              <p>
                Still, it was an amazing experience, and in the middle of a very
                bad year, having a safe space to explore this new aspect of
                myself was really important.
              </p>
            </Entry>

            <Entry title="Coding in React Native">
              <p>
                By mid 2017, I had began contributing to{' '}
                <a href="https://github.com/artsy/emission">
                  Artsy's React Native code.
                </a>{' '}
                My fears and doubts persisted, but I pushed through them and
                started enjoying writing React Native user interfaces{' '}
                <em>way</em> more than I enjoyed writing similar UI in
                Swift/Objective-C. I was hooked.
              </p>
            </Entry>

            <Entry title="End of Therapy">
              <p>
                At the end of 2017, Artsy switched healthcare providers. My
                therapist had never been that helpful for me – sure, he had
                helped mitigate the day-to-day of my depression, but the
                depression itself persisted. Since I had found a medication that
                was working for me, I stopped going when he went out of network
                for my new insurance.
              </p>
              <p>
                This was probably a mistake, but would eventually work out okay.
              </p>
            </Entry>

            <Entry title="Side Effects">
              <p>
                The medication I'd found that was helping manage my depression
                has a rare, but serious (and often permanent) side-effect. A
                neurological side-effect. I started exhibiting the symptoms and{' '}
                <a href="/blog/some-updates/">
                  had to stop taking my medication right away
                </a>
                .
              </p>
              <p>
                That really sucked. Not only did I have to deal with depression
                again, but had a whole new condition to deal with. It would take
                six months before I got back to a stable place. My work
                suffered. My home life suffered. I suffered.
              </p>
              <p>
                To be honest, I don't really remember much from that six-month
                time period. What I include in this timeline is largely
                reconstructued from blog posts, git commits, and screenshots.
              </p>
            </Entry>

            <Entry title="Staying in New York?">
              <p>
                My wife Ashley and I had always toyed with moving home to
                Canada. Well, not "home" to Canada: we were from rural Canada
                but had decidedly become "city people", so a move back to Canada
                would be to a city. Vancouver, we were thinking.
              </p>
              <p>
                All that changed when my sister had her first child. Something
                in my brain switched on, and it was clear: we wouldn't be moving
                even a single kilometer further from that baby. So Vancouver was
                out of the picture.
              </p>
              <p>
                We actually couldn't be there for our niece's birth because of
                restrictions during our immigration process. The process made us
                re-evaluate what we wanted out of life and where we could live
                to get that. Since we had some roots put down into New York, and
                it's relatively close to our family (compared to Amsterdam or
                Vancouver), we decided to stay here for the time being.
              </p>
            </Entry>

            <Entry title="A Broadening Technical Perspective">
              <p>
                Late in 2017, I wrote{' '}
                <em>
                  <a href="/blog/perspective-of-the-polyglot">
                    Perspective of the Polyglot
                  </a>
                </em>
                , about my progression through Artsy's Engineering Ladder. The
                post focused specifically on the technical aspects of that
                progress. The "softer skills" were something that I was still
                working on, too, but the technical aspects of my engineering
                growth <em>was</em> a big focus for me in 2017.
              </p>
              <p>
                What I realized was that, while I was a great iOS Developer,
                what I wanted was to become a great <em>developer</em>.
                Broadening my skillset had some implications, and I'll name a
                few here.
              </p>
              <p>
                First, the most emotionally impactful one: I lost some esteem
                among the iOS developer community. That sucked. Some friends
                said things about my broadening skills that really hurt my
                feelings, though I don't think they intended to. Strangers were
                a lot more candid with their feedback about Artsy's technology
                choices – and my tacit endorsement of them. It was an isolating
                experience.
              </p>
              <p>
                Second, I had to learn to be comfortable being a beginner again.
                I've aimed to be T-shaped: a deep set of specific skills that
                can be broadly applied. I was deep enough and it was time to
                focus on broadening those skills. After a long time as an
                "expert" iOS developer, I had to learn to be okay not
                necessarily knowing what I was doing all the time. All the time,
                I had to keep my curiosity sharp, to relate my new skills back
                to my current ones.
              </p>
              <p>
                Third, but certainly not finally, I had to let go of Swift.
                While I was busy learning Rails, Scala, TypeScript, and React,
                Swift continued to evolve. I tried to stay abreast of the
                changes, but I must confess that it's harder to care about a
                language when it is only one of diverse set of languages you use
                day-to-day. A consequence of this was that I kinda fell back in
                love with Objective-C, and I still need to write a blog post
                about that.
              </p>
            </Entry>

            <Entry title="Steven Universe, omg">
              <p>
                Late in 2016, I was enjoying Steven Universe so much that I
                bought a ukulele and started learning the songs from the show. A
                year later, I decided to{' '}
                <a href="/blog/so-steven-universe-eh/">
                  distill what I loved about the show into a blog post
                </a>
                . My goal was to get as many people to watch it as possible;
                this goal continues to motivate me, which is why I'm sharing it
                now.
              </p>
              <p>
                You might be wondering what an endorsement of a cartoon
                television show is doing in a progression retrospective, but
                that would only point to a lack of familiarity with my work. I
                work at an <em>art</em> company, the show is about{' '}
                <em>empathy</em>... I dunno, it seems obvious to me.
              </p>
              <p>
                People keep finally taking my repeated suggestions, and they
                keep thanking me for my persistence. Go watch it.
              </p>
            </Entry>

            <Event className="year" date="2018" />

            <Entry title="Changes at Artsy">
              <p>
                2018 began with a re-organization of our Engineering team. There
                were a lot of changes, and they weren't handled well. The{' '}
                <em>way</em> the changes were handled were a lot more costly
                than they needed to be, and introduced a lot of tension to the
                team.
              </p>
              <p>
                I'm putting this in the timeline at the beginning of the year,
                but this affected most of 2018. It was a shame, but a lot of us
                learned quite a bit.{' '}
                <a href="https://artsy.github.io/blog/2019/04/19/having-a-coffee-with-every-engineer/">
                  I played a (small) role in helping to remedy the tension
                </a>
                , but like any change, it had a permanent effect on our culture.
              </p>
              <p>
                This was a pretty important lesson for me: Artsy is going to
                change. It always <em>has</em> been changing, but as I'd grown
                into a more senior role in the team, I was paying more
                attention. I also learned that, while changes have costs, they
                present some opportunities for personal and team growth.
              </p>
              <p>
                In the end, we resolved our issues by living by our core company
                values, in particular: People are Paramount, Openness, Positive
                Energy. It was still more costly than it had to be, but this
                might just be the kind of lesson that every growing company has
                to learn.
              </p>
            </Entry>

            <Entry title="Bid Flow" img={bidflow}>
              <p>
                In 2018, I joined Artsy's Purchase team to help them build a new
                "Bid Flow" on iOS. For some time, we were aware of a gap between
                user behaviour on auctions through the web, and through our app,
                and our hypothesis was that this gap was due to the iOS
                experience being... pretty bad, actually. It's a satisfying
                feeling to both build a new user experience while also remove
                old code and migrating to a new framework. But that wasn't the
                most important part of this project, for me.
              </p>
              <p>
                I joined the Purchase team not to <em>build</em> the new Bid
                Flow, but to <em>help the team</em> build it. My role was to
                support the other engineers, who mostly had web backgrounds.
                This was their first big React Native project, and they needed
                some guidance. I was their guide.
              </p>
              <p>
                This was the first time, explicitly and in a technical sense, my
                job was to help other engineers be productive. I really enjoyed
                my time on the Purchase team, and I'm proud of what we built. In
                hindsight, this was a key turning point in my career, where I
                started to apply those deep skills in a broad set of situations.
              </p>
            </Entry>

            <Entry title="Buying into React Native">
              <p>
                Artsy's investments in React Native have always been motivated,
                in part, by a desire to de-silo iOS development at the company.
                The Purchase team Bid Flow project was the first time that I had
                experienced the benefit of sharing an idiom (React) and tooling
                across all our front ends. I was amazed at what we managed to
                accomplish in a very short amount of time.
              </p>
              <p>
                While I was learning, I wrote about my experiences. Since most
                React Native developers come from a web background, I{' '}
                <a href="/blog/react-native-starter-resources-for-native-developers/">
                  tried to make React Native less intimidating
                </a>{' '}
                to native iOS developers.
              </p>

              <p>
                <a href="https://facebook.github.io/react-native/blog/2018/05/07/using-typescript-with-react-native">
                  I wrote a blog post on the official React Native blog
                </a>
                . Using my perspective with one foot in both the JavaScript and
                iOS develop worlds, I looked at what made React Native hard to
                approach, and wrote{' '}
                <em>
                  <a href="/blog/javascript-is-good-actually/">
                    JavaScript is Good, Actually
                  </a>
                </em>
                , a blog post which certainly didn't help my alienation from the
                iOS developer community.
              </p>
              <p>
                Or did it? I found that, as I've grown, so has the community.
                There are certainly still curmudgeons who will always hate React
                Native, but there's a growing number of people who are keen to
                learn outside the bounds set by Apple. In staking my reputation
                on an idea like "JavaScript is good", I discovered that many iOS
                developers <em>were</em> interested in React Native.
              </p>
            </Entry>

            <Entry title="Mission Accomplished. Kind of.">
              <p>
                In March, after months of ignoring my psychiatrist's advice, I
                started seeing a specialist in Cognitive Behaviour Therapy. It
                was the exact intervention that my depression needed, and in
                only seven sessions,{' '}
                <a href="/blog/all-i-can-say-is-im-excited/">
                  I had the skills I needed to manage my emotions
                </a>
                .
              </p>
              <p>
                It's easy to look back on this as the "end" of my depression,
                but it remains a struggle even today. I have to constantly be
                using those skills, refining them, practicing them. I stayed on
                medication for a year afterward. I still have bad days. But I
                have the skills to handle them, and I mostly do okay.
              </p>
            </Entry>

            <Entry title="Guitar Progress" img={jamsesh}>
              <p>
                I continued learning the guitar. I took some private lessons,
                eventually, but was mostly self-taught.{' '}
                <a href="https://www.youtube.com/watch?v=1pIf5VPhmco&list=PLBygl72DbBTHIpDE63lPSvddwHs6FbgRQ">
                  I performed at the Artsy Salon again
                </a>
                , and was a lot less nervous.{' '}
                <a href="https://twitter.com/ashfurrow/status/1010889745398927361">
                  I played at a jam session my friend organized
                </a>
                . I even{' '}
                <a href="/blog/just-play/">
                  recorded myself playing music every day for a month
                </a>
                .
              </p>
              <p>
                Guitar was a way for me to express myself, creatively, and it
                replaced photography as my main way of expressing myself. It was
                also a way for me to feel connected to home: most of the songs I
                learn to play and sing on the guitar are by Canadian artists,
                like John K Samson, Jim Bryson, and The Barenaked Ladies.
              </p>
            </Entry>

            <Entry title="The Case for React Native">
              <p>
                The whole time I'd been writing about React Native, I realized
                that I had been dancing around <em>why</em> to use it. Sure, I
                could point to Artsy blog posts about why <em>we</em> used it,
                but there wasn't a place to learn, from a native iOS developer's
                perspective, why React Native was worth learning.
              </p>
              <p>
                I wrote{' '}
                <em>
                  <a href="/blog/the-case-for-react-native/">
                    The Case For React Native
                  </a>
                </em>{' '}
                to explain why I thought React Native is a good fit for "a lot
                of iOS apps (many? most?)". The tl;dr is that React itself is
                worth it. Additionally, TypeScript is good enough to make any
                Swift developer feel at home writing code that gets compiled
                down to JavaScript.
              </p>
            </Entry>

            <Entry title="Artsy Engineering Guiding Principles">
              <p>
                At the end of 2018, after a lot of growth, Artsy Engineering{' '}
                <a href="https://artsy.github.io/blog/2018/08/22/engineering-guiding-principles/">
                  defined its guiding principles
                </a>
                . This was a collaborative effort, to define (and{' '}
                <a href="https://github.com/artsy/README/blob/master/culture/engineering-principles.md">
                  open source
                </a>
                ) a list of first principles that could be referred to. These
                are useful for making decisions, giving feedback, building new
                software, fixing old software, lots of stuff. I cite them often
                in discussions at work – as a shared foundation of our culture,
                they become more and more valuable the more they are used.
              </p>
            </Entry>

            <Entry title="Uncertain Identity" img={cultureamp}>
              <p>
                I don't remember exactly when it happened, but at some point, I
                started getting uncomfortable when people identified me as
                straight. It comes up in conversation more than you might think,
                if the subject of your sexuality happens to be on your mind
                enough.
              </p>
              <p>
                Artsy uses a tool called Culture Amp to do regular, anonymous
                surveys of its employees. This makes sure that the company, its
                leadership, its various teams, etc, are all providing a
                workplace that lives up to our company values. At the end of the
                survey, there are some demographic questions – these are to get
                a thorough picture of how Artsy is meeting its employees needs.
              </p>
              <p>
                So anyway, the Culture Amp survey asked me what my sexuality
                was. This question had been making me uncomfortable for a while,
                but I remember finally thinking "hey, this is just an anonymous
                survey, the stakes are low, why not just <em>try</em> putting{' '}
                'bisexual'?" So I did.
              </p>
              <p>
                And I remember a few weeks later when the results were
                distributed internally, seeing the breakdown of the company by
                demographics. I saw the sexuality pie chart and I remember
                thinking "there are more of us than I thought." <em>Us</em>. It
                was the first time I'd admitted this to anyone – even myself –
                that I was't straight. I remember it distinctly.
              </p>
            </Entry>

            <Entry title="My First JavaScript Meetup Talk">
              <p>
                A big part of my work in the iOS developer community has been
                delivering talks at conferences and meetups.{' '}
                <a href="/speaking/">My speaking page</a> lists dozens of talks
                I've given over the years. In late 2018, I gave{' '}
                <a href="/blog/first-js-meetup-talk/">
                  my first talk at a JavaScript meetup
                </a>
                .
              </p>
              <p>
                I live-coded a TypeScript linter plugin that used the TypeScript
                AST to apply auto-fixits for{' '}
                <a href="https://en.wikipedia.org/wiki/De_Morgan's_laws">
                  De Morgan's Laws
                </a>
                . The exercise was pedagogical – only meant to teach how one can
                build other, more useful tools. It was difficult, but I had a
                blast, and came away with a richer appreciation of the
                JavaScript community and their enviable relationship to their
                own tools.
              </p>
            </Entry>

            <Entry title="Today I Learned...">
              <p>
                As I moved more and more into my role as senior engineer, I was
                doing less <em>deep</em> technical work. My job wasn't being
                productive, it was helping <em>others</em> being productive. But
                I wanted to make sure that I kept learning.{' '}
              </p>
              <p>
                I started a{' '}
                <a href="https://github.com/ashfurrow/TIL/issues">
                  "Today I Learned" repository
                </a>{' '}
                to record at least one thing I've learned, everyday. It'
                difficult and I don't always remember, but it's gotten me in the
                habit of thinking about what I learn, and it's become a
                repository of notes and links to useful reousrces for me.
              </p>
              <p>
                Sometimes{' '}
                <a href="https://github.com/ashfurrow/TIL/issues/53">
                  I learn really specific technical things
                </a>
                . Sometimes{' '}
                <a href="https://github.com/ashfurrow/TIL/issues/67">
                  I learn about team management
                </a>
                . And sometimes I learn{' '}
                <a href="https://github.com/ashfurrow/TIL/issues/125">
                  really personal stuff
                </a>
                . It's all up for grabs.
              </p>
            </Entry>

            <Event title="Physical Therapy">
              <p>
                Late in 2018, I finally took up a recommendation from some
                colleagues to see their physical therapist. I'd been battling
                wrist pain for years but after a doctor gave up on helping me, I
                kind of gave up too. I'm glad I listened to them, because{' '}
                <a href="/blog/learning-to-walk/">
                  the physical therapy been very successful
                </a>{' '}
                and the therapist{' '}
                <a href="/blog/learning-to-run/">
                  has had a truly life-changing effect on me
                </a>
                .
              </p>
              <p>
                Treatment is ongoing, but I feel like we're almost there. As a
                programming, repitive stress injuries can be really frightening.
                If you're struggling with pain, please seek treatment. And
                before undergoing drastic interventions, make sure to get a
                second opinion.
              </p>
            </Event>

            <Event className="year" date="2019" />

            <Entry title="Buy Now" img={buynow}>
              <p>
                After the success of the Bid Flow project, the Purchase team
                moved onto the next big challenge, and I decided to stay on the
                team and help. This new feature would require <em>some</em> iOS
                development work, but most of my contributions would be to the
                web code. I'd learned enough React Native, and our tooling
                shared so much in common, that I was able to jump in and be
                productive right away. We worked on this throughout the latter
                part of 2018 and used a phase rollout, culminating in{' '}
                <a href="https://github.com/artsy/force/pull/3300">
                  a January release
                </a>
                .
              </p>
              <p>
                Buy Now was a company-wide push to make buying art online{' '}
                <em>way</em> easier. Being able to enter a credit card and just{' '}
                <em>purchase</em> art was something unfamiliar to the art world,
                and it took years of building up trust and relationships with
                Artsy partners before were in a position to even try to do this.
                As usual, technology was the easy part.{' '}
              </p>
              <p>
                You can see the photo here of the launch celebration, and you
                can see every department in Artsy.
              </p>
            </Entry>

            <Entry title="Buying a Webcam">
              <p>
                I have a desktop computer at home – it has no webcam. I'd work
                from home and get my work done, and if I had to do a remote
                call, it would be audio-only.
              </p>
              <p>
                For a while, that was fine. But as I wanted to grow my influence
                at Artsy, I realized that I was robbing myself and my colleagues
                fromt he chance to <em>see</em> me. There's a huge difference on
                a conference call on audio-only and one with visuals. So I
                bought a webcam and have used it basically every day I work from
                home.
              </p>
            </Entry>

            <Entry title="Discover Team">
              <p>
                Early in the year, my manager Eloy asked me if I was interested
                in moving into a Technical Lead role on Artsy's Discover team.{' '}
                <a href="https://ashfurrow.com/blog/reflecting-on-5-years-at-artsy/">
                  I wrote about it at the time
                </a>
                , and things went well for a few months. Sadly, it wasn't to
                last.
              </p>
              <p>
                I won't go into details, but the team found itself without a
                product manager. The rest of our PMs at Artsy were stretched
                thin already, and we had some tradeoffs to make. Artsy's VP of
                Engineering met with the team and we discussed those tradeoffs.
                He trusted us to make the right call for the business, and we
                decided to dissolve the Discover team and move its
                responsibilities to other teams.
              </p>
              <p>
                It kind of upset me. I'd been working towards this Tech Lead
                role for a few months, and returning to individual contributor
                work seemed like a step backward. It wasn't, but it felt like it
                was. The lesson I learned through this process is that technical
                leadership is not a title – it's a way of doing engineering. I
                had been doing technical leadership since before I was a "Tech
                Lead", and I kept doing it even after going back to IC work. My
                feelings had to run their course, and I learned a lot in the
                process.
              </p>
            </Entry>

            <Entry title="End of Medication">
              <p>
                I had stabilized my mood through Cognitive Behavioural Therapy
                in 2018, but I kept on my psychiatric medication. The idea was
                to make sure I was stabilzed before adjusting anything.
              </p>
              <p>
                I was keen to get off my medications. I didn't like being
                dependent on them, and they had some unpleasant side-effects. I
                hadn't been totally medication-free since 2011.
              </p>
              <p>
                So I waited a year before starting to taper down. It was very
                difficult. Every time I checked in with my psychiatrist, she
                would remind me that having two major depressive episodes
                already meant that I was statistically very likely to have them
                again in my lifetime. I don't think she wanted me to stop my
                medication, but she still helped me.
              </p>
              <p>
                It took a few months,{' '}
                <a href="https://twitter.com/ashfurrow/status/1124461096969097217">
                  but I finally did it
                </a>
                .
              </p>
            </Entry>

            <Entry title="Mastodon Going Strong" img={pianocat}>
              <p>
                It's been nearly three years since I launched{' '}
                <a href="https://mastodon.technology">mastodon.technology</a>,
                and it's going really well! I'm more of a lurker than a poster
                on the fediverse, but I do try to send out a "good morning" post
                every day: a meme, a photo I took on the walk to work, a selfie,
                something to just say "good morning." (
                <a href="https://mastodon.technology/@ashfurrow/101291161385779358">
                  Here is my 2018 thread
                </a>
                , and{' '}
                <a href="https://mastodon.technology/@ashfurrow/103300784680224031">
                  here is the 2019 thread so far
                </a>
                ). I like it as a user: most of the time I spend on social media
                is spent on Mastodon. But I also like it as an admin: I get to
                help create the kind of online community that I'd like to see in
                the world.
              </p>
              <p>
                At time of writing, my instance has 19 344 users (many are
                inactive, only 1 161 have logged in within the past two weeks).
                Keeping up with software updates and server maintenance turned
                out to be the easy part – I know my way around computeres, and
                have{' '}
                <a href="https://www.patreon.com/ashfurrow/posts">
                  shared what I learn as I go
                </a>
                . The harder part was building the community.
              </p>
              <p>
                I've succeeded only because I haven't worked to build a
                community, but have built a <em>team</em> to help me. I noticed
                when people were making positive contributions to the instance,
                and invited them to help me moderate the instance. In 2019, I
                made the big step of asking one of the mods to become another
                admin. This would give them full administrative access to the
                instance and its database. It's a huge level of trust, and it
                was a lot of work to build it up, but it's been so worth it. The
                team has created the exact kind of community I want to be a part
                of. To my moderator team: thank you.
              </p>
            </Entry>

            <Entry title="City Guides" img={cityguides}>
              <p>
                After the Discover team dissolved, I joined Artsy's Grow team to
                help them complete{' '}
                <a href="https://www.architecturaldigest.com/story/artsy-app-changing-the-game-for-art-and-design-lovers">
                  City Guides
                </a>
                , a in-progress project. I wasn't used to joining in-prorgress
                work; I prefer to be involved throughout the product development
                process: brainstorming with stakeholders, providing early design
                feedback, that kind of stuff. This was a new challenge.
              </p>
              <p>
                City Guides also had a deadline, which was unusual for Artsy in
                general. The LAI launch in 2016 had been quite an exception: we
                typically build iteratively and release features when they're
                done. But sometimes, you have an external deadline, and this was
                one of those times. And, after I joined the project, it became
                clear that we were actually quite behind schedule. We had to
                hustle.
              </p>
              <p>
                The experience reminded me of LAI, but mostly only in good ways.
                We asked for help from the engineering team, and we got the
                support we needed. Through hard work and open communication, we
                got it done on time. Then we looked back and what we could learn
                from the experience. I was involved on the project for about two
                months and I learned so much.
              </p>
            </Entry>

            <Entry title="Artsy Departures">
              <p>
                2019 saw a lot of changes at Artsy, and one of the biggest
                impacts on <em>me</em> was the departure of Orta (who had hired
                me at Artsy) and dB (who had, more than anyway, established
                Artsy Engineering's culture).
              </p>
              <p>
                They each left for their own reasons – ready to move on to the
                next challenge. You can{' '}
                <a href="https://orta.io/on/leaving/artsy">
                  read Orta's reflections on leaving Artsy here
                </a>
                . It all makes sense, but I can't help but feel a sense of
                mourning for an Artsy that doesn't exist anymore. That won't and
                can't exist anymore.
              </p>
              <p>
                That said, I'm also excited for the Artsy that is coming into
                existence. It's easy to only see the downsides of change, but
                2019 has been a crash course in seeing the opportunities, too.
                Orta's not around anymore to own Artsy's iOS stack, but that's
                given me space to step out of his shadow a bit. dB's not around
                to maintain our engineering culture, but that's given me the
                space to build the culture up even further.
              </p>
            </Entry>

            <Entry title="Purchase Team Redux" img={artworkpage}>
              <p>
                Once the City Guides project was completed, I was asked which
                team I'd like to join next. The Purchase Team was rebuilding the
                artwork view in React Native, which was a perfect project for me
                to help out as a multiplier. It would mean joining another
                in-progress project, so it was a good learning experience for
                me.
              </p>
            </Entry>

            <Entry title="Staff Engineer">
              <p>
                I had been working towards a promotion to Staff Engineer for a
                long time. The job title has no universally-agreed upon
                definition (although{' '}
                <a href="https://github.com/artsy/README/blob/master/careers/ladder.md">
                  Artsy's Engineering Career Ladder is open source
                </a>
                ). My take on it is this: as a Senior Engineer, it was my
                responsibility to be productive. As a Staff Engineer, it's my
                responsibility to make <em>everyone</em> productive: my team,
                the whole Artsy company, the entire software industry.
              </p>
              <p>
                I mentioned{' '}
                <a href="/blog/reflecting-on-5-years-at-artsy/">
                  in this blog post
                </a>{' '}
                that I was excited to have the institutional authority to
                execute on the cultural authority that I have accrued at Artsy.
                It's a lot of responsibility and I'm growing in new and
                challenging ways.
              </p>
            </Entry>

            <Entry title="Artsy Leadership Changes">
              <p>
                Artsy had some leadership changes this year. Our CTO dB made
                sure to hire a VP of Engineering to set us up for success,
                before{' '}
                <a href="https://code.dblock.org/2019/11/17/the-pros-and-cons-of-going-from-management-back-to-ic.html">
                  he returned to individual contributor work
                </a>
                . Artsy also{' '}
                <a href="http://files.artsy.net/documents/artsy-names-new-ceo.pdf">
                  hired a new CEO
                </a>
                . These changes are felt at every level of the company. After
                the changes to the Product/Engineering organization in 2018, I
                feel prepared to handle these changes at Artsy.
              </p>
            </Entry>

            <Entry title="Green Card Process Completes" img={greencardend}>
              <p>
                Midway through 2019, Ashley and I became Permanent Residents of
                the United States of America. We passed all the background
                checks and interviews and medical exams and everything. Our
                former visas, as well as the Green Card process itself, had some
                restrictions that we'd been living with for years. They were
                finally lifted.
              </p>
              <p>
                I can't tell you how weird it feels. I never thought I'd{' '}
                <em>live</em> in the United States. And yet, here I am. New York
                feels like home. I miss Canada (some days a lot more than
                others), but living outside my home country has also given me an
                interesting perspective <em>on</em> that country. I really
                appreciate that perspective. And with our Green Cards, we're now
                able to visit easier than ever before.
              </p>
            </Entry>

            <Entry title="Coming Out" img={comingout}>
              <p>
                So yeah. After coming out to myself as bisexual, I had to figure
                out what to do next. The decision of whether to tell anyone else
                – my wife, my family, or even the whole world. I didn't want to
                for a long time, but I realized that I didn't want to because I
                was afraid. And after years of hiding, I didn't want to be
                afraid anymore. I told my wife, who totally supported me, and
                then waited for our immigration process to complete (our
                marriage needed to be verified by the United States government,
                and I wasn't taking any changes). Finally,{' '}
                <a href="/blog/coming-out/">I came out in a blog post</a>.
              </p>
              <p>
                I wrote the blog post at Peer Lab in the morning, but in my
                head, I'd been writing it for months. I got my wife to read it
                over for typos (she often helps me edit my posts, thank you
                Ashley 🙏) and then pushed it into the world.
                <a href="https://twitter.com/ashfurrow/status/1137463336235347969">
                  I tweeted about it
                </a>
                . People responded with overwhelming support and positivity. It
                felt (mostly) amazing.
              </p>
              <p>
                <a href="https://thenib.com/i-came-out-late-and-that-s-okay">
                  Coming out late in life
                </a>{' '}
                (the image credits for this comic) isn't a common coming-out
                story, and it involves navigating a lot of emotions. But I'm not
                alone, and I'm excited to be my whole self.
              </p>
            </Entry>

            <Entry title="Stepping Up">
              <p>
                Near the end of 2019,{' '}
                <a href="https://twitter.com/alloy/status/1203981302652899329">
                  my manager Eloy{' '}
                </a>
                left Artsy. I miss working with him already, but I'm excited for
                what's coming next for him.
              </p>
              <p>
                Eloy's departure makes me the last remaining member of Artsy's
                original Mobile Team. There's <em>a lot</em> of responsibility,
                but I feel set up for it. When I look back on my early feelings
                about React Native (I didn't like it <em>at all</em>), I really
                regret keeping my head in the sand for so long. I missed my
                chance to participate in decisions that formed the foundation of
                Artsy's iOS architecture, and yet now I find myself responsible
                for that architecture. I need to have opinions about what it
                should look like in the future, to help Artsy meet its business
                goals. It's challenging work, but I'm not doing it alone. (See
                the next section.)
              </p>
              <p>
                There is more responsibility to shoulder than just the technical
                aspects of Artsy's products, though. The departures of dB, Orta,
                and now Eloy, have left our engineering team short on
                cheerleaders: people who guide and shape Artsy's culture by
                empowering people to succeed <em>in</em> that culture.
                Throughout the changes at Artsy (and the inevitable culture
                turbulence that comes with <em>any</em> company change), I found
                myself steping up.
              </p>
              <p>
                I'm putting my principles into action. All my research into team
                dynamics and so-called "soft skills" is paying off. I have both
                the cultural and the institutional authority I need to have have{' '}
                <em>huge</em> impact on the future of Artsy. I'm surrounded by
                other leaders who want to help me succeed. I feel empowered. I
                feel motivated. I feel excited.
              </p>
              <p>
                I've spent nearly six years at Artsy, and that has taught me
                that change is constant. Artsy's always been changing: growing,
                making mistakes, and learning from them. Change is a constant,
                in life. I'd by lying if I said some changes don't feel more
                significant than others, but changes are opportunities, too. I'm
                so excited take full advantage of those opportunities.
              </p>
            </Entry>

            <Entry title="Mobile Experience Team">
              <p>
                When I returned from vacation in August, I found an{' '}
                <a href="https://github.com/artsy/README/blob/master/playbooks/rfcs.md">
                  RFC
                </a>{' '}
                in my inbox: should Artsy have a mobile team again? And I was{' '}
                <em>very</em> excited.
              </p>
              <p>
                Artsy <em>had</em> a Mobile team when I started, but it was
                dissolved in 2016.{' '}
                <a href="https://artsy.github.io/blog/2019/03/17/three-years-of-react-native/">
                  We adopted React Native
                </a>
                , in part, to{' '}
                <a href="https://github.com/artsy/README/blob/master/culture/engineering-principles.md#de-silo-engineers">
                  "de-silo" our engineering teams
                </a>
                . It worked, but it had some consequences on the software we
                built (see:{' '}
                <a href="https://en.wikipedia.org/wiki/Conway%27s_law">
                  Conway's Law
                </a>
                ). It was time to dedicate a team to making the app awesome.
              </p>
              <p>
                We formed Artsy's Mobile Experience team in October. We've got
                limited resources (don't all startups?) but have big goals and
                are empowered by Artsy leadership to drive the product forward.
              </p>
              <p>
                I was really excited to get to create a new team, become a Tech
                Lead again, and return to working on iOS software every day.
                I've gained a really wide perspective on software development,
                and it's time to zoom back in on a technical domain that I am so
                intimately familiar with. I'm still new to being a Tech Lead,
                but by all accounts, I am <em>killing</em> it. I feel proud of
                what we've already accomplished, I feel empowered by everyone
                around me, and I am <em>so</em> excited for the future of
                iOS/mobile at Artsy.
              </p>
            </Entry>
          </Events>
        </ReactTimeline>
      </Wide>
    )
  }
}
