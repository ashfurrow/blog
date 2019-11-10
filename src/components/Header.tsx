import React from 'react'
import styled from 'styled-components'
import rgba from 'polished/lib/color/rgba'
import { media } from '../utils/media'
import config from '../../config/SiteConfig'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

const HeaderWrapper: any = styled.header<{
  banner: string
}>`
  position: relative;
  margin: -5px; /* Some CloudyConway images have a white edge, which we hide here. */
  /* Abusing linear-gradient for a constant dim effect. */
  background: linear-gradient(
      ${() => rgba(0, 0, 0, 0.2)},
      ${() => rgba(0, 0, 0, 0.2)}
    ),
    url(${({ banner }) => banner}) no-repeat;
  background-size: cover;
  padding: 6rem 14rem 8rem;
  text-align: center;
  z-index: 5;

  @media ${media.tablet} {
    padding: 4rem 9.5rem 6rem;
  }
  @media ${media.phone} {
    padding: 1rem 0.5rem 2rem;
  }
`

const Content = styled.div`
  position: relative;
  a {
    color: white;
    &:hover {
      opacity: 0.85;
      color: white;
    }
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
}

export class Header extends React.PureComponent<Props> {
  public render() {
    const { banner, bannerAttribution, children } = this.props
    return (
      <HeaderWrapper banner={banner || config.defaultBg}>
        {bannerAttribution && (
          <AttributionLink href={bannerAttribution}>
            <FontAwesomeIcon icon={faImage} />
          </AttributionLink>
        )}
        <Content>{children}</Content>
      </HeaderWrapper>
    )
  }
}
