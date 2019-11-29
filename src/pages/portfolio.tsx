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
import { media } from '../utils/media'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faTwitter,
  faMastodon,
  faStackOverflow,
  faInstagram,
  faSoundcloud,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
import { RightImage } from '../components/RightImage'

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

    <SectionHeader banner="/assets/portfolio/community_header.jpg" dim>
      <TitleCaption
        title="Community"
        subtitle="In my home region of Atlantic Canada, we have a saying: “rising tides lift
      all boats.”"
      />
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
        <BigFAIcon>
          <FooterLink
            href="https://github.com/ashfurrow"
            title="GitHub"
            rel="me"
          >
            <FontAwesomeIcon icon={faGithub} />
          </FooterLink>
        </BigFAIcon>
        <BigFAIcon>
          <FooterLink
            href="http://stackoverflow.com/users/516359/ash-furrow"
            title="Stack Overflow"
            rel="me"
          >
            <FontAwesomeIcon icon={faStackOverflow} />
          </FooterLink>
        </BigFAIcon>
        <BigFAIcon>
          <FooterLink
            href="https://twitter.com/ashfurrow"
            title="Twitter"
            rel="me"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </FooterLink>
        </BigFAIcon>
        <BigFAIcon>
          <FooterLink
            href="https://mastodon.technology/@ashfurrow"
            title="Mastodon"
            rel="me"
          >
            <FontAwesomeIcon icon={faMastodon} />
          </FooterLink>
        </BigFAIcon>
      </FooterIcons>
    </Footer>

    <SectionHeader banner="/assets/portfolio/software_header.jpg" dim>
      <TitleCaption
        title="Software"
        subtitle="Great software is software nobody notices. I write meaningful software with this in mind."
      />
    </SectionHeader>
    <p>
      I've began writing iOS apps in 2009, when I was still in university. Since
      then, I've expanded into{' '}
      <a href="https://ashfurrow.com/blog/perspective-of-the-polyglot/">
        many directions
      </a>
      ; I now write software for whatever platform I need to solve a problem.
    </p>
    <div>
      <h3>Artsy</h3>
      <RightImage src="/assets/portfolio/artsy.jpg" />
      <LeftDiv>
        <p>
          Since 2014, I’ve worked for <a href="https://www.artsy.net">Artsy</a>:
          a company working towards a future where everyone is moved by art
          every day. I've worked on a variety of teams to realize Artsy's
          business goals, starting with building iOS apps and now contributing
          across many systems and teams.
        </p>
        <p>
          Artsy encourages me to grow and learn, and to share what I learn with
          others; all of my work is{' '}
          <a href="https://github.com/ashfurrow">done in the open</a>, and I
          write articles for{' '}
          <a href="http://artsy.github.io">Artsy’s engineering blog</a>. My
          current career goal at Artsy is to scale up my impact.
        </p>
      </LeftDiv>
      <h3>35mm</h3>
      <RightImage src="/assets/portfolio/35mm.jpg" />
      <LeftDiv>
        <p>
          35mm was an ambitious project that I undertook with a team of two
          others: a designer and an editor. We aimed to change the world for
          photography-lovers by providing curated photography without
          advertisements. Although the project was not a success from a
          financial standpoint, I learnt a lot about writing Newsstand magazines
          for iOS, including architecting our own backend server in Node.js.
        </p>
        <p>This project is no longer available.</p>
      </LeftDiv>
      <h3>500px</h3>
      <RightImage src="/assets/portfolio/500px.jpg" />
      <LeftDiv>
        <p>
          In 2011, I began as the only iOS developer at 500px, architecting and
          shipping the iPad app. I helped design new features, plan the product
          roadmap, and respond to customer support inquiries, all while
          continuing to ship an amazing product. I learned a lot about how
          software serves the needs of the business, and collaborating towards
          shared goals as a team.
        </p>
        <p>
          Eventually, the team grew and I stepped up to become a team lead. From
          there, I played a crucial role in the design and development of the
          iPhone app, which shipped late 2012. 500px is still{' '}
          <a href="https://500px.com/apps/ipad">available on the App Store</a>,
          where it has been downloaded by hundreds of thousands of photography
          lovers.
        </p>
      </LeftDiv>
    </div>

    <SectionHeader banner="/assets/portfolio/creativity_header.jpg" dim>
      <TitleCaption
        title="Creativity"
        subtitle="Beyond code, beyond writing, there is art. My primary creative outlets are music and photography."
      />
    </SectionHeader>
    <p>
      Since 2011, I have developed an increasingly intense interest in
      photography. Working to improve my skills, I’ve explored the medium on
      film and in the{' '}
      <a href="https://ashfurrow.com/blog/darkroom-printing/">dark room</a>,
      using film as small as 35mm to as large as{' '}
      <a href="https://ashfurrow.com/blog/large-format-photography/">
        4x5 inches
      </a>
      . I now shoot using my iPhone because the majority of my dedicated
      creative time is spent on music.
    </p>
    <p>
      I grew up playing music but stopped when I started university. Twelve
      years later, in 2016,{' '}
      <a href="https://ashfurrow.com/blog/learning-guitar/">
        I picked up a guitar for the first
      </a>{' '}
      time and have been{' '}
      <a href="https://ashfurrow.com/blog/music-is-back/">(re)discovering</a> my
      love of music ever since. My largest music project to date has been a{' '}
      <a href="https://ashfurrow.com/blog/just-play/">30-day challenge</a>. I'm
      starting to explore songwriting, but it's still early. If you're in New
      York and ever want to jam, please get in touch!
    </p>
    <Footer>
      <FooterIcons>
        <BigFAIcon>
          <FooterLink
            href="http://instagram.com/ashfurrow"
            title="Instagram"
            rel="me"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </FooterLink>
        </BigFAIcon>
        <BigFAIcon>
          <FooterLink
            href="https://photos.ashfurrow.com/"
            title="Photo Blog"
            rel="me"
          >
            <ExposureIcon />
          </FooterLink>
        </BigFAIcon>
        <BigFAIcon>
          <FooterLink
            href="https://soundcloud.com/ash-furrow"
            title="Soundcloud"
            rel="me"
          >
            <FontAwesomeIcon icon={faSoundcloud} />
          </FooterLink>
        </BigFAIcon>
        <BigFAIcon>
          <FooterLink
            href="https://www.youtube.com/channel/UC-nZp66dKt_9tNHwEr6qLyQ"
            title="YouTube"
            rel="me"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </FooterLink>
        </BigFAIcon>
      </FooterIcons>
    </Footer>

    <SectionHeader banner="/assets/portfolio/education_header.jpg" dim>
      <TitleCaption
        title="Education"
        subtitle="I grew up wanting to become a teacher, and when I became a programmer, I achieved my dream."
      />
    </SectionHeader>
    <div>
      <h3>Blogging</h3>
      <RightImage src="/assets/portfolio/blogging.jpg" />
      <LeftDiv>
        <p>
          I’ve been writing a developer-focused blog since 2011, now hosted
          here. At{' '}
          <a href="http://www.teehanlax.com/blog/author/ash/">Teehan+Lax</a>, I
          began contributing to company blog as part of my job. I still do, now
          on <a href="http://artsy.github.io">Artsy’s developer blog</a>. I’ve
          also written posts for{' '}
          <a href="http://www.objc.io/contributors/">objc.io</a>.
        </p>
        <p>
          <a href="https://ashfurrow.com/blog/contemporaneous-blogging/">
            Blogging
          </a>{' '}
          about has made me{' '}
          <a href="https://www.youtube.com/watch?v=SjjvnrqDjpM">
            a better developer and a better writer
          </a>
          .
        </p>
      </LeftDiv>
      <h3>Workshops</h3>
      <RightImage src="/assets/portfolio/treehouse.jpg" />
      <LeftDiv>
        <p>
          In March, 2014, <a href="http://teamtreehouse.com">Treehouse</a>{' '}
          invited me to Orlando to record a series of videos and screencasts to
          guide students through using Core Data to build an iOS diary app.
        </p>
        <p>
          I’ve given other, in-person workshops on subjects ranging from the
          basics of iOS development to functional reactive programming in Swift,
          beginning in 2011.
        </p>
      </LeftDiv>
      <h3>Speaking</h3>
      <RightImage src="/assets/portfolio/speaking.jpg" />
      <LeftDiv>
        <p>
          I began speaking in the Toronto CocoaHeads group. I soon began
          submitting proposals to conferences. Today, I’ve spoken all over the
          world on a variety of subjects relating to software development, team
          development, and open source software.
        </p>
        <p>
          Check out my <a href="/speaking">speaking page</a> for more.
        </p>
      </LeftDiv>
      <h3>Books</h3>
      <RightImage src="/assets/portfolio/books.jpg" />
      <LeftDiv>
        <p>
          Beginning in 2012, I’ve written a number of books on iOS development
          (both with publishers and self-published). Like with blogging, writing
          is a very satisfying activity. I enjoy planning a route to take a
          reader on, considering what to teach them (and when), and turning my
          ideas into educational resources.
        </p>
        <p>
          <a href="/books">Check out my books page</a> for more.
        </p>
      </LeftDiv>
    </div>
  </>
)

