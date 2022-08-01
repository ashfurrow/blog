import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { media } from 'utils/media'
import SiteConfig from 'config/SiteConfig'

export const FeaturedPosts = () => (
  <FeaturedPostWrapper>
    <FeaturedPost
      banner="/assets/featured/normaling_struggle.png"
      title="Normalizing Struggle"
      path="/blog/normalizing-struggle/"
    />
    <FeaturedPost
      banner="/assets/featured/asking-for-help-in-open-source.jpg"
      title="Asking for Help in Open Source"
      path="/blog/asking-for-help-in-open-source/"
    />
    <FeaturedPost
      banner="/assets/featured/empathetic_civilization.jpg"
      title="Empathetic Civilization"
      path="/blog/empathetic-civilization/"
    />
    <FeaturedPost
      banner="/assets/featured/building_compassionate_software.jpg"
      title="Building Compassionate Software"
      path="/blog/building-compassionate-software/"
    />
    <FeaturedPost
      banner="/assets/featured/building_better_software.png"
      title="Building Better Software by Building Better Teams"
      path="/blog/building-better-software-by-building-better-teams/"
    />
    <FeaturedPost
      banner="/assets/featured/perspective_of_the_polyglot.png"
      title="Perspective of the Polyglot"
      path="/blog/perspective-of-the-polyglot/"
    />
  </FeaturedPostWrapper>
)

export const FeaturedPostWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media ${media.phone} {
    grid-template-columns: repeat(1, 1fr);
  }
  grid-gap: 1em;
  margin-bottom: 3rem;
`

const FeaturedPostItem = styled(Link)<{
  banner: string
}>`
  background: url(${({ banner }) => banner}) no-repeat;
  background-size: cover;
  h3 {
    margin-bottom: 1.66rem;

    @media ${media.phone} {
      margin: 0;
    }
  }
`

export const FeaturedPost: React.FC<{
  banner: string
  path: string
  title: string
}> = ({ banner, path, title }) => (
  <FeaturedPostItem to={path} banner={banner}>
    <h3
      style={{
        color: 'white',
        padding: '0.75rem',
        fontFamily: SiteConfig.headerFontFamily
      }}
    >
      {title}
    </h3>
  </FeaturedPostItem>
)
