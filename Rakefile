namespace :deploy do
	desc "Deployment to production"
	task :production do
	  sh 'middleman s3_sync --bucket=ashfurrow.com'
	end

	desc "Deployment to staging"
	task :staging do
	  sh 'middleman s3_sync --bucket=staging.ashfurrow.com'
	end
end

namespace :publish do
  desc "Build and deploy to production"
  task :production do
    sh 'middleman build'
    sh 'rake deploy:production'
    sh "s3cmd put --recursive setacl --acl-public –recursive --add-header='Cache-Control:max-age=3600, public' build/*.xml s3://feed.ashfurrow.com/"
  end

  desc "Build and deploy to staging"
  task :staging do
    sh 'middleman build'
    sh 'rake deploy:staging'
  end

  desc "Build and deploy to both staging and production"
  task :all do
    sh 'middleman build'
    sh 'rake deploy:staging'
    sh 'rake deploy:production'
    sh "s3cmd put --recursive setacl --acl-public –recursive --add-header='Cache-Control:max-age=3600, public' build/*.xml s3://feed.ashfurrow.com/"
  end
end

desc "Build site locally"
task :build do
	sh 'middleman build'
end

desc "Start middleman server"
task :server do
	sh 'middleman'
end	

task :default => :server