import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const GradientButton: React.FC<ButtonProps> = ({children, onClick, ...rest}) => {
  return (
    <button onClick={onClick} {...rest} className="gradient-button">
      {children}
    </button>
  );
};

export default GradientButton
