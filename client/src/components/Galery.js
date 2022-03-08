import Image from "./Image";
import "./Galery.css";

export default function Galery({ images }) {
  return (
    <div className="galery">
      {images.map((image) => (
        <div key={image.href}>
          <Image href={image.href} title={image.title} />
        </div>
      ))}
    </div>
  );
}
