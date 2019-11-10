import styled from 'styled-components'
import config from '../../config/SiteConfig'

export const SectionTitle = styled.div<{
  left?: boolean
  uppercase?: boolean
}>`
  font-size: 2.5rem;
  font-family: ${config.headerFontFamily};
  font-weight: bold;
  line-height: 3rem;
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'normal')};
  text-align: ${({ left }) => (left ? 'left' : 'center')};
  color: ${props => props.theme.colors.white};
  position: relative;
  padding: 2rem 0 0;
  margin-bottom: 0rem;
  overflow-wrap: normal;
`
export const SectionSubTitle = styled(SectionTitle)`
  padding-top: 0;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: initial;
`
