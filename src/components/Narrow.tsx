import styled from 'styled-components'
import { media } from '../utils/media'

const Narrow = styled.div<{ addBottom?: boolean }>`
  margin: 0 auto ${({ addBottom }) => (addBottom ? '1.66rem' : '')};
  padding: 0 10vw;

  @media ${media.phone} {
    padding: 0;
  }
`
export default Narrow
