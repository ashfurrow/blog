require 'rake'
require 'httparty'
require 'json'

desc "Initial setup"
task :bootstrap do
  puts 'Installing dependencies...'
  puts `bundle install --without distribution`
end

def perform_s3_cmd (cmd)
  sh "s3cmd #{cmd} --access_key=$SITE_AWS_KEY --secret_key=$SITE_AWS_SECRET"
end

namespace :deploy do

  def cdn
    require 'cloudflare'
    ::CloudFlare::connection(ENV['CLOUDFLARE_CLIENT_API_KEY'], ENV['CLOUDFLARE_EMAIL'])
  end

  task :invalidate do
    cdn.fpurge_ts 'ashfurrow.com'
  end

  desc "Deploys RSS and Atom feeds"
  task :feeds do
    # Push the generated feeds to the feeds.ashfurrow.com bucket.
    perform_s3_cmd "put --recursive setacl --acl-public –recursive --add-header='Cache-Control:max-age=3600, public' build/feed*.xml s3://feed.ashfurrow.com/"

    ['http://feed.ashfurrow.com', 'https://feed.ashfurrow.com', 'http://ashfurrow.com', 'https://ashfurrow.com'].each do |base_url|
      ['feed.xml', 'feed.rss.xml'].each do |feed|
        feed_url = "#{base_url}/#{feed}"
        puts "Invalidating #{feed_url} ... "
        begin
          cdn.zone_file_purge(base_url, feed_url)
        rescue => e
          abort "Error invalidating Cloudflare object at #{feed_url}: #{e}"
        end
      end
    end

    puts "Feeds deployed."
  end

  desc "Deploys to production and syncs feeds"
  task :all do
    Rake::Task['deploy:fetch_gh_pages'].invoke
    Rake::Task['deploy:gh_pages'].invoke
    Rake::Task['deploy:feeds'].invoke
    Rake::Task['deploy:invalidate'].invoke
  end

  desc "Deploy if Travis environment variables are set correctly"
  task :travis do
    branch = ENV['TRAVIS_BRANCH']
    pull_request = ENV['TRAVIS_PULL_REQUEST']

    abort 'Must be run on Travis' unless branch

    if pull_request != 'false'
      puts 'Skipping deploy for pull request; can only be deployed from master branch.'
      exit 0
    end

    if branch != 'master'
      puts "Skipping deploy for #{ branch }; can only be deployed from master branch."
      exit 0
    end

    Rake::Task['deploy:all'].invoke
  end

  task :fetch_gh_pages do
    Dir.mkdir('build') unless Dir.exist?('build')
    Dir.chdir('build') do
      `git init`
      remote_exists = (`git remote | grep origin`).chomp.length > 0
      `git remote add origin https://github.com/ashfurrow/ashfurrow.github.io.git` unless remote_exists
      `git pull origin master`
    end
  end

  task :gh_pages do
    head = `git log --pretty="%h" -n1`.chomp

    Dir.chdir('build') do
      `cp feed.rss.xml feed`
      `cp feed.rss.xml index.php/`
      if `git status --porcelain`.chomp.empty?
        puts 'No changes made.'
      else
        message = "Site updated to #{head}"
        `git add . ; git commit -m \"#{message}\"`
        `git push origin master`
      end
    end
  end
end

namespace :publish do
  desc "Build and deploy to production"
  task :production do
    Rake::Task['build'].invoke
    Rake::Task['deploy:production'].invoke
    Rake::Task['deploy:feeds'].invoke
  end
end

namespace :build do
  desc 'Builds, then tests'
  task :test do
    Rake::Task['build'].invoke
    Rake::Task['test'].invoke
  end
end

desc "Build site locally"
task :build do
  sh 'bundle exec middleman build --verbose'
end

desc "Start middleman server"
task :server do
  puts "Starting Middleman server"

  middleman = Process.spawn("bundle exec middleman")

  trap("INT") {
    Process.kill(9, middleman) rescue Errno::ESRCH
    exit 0
  }

  Process.wait(middleman)
end

desc 'Runs html-proofer against current build/ directory.'
task :test do
  require 'html/proofer'

  puts 'Testing build/ directory.'
  HTML::Proofer.new('build/', {
    ext: '.html',
    check_html: true,
    disable_external: true,
    alt_ignore: [/.*/],
    parallel: { in_processes: 3},
    }).run
end

desc "Create new blog article"
task :article, :title do |task, args|
  title = args[:title]
  abort "You must specify a title." if title.nil? || title.length < 1

  output = `bundle exec middleman article '#{title}'`
  # output is something like 'create  source/blog/2016-05-28-testing-testing.html.markdown'
  dir_name = output.scan(/[0-9]{4}-[0-9]{2}-[0-9]{2}.*\.html\.markdown/)[0][11...-14]
  full_path = "source/img/blog/#{dir_name}"
  sh "mkdir #{full_path}" unless File.exists? full_path
  sh "open #{full_path}"

  image_path = full_path.gsub(/^source/, "")
  image_filename = "#{image_path}/background.jpg"
  image_details = fetch_cloudy_conway

  image_source_path = "source#{image_filename}"

  puts "Writing background image file: #{image_source_path}"
  File.open(image_source_path, 'w') { |file| file.puts image_details[1] }

  # Images from CloudyConway are typically 1023 wide, and a variable height. We'll cap the height at 400.
  puts 'Resizing to 400x1023'
  sh "sips --cropToHeightWidth 400 1023 #{image_source_path}"

  puts 'Applying article template frontmatter.'
  new_article_filename = output.scan(/source.*/)[0]
  contents = File.read(new_article_filename)
  contents.gsub!(/background_image: /, "background_image: #{image_filename}")
  contents.gsub!(/background_image_source: /, "background_image_source: #{image_details[0]}")
  File.open(new_article_filename, 'w') { |file| file.puts contents }

  sh "open -a 'iA Writer' #{new_article_filename}"
end

task :default => :server

def fetch_cloudy_conway
  require 'net/http'
  require 'uri'
  require 'twitter'

  puts 'Fetching latest @CloudyConway image...'

  client = Twitter::REST::Client.new do |config|
    config.consumer_key        = ENV['TWITTER_CONSUMER_KEY']
    config.consumer_secret     = ENV['TWITTER_CONSUMER_SECRET']
    config.access_token        = ENV['TWITTER_ACCESS_TOKEN']
    config.access_token_secret = ENV['TWITTER_ACCESS_SECRET']
  end

  tweet = client.favorites(count: 100).select { |t| t.user.screen_name == "CloudyConway" }.first
  tweet ||= client.user_timeline('CloudyConway').first
  media = tweet.media.first
  puts "Retrieved tweet: #{tweet.url}"
  image_url = media.media_url
  large_image_url = URI.parse(image_url.to_s + ":large")
  response = Net::HTTP.get_response large_image_url
  puts "Retrieved image data: #{large_image_url}"

  [tweet.url, response.body]
end
