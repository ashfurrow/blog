import styled from 'styled-components'
import config from '../../config/SiteConfig'

export const SectionTitle = styled.div<{ left?: boolean }>`
  font-size: 2.5rem;
  font-family: ${config.headerFontFamily};
  font-weight: bold;
  line-height: 3rem;
  text-transform: ${(props: any) => (props.uppercase ? 'uppercase' : 'normal')};
  text-align: ${({ left }) => (left ? 'left' : 'center')};
  color: ${props => props.theme.colors.white};
  position: relative;
  padding: 2rem 0 0;
  margin-bottom: 0rem;
`
