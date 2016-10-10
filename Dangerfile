# Sometimes it's a README fix, or something like that - which isn't relevant for
# including in a project's CHANGELOG for example
declared_trivial = github.pr_title.include? "#trivial"

# Make it more obvious that a PR is a work in progress and shouldn't be merged yet
warn("PR is classed as Draft") if github.pr_title.include? "[Draft]"

# From https://github.com/artsy/artsy.github.io/blob/source/Dangerfile

# Determine if proselint is currently installed in the system paths.
# @return  [Bool]
#
def mdspell_installed?
  `which mdspell`.strip.empty? == false
end

prose.ignored_words = [
  'orta',
  'artsy',
  'cocoapods',
  'submodule',
  'plugin',
  'xcode',
  'readmore'
]

# Look through all changed Markdown files
markdown_files = (git.modified_files + git.added_files).select do |line|
  line.start_with?("source/blog") && line.end_with?(".markdown")
end

prose.lint_files markdown_files
prose.check_spelling markdown_files
