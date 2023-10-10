import React, { useState, useEffect } from "react";
import "./app.css";
import FormInput from "./Components/FormInput";

const App = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    age: "",
    gender: [],
    password: "",
    confirmPassword: "",
  });

  const [savedConfig, setSavedConfig] = useState(null);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "age",
      type: "number",
      placeholder: "Age",
      label: "Age",
      min: 0,
      max: 110,
      required: true,
    },
    {
    id: 5,
    name: "gender",
    label: "Gender",
    type: "checkbox",
    required: true,
      options: [
        {
        label: "Male",
        value: "male"
        },
        {
        label: "Female",
        value: "female"
        },
        {
        label: "Other",
        value: "other"
        },
      ],
    },
    {
      id: 6,
      name: "country",
      type: "select", 
      label: "Country",
      required: true,
      options: [
        {
        label: "Select a country",
        value: "",
        },
        {
        label: "India",
        value: "India",
        },
        {
        label: "United States",
        value: "USA",
        },
        {
        label: "Canada",
        value: "Canada",
        },
        {
        label: "United Kingdom",
        value: "UK",
        },
        // More countries can be added 
      ],
    },
    {
      id: 7,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 8,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  useEffect(() => {
    const savedConfigData = localStorage.getItem("savedConfig");
    if (savedConfigData) {
      setSavedConfig(JSON.parse(savedConfigData));
    }
  }, []);

  const handleSaveConfig = () => {
    localStorage.setItem("savedConfig", JSON.stringify(inputs));
    setSavedConfig(inputs);
    console.log("Saved configuration");
  };

   const handleLoadConfig = () => {
    if (savedConfig) {
      const loadedValues = {};
      savedConfig.forEach((input) => {
        loadedValues[input.name] = values[input.name];
      });
      setValues(loadedValues);
      console.log("Loaded configuration");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };

  const onChange = (e) => {
    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        setValues({
          ...values,
          gender: [...values.gender, e.target.value],
        });
      } else {
        setValues({
          ...values,
          gender: values.gender.filter((gender) => gender !== e.target.value),
        });
      }
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button type="submit">Submit</button>
        <button type="button" onClick={handleSaveConfig}>
          Save Configuration
        </button>
        <button type="button" onClick={handleLoadConfig}>
          Load Configuration
        </button>
      </form>
    </div>
  );
};

export default App;