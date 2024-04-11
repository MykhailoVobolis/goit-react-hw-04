import css from "./ImageCard.module.css";

export default function ImageCard({ url, alt }) {
  return (
    <div>
      <img src={url} alt={alt} />
    </div>
  );
}
