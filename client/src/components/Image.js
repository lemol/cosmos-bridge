import PropTypes from "prop-types";

// TODO: optimize this component
//       what if there is an error loading an image?
// .     we also may want to have a fallback image for when the image is loading.
const Image = ({ href, title }) => {
  return (
    <div className="image">
      <img src={href} alt={title} height="180" />
      <div className="title">{title}</div>
    </div>
  );
};

Image.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Image;
