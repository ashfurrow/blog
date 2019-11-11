import React from 'react'
import styled from 'styled-components'
import rgba from 'polished/lib/color/rgba'
import { media } from '../utils/media'
import config from '../../config/SiteConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

const HeaderWrapper: any = styled.header<{
  banner: string
  left?: boolean
}>`
  display: block;
  clear: both;
  position: relative;
  /* Abusing linear-gradient for a constant dim effect. */
  background: linear-gradient(
      ${() => rgba(0, 0, 0, 0.2)},
      ${() => rgba(0, 0, 0, 0.2)}
    ),
    url(${({ banner }) => banner}) no-repeat;
  background-size: cover;
  text-align: ${({ left }) => (left ? 'left' : 'center')};
  z-index: 5;

  padding-top: 4rem;
  padding-bottom: 4rem;
  @media ${media.tablet} {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  @media ${media.phone} {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
`

const ContentWrapper = styled.div<{ left?: boolean }>`
  /* margin: ${({ left }) => (left ? '0 auto auto 0' : '0 auto')}; */
  margin: 0 auto;

  width: 66.6%;
  @media ${media.tablet} {
    width: 83.3%;
  }
  @media ${media.phone} {
    width: initial;
  }
`

const Content = styled.div<{ left?: boolean }>`
  position: relative;
  a {
    color: white;
    &:hover {
      opacity: 0.85;
      color: white;
    }
  }

  margin: 3rem 3rem;
  @media ${media.tablet} {
    margin: 2rem 2rem;
  }
  @media ${media.phone} {
    margin: 0rem 1rem;
  }
`

const AttributionLink = styled.a`
  text-decoration: none;
  position: absolute;
  bottom: 0;
  right: 0;
  color: rgba(255, 255, 255, 0.5);
  padding-right: 1.25em;
  padding-bottom: 1.25em;
`

interface Props {
  children: any
  banner?: string
  bannerAttribution?: string
  left?: boolean
}

export class Header extends React.PureComponent<Props> {
  public render() {
    const { banner, bannerAttribution, left, children } = this.props
    return (
      <HeaderWrapper banner={banner || config.defaultBg} left={left}>
        {bannerAttribution && (
          <AttributionLink href={bannerAttribution}>
            <FontAwesomeIcon icon={faImage} />
          </AttributionLink>
        )}
        <ContentWrapper left={left}>
          <Content left={left}>{children}</Content>
        </ContentWrapper>
      </HeaderWrapper>
    )
  }
}
