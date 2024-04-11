import css from "./SearchBar.module.css";
import { IoIosSearch } from "react-icons/io";

export default function SearchBar({ onSearch }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const searchQuery = form.elements.search.value;

    // Якщо текстове поле порожнє, виводимо повідомлення
    // і припиняємо виконання функції.
    if (form.elements.search.value.trim() === "") {
      alert("Please enter search term!");
      return;
    }
    onSearch(searchQuery);
    form.reset();
  };

  return (
    <header className={css.headerContainer}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.searchInput}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.searchBtn} type="submit">
          <IoIosSearch className={css.searchIcon} />
        </button>
      </form>
    </header>
  );
}
