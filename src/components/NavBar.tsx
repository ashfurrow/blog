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
                height: '1.5rem',
                margin: '0.5rem 0'
              }}
            >
              <Image
                src={
                  clear ? '/assets/siteimage.png' : '/assets/siteimage_dark.png'
                }
              />
            </Link>
            <NavLinks className="navbar" clear={clear}>
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
                <Link to="/feed.xml">
                  <FontAwesomeIcon icon={faRssSquare} fixedWidth />
                </Link>
              </li>
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
  margin: 0.1rem 0 auto 0;
  height: 75%;
`

const Bar = styled.nav<{ clear: boolean }>`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: ${({ clear }) => (clear ? 'clear' : theme.colors.white)};
  z-index: 1000;
  font-size: 0.75rem;
`

const FlexContainer = styled.div`
  display: flex;
  margin: auto;
  padding: 0 0.5rem;
  justify-content: space-between;
`

const NavLinks = styled.ul<{ clear: boolean }>`
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

    @media (max-width: 768px) {
      display: none;
    }
  }

  a {
    display: inline-block;
    color: ${({ clear }) =>
      clear ? theme.colors.white : theme.colors.grey.dark};
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
  margin: auto 0;

  @media (min-width: 768px) {
    display: none;
  }
`
