namespace :deploy do
	desc "Deployment to production"
	task :production do
	  sh 'bundle exec middleman s3_sync --bucket=ashfurrow.com'
	end

	desc "Deployment to staging"
	task :staging do
	  sh 'bundle exec middleman s3_sync --bucket=staging.ashfurrow.com'    
    sh "s3cmd put --access_key=$SITE_AWS_KEY --secret_key=$SITE_AWS_SECRET --recursive setacl --acl-public –recursive --add-header='Cache-Control:max-age=3600, public' staging-only/* s3://staging.ashfurrow.com/"
	end

  desc "Deploys RSS and Atom feeds"
  task :feeds do
    sh "s3cmd put --access_key=$SITE_AWS_KEY --secret_key=$SITE_AWS_SECRET --recursive setacl --acl-public –recursive --add-header='Cache-Control:max-age=3600, public' build/*.xml s3://feed.ashfurrow.com/"
  end

  desc "Deploys to staging, production, and syncs feeds"
  task :all do
    sh 'rake deploy:staging'
    sh 'rake deploy:production'
    sh 'rake deploy:feeds'
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

    sh 'rake deploy:all'
  end
end

namespace :publish do
  desc "Build and deploy to production"
  task :production do
    sh 'bundle exec middleman build'
    sh 'rake deploy:production'
    sh 'rake deploy:feeds'
  end

  desc "Build and deploy to staging"
  task :staging do
    sh 'bundle exec middleman build'
    sh 'rake deploy:staging'
  end

  desc "Build and deploy to both staging and production"
  task :all do
    sh 'bundle exec middleman build'
    sh 'rake deploy:all'
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

task :default => :server
