// src/components/FormBuilder.js
import React, { useState } from 'react';
import FormField from './FormField';
import './FormBuilder.css'; // Import your custom styles here

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange = (index, field) => {
    const updatedFields = [...formFields];
    updatedFields[index] = field;
    setFormFields(updatedFields);
  };

  const addNewField = () => {
    setFormFields([...formFields, { label: '', type: 'text', value: '', options: [] }]);
  };

  const removeField = (index) => {
    const updatedFields = formFields.filter((_, i) => i !== index);
    setFormFields(updatedFields);
  };

  const handleSubmit = () => {
    // Handle form submission (e.g., save to backend or create Google Form)
    console.log('Form submitted:', formFields);
    setSubmitted(true);
  };

  const renderFormFields = () => {
    return formFields.map((field, index) => (
      <div key={index} className="form-field-container">
        <FormField
          field={field}
          onChange={(newField) => handleFieldChange(index, newField)}
        />
        <button onClick={() => removeField(index)}>Remove</button>
      </div>
    ));
  };

  const renderFormPreview = () => {
    return (
      <div className="form-preview">
        <h2>Form Preview</h2>
        <form>
          {formFields.map((field, index) => (
            <div key={index}>
              <label>{field.label}</label>
              {field.type === 'text' && (
                <input type="text" value={field.value} readOnly />
              )}
              {field.type === 'radio' && (
                <div>
                  {field.options.map((option, optionIndex) => (
                    <label key={optionIndex}>
                      <input
                        type="radio"
                        value={option}
                        checked={field.value === option}
                        readOnly
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
              {field.type === 'checkbox' && (
                <div>
                  {field.options.map((option, optionIndex) => (
                    <label key={optionIndex}>
                      <input
                        type="checkbox"
                        value={option}
                        checked={field.value.includes(option)}
                        readOnly
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </form>
      </div>
    );
  };

  return (
    <div className="form-builder">
      <h1>Custom Form Builder</h1>
      {submitted ? (
        renderFormPreview()
      ) : (
        <>
          {renderFormFields()}
          <button onClick={addNewField}>Add Field</button>
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
    </div>
  );
};

export default FormBuilder;
