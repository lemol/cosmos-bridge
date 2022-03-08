export default function SearchBox({ query, onChange, onSearch }) {
  return (
    <div>
      <input name="query" value={query} onChange={onChange} />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}
