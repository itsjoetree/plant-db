import type { ComponentProps } from "react";
import { container } from "../../styled-system/patterns";
import { cx } from "../../styled-system/css";

/**
 * Container for content across app, used for consistent padding and max width.
 */
function Container({ children, className }: ComponentProps<"div">) {

  return (<div className={cx(container({ p: "4", maxW: "70rem" }), className)}>
    {children}
  </div>);
}

export default Container;