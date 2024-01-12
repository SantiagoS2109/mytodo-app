import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Button({ children, to, style }) {
  Button.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    style: PropTypes.string,
  };

  if (to)
    return (
      <Link className={style} to={to}>
        {children}
      </Link>
    );

  return <button className={style}>{children}</button>;
}

export default Button;
