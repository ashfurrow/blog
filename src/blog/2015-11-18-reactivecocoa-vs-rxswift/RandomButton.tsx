import React from "react"

import { Button } from "components/PrevNext"

const goToRandomLibrary = () => {
  const libraries = [
    "PromiseKit",
    "Bolts",
    "RxSwift",
    "ReactiveCocoa",
    "Bond",
    "Interstellar",
    "ReactiveKit",
    "VinceRP",
    "ReactKit"
  ]
  const index = Math.floor(Math.random() * libraries.length)
  window.location.href = `https://cocoapods.org/pods/${libraries[index]}`
}

export const RandomButton: React.FC = () => (
  <Button style={{ marginBottom: "1.66rem", marginLeft: "auto", marginRight: "auto" }} onClick={goToRandomLibrary}>
    Go
  </Button>
)

// <input type="button" value="Go" onClick={goToRandomLibrary} />
