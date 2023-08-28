import type { ComponentProps } from "react";
import { css, cx } from "styled-system/css";
import { circle } from "styled-system/patterns";

type AvatarProps = ComponentProps<"div"> & {
  /**
   * Size of avatar.
   * 
   * @default "md"
   */
  size?: "md" | "lg"

  src?: string
};

/**
 * Circle component that displays image
 */
function Avatar({ src, className, size, ...props }: AvatarProps) {

  return (<div style={{ backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className={
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