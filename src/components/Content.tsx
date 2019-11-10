import styled from 'styled-components'
import { media } from '../utils/media'

export const Content = styled.div`
  margin: 2rem 4rem;
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
    padding: 0rem 3rem;
    margin: 2rem 2rem;
  }
  @media ${media.phone} {
    padding: 1rem 0.5rem;
    margin: 2rem 0;
  }
`
