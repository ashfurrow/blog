import React from 'react'
import styled from 'styled-components'
import theme from 'config/Theme'
import config from 'config/SiteConfig'
import { Link } from 'gatsby'
import { topBarStyle } from './topBarStyle'

export const CollapseMenu: React.FC<{
  menuIsOpen: boolean
  toggleMenuOpen: () => void
}> = ({ menuIsOpen, toggleMenuOpen }) => {
  if (menuIsOpen) {
    return (
      <TapIntercepter onClick={toggleMenuOpen}>
        <CollapseWrapper>
          <NavLinks>
            <li>
              <Link to="/blog" onClick={toggleMenuOpen}>
                Blog
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={toggleMenuOpen}>
                About
              </Link>
            </li>
            <li>
              <Link to="/books" onClick={toggleMenuOpen}>
                Books
              </Link>
            </li>
            <li>
              <Link to="/portfolio" onClick={toggleMenuOpen}>
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/speaking" onClick={toggleMenuOpen}>
                Speaking
              </Link>
            </li>
            <li>
              <a href="/search" onClick={toggleMenuOpen}>
                Search
              </a>
            </li>
            <li>
              <a href="/feed.xml" onClick={toggleMenuOpen}>
                Blog Feed
              </a>
            </li>
          </NavLinks>
        </CollapseWrapper>
      </TapIntercepter>
    )
  }
  return null
}

const TapIntercepter = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 90;
`

const CollapseWrapper = styled.div`
  background: ${theme.colors.white};
  position: fixed;
  top: 2.5rem;
  left: 0;
  right: 0;
  z-index: 95;

  /* Since the CollapseMenu is onlu rendered on mobile, we can omit default styling. */
  ${topBarStyle.mobile}
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
