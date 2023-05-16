import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

const TextInput: React.FC<InputProps> = ({value, onChange, placeholder, ...rest}) => {
  return (
    <input className="text-input" type="text" placeholder={placeholder} value={value} onChange={onChange} {...rest} />
  );
};

export default TextInput;
