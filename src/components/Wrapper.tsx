import styled from 'styled-components'
import { media } from 'utils/media'

export const Wrapper: any = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: ${(props: any) => (props.fullWidth ? '100%' : '66.6%')};
  padding: 0;
  @media ${media.tablet} {
    width: ${(props: any) => (props.fullWidth ? '100%' : '83.3%')};
  }
  @media ${media.phone} {
    width: initial;
    margin: 0 0.5rem;
  }
`
