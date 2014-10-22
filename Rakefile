namespace :deploy do

	desc "Build site locally"
	task :build do
		sh 'middleman build'
	end

	desc "Build and deploy to production"
	task :publish do
		sh 'middleman build'
		sh 'rake deploy:production'
	end

	desc "Deployment to production"
	task :production do
	  sh 'middleman s3_sync --bucket=ashfurrow.com'
	end

	desc "Deployment to staging"
	task :staging do
	  sh 'middleman s3_sync --bucket=staging.ashfurrow.com'
	end

end

desc "Start middleman server"
task :server do
	sh 'middleman'
end	

task :default => :server