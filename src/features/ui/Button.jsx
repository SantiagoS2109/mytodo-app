import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Button({ children, to, className, onClick, type = "normal" }) {
  Button.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.oneOf(["normal", "rounded"]),
  };

  const baseClasses =
    "outline-none ring-offset-2 transition-all duration-300 focus:ring-2 focus:ring-primary focus:ring-opacity-50";

  if (to)
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );

  if (type === "normal")
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${className} rounded-md`}
      >
        {children}
      </button>
    );

  if (type === "rounded")
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${className} rounded-full`}
      >
        {children}
      </button>
    );
}

export default Button;
