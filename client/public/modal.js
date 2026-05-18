// Функция открытия модального окна
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
  
    // Устанавливаем источник изображения
    modalImage.src = imageSrc;
    modalImage.alt = 'Полное изображение проекта: ' + imageSrc.split('/').pop();
  
    // Открываем модальное окно
    modal.showModal();
  
    // Блокируем скролл на странице
    document.body.style.overflow = 'hidden';
  }
  
  // Функция закрытия модального окна
  function closeModal() {
    const modal = document.getElementById('imageModal');
  
    // Закрываем модальное окно
    modal.close();
  
    // Восстанавливаем скролл
    document.body.style.overflow = '';
  }
  
  // Закрытие по клику вне изображения
  document.getElementById('imageModal').addEventListener('click', function(event) {
    if (event.target === this) {
      closeModal();
    }
  });
  
  // Закрытие по клавише Esc
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
  