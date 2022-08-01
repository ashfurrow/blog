import React from 'react'
import Helmet from 'react-helmet'

import { SEO, Header, SectionTitle, Wrapper } from 'components'
import { Layout } from 'layouts/Layout'
import { Content } from 'layouts/components'
import { generatePath } from '../utils/paths'

interface Props {
  pageContext: {
    frontmatter: {
      title: string
      banner?: string
      bannerAttribution?: string
    }
  }
}

export default class MDXLayout extends React.Component<Props> {
  public render() {
    const {
      children,
      pageContext: {
        frontmatter: { title, banner, bannerAttribution }
      }
    } = this.props

    return (
      <Layout>
        <Helmet title={title} />
        <SEO path={generatePath(title)} data={{ title }} />
        <Header banner={banner} bannerAttribution={bannerAttribution}>
          <SectionTitle>{title}</SectionTitle>
        </Header>
        <Wrapper>
          <Content>{children}</Content>
        </Wrapper>
      </Layout>
    )
  }
}
