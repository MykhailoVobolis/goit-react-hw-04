import { useState } from "react";
import { fetchImagesByWord } from "../../unsplash-api";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";

import "./App.css";

export default function App() {
  // Оголошуємо стани
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // fetchImagesByWord();
  // Оголошуємо асинхронну функцію сабміту форми
  async function handleSearch(searchQuery) {
    try {
      setImages([]); // Очищаємо стан articles перед новим запитом
      setError(false); // Скидаємо помилку перед наступним запитом, якщо вона була у попередньому запиті.
      setLoading(true); //  Встановлюємо індикатор в true перед запитом

      // Використовуємо HTTP-функцію
      const data = await fetchImagesByWord(searchQuery);
      // Записуємо дані в стан
      setImages(data);
      // console.log(data);
    } catch (error) {
      // Тут обробляємо помилку
      // Встановлюємо стан error в true
      setError(true);
    } finally {
      // Встановлюємо індикатор в false після запиту
      setLoading(false);
    }
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && <ImageGallery items={images} />}
      <Loader loading={loading} />
    </>
  );
}
