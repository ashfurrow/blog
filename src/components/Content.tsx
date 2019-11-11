import styled from 'styled-components'
import { media } from '../utils/media'

export const Content = styled.div`
  margin: 2rem 4rem;
  /* clear: both; */
  form {
    p {
      label,
      input {
        display: block;
      }
      input {
        min-width: 275px;
      }
      textarea {
        resize: vertical;
        min-height: 150px;
        width: 100%;
      }
    }
  }
  @media ${media.tablet} {
    padding: 0rem;
    margin: 2rem 2rem;
  }
  @media ${media.phone} {
    padding: 0rem 0.5rem;
    margin: 0rem 0;
  }
`
