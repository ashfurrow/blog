task :deploy do
  sh 'middleman build' do |ok, result|
  	if ok 
	  sh 'middleman sync'
	  puts 'Deploy complete.'
		else
			abort 'Build failed.'
  	end
  end
end

task :default => :deploy