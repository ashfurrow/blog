import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import { Layout, Wrapper, Header, SectionTitle, Content, Title } from '../components';

import config from '../../config/SiteConfig';
import PageProps from '../models/PageProps';

export default class AllTagTemplate extends React.PureComponent<PageProps> {
  public render() {
    const { tags } = this.props.pathContext;
    if (tags) {
      return (
        <Layout>
          <Helmet title={`Tags | ${config.siteTitle}`} />
          <Header>
            <Link to="/">{config.siteTitle}</Link>
            <SectionTitle>Tags</SectionTitle>
          </Header>
          <Wrapper>
            <Content>
              {tags.map((tag, index: number) => (
                <Title key={index}>
                  <Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
                </Title>
              ))}
            </Content>
          </Wrapper>
        </Layout>
      );
    }
  }
}
