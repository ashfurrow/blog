// Opens photo links in a <dialog>. Without JS the links just open the image.
const dialog = document.getElementById("lightbox")
const image = dialog.querySelector("img")
const links = [...document.querySelectorAll("a[data-lightbox]")]
let index = 0

function show(i) {
  index = (i + links.length) % links.length
  const link = links[index]
  image.src = link.href
  image.alt = link.querySelector("img")?.alt ?? ""
}

for (const [i, link] of links.entries()) {
  link.addEventListener("click", (event) => {
    event.preventDefault()
    show(i)
    dialog.showModal()
  })
}

dialog.addEventListener("click", (event) => {
  const action = event.target.dataset.lb
  if (action === "prev") show(index - 1)
  else if (action === "next") show(index + 1)
  else if (action === "close" || event.target === dialog || event.target === image) dialog.close()
})

dialog.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") show(index - 1)
  else if (event.key === "ArrowRight") show(index + 1)
})
