// src/components/FormField.js
import React from 'react';

const FormField = ({ field, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...field, [name]: value });
  };

  const handleOptionsChange = (e, index) => {
    const newOptions = [...field.options];
    newOptions[index] = e.target.value;
    onChange({ ...field, options: newOptions });
  };

  return (
    <div>
      <label>Label:</label>
      <input
        type="text"
        name="label"
        value={field.label}
        onChange={handleChange}
      />
      <label>Type:</label>
      <select name="type" value={field.type} onChange={handleChange}>
        <option value="text">Text</option>
        <option value="radio">Radio</option>
        <option value="checkbox">Checkbox</option>
      </select>
      {field.type !== 'text' && (
        <div>
          <label>Options:</label>
          {field.options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionsChange(e, index)}
              />
            </div>
          ))}
          <button onClick={() => onChange({ ...field, options: [...field.options, ''] })}>Add Option</button>
        </div>
      )}
    </div>
  );
};

export default FormField;
