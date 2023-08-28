import { forwardRef, type ComponentProps, type ForwardedRef } from "react";
import { css, cx } from "styled-system/css";

export type InputProps = Omit<ComponentProps<"input">, "type"> & {
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

/**
 * Styled input component.
 */
function Input({ className, fw, error, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <input className={cx(css({
      py: "2",
      px: "4",
      borderRadius: "md",
      borderWidth: "0.15rem",
      background: "transparent",
      _focus: {
        outline: ".15rem solid transparent",
        outlineOffset: ".15rem",
      }
    }),
    !error ? css({ borderColor: "secondary", color: "secondary" }) : css({ borderColor: "error", color: "error" }),
    fw && css({ width: "100%" }),
    className)
    } ref={ref} {...props} />
  );
}

export default forwardRef(Input);