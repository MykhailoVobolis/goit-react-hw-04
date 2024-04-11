import RiseLoader from "react-spinners/RiseLoader";
import css from "./Loader.module.css";

export default function Loader({ loading }) {
  return (
    <div className={css.loader}>
      <RiseLoader color={"#4830f0"} loading={loading} size={10} />
    </div>
  );
}
