import { useState, useEffect } from "react";
import { fetchImagesByWord } from "../../unsplash-api";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

import "./App.css";

export default function App() {
  // Оголошуємо стани
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loaderBtn, setLoaderBtn] = useState(false);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");

  const changeValue = (value) => {
    setImages([]);
    setLoaderBtn(false);
    setInputValue(value);
  };

  const nextPage = () => {
    setLoaderBtn(false);
    setPage(page + 1);
  };

  useEffect(() => {
    // Оголошуємо асинхронну функцію сабміту форми
    async function handleSearch() {
      if (inputValue === "") return;
      try {
        setError(false);
        setLoading(true);
        // Використовуємо HTTP-функцію
        const data = await fetchImagesByWord(inputValue, page);

        // Перевірка наявності зображень відповідних запиту
        if (!data.length) {
          // alert("Sorry, there are no images matching your search query. Please try again!");
          console.log("Sorry, there are no images matching your search query. Please try again!");
          setLoading(false);
          setLoaderBtn(false);
          return;
        }
        // Записуємо дані в стан
        setImages((evt) => {
          return evt.length > 0 ? [...evt, ...data] : data;
        });
        setLoaderBtn(true);
      } catch (error) {
        // У разі помилки від API Встановлюємо стан error в true
        setError(true);
      } finally {
        // Встановлюємо індикатор в false після запиту
        setLoading(false);
      }
    }
    handleSearch();
  }, [inputValue, page]);

  return (
    <>
      <SearchBar onSearch={changeValue} />
      {error && <ErrorMessage error={error} />}
      {images.length > 0 && <ImageGallery items={images} />}
      {loaderBtn && <LoadMoreBtn nextPage={nextPage} />}
      <Loader loading={loading} />
    </>
  );
}
