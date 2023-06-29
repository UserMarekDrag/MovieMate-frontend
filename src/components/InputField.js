import React from 'react';

function InputField({ type, value, onChange, placeholder, error }) {
  return (
    <div className="input-field">
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} required />
      <p className={error ? "field-error field-error-visible" : "field-error"}>{error ? error : " "}</p>
    </div>
  );
}

export default InputField;
