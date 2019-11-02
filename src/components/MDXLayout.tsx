import React from 'react'

import { Layout } from '../components'
import Helmet from 'react-helmet'
import { Header } from './Header'
import { MDXProvider } from '@mdx-js/react'
import { SectionTitle } from './SectionTitle'
import { Wrapper } from './Wrapper'
import { Content } from './Content'
import Frontmatter from '../models/Frontmatter'

interface Props {
  pageContext: {
    frontmatter: Frontmatter
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
