import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  children?: React.ReactNode;
}

const GradientButton: React.FC<ButtonProps> = ({text, onClick, ...rest}) => {
  return (
    <button onClick={onClick} {...rest} className="gradient-button">
      {text}
    </button>
  );
};

export default GradientButton
