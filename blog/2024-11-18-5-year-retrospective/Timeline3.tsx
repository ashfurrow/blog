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

            <Entry title="Surgery">
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

            <Entry title="Shop Minis">
              <p>TODO:</p>
            </Entry>

            <Entry title="Buying a House">
              <p>TODO:</p>
            </Entry>

            <Entry title="Goodbye Dave">
              <p>TODO:</p>
            </Entry>

            <Event className="year" date="🗓️ 2022" />

            <Entry title="Hello Clementine">
              <p>TODO:</p>
            </Entry>

            <Entry title="Jasper">
              <p>TODO:</p>
            </Entry>

            <Entry title="Family Illness">
              <p>TODO:</p>
            </Entry>

            <Entry title="Shutting Down Mastodon">
              <p>TODO:</p>
            </Entry>

            <Event className="year" date="🗓️ 2023" />

            <Entry title="Personal Problems">
              <p>TODO:</p>
            </Entry>

            <Entry title="Shopify Layoff">
              <p>TODO: Go into some detail here.</p>
            </Entry>

            <Entry title="Job Search">
              <p>TODO:</p>
            </Entry>

            <Entry title="Joining Float">
              <p>TODO:</p>
            </Entry>

            <Entry title="Launching Float's Mobile App">
              <p>TODO:</p>
            </Entry>

            <Event className="year" date="🗓️ 2024" />

            <Entry title="Getting to Know Myself">
              <p>TODO:</p>
            </Entry>

            <Entry title="Weird Keyboards">
              <p>TODO:</p>
            </Entry>
          </Events>
        </ReactTimeline>
      </Wide>
    )
  }
}
