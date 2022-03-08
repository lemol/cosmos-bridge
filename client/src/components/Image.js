import PropTypes from "prop-types";

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
