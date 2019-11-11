import React from 'react'
import styled from 'styled-components'
import theme from '../../config/Theme'
import { useSpring, animated } from 'react-spring'
import config from '../../config/SiteConfig'
import { Link } from 'gatsby'

const CollapseMenu: React.FC<{
  navBarState: boolean
  handleNavBar: () => void
}> = ({ navBarState, handleNavBar }) => {
  const { open } = useSpring({ open: navBarState ? 0 : 1 })

  if (navBarState) {
    return (
      <CollapseWrapper
        style={{
          transform: open
            .interpolate({
              range: [0, 0.2, 0.3, 1],
              output: [0, 0, 0, -200]
            })
            .interpolate(openValue => `translate3d(0, ${openValue}px, 0`)
        }}
      >
        <NavLinks>
          <li>
            <Link to="/blog" onClick={handleNavBar}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={handleNavBar}>
              About
            </Link>
          </li>
          <li>
            <Link to="/books" onClick={handleNavBar}>
              Books
            </Link>
          </li>
          <li>
            <Link to="/portfolio" onClick={handleNavBar}>
              Portfolio
            </Link>
          </li>
          <li>
            <Link to="/speaking" onClick={handleNavBar}>
              Speaking
            </Link>
          </li>
          <li>
            <a href="/search" onClick={handleNavBar}>
              Search
            </a>
          </li>
          <li>
            <a href="/feed.xml" onClick={handleNavBar}>
              Blog Feed
            </a>
          </li>
        </NavLinks>
      </CollapseWrapper>
    )
  }
  return null
}

export default CollapseMenu

const CollapseWrapper = styled(animated.div)`
  background: ${theme.colors.white};
  position: fixed;
  top: 2.5rem;
  left: 0;
  right: 0;
  z-index: 95;
`

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 0.5rem 1rem 0rem 0.5rem;
  margin: 0;

  li {
    margin-bottom: 0.5rem;
  }

  a {
    font-size: 0.75rem;
    font-family: ${config.headerFontFamily};
    line-height: 1rem;
    color: ${theme.colors.grey.default};
    text-transform: uppercase;
    text-decoration: none;

    &:hover {
      color: ${theme.colors.primary};
    }
  }
`
