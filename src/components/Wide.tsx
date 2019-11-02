import styled from 'styled-components'
import { media } from '../utils/media'

const Wide: any = styled.div`
  position: relative;
  width: 60vw;
  margin-left: -30vw;
  left: 50%;

  @media ${media.tablet} {
    width: 90vw;
    margin-left: -45vw;
  }

  @media ${media.phone} {
    width: 100%;
    position: initial;
    margin-left: initial;
    left: initial;
  }
`
export default Wide
