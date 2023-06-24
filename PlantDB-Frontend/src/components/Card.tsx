import { type ComponentProps } from "react";
import { css } from "../../styled-system/css";

const styles = css({
  backgroundColor: "primary",
  color: "secondary",

  // Border styles
  borderRadius: "1rem",
  borderColor: "secondary",
  borderStyle: "solid",
  borderWidth: "0.25rem",

  padding: "1rem"
});

function Card({ children, className, ...props }: ComponentProps<"div">) {

  return (<div className={`${styles} ${className}`} {...props}>
    {children}
  </div>);
}

export default Card;