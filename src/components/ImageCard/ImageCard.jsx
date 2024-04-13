import css from "./ImageCard.module.css";

export default function ImageCard({ url, alt, regular }) {
  return (
    <a className={css.galleryImage} href={regular}>
      <img src={url} alt={alt} />
    </a>
  );
}
