require "lib/custom_helpers"
require "lib/add_links_to_navigation.rb"
require "lib/modify_widths.rb"

###
# Blog settings
###

set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, disable_indented_code_blocks: true, strikethrough: true, smartypants: true, with_toc_data: true
set :haml, ugly: true, format: :html5
set :relative_links, true

activate :syntax

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
  activate :asset_hash, ignore: /^img\/.*/
end

###
# Sync setup
###

# Push to S3
activate :s3_sync do |s3_sync|
  s3_sync.bucket                     = 'staging.ashfurrow.com' # Plugin needs a default bucket, better use staging.
  s3_sync.aws_access_key_id          = ENV['SITE_AWS_KEY']
  s3_sync.aws_secret_access_key      = ENV['SITE_AWS_SECRET']
end

# Invalidate Cloudflare
activate :cdn do |cdn|
  # Credentials stored in CLOUDFLARE_CLIENT_API_KEY and CLOUDFLARE_EMAIL env variables.
  cdn.cloudflare = {
    zone: 'ashfurrow.com',
    base_urls: [
      'http://ashfurrow.com',
      'https://ashfurrow.com',
      'http://staging.ashfurrow.com',
      'https://staging.ashfurrow.com'
    ]
  }
end

# After pushing, invalidate any changed files
after_s3_sync do |files_by_status|
  cdn_invalidate(files_by_status[:updated])
end

