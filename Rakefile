require 'rake'
require 'middleman-gh-pages'

# This is the branch to deploy _to_.
ENV['BRANCH_NAME'] = 'master' unless ENV['BRANCH_NAME'].nil? == false

# Allow dirty commits.
ENV['ALLOW_DIRTY'] = 'true'

invalidated_cnd = false

namespace :deploy do
  desc "Deployment to production, invalidate CDN."
  task :production do
    Rake::Task['deploy'].invoke
    Rake::Task['post_deploy'].invoke
  end

  desc "Deploys RSS and Atom feeds"
  task :feeds do
    sh "s3cmd put --access_key=$SITE_AWS_KEY --secret_key=$SITE_AWS_SECRET --recursive setacl --acl-public –recursive --add-header='Cache-Control:max-age=3600, public' build/feed*.xml s3://feed.ashfurrow.com/"
    Rake::Task['post_deploy'].invoke
  end

  desc "Deploy if Travis environment variables are set correctly"
  task :travis do
    branch = ENV['TRAVIS_BRANCH']
    pull_request = ENV['TRAVIS_PULL_REQUEST']

    abort 'Must be run on Travis' unless branch

    if pull_request != 'false'
      puts 'Skipping deploy for pull request; can only be deployed from merged branch.'
      exit 0
    end

    if branch != 'source'
      puts "Skipping deploy for #{ branch }; can only be deployed from source branch."
      exit 0
    end

    Rake::Task['deploy:production'].invoke
    Rake::Task['post_deploy'].invoke
  end

  desc 'Post-depoy tasks: invalidating the CDN.'
  task :post_deploy do
    if invalidated_cnd == false
      sh 'middleman cdn'
      invalidated_cnd = true
    end
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
    check_favicon: true,
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
