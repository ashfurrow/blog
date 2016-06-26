# Sometimes it's a README fix, or something like that - which isn't relevant for
# including in a project's CHANGELOG for example
declared_trivial = pr_title.include? "#trivial"

# Make it more obvious that a PR is a work in progress and shouldn't be merged yet
warn("PR is classed as Draft") if pr_title.include? "[Draft]"

# From https://github.com/artsy/artsy.github.io/blob/source/Dangerfile

# Determine if proselint is currently installed in the system paths.
# @return  [Bool]
#
def mdspell_installed?
  `which mdspell`.strip.empty? == false
end

def check_spelling(files, ignored_words = []) 
  # Installs my fork of the spell checker if needed
  # my fork has line numbers + indexes 
  system "npm install -g orta/node-markdown-spellcheck" unless mdspell_installed?

  # Check that this is in the user's PATH after installing
  unless mdspell_installed?
    fail "mdspell is not in the user's PATH, or it failed to install"
    return
  end

  markdown_files = files ? Dir.glob(files) : (modified_files + added_files)
  markdown_files.select! do |line| line.end_with?(".markdown") end

  result_texts = Hash[markdown_files.uniq.collect { |md| [md, `mdspell #{md} -r`.strip] }]
  spell_issues = result_texts.select { |path, output| output.include? "spelling errors found" }

  # Get some metadata about the local setup
  current_branch = env.request_source.pr_json["head"]["ref"]
  current_slug = env.ci_source.repo_slug

  if spell_issues.count > 0
    message = "### Spell Checker found issues\n\n"
    spell_issues.each do |path, output|
      github_loc = "/#{current_slug}/tree/#{current_branch}/#{path}"
      message << "#### [#{path}](#{github_loc})\n\n"

      message << "Line | Typo |\n"
      message << "| --- | ------ |\n"
      
      output.lines[1..-3].each do |line|
        index_info = line.strip.split("|").first
        index_line, index = index_info.split(":").map { |n| n.to_i }

        file = File.read(path)
        unknown_word = file[index..-1].split(" ").first

        error_text = line.strip.split("|")[1..-1].join("|").strip
        error = error_text.gsub(unknown_word, "**" + unknown_word + "**")

        message << "#{index_line} | #{error} | \n"
      end
    end

    markdown message
  end
end


# Look through all changed Markdown files
markdown_files = (modified_files + added_files).select do |line|
  line.start_with?("source/blog") && line.end_with?(".markdown")
end

prose.lint_files markdown_files
check_spelling markdown_files
