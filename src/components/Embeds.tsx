import React from 'react'
import { ReactResponsiveEmbed } from './ReactResponsiveEmbed'
import { Narrow, Wide } from 'components'
import { TwitterTweetEmbed } from 'react-twitter-embed'

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
  deckID: string
  fourByThree?: boolean
}> = ({ deckID, fourByThree }) => (
  <div style={{ marginBottom: '1.66rem' }}>
    <ReactResponsiveEmbed
      src={`//speakerdeck.com/player/${deckID}`}
      allowFullScreen
      {...(fourByThree && { ratio: '4:3' })}
      narrow
    />
  </div>
)

export const SoundCloud: React.FC<{ trackID: string }> = ({ trackID }) => (
  <Wide addBottom>
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
  <Narrow addBottom>
    <iframe
      src={src}
      width="100%"
      height="380"
      frameBorder="no"
      allowTransparency={true}
    />
  </Narrow>
)

export const Toot: React.FC<{ src: string }> = ({ src }) => (
  <Narrow addBottom>
    <iframe
      src={src}
      className="mastodon-embed"
      style={{ minHeight: '250px', border: '0' }}
      width="100%"
      allowFullScreen={true}
    />
  </Narrow>
)

export const Tweet: React.FC<{ tweetID: string }> = ({ tweetID }) => (
  <Narrow addBottom>
    <TwitterTweetEmbed tweetId={tweetID} />
  </Narrow>
)