const LeftDiv = styled.div`
  max-width: 50%;

  @media ${media.phone} {
    max-width: initial;
  }
`

const FigCaption = styled.figcaption`
  display: block;
  padding: 0;
  text-align: left;

  width: 30%;
  max-width: 325px;
  position: relative;
  right: -70%;
  top: 2rem;

  &:before {
    content: '';
    display: block;
    color: white;
    position: relative;
    width: 357px;
    height: 164px;
    right: 397px;
    top: 3.6em;
    background-image: url(/assets/portfolio/callout.svg);
    @media ${media.tablet} {
      width: 205px;
      max-width: initial;
      height: 94px;
      top: 2em;
      right: 235px;
      background-image: url(/assets/portfolio/callout_small.svg);
    }

    @media ${media.phone} {
      display: none;
    }
  }

  h2 {
    font-size: 2.5rem;
  }
  @media ${media.tablet} {
    h2 {
      font-size: 1.5rem;
    }
    p {
      font-size: 0.75rem;
    }
  }
  @media ${media.phone} {
    padding: 0rem 1rem;
    text-align: center;
    width: 100%;
    max-width: initial;
    position: initial;
    right: initial;

    h2 {
      font-size: 1.5rem;
    }
    p {
      font-size: 0.75rem;
    }
  }
`

