import type { ComponentProps } from "react";
import { css } from "../../styled-system/css";
import Logo from "./Logo";

export const styles = css({
  padding: "1rem",
  position: "sticky",
  zIndex: 10,
  top: 0,

  borderBottomColor: "secondary",
  borderBottomStyle: "solid",
  borderBottomWidth: "0.25rem",

  backgroundColor: "primary",
});

function HeaderBar({ className, children, ...props }: ComponentProps<"div">) {

  return (<div className={`${styles} ${css({display: "flex", gap: "1rem", alignItems: "center"})} ${className}`} {...props}>
    <Logo />
    {children}
  </div>);
}

export default HeaderBar;