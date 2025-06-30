/**
 * @typedef {Object} SearchDocument
 * @property {string} id - Unique identifier for the document
 * @property {string} title - Document title
 * @property {string} content - Document content
 * @property {string} date - Document date
 * @property {string} url - Document URL
 */

/**
 * @typedef {Object} LunrSearchResult
 * @property {string} ref - Reference to the document ID
 * @property {number} score - Search relevance score
 */

class SiteSearchApp {
  constructor() {
    /** @type {HTMLInputElement|null} */
    this.searchInput = document.getElementById("search-input")
    /** @type {HTMLElement|null} */
    this.searchResults = document.getElementById("search-results")
    /** @type {HTMLElement|null} */
    this.searchLoader = document.getElementById("search-loader")
    /** @type {lunr.Index|null} */
    this.index = null
    /** @type {SearchDocument[]} */
    this.documents = []

    this.init()
  }

  async init() {
    // Show loading indicator
    this.searchLoader.style.display = "block"

    // Check for query parameter and set initial search value
    const urlParams = new URLSearchParams(window.location.search)
    const initialQuery = urlParams.get("q")
    if (initialQuery) {
      this.searchInput.value = initialQuery
    }

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

      // Auto-focus search input
      this.searchInput.focus()

      // Add event listener
      this.searchInput.addEventListener("input", (e) => {
        this.search(e.target.value)
      })

      // Check if there's already a query in the input (from URL parameter or otherwise)
      if (this.searchInput.value) {
        this.search(this.searchInput.value)
      }
    } catch (error) {
      console.error("Failed to load search index:", error)
      this.searchLoader.style.display = "none"
    }
  }

  /** @param {string} query */
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
              <span class="search-result-date">${new Date(doc.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
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
