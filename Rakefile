require 'rake'
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

  CLOUDFLARE_ZONE_ID = 'cbd7eb9c9ccb4c9a8d84e2000dea93bf'

  task :invalidate do
    puts 'Invalidating CDN.'
    sleep 20 # Give GitHub time to deploy the site before invalidating.
    # Documented at https://api.cloudflare.com/#zone-purge-all-files
    sh <<-EOS
      curl -X DELETE "https://api.cloudflare.com/client/v4/zones/#{CLOUDFLARE_ZONE_ID}/purge_cache" \
      -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
      -H "X-Auth-Key: $CLOUDFLARE_CLIENT_API_KEY" \
      -H "Content-Type: application/json" \
      --data '{"purge_everything":true}'
      EOS
  end

  desc "Deploys RSS and Atom feeds"
  task :feeds do
    # Push the generated feeds to the feeds.ashfurrow.com bucket.
    perform_s3_cmd "put --recursive setacl --acl-public –recursive --add-header='Cache-Control:max-age=3600, public' build/feed*.xml s3://feed.ashfurrow.com/"
    puts "Feeds deployed."
  end

  desc "Deploys to production and syncs feeds"
  task :all => [:fetch_gh_pages, :gh_pages, :feeds, :invalidate] do
    puts 'Deploy all succeeded.'
  end

  desc "Sets up Travis to deploy, if on the master branch"
  task :travis_setup do
    branch = ENV['TRAVIS_BRANCH']
    pull_request = ENV['TRAVIS_PULL_REQUEST']
    key = ENV['encrypted_1e572e84b7d1_key']

    abort 'Must be run on Travis' if branch.nil? || key.nil?

    puts 'Checking deploy status...'
    if branch == 'master' && pull_request == 'false'
      puts 'Setting Travis up for deploys.'
      %x[openssl aes-256-cbc -K $encrypted_1e572e84b7d1_key -iv $encrypted_1e572e84b7d1_iv -in travis_id_rsa.enc -out deploy_key -d]
      %x[chmod 600 deploy_key]
      %x[ssh-add deploy_key]
      %x[git clone -b gh-pages git@github.com:ashfurrow/blog build]
      %x[git config --global user.name 'Travis CI']
      %x[git config --global user.email 'ash@ashfurrow.com']
    end
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
    unless Dir.exist?('build')
      `git clone -b gh-pages https://github.com/ashfurrow/blog.git build`
    end

    Dir.chdir('build') do
      `git checkout gh-pages`
      `git pull origin gh-pages`
    end
  end

  task :gh_pages do
    head = `git log --pretty="%h" -n1`.chomp

    Dir.chdir('build') do
      `cp feed.rss.xml feed`
      `cp feed.rss.xml index.php/`
      
      message = "Site updated to #{head}."
      `git add .`
      `git commit --allow-empty -m \"#{message}\"`
      `git push origin gh-pages`
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
  sh 'bundle exec middleman build --verbose --no-clean'
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
  require 'html-proofer'

  puts 'Testing build/ directory.'
  HTMLProofer.check_directory('build/', {
    ext: '.html',
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

  sh "open -a 'Preview' #{image_source_path}"
  puts 'Please crop manually and run through ImageOptim.'

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

  puts 'Fetching latest @CloudyConway/@CrookedCosmos image...'

  client = Twitter::REST::Client.new do |config|
    config.consumer_key        = ENV['TWITTER_CONSUMER_KEY']
    config.consumer_secret     = ENV['TWITTER_CONSUMER_SECRET']
    config.access_token        = ENV['TWITTER_ACCESS_TOKEN']
    config.access_token_secret = ENV['TWITTER_ACCESS_SECRET']
  end

  tweet = client.favorites(count: 100).select { |t|
    ['CloudyConway', 'CrookedCosmos'].include? t.user.screen_name
  }.first
  tweet ||= client.user_timeline('CloudyConway').first
  media = tweet.media.first
  puts "Retrieved tweet: #{tweet.url}"
  image_url = media.media_url
  large_image_url = URI.parse(image_url.to_s + ":large")
  response = Net::HTTP.get_response large_image_url
  puts "Retrieved image data: #{large_image_url}"

  [tweet.url, response.body]
end

def git_branch_name
  `git rev-parse --abbrev-ref HEAD`
end

desc 'Submits PR to GitHub.'
task :pr do
  branch_name = git_branch_name
  if branch_name == 'master'
    puts 'On master branch, not PRing.'
    exit 1
  end

  `git push -u origin #{branch_name}`
  `open https://github.com/ashfurrow/blog/pull/new/ashfurrow:master...#{branch_name}` 
end
