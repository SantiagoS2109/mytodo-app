import PropTypes from "prop-types";

function Input({ placeholder, value, setValue, style, isDisabled, type }) {
  Input.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    setValue: PropTypes.func,
    style: PropTypes.string,
    isDisabled: PropTypes.bool,
    type: PropTypes.string,
  };

  const styleBase =
    "h-12 w-full rounded-md bg-grey px-4 py-2 shadow-inner outline-none ring-offset-2 transition-all duration-300 focus:ring-2 focus:ring-primary focus:ring-opacity-50";

  if (type === "textarea")
    return (
      <textarea
        type="textarea"
        placeholder={placeholder}
        value={value}
        disabled={isDisabled}
        onChange={(e) => setValue(e.target.value)}
        className={`${style} ${styleBase}`}
      />
    );

  if (type === "date")
    return (
      <input
        type="date"
        placeholder={placeholder}
        value={value}
        disabled={isDisabled}
        onChange={(e) => setValue(e.target.value)}
        className={`${style} ${styleBase}`}
      />
    );

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      disabled={isDisabled}
      onChange={(e) => setValue(e.target.value)}
      className={`${style} ${styleBase}`}
    />
  );
}

export default Input;
