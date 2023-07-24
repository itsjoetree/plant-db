import type { ComponentProps } from "react";
import { css, cx } from "../../styled-system/css";
import { circle } from "../../styled-system/patterns";

type AvatarProps = ComponentProps<"div"> & {
  /**
   * Size of avatar.
   * 
   * @default "md"
   */
  size?: "md" | "lg"
};

/**
 * Circle component that displays image
 */
function Avatar({ className, size, ...props }: AvatarProps) {

  return (<div className={
    cx(circle({
      borderWidth: ".25rem",
      borderStyle: "solid",
      borderColor: "secondary",
    }),
    size === "lg" ? css({ height: "8rem", width: "8rem" }) : css({ height: "3rem", width: "3rem" }),
    className)
  } {...props}>
  </div>);
}

export default Avatar;