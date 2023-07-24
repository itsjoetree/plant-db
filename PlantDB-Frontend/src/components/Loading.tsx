import { Loader } from "tabler-icons-react";
import { css } from "../../styled-system/css";

const styles = css({
  color: "secondary",
  animation: "spin 2s linear infinite"
});

/**
 * Simple loading spinner.
 */
function Loading() {

  return (
    <Loader className={styles} size={50} />
  );
}

export default Loading;