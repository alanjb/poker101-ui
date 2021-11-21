import React from "react";
import { ErrorMessage, Field } from "formik";
// @ts-ignore
import TextField from "@material-ui/core/TextField";

import "./FormikField.scss";

interface FormikFieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

const FormikField: React.FC<FormikFieldProps> = ({ name, label, type = "text", required = false, placeholder= ''}) => {
  return (
    <div className="FormikField">
      <Field
        required={required}
        autoComplete="off"
        as={TextField}
        label={label}
        name={name}
        fullWidth
        placeholder={placeholder}
        type={type}
        helperText={<ErrorMessage name={name} />}
      />
    </div>
  );
};

export default FormikField;