import _ReactResponsiveEmbed from 'react-responsive-embed'
import React from 'react'
import Wide from './Wide'

export const ReactResponsiveEmbed: React.FC<{
  allowFullScreen: boolean
  src: string
}> = props => (
  <Wide>
    <_ReactResponsiveEmbed {...props} />
  </Wide>
)
