export default function Image({ href, title }) {
  return (
    <div className="image">
      <img src={href} alt={title} height="180" />
      <div className="title">{title}</div>
    </div>
  );
}