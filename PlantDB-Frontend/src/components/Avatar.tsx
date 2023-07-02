import type { ComponentProps } from "react";
import { css } from "../../styled-system/css";

type AvatarProps = ComponentProps<"div"> & {
  /**
   * Size of avatar.
   * 
   * @default " md"
   */
  size?: "md" | "lg"
};

const avatarStyles = css({
  borderRadius: "9999px",
  borderWidth: ".25rem",
  borderStyle: "solid",
  borderColor: "secondary",
});

function Avatar({ className, size, ...props }: AvatarProps) {

  return (<div className={
    `${className}
    ${avatarStyles}
    ${size === "lg" ? css({ height: "8rem", width: "8rem" }) : css({ height: "3rem", width: "3rem" })}
  `} {...props}>

  </div>);
}

export default Avatar;