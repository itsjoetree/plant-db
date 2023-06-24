import { forwardRef, type ComponentProps, type ForwardedRef } from "react";
import { css } from "../../styled-system/css";

const styles = css({
  padding: "0.5rem 1rem",
  borderRadius: "0.45rem",
  borderWidth: "0.15rem",
  background: "transparent",
  _focus: {
    outline: ".15rem solid transparent",
    outlineOffset: ".15rem",
  }
});

const defaultStyles = css({ borderColor: "secondary", color: "secondary" });
const errorStyles = css({ borderColor: "error", color: "error" });
const fullWidthStyles = css({ width: "100%" });

type InputProps = Omit<ComponentProps<"input">, "type"> & {
  type?: "text" | "password" | "email" | "number" | "date" | "datetime-local";

  /**
   * Determines if component is full width
   */
  fw?: boolean;

  /**
   * Determine if component should have error styles
   */
  error?: boolean;
};

function Input({ className, fw, error, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <input className={`
      ${styles}
      ${!error ? defaultStyles : errorStyles}
      ${fw ? fullWidthStyles : ""}
      ${className}
    `} ref={ref} {...props} />
  );
}

export default forwardRef(Input);