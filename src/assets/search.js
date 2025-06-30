class SiteSearchApp {
  constructor() {
    this.searchInput = document.getElementById("search-input")
    this.searchResults = document.getElementById("search-results")
    this.searchLoader = document.getElementById("search-loader")
    this.searchStatus = document.getElementById("search-status")
    this.index = null
    this.documents = []

    this.init()
  }

  async init() {
    // Show loading indicator
    this.searchLoader.style.display = "block"
    this.searchStatus.textContent = "Downloading search index..."

    try {
      // Fetch search index
      const response = await fetch("/search-data.json")
      const searchData = await response.json()

      this.documents = searchData

      // Build Lunr index
      this.index = lunr(function () {
        this.ref("id")
        this.field("title", { boost: 10 })
        this.field("content")
        this.field("date")

        searchData.forEach(function (doc) {
          this.add(doc)
        }, this)
      })

      // Hide loading indicator
      this.searchLoader.style.display = "none"
      this.searchStatus.textContent = ""

      // Auto-focus search input
      this.searchInput.focus()

      // Add event listener
      this.searchInput.addEventListener("input", (e) => {
        this.search(e.target.value)
      })

      // Check if there's already a query in the input
      if (this.searchInput.value) {
        this.search(this.searchInput.value)
      }
    } catch (error) {
      console.error("Failed to load search index:", error)
      this.searchLoader.style.display = "none"
      this.searchStatus.textContent = "Failed to load search index. Please try again later."
    }
  }

  search(query) {
    if (!this.index || !query.trim()) {
      this.searchResults.innerHTML = ""
      return
    }

    try {
      // Try exact match first, then fuzzy match
      let results = this.index.search(query)
      if (results.length === 0) {
        results = this.index.search(query + "*")
      }

      this.searchResults.innerHTML = results
        .map((result) => {
          const doc = this.documents.find((d) => d.id === result.ref)
          if (!doc) return ""

          return `
            <li class="search-result-item">
              <a href="${doc.url}">${doc.title}</a>
              &nbsp;&nbsp;
              <span style="color: rgba(0, 0, 0, 0.5);">${doc.date}</span>
            </li>
          `
        })
        .join("")
    } catch (error) {
      console.error("Search error:", error)
      this.searchResults.innerHTML = "<li>Search error occurred.</li>"
    }
  }
}

// Initialize search when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new SiteSearchApp()
})
