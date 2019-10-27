import * as React from 'react'
import {
  Content,
  Header,
  Layout,
  Wrapper,
  SectionTitle,
  SectionHeader
} from '../components'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
import theme from '../../config/Theme'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faTwitter,
  faMastodon,
  faStackOverflow
} from '@fortawesome/free-brands-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

export default class Portfolio extends React.Component<any> {
  public render() {
    return (
      <Layout>
        <Helmet title={`Portfolio | ${config.siteTitle}`} />
        <Header banner="/assets/bg/portfolio.jpg">
          <SectionTitle>Portfolio</SectionTitle>
        </Header>
        <Wrapper>
          <Content>
            <_Portfolio />
          </Content>
        </Wrapper>
      </Layout>
    )
  }
}

const _Portfolio: React.FC = () => (
  <>
    <p>
      My{' '}
      <a href="https://ashfurrow.com/blog/5-years-of-ios/">
        first 5 years of iOS development
      </a>{' '}
      are well-documented. However, I no longer consider myself an "iOS
      developer" –{' '}
      <a href="https://ashfurrow.com/blog/perspective-of-the-polyglot/">
        I've grown
      </a>
      ,{' '}
      <a href="https://ashfurrow.com/blog/building-better-software-by-building-better-teams/">
        I've learned
      </a>
      ,{' '}
      <a href="https://ashfurrow.com/blog/normalizing-struggle/">
        I've struggled
      </a>
      . The problems I want to work on just can't be solved with iOS software
      alone.
    </p>
    <p>
      A portfolio can only show you what I've done, but I hope this gives you a
      sense of what I'm doing next.
    </p>
    <SectionHeader banner="/assets/portfolio/community_header.jpg">
      <_SectionTitle>Community</_SectionTitle>
    </SectionHeader>
    <p>
      Since I was a teenager, I’ve been fascinated with open source software.
      Not just the software itself, but the communities surrounding different
      projects. No one individual can accomplish what a community can – people
      can always accomplish more if they work together.
    </p>

    <p>
      Today, I practice a{' '}
      <a href="https://ashfurrow.com/blog/open-source-ideology/">
        fairly radical openness
      </a>
      : I believe that unless there is a good reason to keep something secret,
      then it should be shared.
    </p>

    <p>
      At Artsy, we call it “open source by default.” At Teehan+Lax, we called it
      “creating more value than you capture.” Before that, I didn’t really have
      a name for it. It was just what I did.
    </p>

    <blockquote>
      <p>
        See, in all our searching, the only thing we’ve found that makes the
        emptiness bearable is each other. —
        <a href="https://en.wikipedia.org/wiki/Contact_(1997_American_film)">
          Contact (1997)
        </a>
      </p>
    </blockquote>

    <p>
      I take a lot of pride in helping others and in contributing to the
      developer community, and I’ve tried to set a higher standard for{' '}
      <a href="https://ashfurrow.com/blog/minswan-for-ios/">my own behaviour</a>
      . In addition to building{' '}
      <a href="https://ashfurrow.com/blog/building-my-career/">
        open source communities online
      </a>
      , I volunteer with <a href="http://c4q.nyc">Coalition for Queens</a>.
    </p>

    <p>
      When I moved to New York in 2015, I started a{' '}
      <a href="http://artsy.github.io/blog/2015/08/10/peer-lab/">
        Saturday morning peer lab
      </a>
      ; I have since spread this idea around the world to{' '}
      <a href="https://peerlab.community">dozens of cities</a>, so there might
      be a peer lab near you!
    </p>
    <Footer>
      <FooterIcons>
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
            href="http://stackoverflow.com/users/516359/ash-furrow"
            title="Stack Overflow"
            rel="me"
          >
            <FontAwesomeIcon
              icon={faStackOverflow}
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
      </FooterIcons>
    </Footer>
  </>
)

const _SectionTitle = styled.h2`
  margin: 0;
`

const Footer = styled.footer`
  text-align: center;
  padding-bottom: 3rem;

  span {
    margin: 0 1rem;
  }
`

const FooterLink = styled.a`
  color: ${theme.colors.grey.default};
  &:hover {
    color: ${theme.colors.primary};
  }
`

const FooterIcons = styled.div`
  margin: 1.5rem 0;
`
