import { useState } from "react";

export function useFormData(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  // For handling text/number inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // For handling file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setValues((prev) => ({ ...prev, [name]: files.length > 1 ? files : files[0] }));
  };

  // Convert to FormData object
  const getFormData = () => {
    const formData = new FormData();
    for (const key in values) {
      if (Array.isArray(values[key])) {
        values[key].forEach((file) => formData.append(`${key}[]`, file));
      } else {
        formData.append(key, values[key]);
      }
    }
    return formData;
  };

  // Reset form
  const reset = () => setValues(initialValues);

  return {
    values,
    handleChange,
    handleFileChange,
    getFormData,
    reset,
    setValues, // expose in case you need manual set
  };
}
