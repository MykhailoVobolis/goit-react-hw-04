import css from "./Loader.module.css";
import RiseLoader from "react-spinners/RiseLoader";

export default function Loader({ loading }) {
  return (
    <div className={css.loader}>
      <RiseLoader color={"#4830f0"} loading={loading} size={10} />
    </div>
  );
}
