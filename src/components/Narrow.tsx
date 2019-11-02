import styled from 'styled-components'
import { media } from '../utils/media'

const Narrow: any = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: ${(props: any) => (props.fullWidth ? '100%' : '50rem')};
  padding: ${(props: any) => (props.fullWidth ? '0' : '0 6rem')};
  @media ${media.tablet} {
    max-width: ${(props: any) => (props.fullWidth ? '100%' : '80rem')};
    padding: ${(props: any) => (props.fullWidth ? '0' : '0 3rem')};
  }
  @media ${media.phone} {
    max-width: 100%;
    padding: 0;
  }
`
export default Narrow
