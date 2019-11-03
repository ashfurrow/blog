import _ReactResponsiveEmbed from 'react-responsive-embed'
import React from 'react'
import Wide from './Wide'

export const ReactResponsiveEmbed: React.FC<{
  allowFullScreen: boolean
  src: string
}> = props => (
  // 1.66rem matches line height
  <Wide style={{ marginBottom: '1.66rem' }}>
    <_ReactResponsiveEmbed {...props} />
  </Wide>
)
