import { galleryItems } from "./gallery-items.js";
// Change code below this line
// render
const galleryRef = document.querySelector(".gallery");

const markup = galleryItems
  .map(
    (image) => `<li><div class="gallery__item">
  <a class="gallery__link" href="${image.original}">
    <img
      class="gallery__image"
      src="${image.preview}"
      data-source="${image.original}"
      alt="${image.description}"
    />
  </a>
</div></li>`
  )
  .join(" ");

galleryRef.innerHTML = markup;
// end of render

galleryRef.addEventListener("click", onGalleryClick);
function onGalleryClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName != "IMG") {
    return;
  }
  const instance = basicLightbox.create(
    `
	<img src="${
    evt.target.dataset.source
  }" width="800" height="600" alt="${evt.target.getAttribute("alt")}">
`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", closeModal);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", closeModal);
      },
    }
  );
  instance.show();
  function closeModal(evt) {
    if (evt.code !== "Escape") {
      return;
    }
    instance.close();
  }
}
