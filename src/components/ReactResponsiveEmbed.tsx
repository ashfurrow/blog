import _ReactResponsiveEmbed from 'react-responsive-embed'
import React from 'react'
import Wide from './Wide'
import Narrow from './Narrow'

export const ReactResponsiveEmbed: React.FC<{
  allowFullScreen: boolean
  src: string
  narrow?: boolean
}> = props =>
  // 1.66rem matches line height
  props.narrow ? (
    <Narrow style={{ marginBottom: '1.66rem' }}>
      <_ReactResponsiveEmbed {...props} />
    </Narrow>
  ) : (
    <Wide style={{ marginBottom: '1.66rem' }}>
      <_ReactResponsiveEmbed {...props} />
    </Wide>
  )
