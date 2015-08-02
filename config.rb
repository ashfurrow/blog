require "lib/custom_helpers"
require "lib/add_links_to_navigation.rb"
require "lib/modify_widths.rb"

###
# Blog settings
###

set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, disable_indented_code_blocks: true, strikethrough: true, smartypants: true, with_toc_data: true

activate :syntax

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  blog.prefix = "blog"
  blog.permalink = "{title}.html"

  # Enable pagination
  blog.paginate = true
  blog.per_page = 10
  blog.page_link = "page/{num}"
  blog.summary_separator = "<!-- more -->"
  blog.new_article_template = "new_article.html.markdown.erb"
  blog.layout = "blog_post"
end

###
# Other settings
###

helpers CustomHelpers

activate :directory_indexes
activate :add_links_to_navigation
activate :modify_widths

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
end

###
# Sync setup
###

activate :s3_sync do |s3_sync|
  s3_sync.bucket                     = 'staging.ashfurrow.com' # Plugin needs a default bucket, better use staging.
  s3_sync.aws_access_key_id          = ENV['SITE_AWS_KEY']
  s3_sync.aws_secret_access_key      = ENV['SITE_AWS_SECRET']
end
