const path = require('path')
const onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    }
  })
}
exports.onCreateWebpackConfig = onCreateWebpackConfig
