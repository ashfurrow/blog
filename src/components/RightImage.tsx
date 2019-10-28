import styled from 'styled-components'
import { media } from '../utils/media'

export const RightImage = styled.img`
  float: right;
  max-width: 40%;
  @media ${media.phone} {
    max-width: 100%;
    max-height: 200px;
    float: initial;
    margin: 1rem auto;
  }
  padding-left: 1rem;
  clear: both;
  display: table;
`
