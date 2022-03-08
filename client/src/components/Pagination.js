import PropTypes from "prop-types";
import { useMemo } from "react";

import "./Pagination.css";

const Pagination = ({
  pagination: { currentPage, totalPages, paginationWindow },
  onPageChange,
  loading,
}) => {
  if (loading) {
    return null;
  }

  const showLeftDots = paginationWindow[0] > 2;
  const showRightDots =
    paginationWindow[paginationWindow.length - 1] < totalPages - 1;

  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  // TODO: abstract the various <li> elements to a reusable component.
  // .     Maybe a PaginationItem component?
  return (
    <nav>
      <ul className="pagination">
        {hasPreviousPage && (
          <li
            className="page-number"
            onClick={() => onPageChange(currentPage - 1)}
          >
            ⏮️
          </li>
        )}
        {showLeftDots && (
          <>
            <li
              className={
                currentPage === 1 ? "page-number active" : "page-number"
              }
              onClick={() => onPageChange(1)}
            >
              1
            </li>
            <li className="dots">...</li>
          </>
        )}
        {paginationWindow.map((number) => (
          <li
            key={number}
            className={
              number === currentPage ? "page-number active" : "page-number"
            }
            onClick={() => onPageChange(number)}
          >
            {number}
          </li>
        ))}
        {showRightDots && (
          <>
            <li className="dots">...</li>
            <li
              className={
                currentPage === totalPages
                  ? "page-number active"
                  : "page-number"
              }
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </li>
          </>
        )}
        {hasNextPage && (
          <li
            className="page-number"
            onClick={() => onPageChange(currentPage + 1)}
          >
            ⏭️
          </li>
        )}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    paginationWindow: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  onPageChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Pagination;

/**
 * usePagination
 * 
 * @param {{
 *   currentPage: number,
 *   totalItems: number,
 *   itemsPerPage: number,
 *   windowSize: number,
 * }} props 
 * @returns {{ 
 *   currentPage: number,
 *   totalPages: number,
 *   paginationWindow: number[],
 * }}
 */
export const usePagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  windowSize,
}) => {
  return useMemo(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationWindow = createPaginationWindow(
      currentPage,
      totalPages,
      windowSize
    );

    return {
      currentPage,
      totalPages,
      paginationWindow,
    };
  }, [totalItems, itemsPerPage, windowSize, currentPage]);
};

/**
 * createPaginationWindow
 * 
 * For the pagination we don't need to see every page number, instead we are
 * considering a window of pages around the current page.
 * 
 * For example, let's say we are on page 10 of a pagination with a window size of 2,
 * then we will see pages 8, 9, 10, 11, 12. (2 pages before and 2 pages after).
 * 
 * Btw, `windowSize` is the number of pages we want to see before and after the current page.
 * 
 * @param {number} currentPage 
 * @param {number} totalPages 
 * @param {number} windowSize 
 * @returns {number[]}
 */
const createPaginationWindow = (currentPage, totalPages, windowSize) => {
  const leftBound = Math.max(1, currentPage - windowSize);
  const rightBound = Math.min(totalPages, currentPage + windowSize);

  const window = Array.from(
    { length: rightBound - leftBound + 1 },
    (_, i) => leftBound + i
  );

  return window;
};
