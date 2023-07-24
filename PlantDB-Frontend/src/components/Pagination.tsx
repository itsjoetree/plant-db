import { ChevronLeft, ChevronRight } from "tabler-icons-react";
import { centeredStyles } from "../styles";
import { css } from "../../styled-system/css";

const arrowContainerStyles = css({ display: "flex", gap: "4", alignItems: "center" });
const arrowStyles = css({ cursor: "pointer" });
const disabledArrowStyles = css({ opacity: 0.5, pointerEvents: "none" });

type PaginationProps = {
  /**
   * Displays text along side component, ideally
   * to show information regarding the remaining records
   */
  text?: string;

  currentPage: number;

  totalPages: number;

  onPageChange: (page: number) => void;
}

/**
 * Intended for use with Table component, paginates through content.
 */
function Pagination({ text, currentPage, totalPages, onPageChange }: PaginationProps) {

  return (<div className={centeredStyles}>
    {text}

    <div className={arrowContainerStyles}>
      <ChevronLeft
        className={currentPage === 1 ? disabledArrowStyles : arrowStyles}
        onClick={() => onPageChange(currentPage - 1)}
      />

      <ChevronRight
        className={currentPage === totalPages ? disabledArrowStyles : arrowStyles}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
  </div>);
}

export default Pagination;