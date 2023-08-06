import { ChevronLeft, ChevronRight } from "tabler-icons-react";
import { css } from "../../styled-system/css";
import { hstack } from "../../styled-system/patterns";

const arrowContainerStyles = css({ display: "flex", gap: "4", alignItems: "center" });
const arrowStyles = css({ cursor: "pointer" });
const disabledArrowStyles = css({ opacity: 0.5, pointerEvents: "none" });

type PaginationProps = {
  /**
   * Displays text along side component, ideally
   * to show information regarding the remaining records
   */
  text?: string;

  /**
   * Current page index, 0-based.
   */
  currentPageIndex: number;

  /**
   * Total number of pages.
   */
  totalPages: number;

  onPageIndexChange: (page: number) => void;
}

/**
 * Intended for use with Table component, paginates through content.
 */
function Pagination({ text, currentPageIndex, totalPages, onPageIndexChange: onPageChange }: PaginationProps) {

  return (<div className={hstack({ gap: "2" })}>
    {text}

    <div className={arrowContainerStyles}>
      <ChevronLeft
        className={currentPageIndex === 0 ? disabledArrowStyles : arrowStyles}
        onClick={() => onPageChange(currentPageIndex - 1)}
      />

      <ChevronRight
        className={currentPageIndex + 1 === totalPages ? disabledArrowStyles : arrowStyles}
        onClick={() => onPageChange(currentPageIndex + 1)}
      />
    </div>
  </div>);
}

export default Pagination;