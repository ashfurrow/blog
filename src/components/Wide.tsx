import styled from 'styled-components'
import { media } from '../utils/media'

// Most of the Wide usage is in paragraphs that deal with this. But for embeds,
// we need to manually.
export const Wide = styled.div<{ addBottom?: boolean }>`
  margin: 0 auto ${({ addBottom }) => (addBottom ? '1.66rem' : '')};
  position: relative;
  width: 75vw;
  margin-left: -37.5vw;
  left: 50%;

  @media ${media.tablet} {
    width: 100%;
    margin-left: initial;
    left: initial;
  }

  @media ${media.phone} {
    width: 100%;
    margin-left: initial;
    left: initial;
  }
`
