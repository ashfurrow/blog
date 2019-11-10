import React from 'react'
import { ReactResponsiveEmbed } from './ReactResponsiveEmbed'
import Wide from './Wide'
import Narrow from './Narrow'

export const YouTube: React.FC<{ videoID: string }> = ({ videoID }) => (
  <ReactResponsiveEmbed
    src={`//www.youtube.com/embed/${videoID}`}
    allowFullScreen
  />
)

export const Video: React.FC<{ src: string }> = ({ src }) => (
  <ReactResponsiveEmbed src={src} allowFullScreen />
)

export const SpeakerDeck: React.FC<{
  videoID: string
  fourByThree?: boolean
}> = ({ videoID, fourByThree }) => (
  <ReactResponsiveEmbed
    src={`//speakerdeck.com/player/${videoID}`}
    allowFullScreen
    {...(fourByThree && { ratio: '4:3' })}
    narrow
  />
)

export const SoundCloud: React.FC<{ trackID: string }> = ({ trackID }) => (
  <Wide style={{ marginBottom: '1.66rem' }}>
    <iframe
      width="100%"
      height="200"
      scrolling="no"
      frameBorder="no"
      src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackID}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true`}
    />
  </Wide>
)

export const Spotify: React.FC<{ src: string }> = ({ src }) => (
  <Narrow style={{ marginBottom: '1.66rem' }}>
    <iframe
      src={src}
      width="100%"
      height="380"
      frameBorder="no"
      allowTransparency={true}
    />
  </Narrow>
)
