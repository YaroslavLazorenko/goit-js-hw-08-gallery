import galleryItems from '../app.js';

function createGalleryMarkup(items) {
  const markup = items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
  return markup;
}

const listElem = document.querySelector('.js-gallery');
const listMarkup = createGalleryMarkup(galleryItems);

listElem.insertAdjacentHTML('beforeend', listMarkup);

listElem.addEventListener('click', onGalleryNavClick);

function onGalleryNavClick(evt) {
  evt.preventDefault();
  const isImageElem = evt.target.nodeName === 'IMG';

  if (!isImageElem) return;
    const bigImageURL = evt.target.dataset.source;
    const imageAltAttrValue = evt.target.getAttribute("alt");

  openModal(bigImageURL, imageAltAttrValue);
}

function openModal(imageURL, imageAltAttrValue) {
    const modalBoxElem = document.querySelector('.js-lightbox');
    const modalImageElem = document.querySelector(".lightbox__image");
    const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');

    modalBoxElem.classList.add('is-open');
    modalImageElem.setAttribute("src", imageURL);
    modalImageElem.setAttribute("alt", imageAltAttrValue);

    closeModalBtn.addEventListener("click", onCloseModalBtnClick);

    function onCloseModalBtnClick() {
        modalBoxElem.classList.remove('is-open');
        modalImageElem.setAttribute("src", "");
    }
}