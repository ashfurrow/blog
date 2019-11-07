import styled from 'styled-components'
import { media } from '../utils/media'

const Narrow = styled.div`
  margin: 0 auto;
  padding: 0;
  position: relative;

  width: 50vw;
  margin-left: -25vw;
  left: 50%;

  @media ${media.phone} {
    width: 75vw;
    margin-left: -37.5vw;
    left: 50%;
  }
`
export default Narrow
