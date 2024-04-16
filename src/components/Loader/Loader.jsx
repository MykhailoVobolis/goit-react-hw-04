import { ColorRing } from "react-loader-spinner";

export default function Loader({ loading }) {
  return (
    <ColorRing
      visible={loading}
      height="70"
      width="70"
      ariaLabel="color-ring-loading"
      wrapperClass="color-ring-wrapper"
      colors={["#de367f", "#4830f0", "#de367f", "#4830f0", "#de367f"]}
    />
  );
}
