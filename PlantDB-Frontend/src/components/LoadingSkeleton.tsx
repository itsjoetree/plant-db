import { useState, type ComponentProps, useEffect } from "react";
import { css, cx } from "../../styled-system/css";

/**
 * Used to display animated loading skeleton of page to help ease transition to content.
 */
function LoadingSkeleton({ className, ...props }: ComponentProps<"div">) {
  const [isDelayed, setIsDelayed] = useState(true);

  useEffect(() => {
    setTimeout(() => { setIsDelayed(false); }, 200);
  }, []);

  return (<div className={cx(
    css({ visibility: isDelayed ? "hidden" : "visible",
      animation: "pulse 2s linear infinite", bg: "grey" }), className)} {...props}>
  </div>);
}

export default LoadingSkeleton;