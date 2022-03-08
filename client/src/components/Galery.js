import PropTypes from "prop-types";
import Image from "./Image";
import "./Galery.css";

const Galery = ({ loading, images }) => {
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
};

Galery.propTypes = {
  loading: PropTypes.bool.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Galery;