const TitleCaption: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle
}) => (
  <FigCaption>
    <h2 style={{ margin: '0' }}>{title}</h2>
    <p style={{ margin: '0' }}>{subtitle}</p>
  </FigCaption>
)

const Footer = styled.footer`
  text-align: center;
  padding-bottom: 3rem;

  span {
    margin: 0 1rem;

    @media ${media.phone} {
      margin: 0 0.3rem;
    }
  }
`

const FooterLink = styled.a`
  color: ${theme.colors.grey.default};
  &:hover {
    color: ${theme.colors.primary};
  }
`

const BigFAIcon: React.FC = props => (
  <span className="fa-layers fa-fw fa-3x">{props.children}</span>
)

const FooterIcons = styled.div`
  margin: 1.5rem 0;
`

const ExposureIcon = styled.div`
  margin: auto;
  height: 60px; /* Matches Fontawesome */
  width: 53px;
  background: url('/assets/portfolio/exposure.png') no-repeat;
  background-size: contain;

  @media ${media.phone} {
    height: 42px;
    width: 37px;
  }

  &:hover {
    /* I don't like this at all, ugh. */
    background: url('/assets/portfolio/exposure_hover.png') no-repeat;
    background-size: contain;
  }
`
//  = props => <div style={{ height: '60px', width: '53px', background: `${} no-repeat`;}} />
