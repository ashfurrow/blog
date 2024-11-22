import React from 'react'
import {
  Timeline as ReactTimeline,
  Events,
  Event,
  themes,
  createTheme
} from '@merc/react-timeline'
import { theme } from 'config/theme'
import styled from 'styled-components'
import { camelCase } from 'lodash'

import Mastodon from './elephantfriend.png'
import FloatAd from './floatad.jpeg'
import Jasper from './eric.jpeg'
import ShelterRace from './shelterrace.jpeg'
import Keyboard from './keyboard.jpeg'
import Crossword from './crossword.jpeg'
import Dave from './dave.jpeg'

import { media } from 'utils/media'

const Wide = styled.div`
  margin: 0 auto 1.6rem;
  position: relative;
  width: 75vw;
  margin-left: -37.5vw;
  left: 50%;

  @media ${media.tablet} {
    width: 90vw;
    margin-left: -45vw;
    left: 50%;
  }

  @media ${media.phone} {
    width: 100vw;
    margin-left: -50vw;
    left: 50%;
  }
`

const customTheme = createTheme(themes.default, {
  card: {
    backgroundColor: 'rgb(248, 248, 248)',
    a: {
      color: theme.colors.primary
    }
  },
  date: {
    backgroundColor: theme.colors.primary,
    fontSize: '3rem'
  },
  marker: {
    borderColor: theme.colors.primary
  },
  timelineTrack: {
    backgroundColor: theme.colors.primary
  },
  timeline: {
    fontSize: 'inherit',
    fontFamily: 'ff-tisa-web-pro'
  }
})

