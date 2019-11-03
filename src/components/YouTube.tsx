import React from 'react'
import { ReactResponsiveEmbed } from './ReactResponsiveEmbed'

const YouTube: React.FC<{ videoID: string }> = ({ videoID }) => (
  <ReactResponsiveEmbed
    src={`//www.youtube.com/embed/${videoID}`}
    allowFullScreen
  />
)
export default YouTube
