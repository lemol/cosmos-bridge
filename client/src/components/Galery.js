import Image from "./Image";

export default function Galery({ images }) {
  return (
    <div>
      {images.map((image) => (
        <Image key={image.href} href={image.href} title={image.title} />
      ))}
    </div>
  );
}
