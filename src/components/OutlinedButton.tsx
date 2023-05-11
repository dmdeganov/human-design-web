import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string
}

const OutlinedButton: React.FC<ButtonProps> = ({children, onClick, className, ...rest}) => {
  console.log({rest})
  return (
    <button onClick={onClick} {...rest} className={`outlined-button ${className ? className : ''}`}>
      {children}
    </button>
  );
};

export default OutlinedButton
