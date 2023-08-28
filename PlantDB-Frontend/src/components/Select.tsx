import { type ComponentProps, type ForwardedRef, forwardRef } from "react";
import { css } from "styled-system/css";

const defaultStyles = css({ borderColor: "secondary", color: "secondary" });
const errorStyles = css({ borderColor: "error", color: "error" });

type SelectProps = ComponentProps<"select"> & {
  /**
   * Determine if component should have error styles
   */
  error?: boolean;
}

function Select({ children, className, error, ...props }: SelectProps, ref: ForwardedRef<HTMLSelectElement>) {

  return (<select ref={ref} className={`
    ${css({
      py: "2",
      px: "4",
      borderRadius: "md",
      borderWidth: "0.15rem",
      background: "transparent",
      _focus: {
        outline: ".15rem solid transparent",
        outlineOffset: ".15rem",
      }
    })}
    ${!error ? defaultStyles : errorStyles}
    ${className}
  `} {...props}>
    {children}
  </select>);
}

export default forwardRef(Select);