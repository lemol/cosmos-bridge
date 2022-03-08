import "./SearchBox.css";

export default function SearchBox({ query, onChange, onSearch }) {
  const handleQueryChange = (event) => {
    onChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="search-box">
        <input name="query" placeholder="search for the bridge to the universe 🌌" value={query} onChange={handleQueryChange} />
        <button type="submit">🔍</button>
      </div>
    </form>
  );
}
