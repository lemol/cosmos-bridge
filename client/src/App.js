import React, { useMemo, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import SearchBox from "./components/SearchBox";
import Galery from "./components/Galery";

import "./App.css";

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

export default function App() {
  const [query, setQuery] = useState("");
  const [from, setFrom] = useState(1);
  const [search, { loading, data }] = useLazyQuery(SEARCH_QUERY);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  }

  const handleSearch = () => {
    setFrom(1);
    search({ variables: { query, from } });
  }

  const images = useMemo(() => data?.search?.items ?? [], [data?.search?.items]);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <SearchBox query={query} onChange={handleQueryChange} onSearch={handleSearch} />
        </div>
        <div>
          <Galery loading={loading} images={images} />
        </div>
      </header>
    </div>
  );
}