const Entry: React.FC<{ img?: string; imgAlt?: string; title: string }> = ({
  img,
  imgAlt,
  title,
  children
}) => {
  const anchorName = camelCase(title).toLowerCase()
  return (
    <Event
      date={
        img && (() => <img src={img} className="eventImage" title={imgAlt} />)
      }
    >
      {title && (
        <>
          <h3 id={anchorName}>
            {title}
            <a
              href={`#${anchorName}`}
              onClick={(event) => {
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
export class Timeline3 extends React.Component {
  componentDidMount() {
    if (window.location.hash) {
      const element = document.getElementById(
        window.location.hash.replace('#', '')
      )
      if (element) {
        setTimeout(() => (element as any).parentNode.scrollIntoView(true), 500)
      }
    }
  }

  render() {
    return (
      <Wide>
        <ReactTimeline theme={customTheme}>
          <Events>
            <Event className="year" date="🗓️ 2020" />

            <Entry title="Medical Issue">
              <p>
                At the beginning of Janyar, I had a doctor's appointment and was
                referred to a surgeon to address a non–lethal condition. I saw
                the surgeon by early February and had the procedure was
                scheduled for March 2020.
              </p>

              <p>
                Expedient, but costly. I was told that while the surgeon was
                "in-network" and covered by my insurance, the anesthiologist
                might not be covered. I could call the hospital the day before
                to find out. When I would eventually have the procedure, they
                were both covered. Each cost about USD 3500.
              </p>

              <p>
                I'd never had surgery before but I played it so cool that people
                around me didn't realize how afraid I was. I don't think even I
                knew how afraid I was.
              </p>
            </Entry>

            {/* <Entry
              title="Entry title"
              // img={hamburg} // Import images locally and put them here
              // imgAlt="Photo of some trains" // Don't forget about the alt tag!
            >
              <p>
                Everything in these blocks needs to be valid JSX for HTML, no
                Gatsby nonsense.
              </p>
            </Entry> */}

            <Entry title="COVID-19 Pandemic">
              <p>TODO:</p>
            </Entry>

            <Entry title="Final Peer Lab">
              <p>TODO:</p>
            </Entry>

            <Entry title="Surgery">
              <p>
                I got a call about ten days before my surgery date that the
                procedure had been cancelled due to the pandmic. I felt trapped.
              </p>
              <p>
                But then I got another call, maybe a month later? Things were
                back on. I went through several months of uncertainty but
                finally had the procedure. They scheduled me for the first or
                second days of procedures, actually.
              </p>
              <p>
                Surgery sucked. I had to go to the hospital by myself. The cab
                driver on the ride to the surgery pointed out the semi trailers
                that were being used as temporary morgues. The surgery was
                delayed over an hour because, as I was told, "we haven't used
                the surgery robot in a while and they're having trouble booting
                it up."
              </p>
              <p>My recovery didn't go the smoothest.</p>
            </Entry>

            <Entry title="Decision to Move Home">
              <p>TODO:</p>
            </Entry>

            <Entry title="Moving Home to Canada">
              <p>TODO:</p>
            </Entry>

            <Entry title="Leaving Artsy">
              <p>TODO:</p>
            </Entry>

            <Event className="year" date="🗓️ 2021" />

            <Entry title="Starting at Shopify">
              <p>TODO:</p>
            </Entry>

            <Entry title="First Race">
              <p>TODO:</p>
            </Entry>

            <Entry title="Building an SDK from Scratch">
              <p>TODO:</p>
            </Entry>

            <Entry title="Buying a House">
              <p>TODO:</p>
            </Entry>

            <Entry title="Shop Minis">
              <p>TODO:</p>
            </Entry>

            <Entry
              title="Goodbye Dave"
              img={Dave}
              imgAlt="Photo of an orange cat laying in the sun"
            >
              <p>TODO:</p>
            </Entry>

            <Event className="year" date="🗓️ 2022" />

            <Entry title="Hello Clementine">
              <p>TODO:</p>
            </Entry>

            <Entry title="Taking Shop Minis Public">
              <p>
                Around this time, two teams were assigned to work on the Shop
                Minis SDK. I was going to continue leading the project in a
                technical direction, but two teams based in EMEA were going to
                actually implement the SDK. That was great, since the complexity
                of the project was about to explode in orders of magnitude. My
                role was holder of the technical vision.
              </p>
              <p>
                But between insulation from the SDK implementation to isolation
                from teams working in Central European Timezone, it was not a
                satisfying role to play.
              </p>
            </Entry>

            <Entry
              title="Jasper"
              img={Jasper}
              imgAlt="Screenshot of a Shop Mini showing a selfie with myself and Eric Florenzano"
            >
              <p>TODO: photo with Eric Florenzano</p>
            </Entry>

            <Entry title="Depression">
              <p>TODO:</p>
            </Entry>

            <Entry title="Work in Big Tech">
              <p>
                TODO: having a hard time working in a big company. lots of
                invisible politics, hard to improve things across a large team.
                my teams were distributed in EMEA.
              </p>
            </Entry>

            <Entry title="Family Illness">
              <p>TODO:</p>
            </Entry>

            <Entry title="Waitlisted">
              <p>
                Around this time, I made an appointment with a doctor about the
                medical issue that I'd had surgery for. It seemed to have
                recurred, and the doctor referred me to a surgeon. The expected
                weight time was 6–12 months.
              </p>
              <p>
                Knowing that I would have to pay nothing for any of this medical
                care almost made up for the wait.
              </p>
            </Entry>

            <Entry
              title="Shutting Down Mastodon"
              img={Mastodon}
              imgAlt="Mastodon Elephant Logo TODO: find a more appropriate image here."
            >
              <p>TODO:</p>
            </Entry>

            <Entry title="Family Death">
              <p>TODO:</p>
            </Entry>

            <Entry title="Switching Teams">
              <p>
                At the end of the year, after talking it over for a while, my
                manager found a new initiative for me to dig my teeth into. I
                was tasked with improving the Shop app's performance. Not
                specifically in app metrics, but to build the tools and culture
                that made it easy for Shop developers to build a performant app.
                I was excited.
              </p>
            </Entry>

            <Event className="year" date="🗓️ 2023" />

            <Entry title="Personal Problems">
              <p>
                I'm not going to go into much detail here, but it would be
                disingenuous not to mention that I was under a lot of personal
                stress at this point in time.
              </p>
              <p>
                The events of the past six months, from family illness and death
                to depression and burnout, had certainly taken a toll. But...
                you know how everyone has issues that they kind of sweep under
                the rug, that don't <em>need</em> attention immediately, but{' '}
                <em>do need</em> attention eventually? Well, eventually happened
                and I had to deal with my shit.
                <p>Then, another family memberpassed away, suddenly.</p>
              </p>
              <p>I was as stressed as I'd ever been in my life.</p>
            </Entry>

            <Entry title="Shopify Layoff">
              <p>
                On May 4th, my position with Shopify was terminated. Legally
                speaking, I have nothing further to say on the issue.
              </p>
            </Entry>

            <Entry title="Reflection">
              <p>
                After the layoff, I took a month off to think about my life.
                About what I wanted in a job, sure, but more broadly too.
              </p>
              <p>
                I had been working as a fulltime employer or studying as a
                fulltime student, sometimes both at once, since I was 15. I felt
                burned out. The mountain of personal events that preceeded the
                layoff were demanding I process them.
              </p>
              <p>
                Honestly, having the summer to settle myself was really
                important. I doubled down working through some personal issues
                in therapy. I visited PEI for the first time.
              </p>
              <p>
                I determined where I could be flexible and where I had to be
                rigid, and then I acted accordingly.
              </p>
            </Entry>

            <Entry title="Job Search">
              <p>TODO:h</p>
            </Entry>

            <Entry title="My Number Comes Up">
              <p>
                The day that I accept the job offer from my new employer, I get
                a phone call.
              </p>
              <p>
                A surgeon is ready to see me. "Can you come in for an
                appointment next week?"
              </p>
              <p>
                After nearly a year of waiting, I certainly wasn't going to say
                no.
              </p>
            </Entry>

            <Entry
              title="Joining Float"
              img={FloatAd}
              imgAlt="Photo of a TTC street car stop with a Float advertisement."
            >
              <p>TODO:</p>
            </Entry>

            <Entry
              title="Surgery Again"
              img={Crossword}
              imgAlt="Photo of a completed hexoganal regex crossword"
            >
              <p>
                I had surgery again, and things went well. It was a more
                invasive procedure, but things generally went well. TODO: link
                to blog post
              </p>
              <p>
                It was about three weeks before I went back to work TODO:
                explain timing and the crossword
              </p>
              <p>
                I will say that my manager, my team, and everyone at Float was
                really supportive here. The timing was bad but my manager was
                clear that I should prioritize my health. I did and I'll always
                be grateful.
              </p>
            </Entry>

            <Entry title="Launching Float's Mobile App">
              <p>TODO:</p>
            </Entry>

            <Event className="year" date="🗓️ 2024" />

            <Entry title="Getting to Know Myself">
              <p>TODO:</p>
            </Entry>

            <Entry title="Cultural Leadership at Float">
              <p>TODO:</p>
            </Entry>

            <Entry title="Running Again" img={ShelterRace}>
              <p>
                In May, after six months of daily walks and core strengthening
                exercises, I went for my first run in 18 months. It felt
                amazing. I started slow and built up habits. After having to
                stop running several times for medical reasons over the past
                four years, I had a lot of experience starting.
              </p>
              <p>
                Running has been such a help to me. When COVID-19 was ramping up
                in New York, I ran to stay sane. But then I had to stop. I've
                had to stop a few times. But I didn't really stop, I just
                started walking more.
              </p>
              <p>
                My health journey, since I started strengthening as a byproduct
                of physiotherapy in 2018, has been a series of starting small,
                then building up, and backing off to manager injury. I learned
                to walk properly, then I learned to run. Then I walked when I
                couldn't run, until I could and then I ran again.
              </p>
              <p>
                Running has taught me to do what I can, even if it's not "the
                best."
              </p>
            </Entry>

            <Entry
              title="Weird Keyboards"
              img={Keyboard}
              imgAlt="Photo of a split keyboard and trackpad attached to my desk with an elaborate mechanism"
            >
              <p>TODO:</p>
            </Entry>
          </Events>
        </ReactTimeline>
      </Wide>
    )
  }
}

// TODO: Espresso
// TODO: Eclipse
// TODO: ATLA
// TODO: worsening covid pandemic
