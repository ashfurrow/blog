import React, { useEffect } from 'react'
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
          <h3 id={anchorName} style={{ scrollMarginTop: '3em' }}>
            {title}
            <a
              href={`#${anchorName}`}
              onClick={(event) => {
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

type MaybeImage =
  | {
      img: string
      imgAlt: string
    }
  | { img?: never; imgAlt?: never }

type Entry = {
  title: string
  description: string | string[]
  date?: never // to not overlap with Year type
} & MaybeImage

type Year = {
  date: string
}

type Props = {
  entries: Array<Entry | Year>
}

export const PersonalTimeline = (props: Props) => {
  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(
        window.location.hash.replace('#', '')
      )
      if (element) {
        setTimeout(() => (element as any).parentNode.scrollIntoView(true), 500)
      }
    }
  }, [])

  return (
    <Wide>
      <ReactTimeline theme={customTheme}>
        <Events>
          {props.entries.map((entry) => {
            if (typeof entry.date === 'undefined') {
              const { title, img, imgAlt, description } = entry
              return (
                <Entry title={title} img={img} imgAlt={imgAlt} key={title}>
                  {(Array.isArray(description)
                    ? description
                    : [description]
                  ).map((d, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: d }} />
                  ))}
                </Entry>
              )
            } else {
              const { date } = entry
              return <Event className="year" date={`🗓️ ${date}`} key={date} />
            }
          })}
        </Events>
      </ReactTimeline>
    </Wide>
  )
}
