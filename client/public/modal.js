let scrollPosition = 0;

function openModal(imageSrc) {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');

  scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  modalImage.src = imageSrc;
  modalImage.alt = 'Полное изображение проекта: ' + imageSrc.split('/').pop();

  modal.showModal();
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '15px';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.top = `-${scrollPosition}px`;
}

function closeModal() {
  const modal = document.getElementById('imageModal');

  modal.close();
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  document.body.style.position = '';
  document.body.style.width = '';
  document.body.style.top = '';
  window.scrollTo(0, scrollPosition);
}

document.getElementById('imageModal').addEventListener('click', function(event) {
  if (event.target === this) {
    closeModal();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

document.getElementById('imageModal').addEventListener('close', closeModal);
