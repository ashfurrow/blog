import styled from 'styled-components'
import config from '../../config/SiteConfig'
import { media } from '../utils/media'

export const SectionTitle = styled.div<{
  left?: boolean
  uppercase?: boolean
}>`
  font-family: ${config.headerFontFamily};
  font-weight: bold;
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'normal')};
  text-align: ${({ left }) => (left ? 'left' : 'center')};
  color: ${props => props.theme.colors.white};
  position: relative;
  padding: 0;
  overflow-wrap: normal;

  margin: 4rem auto;
  font-size: 2.5rem;
  line-height: 3rem;
  @media ${media.tablet} {
    margin: 1rem auto;
    font-size: 2rem;
    line-height: 2.5rem;
  }
  @media ${media.phone} {
    margin: 0 auto;
    font-size: 1.5rem;
    line-height: 2rem;
  }
`

// TODO: I don't like how this is structured, because a SectionSubTitle
// currently sits *within* a SectionTitle. Cleanup.
export const SectionSubTitle = styled(SectionTitle)`
  margin: auto;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: initial;
`
