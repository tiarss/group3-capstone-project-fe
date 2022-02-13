import React from "react";
import { inputProps } from "../../types";

export const InputText = ({label, type, placeholder, onChange}: inputProps) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export const InputTextArea = () => {
  return <div>index</div>;
};

export const InputSelect = () => {
  return <div>index</div>;
};
