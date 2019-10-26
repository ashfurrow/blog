import styled from 'styled-components'
import { media } from '../utils/media'

export const BookImage = styled.img`
  float: right;
  max-width: 40%;
  @media ${media.phone} {
    max-width: 100%;
  }
  padding-left: 1rem;
  clear: both;
  display: table;
`
