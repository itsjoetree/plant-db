import { type ComponentProps } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { css } from "../../styled-system/css";

const styles = css({
  border: "none",
  borderRadius: "0.75rem",

  padding: "0.5rem 1rem",
  backgroundColor: "primary",
  color: "secondary",
  fontWeight: "bold",

  _hover: {
    outlineStyle: "solid",
    outlineColor: "secondary",
    cursor: "pointer",
    transition: "outline 0.2s ease-in-out"
  },

  _disabled: {
    opacity: 0.5,
    pointerEvents: "none"
  }
});

type ButtonProps = ComponentProps<"button"> | (LinkProps & { to: string });

/**
 * Button component that returns a button or a react-router Link depending if "to" is present. 
 */
function Button({ children, className, ...props }: ButtonProps) {
  if ("to" in props)
    return (<Link className={`${styles} ${className}`} {...props}>
      {children}
    </Link>);

  return (
    <button className={`${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;