import React from 'react'
import styled from 'styled-components'
import theme from '../../config/Theme'
import config from '../../config/SiteConfig'
import BurgerMenu from './BurgerMenu'
import CollapseMenu from './CollapseMenu'

const Navbar: React.FC<{
  handleNavBar: () => void
  navBarState: boolean
}> = props => {
  return (
    <>
      <Bar>
        <FlexContainer>
          <Image
            src="/assets/siteimage_dark.png"
            style={{ height: '1.25rem' }}
          />
          <NavLinks>
            <a href="/blog">Blog</a>
            <a href="/about">About</a>
            <a href="/books">Books</a>
            <a href="/speaking">Speaking</a>
          </NavLinks>
          <BurgerWrapper>
            <BurgerMenu
              navBarState={props.navBarState}
              handleNavBar={props.handleNavBar}
            />
          </BurgerWrapper>
        </FlexContainer>
      </Bar>
      <CollapseMenu
        navBarState={props.navBarState}
        handleNavBar={props.handleNavBar}
      />
    </>
  )
}

export default Navbar

const Image = styled.img`
  height: 85%;
  margin: auto 0;
`

const Bar = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: ${theme.colors.white};
  z-index: 100;
  font-size: 1rem;
`

const FlexContainer = styled.div`
  display: flex;
  margin: auto;
  padding: 0 0.5rem;
  justify-content: space-between;
  height: 2.5rem;
`

const NavLinks = styled.ul`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  a {
    color: ${theme.colors.grey.default};
    text-transform: uppercase;
    font-weight: 500;
    padding-left: 1.5rem;
    text-decoration: none;
    font-family: ${config.headerFontFamily};

    &:hover {
      color: ${theme.colors.primary};
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`

const BurgerWrapper = styled.div`
  margin: auto 0;

  @media (min-width: 768px) {
    display: none;
  }
`
