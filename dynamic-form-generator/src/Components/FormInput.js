import { useState } from "react";
import "./formInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const [gender, setGender] = useState([]);
  const { label, errorMessage, onChange, id, type, options } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      {type === "select" ? (
        <select
          name={id}
          value={props.value}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "checkbox" ? (
        <div className="checkbox-options">
          {options.map((option) => (
            <label key={option.value}>
              <input
                type="checkbox"
                name={id}
                value={option.value}
                checked={gender.includes(option.value)}
                onChange={() => {
                  onChange({
                    target: {
                      name: id,
                      value: option.value,
                    },
                  });
                  setGender([option.value]);
                }}
              />
              {option.label}
            </label>
          ))}
        </div>
      ) : (
        <input
          {...props}
          onChange={onChange}
          onBlur={handleFocus}
          onFocus={() => props.name === "confirmPassword" && setFocused(true)}
          focused={focused.toString()}
        />
      )}
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;