import { renderHook } from "@testing-library/react-hooks";
import { usePagination } from "./Pagination";

test("should work correctly for empty result", () => {
  const { result } = renderHook(() => usePagination({
    totalItems: 0,
    currentPage: 1,
    itemsPerPage: 100,
    windowSize: 2,
  }));

  expect(result.current.currentPage).toBe(1);
  expect(result.current.paginationWindow).toEqual([]);
  expect(result.current.totalPages).toBe(0);
})

test("should work correctly for a isolated window", () => {
  const { result } = renderHook(() => usePagination({
    totalItems: 10000,
    currentPage: 10,
    itemsPerPage: 100,
    windowSize: 2,
  }));

  expect(result.current.currentPage).toBe(10);
  expect(result.current.paginationWindow).toEqual([8, 9, 10, 11, 12]);
  expect(result.current.totalPages).toBe(100);
})

test("should work correctly for a window in the left", () => {
  const { result } = renderHook(() => usePagination({
    totalItems: 10000,
    currentPage: 2,
    itemsPerPage: 100,
    windowSize: 2,
  }));

  expect(result.current.currentPage).toBe(2);
  expect(result.current.paginationWindow).toEqual([1, 2, 3, 4]);
  expect(result.current.totalPages).toBe(100);
})

test("should work correctly for a window in the right", () => {
  const { result } = renderHook(() => usePagination({
    totalItems: 10000,
    currentPage: 99,
    itemsPerPage: 100,
    windowSize: 2,
  }));

  expect(result.current.currentPage).toBe(99);
  expect(result.current.paginationWindow).toEqual([97, 98, 99, 100]);
  expect(result.current.totalPages).toBe(100);
})
