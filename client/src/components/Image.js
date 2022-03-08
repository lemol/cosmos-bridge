export default function Image({ href, title }) {
  return (
    <div>
      <img src={href} alt={title} />
      <div>{title}</div>
    </div>
  );
}