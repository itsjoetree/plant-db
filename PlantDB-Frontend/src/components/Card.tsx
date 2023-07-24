import { type ComponentProps } from "react";
import { css, cx } from "../../styled-system/css";

/**
 * Styled container for content.
 */
function Card({ children, className, ...props }: ComponentProps<"div">) {

  return (<div className={cx(css({
    backgroundColor: "primary",
    color: "secondary",

    borderRadius: "xl",
    borderColor: "secondary",
    borderStyle: "solid",
    borderWidth: "0.25rem",

    padding: "4"
  }), className)} {...props}>
    {children}
  </div>);
}

export default Card;