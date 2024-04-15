import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";
import "./App.css";
import { fetchImagesByWord } from "../../unsplash-api";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  // Оголошуємо стани
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaderBtn, setLoaderBtn] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [lageImage, setLageImage] = useState("");

  const changeValue = (value) => {
    setImages([]);
    setLoaderBtn(false);
    setInputValue(value);
  };

  const nextPage = () => {
    setLoaderBtn(false);
    setPage(page + 1);
  };

  const openModal = (item) => {
    setModalIsOpen(true);
    setLageImage(item);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
        if (!data.results.length) {
          toast("Sorry, there are no images matching your search query. Please try again!", {
            style: {
              color: "#ffffff",
              backgroundColor: "#ef4040",
            },
          });
          return;
        }
        // Записуємо дані в стан
        setImages((prevImages) => {
          return [...prevImages, ...data.results];
        });
        setLoaderBtn(true);
        // Перевірка, чи це остання завантажена сторінка?
        if (page === data.total_pages) {
          //  Повідомлення про досягнення кінця результатів запиту
          toast("We're sorry, but you've reached the end of search results.", {
            style: {
              color: "#ffffff",
              backgroundColor: "#0099FF",
            },
          });
          setLoaderBtn(false);
        }
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
    <div className="mainContainer">
      <SearchBar onSearch={changeValue} />
      {error && <ErrorMessage error={error} />}
      {images.length > 0 && <ImageGallery items={images} openModal={openModal} />}
      {modalIsOpen && <ImageModal isOpen={modalIsOpen} onClose={closeModal} lageImage={lageImage} />}
      {loaderBtn && <LoadMoreBtn nextPage={nextPage} />}
      {loading && <Loader loading={loading} />}
      <Toaster position="top-right" />
    </div>
  );
}
