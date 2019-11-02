const { onCreateWebpackConfig } = require('./bootup/onCreateWebpackConfig')
const { onCreateNode } = require('./bootup/onCreateNode')
const { createPages } = require('./bootup/createPages')

/** @type { import("gatsby").GatsbyNode } */
const gatsbyNode = {
  onCreateNode,
  createPages,
  onCreateWebpackConfig
}
module.exports = gatsbyNode

/*
TODO: 
Gatsby launch.json for VSCode
*/
