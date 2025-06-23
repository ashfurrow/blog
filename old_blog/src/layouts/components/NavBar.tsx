import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { theme } from 'config/theme'
import config from 'config/siteConfig'
import { CollapseMenu, MenuButton } from 'layouts/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faRssSquare } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'gatsby'
import { media } from 'utils/media'
import { topBarStyle } from './topBarStyle'

interface Props {
  toggleMenuOpen: () => void
  menuIsOpen: boolean
}

export const Navbar = (props: Props) => {
  const [scrolledAtTop, setScrolledAtTop] = useState(true)
  useEffect(() => {
    const listenToScroll = () => {
      setScrolledAtTop(
        (document.body.scrollTop || document.documentElement.scrollTop) <= 0
      )
    }
    window.addEventListener('scroll', listenToScroll)

    return () => {
      window.removeEventListener('scroll', listenToScroll)
    }
  })

  const { toggleMenuOpen, menuIsOpen } = props
  const transparent = scrolledAtTop && !menuIsOpen
  return (
    <>
      <Bar transparent={transparent} menuIsOpen={menuIsOpen}>
        <FlexContainer>
          <Link
            to="/"
            style={{
              height: '1.5rem',
              margin: '0.5rem 0'
            }}
          >
            <Image
              src={
                transparent
                  ? '/assets/siteimage.png'
                  : '/assets/siteimage_dark.png'
              }
            />
          </Link>
          <NavLinks className="navbar" transparent={transparent}>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
            <li>
              <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/speaking">Speaking</Link>
            </li>
            <li>
              <a href="/search">
                <FontAwesomeIcon icon={faSearch} fixedWidth />
              </a>
            </li>
            <li>
              {/* Using a Link will cause Gatsby to attempt a preload, which will 404. */}
              <a href="/feed.xml">
                <FontAwesomeIcon icon={faRssSquare} fixedWidth />
              </a>
            </li>
          </NavLinks>
          <BurgerWrapper>
            <MenuButton
              menuIsOpen={menuIsOpen}
              toggleMenuOpen={toggleMenuOpen}
              transparent={transparent}
            />
          </BurgerWrapper>
        </FlexContainer>
      </Bar>
      <CollapseMenu menuIsOpen={menuIsOpen} toggleMenuOpen={toggleMenuOpen} />
    </>
  )
}

const Image = styled.img`
  margin: 0.1rem 0 auto 0;
  height: 75%;
`

const Bar = styled.nav<{ transparent: boolean; menuIsOpen: boolean }>`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: ${({ transparent }) =>
    transparent ? 'clear' : theme.colors.white};
  z-index: 1000;
  font-size: 0.75rem;
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);

  @media ${media.tablet} {
    box-shadow: ${({ transparent, menuIsOpen }) =>
      transparent || menuIsOpen
        ? 'none'
        : `${theme.colors.grey.extraLight} 0px 4px 12px`};
    border-bottom: ${({ transparent, menuIsOpen }) =>
      transparent || menuIsOpen
        ? 'none'
        : `${theme.colors.grey.light} solid 1px`};
  }

  ${({ transparent, menuIsOpen }) =>
    !transparent && !menuIsOpen && topBarStyle.default}
  @media ${media.phone} {
    ${({ transparent, menuIsOpen }) =>
      !transparent && !menuIsOpen && topBarStyle.mobile}
  }
`

const FlexContainer = styled.div`
  display: flex;
  margin: auto;
  padding: 0 0.5rem;
  justify-content: space-between;
`

const NavLinks = styled.ul<{ transparent: boolean }>`
  justify-self: stretch;
  vertical-align: center;
  vertical-align: middle;
  list-style-type: none;
  margin: auto 0 auto auto;

  li {
    display: inline-block;
    padding: 0;
    margin: auto 0;
    line-height: 1.5rem;

    @media ${media.phone} {
      display: none;
    }
  }

  a {
    display: inline-block;
    color: ${({ transparent }) =>
      transparent ? theme.colors.white : theme.colors.grey.dark};
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: none;
    font-family: ${config.headerFontFamily};
    padding: 0.5rem;

    &:hover {
      color: ${theme.colors.primary};
    }
  }
`

const BurgerWrapper = styled.div`
  display: none;

  @media ${media.phone} {
    display: initial;
    margin: auto 0;
  }
`
