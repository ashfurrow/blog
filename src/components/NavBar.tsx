import React from 'react'
import styled from 'styled-components'
import theme from '../../config/Theme'
import config from '../../config/SiteConfig'
import BurgerMenu from './BurgerMenu'
import CollapseMenu from './CollapseMenu'

interface Props {
  handleNavBar: () => void
  navBarState: boolean
}

interface State {
  scrolledAtTop: boolean
}

class Navbar extends React.Component<Props, State> {
  state = {
    scrolledAtTop: true
  }

  componentDidMount() {
    window.addEventListener('scroll', this.listenToScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll)
  }

  listenToScroll = () => {
    const scrolledAtTop =
      (document.body.scrollTop || document.documentElement.scrollTop) <= 0
    this.setState({
      scrolledAtTop
    })
    console.log({ scrolledAtTop })
  }

  render() {
    const { handleNavBar, navBarState } = this.props
    const { scrolledAtTop } = this.state
    const clear = scrolledAtTop && !navBarState
    return (
      <>
        <Bar clear={clear}>
          <FlexContainer>
            <Image
              src={
                clear ? '/assets/siteimage.png' : '/assets/siteimage_dark.png'
              }
              style={{ height: '1.25rem' }}
            />
            <NavLinks clear={clear}>
              <a href="/blog">Blog</a>
              <a href="/about">About</a>
              <a href="/books">Books</a>
              <a href="/speaking">Speaking</a>
            </NavLinks>
            <BurgerWrapper>
              <BurgerMenu
                navBarState={navBarState}
                handleNavBar={handleNavBar}
                clear={clear}
              />
            </BurgerWrapper>
          </FlexContainer>
        </Bar>
        <CollapseMenu navBarState={navBarState} handleNavBar={handleNavBar} />
      </>
    )
  }
}

export default Navbar

const Image = styled.img`
  height: 85%;
  margin: auto 0;
`

const Bar = styled.nav<{ clear: boolean }>`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: ${({ clear }) => (clear ? 'clear' : theme.colors.white)};
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

const NavLinks = styled.ul<{ clear: boolean }>`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  a {
    color: ${({ clear }) =>
      clear ? theme.colors.white : theme.colors.grey.default};
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
