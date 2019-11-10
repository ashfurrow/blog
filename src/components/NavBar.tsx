import React from 'react'
import styled from 'styled-components'
import theme from '../../config/Theme'
import config from '../../config/SiteConfig'
import BurgerMenu from './BurgerMenu'
import CollapseMenu from './CollapseMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faRssSquare } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'gatsby'

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
  }

  render() {
    const { handleNavBar, navBarState } = this.props
    const { scrolledAtTop } = this.state
    const clear = scrolledAtTop && !navBarState
    return (
      <>
        <Bar clear={clear}>
          <FlexContainer>
            <Link
              to="/"
              style={{
                height: '1.25rem',
                margin: 'auto 0'
              }}
            >
              <Image
                src={
                  clear ? '/assets/siteimage.png' : '/assets/siteimage_dark.png'
                }
                style={{
                  height: '75%'
                }}
              />
            </Link>
            <NavLinks clear={clear}>
              <Link to="/blog">Blog</Link>
              <Link to="/about">About</Link>
              <Link to="/books">Books</Link>
              <Link to="/portfolio">Portfolio</Link>
              <Link to="/speaking">Speaking</Link>
              <Link to="/search">
                <FontAwesomeIcon icon={faSearch} fixedWidth />
              </Link>
              <Link to="/feed.xml">
                <FontAwesomeIcon icon={faRssSquare} fixedWidth />
              </Link>
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
  margin: auto 0;
`

const Bar = styled.nav<{ clear: boolean }>`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: ${({ clear }) => (clear ? 'clear' : theme.colors.white)};
  z-index: 100;
  font-size: 0.75rem;
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
  margin: auto 0.5rem auto 0;

  a {
    color: ${({ clear }) =>
      clear ? theme.colors.white : theme.colors.grey.dark};
    text-transform: uppercase;
    font-weight: bold;
    padding-left: 1.5rem;
    text-decoration: none;
    font-family: ${config.headerFontFamily};
    max-height: 0.75rem;

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
