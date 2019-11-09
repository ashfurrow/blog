declare const graphql: (query: TemplateStringsArray) => void
declare module 'react-responsive-embed'

declare module '@mdx-js/react' {
  import { ComponentType, StyleHTMLAttributes } from 'react'

  type MDXProps = {
    children: React.ReactNode
    components: any
  }
  export class MDXProvider extends React.Component<MDXProps> {}
}

declare module 'react-twitter-embed' {
  import { ComponentType } from 'react'

  type TwitterTweetEmbedProps = {
    tweetId: string
  }
  export class TwitterTweetEmbed extends React.Component<
    TwitterTweetEmbedProps
  > {}
}
