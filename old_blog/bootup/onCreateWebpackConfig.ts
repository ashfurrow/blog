import path from 'path'
import { GatsbyNode } from 'gatsby'

const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions
}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    }
  })
}
exports.onCreateWebpackConfig = onCreateWebpackConfig
