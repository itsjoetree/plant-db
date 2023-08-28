import type { ComponentProps } from "react";
import { css, cx } from "styled-system/css";

export const styles = css({
  display: "flex",
  gap: "4",
  alignItems: "center",

  padding: "4",
  position: "sticky",
  zIndex: 10,
  top: 0,

  borderBottomColor: "secondary",
  borderBottomStyle: "solid",
  borderBottomWidth: "0.25rem",

  backgroundColor: "primary",
});

/**
 * Bar at top of app.
 */
function HeaderBar({ className, children, ...props }: ComponentProps<"div">) {

  return (<div className={cx(styles, css({display: "flex", gap: "4", alignItems: "center"}), className)} {...props}>
    {children}
  </div>);
}

export default HeaderBar;