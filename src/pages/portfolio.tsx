import * as React from 'react'
import { Header, Wrapper, SectionTitle, SectionHeader, SEO } from 'components'
import { Layout } from 'layouts'
import { Content } from 'layouts/components'
import Helmet from 'react-helmet'
import config from 'config/siteConfig'
import { theme } from 'config/theme'
import styled from 'styled-components'
import { media } from 'utils/media'
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
import { RightImage } from 'components/RightImage'
import { Link } from 'gatsby'

const Portfolio = () => {
  return (
    <Layout>
      <Helmet title={`Portfolio | ${config.siteTitle}`} />
      <SEO
        path="/portfolio/"
        data={{
          title: 'Ash Furrow Portfolio',
          description: "Ash Furrow's Professional Portfolio"
        }}
      />
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

// Gatsby needs this default export to work.
// eslint-disable-next-line import/no-default-export
export default Portfolio

const _Portfolio: React.FC = () => (
  <>
    <p>
      I began my career as an &ldquo;iOS developer&rdquo; but{' '}
      <Link to="/blog/building-better-software-by-building-better-teams/">
        I have learned
      </Link>
      , <Link to="/blog/normalizing-struggle/">I have struggled</Link>, and{' '}
      <Link to="/blog/perspective-of-the-polyglot/">I have grown</Link>. The
      problems I want to work on <em>now</em> simply cannot be solved with iOS
      software alone. I am interested in building <em>teams</em> as much as I am
      interested in building software.
    </p>
    <p>
      My <Link to="/blog/5-years-of-ios/">first five years</Link> and{' '}
      <Link to="/blog/5-more-years-of-building-software/">
        my second five years
      </Link>{' '}
      of professional software development are openly documented, if you want an
      in-depth look.
    </p>

    <SectionHeader banner="/assets/portfolio/team.jpg" dim>
      <TitleCaption
        title="Team"
        subtitle="I am at my best when I'm helping others reach their best."
      />
    </SectionHeader>
    <p>
      I started leading Artsy&apos;s Mobile Experience team in 2019, but my
      technical leadership spans back much further. Artsy encouraged to expand
      my impact so in 2015,{' '}
      <a href="/blog/building-online-communities/">
        I began learning about team dynamics
      </a>{' '}
      and applying what I learned in my team as an individual contributor. Over
      the years,{' '}
      <a href="/blog/perspective-of-the-polyglot/">
        I expanded my technical impact
      </a>{' '}
      by learning new systems and technologies, and{' '}
      <a href="/blog/building-better-software-by-building-better-teams/">
        expanded my cultural impact
      </a>{' '}
      by learning how to foster healthy, empathetic, and productive work
      environments.
    </p>
    <p>
      My approach to guiding product development centres learning as its goal.
      Developers build new products in complicated business contexts, and we
      don&apos;t know the answers upfront. I help teams learn <em>how</em> to
      solve the problem effectively and efficiently. We end up building a great
      product, but we do so by focusing on the <em>learning</em> rather than the{' '}
      <em>building</em>.
    </p>
    <p>
      This focus means creating a team environment where we are constantly
      learning and then teaching what we have learned, often across disciplines.
      This foundation of learning has helped me scale up Artsy&apos;s mobile
      software expertise across many product teams{' '}
      <a href="https://artsy.github.io/blog/2020/09/29/becoming-mobile-first-at-artsy/">
        to become a genuinely mobile-first product organization
      </a>
      .
    </p>
    <p>
      I excel at creating self-improving systems that distribute knowledge and
      responsibility across teams. At Artsy,{' '}
      <a href="https://artsy.github.io/blog/2018/05/07/fully-automated-standups/">
        I gave away responsibility for the engineering-wide sync
      </a>
      . At Shopify, I built up our release management rotation so every shift
      made things easier for the next one.
    </p>
    <p>
      My approach to technical leadership keeps me hands-on. Sometimes I work
      out ahead of the team, prototyping new ideas or helping avoid upcoming
      problems. However, most of my work is leading from behind. My intuition
      tells me what needs to be done most and I make sure it gets done.
    </p>

    <SectionHeader banner="/assets/portfolio/community_header.jpg" dim>
      <TitleCaption
        title="Community"
        subtitle="In my home region of Atlantic Canada, we have a saying: &ldquo;rising tides lift
      all boats.&rdquo;"
      />
    </SectionHeader>
    <p>
      Since I was a teenager, I&apos;ve been fascinated with open source
      software. Not just the software itself, but the communities surrounding
      different projects. No one individual can accomplish what a community can
      – people can always accomplish more if they work together.
    </p>
    <p>
      Today, I practice a{' '}
      <a href="https://ashfurrow.com/blog/open-source-ideology/">
        fairly radical openness
      </a>
      : I believe that unless there is a good reason to keep something secret,
      then it should be shared. Artsy called it &ldquo;open source by
      default.&rdquo; Teehan+Lax called it &ldquo;creating more value than you
      capture.&rdquo; These phrases gave names to the ideas that have always
      resonated with me.
    </p>
    <blockquote>
      <p>
        See, in all our searching, the only thing we&apos;ve found that makes
        the emptiness bearable is each other. —
        <a href="https://en.wikipedia.org/wiki/Contact_(1997_American_film)">
          Contact (1997)
        </a>
      </p>
    </blockquote>
    <p>
      I take a lot of pride in helping others and in contributing to the
      developer community, and I&apos;ve tried to set a higher standard for{' '}
      <a href="https://ashfurrow.com/blog/minswan-for-ios/">my own behaviour</a>
      . In addition to building{' '}
      <a href="https://ashfurrow.com/blog/building-my-career/">
        open source communities online
      </a>
      , I volunteer with <a href="https://www.pursuit.org">Pursuit</a>. When I
      moved to New York in 2015, I started a{' '}
      <a href="http://artsy.github.io/blog/2015/08/10/peer-lab/">
        weekly Saturday morning peer lab
      </a>
      , which <a href="/blog/5-years-of-peer-lab/">ran for five years</a>. I
      have since shared this idea around the world to{' '}
      <a href="https://peerlab.community">dozens of cities</a>, so there might
      even be a peer lab near you!
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
            href="https://masto.ashfurrow.com/@ashfurrow"
            title="Mastodon"
            rel="me"
          >
            <FontAwesomeIcon icon={faMastodon} />
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
      </FooterIcons>
    </Footer>

    <SectionHeader banner="/assets/portfolio/software_header.jpg" dim>
      <TitleCaption
        title="Software"
        subtitle="Great software is software that gets out of the user's way."
      />
    </SectionHeader>
    <p>
      I&apos;ve began writing iOS apps in 2009, when I was still in university.
      Since then, I&apos;ve expanded into{' '}
      <a href="https://ashfurrow.com/blog/perspective-of-the-polyglot/">
        many directions
      </a>
      . I now write software for whichever platform would best solve the problem
      at hand.
    </p>
    <div>
      <h3>Shopify</h3>
      <RightImage src="/assets/portfolio/shopify.jpg" />
      <LeftDiv>
        <p>
          <a href="/blog/joining-shopify/">I joined Shopify in 2021</a> and
          worked for two years on the <a href="https://shop.app/">Shop team</a>.
          My role as Senior Staff Developer gave me a broad mandate to improve
          our engineering organization and deliver product goals efficiently. I
          met regularly with company leadership to keep our technical efforts
          aligned with business goals. My job was to do what needed to get done,
          from prototyping new product ideas to improving cross-team technical
          leadership.
        </p>
        <p>
          My largest contribution was{' '}
          <a href="https://shop.app/minis">Shop Minis</a>, a React Native SDK
          for third parties to build native-quality shopping experiences. First
          I started building the SDK on my own, then I built up a team to
          deliver an internal prototype, then finally I oversaw two teams
          delivering a private alpha to launch partners. The SDK is{' '}
          <a href="https://www.shopify.com/ca/editions/winter2023#shop-minis-sdk">
            now publicly available
          </a>
          .
        </p>
      </LeftDiv>

      <h3>Artsy</h3>
      <RightImage src="/assets/portfolio/artsy.jpg" />
      <LeftDiv>
        <p>
          From 2014 until 2021, I was at{' '}
          <a href="https://www.artsy.net">Artsy</a>: a company working towards a
          future where everyone is moved by art every day. I worked on a variety
          of teams to realize Artsy&apos;s business goals, starting with
          building iOS apps, then contributing across many systems and teams,
          and eventually leading Artsy&apos;s Mobile Experience team.
        </p>
        <p>
          Artsy encouraged me to grow and learn, and to share what I learn with
          others; all of my work there was{' '}
          <a href="https://github.com/ashfurrow">done in the open</a>, and I
          wrote articles for{' '}
          <a href="http://artsy.github.io">Artsy&apos;s engineering blog</a>.
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
          financial standpoint, I learned a lot about writing Newsstand
          magazines for iOS, including architecting our own backend server in
          Node.js.
        </p>
      </LeftDiv>

      <h3>500px</h3>
      <RightImage src="/assets/portfolio/500px.jpg" />
      <LeftDiv>
        <p>
          In 2011, I began as the only iOS developer at{' '}
          <a href="https://500px.com">500px</a>, architecting and shipping the
          iPad app. I helped design new features, plan the product roadmap, and
          respond to customer support inquiries, all while continuing to ship an
          amazing product. I learned a lot about how software serves the needs
          of the business, and collaborating towards shared goals as a team. As
          a team lead, I played a crucial role in the design and development of
          the iPhone app, which shipped late 2012.
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
      In 2011, I began developing an increasingly intense interest in
      photography. Working to improve my skills, I&apos;ve explored the medium
      on film and in the{' '}
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
      love of music ever since. I performed a{' '}
      <a href="https://ashfurrow.com/blog/just-play/">30-day music challenge</a>{' '}
      online. Just before the pandemic hit, my band was preparing for its first
      performance: covers of The Weakerthans' music. Sadly, we never got to
      perform before{' '}
      <a href="/blog/moving-home-to-new-brunswick/">I left New York</a>.
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
          I&apos;ve been writing a developer-focused blog since 2011, now hosted
          here. At{' '}
          <a href="http://www.teehanlax.com/blog/author/ash/">Teehan+Lax</a>, I
          began contributing to company blog as part of my job. I continued that
          on <a href="http://artsy.github.io">Artsy&apos;s developer blog</a>.
          I&apos;ve also written posts for{' '}
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
          . At Artsy, I hosted weekly writing office hours to help others
          achieve their{' '}
          <a href="https://artsy.github.io/blog/2020/12/09/share-your-knowledge/">
            knowledge-sharing goals
          </a>
          .
        </p>
      </LeftDiv>
      <h3>Speaking</h3>
      <RightImage src="/assets/portfolio/speaking.jpg" />
      <LeftDiv>
        <p>
          I began speaking in the Toronto CocoaHeads group in 2011. I soon began
          submitting proposals to conferences. Today, I&apos;ve spoken all over
          the world on a variety of subjects relating to software development,
          team development, and open source software.
        </p>
        <p>
          Check out my <a href="/speaking">speaking page</a> for more.
        </p>
      </LeftDiv>
      <h3>Books</h3>
      <RightImage src="/assets/portfolio/books.jpg" />
      <LeftDiv>
        <p>
          I became a published author in 2012 and have since written a number of
          books on iOS development (both with traditional publishers and
          self-published). Like with blogging, writing is a very satisfying
          activity. I enjoy planning a route to take a reader on, considering
          what to teach them (and when), and turning my ideas into educational
          resources.
        </p>
        <p>
          My work in books extends to technical editing as well.{' '}
          <a href="/books">Check out my books page</a> for more.
        </p>
      </LeftDiv>
      <h3>Workshops</h3>
      <RightImage src="/assets/portfolio/treehouse.jpg" />
      <LeftDiv>
        <p>
          I delivered my first workshop in 2011. In March, 2014,{' '}
          <a href="https://teamtreehouse.com">Treehouse</a> invited me to
          Orlando to record a series of videos and screencasts to guide students
          through using Core Data to build an iOS diary app.
        </p>
        <p>
          I&apos;ve also given in-person workshops on subjects ranging from the
          basics of iOS development to functional reactive programming in Swift.{' '}
          <a href="https://artsy.github.io/series/swift-at-artsy/">
            I also led a workshop at Artsy
          </a>{' '}
          to teach non-engineers the fundamentals of programming.
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

  width: 35%;
  max-width: 325px;
  position: relative;
  right: -65%;
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
  padding-top: 1rem;

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

const BigFAIcon: React.FC = (props) => (
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
