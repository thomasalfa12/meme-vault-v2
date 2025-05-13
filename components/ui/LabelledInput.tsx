import React from "react";

export interface LabelledInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  maxLength?: number;
  min?: string;
}

export const LabelledInput: React.FC<LabelledInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  maxLength,
  min,
}) => (
  <div className="mb-4">
    <label className="block text-white mb-2">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      min={min}
      className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-600"
    />
  </div>
);
