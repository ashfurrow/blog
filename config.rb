require 'lib/custom_helpers'
require 'lib/add_links_to_navigation.rb'
require 'lib/modify_widths.rb'
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
  activate :asset_hash, ignore: [/^img\/.*/, /^fonts\/.*/]
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

def bucket
  Middleman::S3Sync.s3_sync_options.bucket
end

# Invalidate Cloudflare
activate :cdn do |cdn|
  # Credentials stored in CLOUDFLARE_CLIENT_API_KEY and CLOUDFLARE_EMAIL env variables.
  cdn.cloudflare = {
    zone: 'ashfurrow.com',
    base_urls: [
      "http://ashfurrow.com",
      "https://ashfurrow.com"
    ]
  }
  cdn.filter = /.+.*/
end

# After pushing, apply caching headers and invalidate any changed files.
after_s3_sync do |files_by_status|

  if bucket.start_with?('staging') == false
    # Cache all CSS, JS, and images for a year.
    directories = ['css', 'javascripts', 'img', 'fonts']
    files_to_cache = (files_by_status[:updated] + files_by_status[:created]).select do |file|
      directories.include? file.split('/').first
    end

    if files_to_cache.length > 0
      urls = files_to_cache.map { |file| "s3://#{bucket}/#{file}" }.join(' ')
      puts ANSI.green{'Setting cache headers.'}
      puts `s3cmd --access_key=$SITE_AWS_KEY --secret_key=$SITE_AWS_SECRET --add-header='Cache-Control:max-age=31536000, public' modify #{urls}`
    end

    # Invalidate CDN.
    updated_files = files_by_status[:updated]
    if updated_files.length > 90
      begin
        require 'cloudflare'
        cloudflare = ::CloudFlare::connection(ENV['CLOUDFLARE_CLIENT_API_KEY'], ENV['CLOUDFLARE_EMAIL'])
        puts "Invalidating zone... "
        cloudflare.fpurge_ts('ashfurrow.com')
      rescue => e
        abort "Error invalidating Cloudflare zone: #{e}"
      end
    else
      cdn_invalidate(updated_files)
    end
  end
end
