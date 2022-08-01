import * as React from 'react'
import { Header, Wrapper, SectionTitle } from '../components'
import { Layout } from 'layouts'
import { Content } from 'layouts/components'
import Helmet from 'react-helmet'
import config from '../config/SiteConfig'

// Gatsby needs this default export to work.
// eslint-disable-next-line import/no-default-export
export default class NotFoundPage extends React.Component<any> {
  public render() {
    return (
      <Layout>
        <Helmet title={`404 not found | ${config.siteTitle}`} />
        <Header banner="/assets/bg/404.jpg">
          <SectionTitle>404</SectionTitle>
        </Header>
        <Wrapper>
          <Content>
            <p>Couldn't find what you you were looking for, sorry.</p>
          </Content>
        </Wrapper>
      </Layout>
    )
  }
}
