import React from 'react'

import { Layout } from '../components'
import Helmet from 'react-helmet'
import { Header } from './Header'
import { SectionTitle } from './SectionTitle'
import { Wrapper } from './Wrapper'
import { Content } from './Content'

interface Props {
  pageContext: {
    frontmatter: {
      title: string
      banner?: string
    }
  }
}

export default class MDXLayout extends React.Component<Props> {
  public render() {
    const {
      children,
      pageContext: {
        frontmatter: { title, banner }
      }
    } = this.props

    return (
      <Layout>
        <Helmet title={title} />
        <Header banner={banner}>
          <SectionTitle>{title}</SectionTitle>
        </Header>
        <Wrapper>
          <Content>{children}</Content>
        </Wrapper>
      </Layout>
    )
  }
}
