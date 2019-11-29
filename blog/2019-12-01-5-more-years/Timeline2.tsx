import React from 'react'
import {
  Timeline as ReactTimeline,
  Events,
  Event,
  UrlButton,
  ImageEvent,
  TextEvent,
  YouTubeEvent,
  themes,
  createTheme
} from '@merc/react-timeline'
import Theme from '../../config/Theme'
import Wide from '../../src/components/Wide'
import { kebabCase, camelCase } from 'lodash'

import dotSwift from './dotSwift.jpg'
import leaving from './leaving.jpg'
import cats from './cats.jpg'
import armory from './armory.jpg'
import hamburg from './hamburg.jpg'
import uikonf from './uikonf.jpg'
import drawing from './drawing.jpg'
import voting from './voting.jpg'
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

            <Entry title="Voting" img={voting}>
              <p>
                Voting from abroad in 2015 was really important to me. I abhored
                the tory government that I'd felt had bullied Canada and
                tarnished its reputation. I wanted to feel connected to Canada.
              </p>
              <p>
                Of course, Trudeau would go on to{' '}
                <a href="https://trudeaumetre.polimeter.org">
                  break a lot of promises
                </a>
                . Over the next few years, I would feel alienated by the
                juxtaposition of my disappointment in his government and of the
                world fawning over Trudeau.
              </p>
              <p>
                When I tried to talk about this, online and in real life, my
                fairly commonsense criticism of Trudeau was met with mild shock.
                Non-Canadians are, I guess, just not accustomed to thinking
                about Canada as a country with internal politics. Nor are they
                aware of the many people to Trudeau's left who are pushing for
                Canada to live up to the paragon everyone thinks it already is.
              </p>
              <p>
                I voted to stay connected to my country, but it kind of ended up
                pushing me away. This becomes important later, when Ashley and I
                decide to become Permanent Residents of the United States.
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

            <Entry title="Life at Artsy">
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
            </Entry>

            <Entry title="Loosely Held Strong Convictions" img={pragma}>
              <p>
                TODO talk about how this was my most important talk so far.
                Maybe use it as a way to talk about how I was speaking at fewer
                and fewer conferenes over time.
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

            <Entry title="The Auctions Team">
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

            <Entry title="Film!" img={film}>
              <p>
                I love photography. And since moving to New York, I doubled-down
                on my love of <em>film</em> photography, particularly. I was
                shooting mainly black-and-white film so I could develop and scan
                it myself. It had become an improtant part of my day-to-day life
                in New York.
              </p>
              <p>
                TODO talk about how art relates to my career, paralleling the
                note from 2015
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

            <Entry title="Peer Lab Community">
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

            <Entry title="TOOD">
              <p>Do this.</p>
            </Entry>

            <Entry title="TOOD">
              <p>Do this.</p>
            </Entry>

            <Entry title="TOOD">
              <p>Do this.</p>
            </Entry>
          </Events>
        </ReactTimeline>
      </Wide>
    )
  }
}
