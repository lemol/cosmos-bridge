import Image from "./Image";
import "./Galery.css";

export default function Galery({ loading, images }) {
  return (
    <div className="galery">
      {loading && <div>Loading...</div>}
      {images.map((image) => (
        <div key={image.href}>
          <Image href={image.href} title={image.title} />
        </div>
      ))}
    </div>
  );
}
