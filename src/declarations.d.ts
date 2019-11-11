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

declare module '*.jpg'
declare module '*.png'

declare module '@merc/react-timeline' {
  import { ComponentType } from 'react'

  export class Timeline extends React.Component<any> {}
  export class Events extends React.Component<any> {}
  export class Event extends React.Component<any> {}
  export class UrlButton extends React.Component<any> {}
  export class ImageEvent extends React.Component<any> {}
  export class TextEvent extends React.Component<any> {}
  export class YouTubeEvent extends React.Component<any> {}
  export class TwitterTweetEmbed extends React.Component<any> {}
  export const themes: any
  export const createTheme: (theme: any, options: Object) => any
}
