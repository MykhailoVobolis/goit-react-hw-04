import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ items }) {
  return (
    <ul className={css.gallery}>
      {items.map(({ id, urls: { small, regular }, alt_description }) => (
        <li className={css.galleryItem} key={id}>
          <ImageCard url={small} alt={alt_description} regular={regular} />
        </li>
      ))}
    </ul>
  );
}
