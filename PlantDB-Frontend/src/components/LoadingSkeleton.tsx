import type { ComponentProps } from "react";
import { css, cx } from "../../styled-system/css";

/**
 * Used to display animated loading skeleton of page to help ease transition to content.
 */
function LoadingSkeleton({ className, ...props }: ComponentProps<"div">) {

  return (<div className={cx(
    css({ animation: "pulse 2s linear infinite", bg: "grey" }), className)} {...props}>
  </div>);
}

export default LoadingSkeleton;