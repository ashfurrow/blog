require 'rake'
require 'httparty'
require 'json'


def perform_s3_cmd (cmd)
  sh "s3cmd #{cmd} --access_key=$SITE_AWS_KEY --secret_key=$SITE_AWS_SECRET "
end

namespace :deploy do

  desc "Deployment to production"
  task :production do
    sh 'bundle exec middleman s3_sync --bucket=ashfurrow.com'
  end

  desc "Deployment to staging"
  task :staging do
    sh 'bundle exec middleman s3_sync --bucket=staging.ashfurrow.com'

    # Add any staging-only files.
    perform_s3_cmd "s3cmd put --recursive setacl --acl-public –recursive --add-header='Cache-Control:max-age=3600, public' staging-only/* s3://staging.ashfurrow.com/"
  end

  desc "Deploys RSS and Atom feeds"
  task :feeds do
    require 'cloudflare'
    # Push the generated feeds to the feeds.ashfurrow.com bucket.
    perform_s3_cmd "put --recursive setacl --acl-public –recursive --add-header='Cache-Control:max-age=3600, public' build/feed*.xml s3://feed.ashfurrow.com/"

    # Invalidate the CDN.
    cloudflare = ::CloudFlare::connection(ENV['CLOUDFLARE_CLIENT_API_KEY'], ENV['CLOUDFLARE_EMAIL'])
    ['http://feed.ashfurrow.com', 'https://feed.ashfurrow.com', 'http://ashfurrow.com', 'https://ashfurrow.com'].each do |base_url|
      ['feed.xml', 'feed.rss.xml'].each do |feed|
        feed_url = "#{base_url}/#{feed}"
        puts "Invalidating #{feed_url} ... "
        begin
          cloudflare.zone_file_purge(base_url, feed_url)
        rescue => e
          abort "Error invalidating Cloudflare object at #{feed_url}: #{e}"
        end
      end
    end

    puts "Feeds deployed."
  end

  desc "Fetches IP addresses and updates bucket policy"
  task :update_s3_permissions do
    Rake::Task['update_ips_to_whitelist'].invoke

    puts "Updating bucket policy."
    perform_s3_cmd "setpolicy Permissions.json s3://ashfurrow.com"
    puts "Done."
  end

  desc "Deploys to staging, production, and syncs feeds"
  task :all do
    Rake::Task['deploy:staging'].invoke
    Rake::Task['deploy:production'].invoke
    Rake::Task['deploy:feeds'].invoke
    Rake::Task['deploy:update_s3_permissions'].invoke
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
end

namespace :publish do
  desc "Build and deploy to production"
  task :production do
    Rake::Task['build'].invoke
    Rake::Task['deploy:production'].invoke
    Rake::Task['deploy:feeds'].invoke
  end

  desc "Build and deploy to staging"
  task :staging do
    Rake::Task['build'].invoke
    Rake::Task['deploy:staging'].invoke
  end

  desc "Build and deploy to both staging and production"
  task :all do
    Rake::Task['build'].invoke
    Rake::Task['deploy:all'].invoke
  end
end

desc 'Updates Permissions.json to the latest Cloudflare datacentre IP addresses'
task :update_ips_to_whitelist do
  puts 'Fetching new IP addresses...'

  response = HTTParty.get('https://api.cloudflare.com/client/v4/ips')
  ipv4_addrs = response.parsed_response['result']['ipv4_cidrs']

  if ipv4_addrs.nil? 
    abort 'IP Address fetch failed.'
  else
    permissions_file_name = 'Permissions.json'
    permissions = JSON.parse(File.read(permissions_file_name))
    permissions['Statement'].each { |s| s['Condition']['NotIpAddress']['aws:SourceIp'] = ipv4_addrs }
    File.open(permissions_file_name, 'w') { |file| file.write(JSON.pretty_generate(permissions)) }
  end

  puts 'Updated Permissions.json file.'
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

  sh "bundle exec middleman article '#{title}'"
end

task :default => :server
