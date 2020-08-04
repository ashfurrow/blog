import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import {
  Layout,
  Wrapper,
  SectionTitle,
  Header,
  Content,
  SEO
} from '../components'
import { compact } from 'lodash'
import Helmet from 'react-helmet'
import config from '../../config/SiteConfig'
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

export default () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [index, setIndex] = useState<Index<SearchResult> | null>(null)

  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value
    setQuery(userInput)
    if (index) {
      // Query the index with search string to get an [] of IDs
      setResults(
        compact(
          index
            .search(userInput, { expand: true } as any)
            // Map over each ID and return the full document
            .map(thing => {
              return index && index.documentStore.getDoc(thing.ref)
            })
        )
      )
    }
  }

  useEffect(() => {
    fetch('/siteSearchIndex.json')
      .then(result => result.json())
      .then(indexJSON => {
        setIndex(Index.load(indexJSON.index))
      })
  }, [])

  return (
    <Layout>
      <Helmet title={`Search | ${config.siteTitle}`} />
      <SEO path={'/search/'} data={{ title: 'Search' }} />
      <Header banner="/assets/bg/search.jpg">
        <SectionTitle>Search {!!index ? 'loaded' : 'loading'}</SectionTitle>
      </Header>
      <Wrapper>
        <Content>
          <div style={{ marginTop: '1rem' }}>
            <SearchInput
              type="text"
              value={query}
              onChange={search}
              ref={inputRef}
            />
            <ResultsList>
              {results.map(page => (
                <SearchResultItem key={page.id}>
                  <Link to={`/${page.path}`}>{page.title}</Link>
                  &nbsp;&nbsp;
                  <span style={{ color: rgba(0, 0, 0, 0.5) }}>{page.date}</span>
                </SearchResultItem>
              ))}
            </ResultsList>
          </div>
        </Content>
      </Wrapper>
    </Layout>
  )
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
