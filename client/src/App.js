import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import SearchBox from "./components/SearchBox";
import Galery from "./components/Galery";
import Pagination, { usePagination } from "./components/Pagination";

import "./App.css";

const ITEMS_PER_PAGE = 100;
const PAGINATION_WINDOW_SIZE = 5;

const SEARCH_QUERY = gql`
  query Search($query: String!, $from: Int!) {
    search(q: $query, from: $from) {
      items {
        href
        description
        title
      }
      total
    }
  }
`;

const App = () => {
  const [query, setQuery] = useState("");
  const [from, setFrom] = useState(1);
  const [search, { loading, data }] = useLazyQuery(SEARCH_QUERY);

  const pagination = usePagination({
    currentPage: from,
    totalItems: data?.search?.total ?? 0,
    itemsPerPage: ITEMS_PER_PAGE,
    windowSize: PAGINATION_WINDOW_SIZE,
  });

  const handlePageChange = (pageNumber) => {
    setFrom(pageNumber);
    search({ variables: { query, from: pageNumber } });
  };

  const handleSearch = () => {
    setFrom(1);
    search({ variables: { query, from: 1 } });
  };

  const images = data?.search?.items ?? [];

  return (
    <div className="App">
      <div>
        <SearchBox
          query={query}
          onChange={setQuery}
          onSearch={handleSearch}
          loading={loading}
        />
      </div>
      <div className="">
        <Galery loading={loading} images={images} />
      </div>
      <div>
        <Pagination
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default App;
