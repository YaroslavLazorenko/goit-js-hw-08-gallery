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
  const imageAltAttrValue = evt.target.getAttribute('alt');

  openModal(bigImageURL, imageAltAttrValue);
}

function openModal(imageURL, imageAltAttrValue) {
  const modalBoxElem = document.querySelector('.js-lightbox');
  const modalImageElem = document.querySelector('.lightbox__image');
  const closeModalBtnElem = document.querySelector('[data-action="close-lightbox"]');
  const modalBackdropElem = document.querySelector('.lightbox__overlay');

  modalBoxElem.classList.add('is-open');
  modalImageElem.setAttribute('src', imageURL);
  modalImageElem.setAttribute('alt', imageAltAttrValue);

  closeModalBtnElem.addEventListener('click', onCloseModalBtnClick);
  modalBackdropElem.addEventListener('click', onModalBackdropClick);
  window.addEventListener('keydown', onKeyboardBtnClick);

  function closeModal() {
    modalBoxElem.classList.remove('is-open');
    modalImageElem.setAttribute('src', '');

    closeModalBtnElem.removeEventListener('click', onCloseModalBtnClick);
    modalBackdropElem.removeEventListener('click', onModalBackdropClick);
    window.removeEventListener('keydown', onKeyboardBtnClick);
  }

  function onCloseModalBtnClick() {
    closeModal();
  }

  function onModalBackdropClick() {
    closeModal();
  }

  function onKeyboardBtnClick({ key }) {
    const isEscBtnPressed = key === 'Escape';
    const isLeftBtnPressed = key === 'ArrowLeft';
    const isRightBtnPressed = key === 'ArrowRight';

    if (isEscBtnPressed) closeModal();
    if (isLeftBtnPressed) {
      const currentGalleryItemIndex = galleryItems.indexOf(
        galleryItems.find(item => item.original === imageURL),
        );
        
      if (currentGalleryItemIndex > 0) {
          const newGalleryItemIndex = currentGalleryItemIndex - 1;
          
        modalImageElem.setAttribute('src', galleryItems[newGalleryItemIndex].original);
        modalImageElem.setAttribute('alt', galleryItems[newGalleryItemIndex].description);
        imageURL = galleryItems[newGalleryItemIndex].original;
      }
    }

    if (isRightBtnPressed) {
      const currentGalleryItemIndex = galleryItems.indexOf(
        galleryItems.find(item => item.original === imageURL),
        );
        
      if (currentGalleryItemIndex < galleryItems.length - 1) {
          const newGalleryItemIndex = currentGalleryItemIndex + 1;
          
        modalImageElem.setAttribute('src', galleryItems[newGalleryItemIndex].original);
        modalImageElem.setAttribute('alt', galleryItems[newGalleryItemIndex].description);
        imageURL = galleryItems[newGalleryItemIndex].original;
      }
    }
  }
}
