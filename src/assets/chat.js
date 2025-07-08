// Chat functionality - vanilla JavaScript implementation
;(function () {
  "use strict"

  // Chat states
  const ChatState = {
    WAITING_TO_SEND: "waiting-to-send",
    SENDING: "sending",
    WAITING_FOR_RESPONSE: "waiting-for-response"
  }

  class ChatInterface {
    constructor() {
      this.chatScriptIndex = 0
      this.chatState = ChatState.WAITING_TO_SEND
      this.chatScript = []
      this.messagesContainer = null
      this.inputContainer = null
      this.submitButton = null
      this.spinner = null

      this.init()
    }

    init() {
      // Get chat script from global variable (set by the blog post)
      this.chatScript = window.chatScript || []

      // Get DOM elements
      this.messagesContainer = document.querySelector(".messages")
      this.inputContainer = document.querySelector("#input")
      this.submitButton = document.querySelector('input[type="submit"]')
      this.spinner = document.querySelector("span.spinner")

      if (!this.messagesContainer || !this.inputContainer || !this.submitButton) {
        console.error("Chat: Required DOM elements not found")
        return
      }

      // Set up event listeners
      this.submitButton.addEventListener("click", this.handleSubmitClick.bind(this))

      // Prevent form submission
      const form = document.querySelector("form.chat")
      if (form) {
        form.addEventListener("submit", (e) => e.preventDefault())
      }

      // Initialize UI
      this.updateUI()
    }

    showLatestMessage() {
      if (this.messagesContainer) {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
      }
    }

    handleSubmitClick() {
      if (this.chatScriptIndex < this.chatScript.length) {
        this.setState(ChatState.SENDING)
        this.chatScriptIndex++

        this.updateUI()
        this.showLatestMessage()

        setTimeout(() => {
          this.setState(ChatState.WAITING_FOR_RESPONSE)
          this.updateUI()

          setTimeout(() => {
            this.setState(ChatState.WAITING_TO_SEND)
            this.updateUI()
            this.showLatestMessage()
          }, 100)
        }, 1000)
      }
    }

    setState(newState) {
      this.chatState = newState
    }

    updateUI() {
      // Update spinner
      if (this.spinner) {
        this.spinner.className = this.chatState === ChatState.SENDING ? "spinner" : ""
      }

      // Update input area
      if (this.inputContainer) {
        if (this.chatState === ChatState.WAITING_TO_SEND && this.chatScriptIndex < this.chatScript.length) {
          this.inputContainer.innerHTML = `<p>${this.chatScript[this.chatScriptIndex].response}</p>`
        } else {
          this.inputContainer.innerHTML = ""
        }
      }

      // Update messages
      this.updateMessages()
    }

    updateMessages() {
      if (!this.messagesContainer) return

      // Clear existing messages except the first one
      const firstMessage = this.messagesContainer.querySelector(".message")
      this.messagesContainer.innerHTML = ""

      // Add back the first message
      if (firstMessage) {
        this.messagesContainer.appendChild(firstMessage)
      }

      // Add messages based on current index
      for (let i = 0; i < this.chatScriptIndex; i++) {
        const script = this.chatScript[i]

        // Add reader message
        const readerMessage = document.createElement("div")
        readerMessage.className = "message"
        readerMessage.innerHTML = `<div class="reader">${script.response}</div>`
        this.messagesContainer.appendChild(readerMessage)

        // Add ash message if conditions are met
        if ((this.chatState === ChatState.WAITING_TO_SEND || i < this.chatScriptIndex - 1) && script.message) {
          const ashMessage = document.createElement("div")
          ashMessage.className = "message"
          ashMessage.innerHTML = `<div class="ash">${script.message}</div>`
          this.messagesContainer.appendChild(ashMessage)
        }
      }
    }
  }

  // Initialize when DOM is loaded
  document.addEventListener("DOMContentLoaded", function () {
    // Only initialize if chat elements are present
    if (document.querySelector("form.chat")) {
      new ChatInterface()
    }
  })
})()
