import styled from 'styled-components'
import { media } from '../utils/media'

// col-lg-10 col-lg-offset-1 col-md-12
const Wide = styled.div`
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
export default Wide
