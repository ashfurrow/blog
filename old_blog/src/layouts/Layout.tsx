import React, { useCallback, useEffect, useState } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { theme } from 'config/theme'
import config from 'config/siteConfig'
import { media } from 'utils/media'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMastodon,
  faTwitter,
  faGithub,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'
import { faCircle, faImage } from '@fortawesome/free-solid-svg-icons'
import { Navbar } from 'layouts/components'

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
    font-variant-ligatures: common-ligatures;
    pre {
      font-variant-ligatures: no-common-ligatures;
      font-feature-settings: normal;
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
  h3 {
    margin-bottom: 0.83rem;
  }
  blockquote {
    font-style: italic;
    position: relative;
  }
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  /* Fixes FOUC bug on navbar FontAWesome icons. */
  .navbar {
    a {
      svg {
        height: 0.75rem;
      }
    }
  }
  .timeline {
    .event.year {
      &:not(:first-child) {
        .date-col {
          margin-bottom: 2rem;
          margin-top: 1rem;
        }
      }
      .date-col {
        time {
          padding-left: 1rem;
          padding-right: 1rem;
          padding-top: 0; /* To fix font baseline offset */
          padding-bottom: 8px;
        }
        margin-bottom: 2rem;
      }
      .card-col {
        time {
          padding-left: 1rem;
          padding-right: 1rem;
          padding-top: 0; /* To fix font baseline offset */
          padding-bottom: 8px;
        }
        /* display: none will break the flow, so just make it less-than-visible instead. */
        .card {
          background: transparent;
          border: none;
          box-shadow: none;
        }
      }
    }
    .card {
      margin-bottom: 1rem;
      border: 1px solid #bbb;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2);
      a {
        color: ${theme.colors.primary};
      }
      h3 {
        a {
          margin-left: 0.3rem;
          color: rgba(189, 189, 189, 0.5);
          font-weight: normal;

          &:hover {
            color: ${theme.colors.primary};
          }
        }
      }
    }
    h3, p {
      margin-bottom: 0.75rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  /* TODO: This feels weird, rearrnage to @media from media.ts */
  @media (min-width: 768px) {
    .timeline {
      .event {
        /* We hide the rendered Date component on tablet+ */
        .card-col img.eventImage {
          display: none;
        }

        /* On tablet+ we arrange the "Date" component (images) next to the marker column */
        &:nth-child(2n) {
          .date-col {
            img {
              margin-left: 0;
            }
          }
        }
        &:nth-child(2n+1) {
          .date-col {
            img {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
  .twitter-tweet {
    margin-left: auto;
    margin-right: auto;
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

  footer {
    svg {
      height: 3rem;
    }
  }
`

const Footer = styled.footer`
  text-align: center;
  padding: 0 1rem 3rem 1rem;
`

const FooterLink = styled.a`
  color: ${theme.colors.grey.default};
  &:hover {
    color: ${theme.colors.primary};
  }
`

const FooterIcons = styled.div`
  margin-top: 3rem;
  margin-bottom: 1.5rem;
`

export const Layout = (props: React.PropsWithChildren<{}>) => {
  const [navBarOpen, setNavBarOpen] = useState(false)

  useEffect(() => {
    // If the window resizes, close the menu (prevents menu from opening when
    // window is wide enough to be the full bar)
    const listToResize = () => {
      setNavBarOpen(false)
    }
    window.addEventListener('resize', listToResize)

    return () => {
      window.removeEventListener('resize', listToResize)
    }
  })

  const toggleMenuOpen = useCallback(() => {
    setNavBarOpen(!navBarOpen)
  }, [navBarOpen])

  const { children } = props

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Navbar menuIsOpen={navBarOpen} toggleMenuOpen={toggleMenuOpen} />
        <GlobalStyle />
        {children}
        <Footer>
          <hr />
          <FooterIcons>
            <span className="fa-layers fa-fw fa-3x">
              <FooterLink
                href="https://tenforward.social/@ashfurrow"
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
            <a href="http://purl.org/dc/dcmitype/Text">Content</a> licensed
            under{' '}
            <a href="http://creativecommons.org/licenses/by/4.0/">
              Creative Commons Attribution 4.0
            </a>
            .
          </span>
        </Footer>
      </React.Fragment>
    </ThemeProvider>
  )
}
