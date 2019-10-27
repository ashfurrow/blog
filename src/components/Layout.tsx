import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import theme from '../../config/Theme'
import config from '../../config/SiteConfig'
import { media } from '../utils/media'
import './layout.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMastodon,
  faTwitter,
  faGithub,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'
import { faCircle, faImage } from '@fortawesome/free-solid-svg-icons'
import Navbar from './NavBar'

const GlobalStyle = createGlobalStyle`
  ::selection {
    color: ${theme.colors.bg};
    background: ${theme.colors.primary};
  }
  body {
    background: ${theme.colors.bg};
    color: ${theme.colors.grey.default};
    @media ${media.phone} {
      font-size: 14px;
    }
  }
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: all ${theme.transitions.normal};
  }
  h1, h2, h3, h4 {
    color: ${theme.colors.grey.default};
    a {
      color: ${theme.colors.grey.dark};
    }
  }
  /* Only h1's have the header font family. */
  h1 {
    font-family: ${config.headerFontFamily}
  }
  h2, h3, h4 {
    font-family: ${config.bodyFontFamily}
  }
  blockquote {
    font-style: italic;
    position: relative;
  }

  blockquote:before {
    content: "";
    position: absolute;
    background: ${theme.colors.primary};
    height: 100%;
    width: 6px;
    margin-left: -1.6rem;
  }
  label {
    margin-bottom: .5rem;
    color: ${theme.colors.grey.dark};
  }
  input, textarea {
    border-radius: .5rem;
    border: none;
    background: rgba(0, 0, 0, 0.05);
    padding: .25rem 1rem;
    &:focus {
      outline: none;
    }
  }
  .textRight {
    text-align: right;
  }
  hr {
    background: ${theme.colors.grey.light};
    clear: both;
  }
  iframe {
    display: block;
    margin: 0 auto;
  }
`

const Footer = styled.footer`
  text-align: center;
  padding-bottom: 3rem;
`

const FooterLink = styled.a`
  color: ${theme.colors.grey.default};
  &:hover {
    color: ${theme.colors.primary};
  }
`

const FooterIcons = styled.div`
  margin-top: 2rem;
  margin-bottom: 1.5rem;
`

interface State {
  navbarOpen: boolean
}

export class Layout extends React.PureComponent<{}, State> {
  state = {
    navbarOpen: false
  }

  componentDidMount() {
    window.addEventListener('resize', this.listToResize)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listToResize)
  }

  // If the window resizes, close the menu (prevents menu from opening when
  // window is wide enough to be the full bar)
  listToResize = () => {
    this.setState({
      navbarOpen: false
    })
  }

  handleNavBar = () => {
    console.log('YEAH!')
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  public render() {
    const { children } = this.props

    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            site {
              buildTime(formatString: "DD.MM.YYYY")
            }
          }
        `}
        render={data => (
          <ThemeProvider theme={theme}>
            <React.Fragment>
              <Navbar
                navBarState={this.state.navbarOpen}
                handleNavBar={this.handleNavBar}
              />
              <GlobalStyle />
              {children}
              <Footer>
                <hr />
                <FooterIcons>
                  <span className="fa-layers fa-fw fa-3x">
                    <FooterLink
                      href="https://mastodon.technology/@ashfurrow"
                      title="Mastodon"
                      rel="me"
                    >
                      <FontAwesomeIcon
                        icon={faMastodon}
                        transform="shrink-8"
                        mask={faCircle}
                      />
                    </FooterLink>
                  </span>
                  <span className="fa-layers fa-fw fa-3x">
                    <FooterLink
                      href="https://twitter.com/ashfurrow"
                      title="Twitter"
                      rel="me"
                    >
                      <FontAwesomeIcon
                        icon={faTwitter}
                        transform="shrink-8"
                        mask={faCircle}
                      />
                    </FooterLink>
                  </span>
                  <span className="fa-layers fa-fw fa-3x">
                    <FooterLink
                      href="https://github.com/ashfurrow"
                      title="GitHub"
                      rel="me"
                    >
                      <FontAwesomeIcon
                        icon={faGithub}
                        transform="shrink-8"
                        mask={faCircle}
                      />
                    </FooterLink>
                  </span>
                  <span className="fa-layers fa-fw fa-3x">
                    <FooterLink
                      href="https://photos.ashfurrow.com"
                      title="Photo Blog"
                      rel="me"
                    >
                      <FontAwesomeIcon
                        icon={faImage}
                        transform="shrink-8"
                        mask={faCircle}
                      />
                    </FooterLink>
                  </span>
                  <span className="fa-layers fa-fw fa-3x">
                    <FooterLink
                      href="http://instagram.com/ashfurrow"
                      title="Instagram"
                      rel="me"
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        transform="shrink-8"
                        mask={faCircle}
                      />
                    </FooterLink>
                  </span>
                </FooterIcons>
                <span style={{ fontSize: '0.75rem' }}>
                  This site is{' '}
                  <a href="http://github.com/ashfurrow/blog">open source</a>.{' '}
                  <a href="http://purl.org/dc/dcmitype/Text">Content</a>{' '}
                  licensed under{' '}
                  <a href="http://creativecommons.org/licenses/by/4.0/">
                    Creative Commons Attribution 4.0
                  </a>
                  .
                </span>
              </Footer>
            </React.Fragment>
          </ThemeProvider>
        )}
      />
    )
  }
}
