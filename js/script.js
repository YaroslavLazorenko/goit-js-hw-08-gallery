import galleryItems from '../app.js';

const listElem = document.querySelector('.js-gallery');
const modalBoxElem = document.querySelector('.js-lightbox');
const modalImageElem = document.querySelector('.lightbox__image');
const closeModalBtnElem = document.querySelector('[data-action="close-lightbox"]');
const modalBackdropElem = document.querySelector('.lightbox__overlay');

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
  modalBoxElem.classList.add('is-open');
  setModalImageAttributes(imageURL, imageAltAttrValue);

  closeModalBtnElem.addEventListener('click', closeModal);
  modalBackdropElem.addEventListener('click', closeModal);
  window.addEventListener('keydown', onKeyboardBtnClick);

  function setModalImageAttributes(srcAttrValue = '', altAttrValue = '') {
    modalImageElem.setAttribute('src', srcAttrValue);
    modalImageElem.setAttribute('alt', altAttrValue);
  }

  function closeModal() {
    modalBoxElem.classList.remove('is-open');
    setModalImageAttributes();

    closeModalBtnElem.removeEventListener('click', closeModal);
    modalBackdropElem.removeEventListener('click', closeModal);
    window.removeEventListener('keydown', onKeyboardBtnClick);
  }

  function onKeyboardBtnClick({ key }) {
    const isEscBtnPressed = key === 'Escape';
    const isLeftBtnPressed = key === 'ArrowLeft';
    const isRightBtnPressed = key === 'ArrowRight';
    const currentGalleryItemIndex = galleryItems.indexOf(
      galleryItems.find(item => item.original === imageURL),
    );

    if (isEscBtnPressed) closeModal();

    if (isLeftBtnPressed && currentGalleryItemIndex > 0) {
      imageURL = updateImageAttributesAndImageURL(currentGalleryItemIndex - 1);
    }

    if (isRightBtnPressed && currentGalleryItemIndex < galleryItems.length - 1) {
      imageURL = updateImageAttributesAndImageURL(currentGalleryItemIndex + 1);
    }

    function updateImageAttributesAndImageURL(itemIndex) {
      setModalImageAttributes(galleryItems[itemIndex].original, galleryItems[itemIndex].description);
      return galleryItems[itemIndex].original;
    }
  }
}
