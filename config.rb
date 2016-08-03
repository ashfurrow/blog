require 'lib/custom_helpers'
require 'lib/add_links_to_navigation.rb'
require 'lib/modify_widths.rb'
require 'lib/embed.rb'
require 'ansi/code'

###
# Blog settings
###

set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, disable_indented_code_blocks: true, strikethrough: true, smartypants: true, with_toc_data: true
set :haml, ugly: true, format: :html5
set :relative_links, true

activate :syntax
activate :inliner

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  blog.prefix = "blog"
  blog.permalink = "{title}.html"

  # Enable pagination
  blog.paginate = true
  blog.per_page = 10
  blog.page_link = "page/{num}"
  blog.summary_separator = /<!-- more -->/
  blog.new_article_template = "new_article.markdown.erb"
  blog.layout = "blog_post"
end

###
# Other settings
###

helpers CustomHelpers

activate :directory_indexes
activate :add_links_to_navigation
activate :modify_widths
activate :embed

page "/feed.xml", layout: false
page "/feed.rss.xml", layout: false
page "/sitemap.xml", layout: false

set :css_dir, 'css'
set :js_dir, 'javascripts'
set :images_dir, 'img'
set :partials_dir, 'layouts'

###
# Build-specific configuration
###

configure :build do
  activate :minify_css
  activate :minify_javascript

  # Refer to javascript, css assets with build-secific filenames.
  activate :asset_hash, ignore: [/^img\/.*/, /^fonts\/.*/, /^[^\/]*$/]
  # Last one is for root-directory favicons, etc.
end
