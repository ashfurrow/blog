import React from 'react'
import { graphql, Link, StaticQuery } from 'gatsby'
import { Layout, Wrapper, SectionTitle, Header, Content } from '../components'
import { compact } from 'lodash'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
import Data from '../models/Data'
import rgba from 'polished/lib/color/rgba'
import { Index } from 'elasticlunr'
import styled from 'styled-components'

interface SearchResult {
  title: string
  date: string
  body: string
  path: string
  id: string
}

interface Props {
  data: Data
}

interface State {
  query: string
  results: SearchResult[]
}

export default class Search extends React.Component<Props, State> {
  index?: Index<SearchResult>
  input: HTMLInputElement | null

  constructor(props: Props) {
    super(props)
    this.state = {
      query: '',
      results: []
    }
    this.input = null
  }

  search = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    if (this.index) {
      // Query the index with search string to get an [] of IDs
      this.setState({
        query,
        results: compact(
          this.index
            .search(query, {})
            // Map over each ID and return the full document
            .map(thing => {
              return this.index && this.index.documentStore.getDoc(thing.ref)
            })
        )
      })
    }
  }

  componentDidMount() {
    if (this.input) {
      this.input.focus()
    }
  }

  public render() {
    return (
      <Layout>
        <Helmet title={`Search | ${config.siteTitle}`} />
        <Header banner="/assets/bg/search.jpg">
          <SectionTitle>Search</SectionTitle>
        </Header>
        <Wrapper>
          <Content>
            <StaticQuery
              query={graphql`
                query SearchIndexQuery {
                  siteSearchIndex {
                    index
                  }
                }
              `}
              render={data => {
                this.index = Index.load(data.siteSearchIndex.index)
                return (
                  <div style={{ marginTop: '1rem' }}>
                    <SearchInput
                      type="text"
                      value={this.state.query}
                      onChange={this.search}
                      ref={input => {
                        this.input = input
                      }}
                    />
                    <ResultsList>
                      {this.state.results.map(page => (
                        <SearchResultItem key={page.id}>
                          <Link to={`/${page.path}`}>{page.title}</Link>
                          &nbsp;&nbsp;
                          <span style={{ color: rgba(0, 0, 0, 0.5) }}>
                            {page.date}
                          </span>
                        </SearchResultItem>
                      ))}
                    </ResultsList>
                  </div>
                )
              }}
            />
          </Content>
        </Wrapper>
      </Layout>
    )
  }
}

const SearchInput = styled.input`
  margin-bottom: 1rem;
  width: 100%;
`

const ResultsList = styled.ul`
  list-style-type: none;
  margin: 0;
`

const SearchResultItem = styled.li`
  margin: 0;
`
