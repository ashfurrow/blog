declare const graphql: (query: TemplateStringsArray) => void
declare module 'react-responsive-embed'

declare module '@mdx-js/react' {
  import { ComponentType, StyleHTMLAttributes } from 'react'

  type MDXProps = {
    children: React.ReactNode
    components: React.ReactNode[]
  }
  export class MDXProvider extends React.Component<MDXProps> {}
}
