import styled from 'styled-components'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFile,
  faQuoteLeft,
  faMapMarkerAlt,
  faCalendar,
  faPaperclip,
  faCode
} from '@fortawesome/free-solid-svg-icons'
import config from 'config/SiteConfig'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import theme from 'config/Theme'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'

const ListItem = styled.li`
  width: 100%;
  display: inline-block;
  vertical-align: top;
  margin-top: 2em;
  text-align: left;

  h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-family: ${config.headerFontFamily};
    text-decoration: none;
    font-weight: 600;
    font-size: 1.5em;
  }

  a {
    color: ${theme.colors.grey.default};
    img {
      cursor: zoom-in;
    }
  }
`

const ImageContainer = styled.div`
  position: relative;

  float: left;
  padding: 0;
  height: 100%;
  width: 30%;

  a.mouseover-link {
    display: none;
  }
  &:hover {
    a.mouseover-link {
      display: inline;
    }
  }
`

const Icon = styled(FontAwesomeIcon)`
  font-size: 1em;
  margin-right: 0.5rem;
  position: relative;
  text-align: center;
`

const ImageIcon = styled(Icon)`
  position: absolute;
  bottom: 1rem;
  left: 0.5rem;
  color: white;
`

const Details = styled.div`
  float: right;
  width: 70%;
  padding-left: 1em;
`

const DetailRow: React.FC<{ icon: IconProp; link?: string; title: string }> = ({
  icon,
  link,
  title
}) => (
  <div>
    <Icon icon={icon} fixedWidth />
    <span>{link ? <a href={link}>{title}</a> : title}</span>
  </div>
)

interface Props {
  talk: {
    name: string // Talk name
    conference: string // Conference name
    dates: string
    url?: string // Conference URL
    location: string // Physical location
    image: string // Relative to assets/speaking/talks
    slides?: string
    blogPost?: string
    code?: string
    video?: string
    hidden?: boolean
  }
}

// Needs to be displayed in a list.
export class TalkTile extends React.Component<Props> {
  render() {
    if (this.props.talk.hidden) {
      return null
    }
    const {
      talk: {
        image,
        slides,
        dates,
        name,
        url,
        conference,
        location,
        blogPost,
        code,
        video
      }
    } = this.props
    return (
      <ListItem>
        <ImageContainer>
          {slides ? (
            <>
              <a href={slides} className="mouseover-link">
                <ImageIcon icon={faFile} />
              </a>
              <a href={slides}>
                <img
                  src={`/assets/speaking/talks/${image}`}
                  style={{ width: '100%' }}
                />
              </a>
            </>
          ) : (
            <img
              src={`/assets/speaking/talks/${image}`}
              style={{ width: '100%' }}
            />
          )}
        </ImageContainer>
        <Details>
          <h3>{name}</h3>
          <DetailRow icon={faQuoteLeft} title={conference} link={url} />
          <DetailRow icon={faMapMarkerAlt} title={location} />
          <DetailRow icon={faCalendar} title={dates} />
          {blogPost && (
            <DetailRow
              icon={faPaperclip}
              title="Read the blog post"
              link={blogPost}
            />
          )}
          {code && (
            <DetailRow icon={faCode} title="Check out the code" link={code} />
          )}
          {video && (
            <DetailRow icon={faYoutube} title="Watch the video" link={video} />
          )}
        </Details>
      </ListItem>
    )
  }
}
