import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { Wrapper, SectionTitle, Header, SEO } from '../components'
import { Layout } from 'layouts'
import { Content } from 'layouts/components'
import { compact } from 'lodash'
import Helmet from 'react-helmet'
import config from '../config/SiteConfig'
import rgba from 'polished/lib/color/rgba'
import theme from '../config/Theme'
import { Index } from 'elasticlunr'
import styled, { keyframes } from 'styled-components'

interface SearchResult {
  title: string
  date: string
  body: string
  path: string
  id: string
}

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [index, setIndex] = useState<Index<SearchResult> | null>(null)

  const search = (input: string) => {
    if (!index) {
      return
    }
    // Query the index with search string to get an [] of IDs
    setResults(
      compact(
        index
          .search(input, { expand: true } as any)
          // Map over each ID and return the full document
          .map((thing) => {
            return index && index.documentStore.getDoc(thing.ref)
          })
      )
    )
  }

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value
    setQuery(userInput)
    search(userInput)
  }

  useEffect(() => {
    fetch('/siteSearchIndex.json')
      .then((result) => result.json())
      .then((indexJSON) => {
        setIndex(Index.load(indexJSON))
        if (query) {
          // User has already entered text, search for it.
          search(query)
        }
      })
  }, [])

  return (
    <Layout>
      <Helmet title={`Search | ${config.siteTitle}`} />
      <SEO path={'/search/'} data={{ title: 'Search' }} />
      <Header banner="/assets/bg/search.jpg">
        <SectionTitle>Search</SectionTitle>
      </Header>
      <Wrapper>
        <Content>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <SearchInput
                type="text"
                value={query}
                onChange={handleUserInput}
                ref={inputRef}
                style={{ boxSizing: 'border-box' }}
              />
              {!index && <Loader />}
            </div>
            <ResultsList>
              {results.map((page) => (
                <SearchResultItem key={page.id}>
                  <Link to={`${page.path}`}>{page.title}</Link>
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
export default Search

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  border: 2px solid transparent;
  border-top: 2px solid ${theme.colors.primary};
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: ${rotate} 0.8s linear infinite;
  position: relative;
`

const SpinnerContainer = styled.div`
  position: absolute;
  right: 0.5rem;
  top: calc(50% - 1rem);
`

const Loader = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
)

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
