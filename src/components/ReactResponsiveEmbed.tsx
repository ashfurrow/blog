import _ReactResponsiveEmbed from 'react-responsive-embed'
import styled from 'styled-components'
import React from 'react'
import { media } from '../utils/media'

const Wrapper = styled.div`
  position: relative;
  width: 80vw;
  margin-left: -40vw;
  left: 50%;

  @media ${media.phone} {
    width: 100%;
    position: initial;
    margin-left: initial;
    left: initial;
  }
`

export const ReactResponsiveEmbed: React.FC<{
  allowFullScreen: boolean
  src: string
}> = props => (
  <Wrapper>
    <_ReactResponsiveEmbed {...props} />
  </Wrapper>
)
