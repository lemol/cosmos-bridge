import { useMemo } from "react";

import "./Pagination.css";

export default function Pagination({
  pagination: { currentPage, totalPages, paginationWindow },
  onPageChange,
  loading,
}) {
  if (loading) {
    return null;
  }

  const showLeftDots = paginationWindow[0] > 2;
  const showRightDots =
    paginationWindow[paginationWindow.length - 1] < totalPages - 1;

  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

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
}

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

const createPaginationWindow = (currentPage, totalPages, windowSize) => {
  const leftBound = Math.max(1, currentPage - windowSize);
  const rightBound = Math.min(totalPages, currentPage + windowSize);

  const window = Array.from(
    { length: rightBound - leftBound + 1 },
    (_, i) => leftBound + i
  );

  return window;
};
