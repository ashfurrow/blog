import React from 'react'
import { ReactResponsiveEmbed } from './ReactResponsiveEmbed'

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
  />
)
