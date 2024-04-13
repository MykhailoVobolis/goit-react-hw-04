import ImageGallery from "./components/ImageGallery/ImageGallery";

// Функція плавного скролу галереї
export function smoothGalleryScroll() {
  // Функція що повертає обє'єкт, з якого отримуємо значення висоти карточки
  let cardHeight = galleryRef.firstElementChild.getBoundingClientRect().height;
  // Плавний скрол методом window.scrollBy
  window.scrollBy({
    top: cardHeight * 3,
    left: 0,
    behavior: "smooth",
  });
}

// ПОТРІБНО ВИКОРИСТАТИ Ref для доступу DOM елемента галереї!!!!!
