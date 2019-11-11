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
  margin-bottom: 0rem;
  overflow-wrap: normal;

  font-size: 2.5rem;
  line-height: 3rem;
  @media ${media.tablet} {
    font-size: 2rem;
    line-height: 2.5rem;
  }
  @media ${media.phone} {
    font-size: 1.5rem;
    line-height: 2rem;
  }
`
export const SectionSubTitle = styled(SectionTitle)`
  padding-top: 0;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: initial;
`
