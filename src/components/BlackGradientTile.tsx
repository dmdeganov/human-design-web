import React from 'react';

interface Props {
  children?: React.ReactNode;
}

const BlackGradientTile: React.FC<Props> = ({children}) => {
  return <div className="black-gradient-icon">{children}</div>;
};

export default BlackGradientTile;
