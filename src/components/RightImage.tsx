import styled from 'styled-components'
import { media } from '../utils/media'

export const RightImage = styled.img<{ maxWidth?: string }>`
  float: right;
  max-width: ${({ maxWidth }) => maxWidth || '40%'};
  padding-left: 1rem;
  @media ${media.phone} {
    float: initial;
    max-width: 100%;
    padding-left: 0;
    margin: 1rem 0;
  }
  clear: both;
  display: table;
`
