import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

const TextInput: React.FC<InputProps> = ({value, onChange, placeholder}) => {
  return <input className="text-input" placeholder={placeholder} value={value} onChange={onChange} />;
};

export default TextInput;
