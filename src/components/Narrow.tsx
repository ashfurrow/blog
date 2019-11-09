import styled from 'styled-components'
import { media } from '../utils/media'

const Narrow = styled.div`
  margin: 0 auto;
  padding: 0 10vw;

  @media ${media.phone} {
    position: relative;

    width: 90vw;
    margin-left: -45vw;
    left: 50%;
  }
`
export default Narrow
