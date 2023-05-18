import React, {useContext} from 'react';
import {renderGates} from './renderGates';
import {ActiveGatesContext} from '../../BodyGraph';

const gates = [[1], [7, 13], [10, 25], [15, 46], [2]];

const GCenter = () => {
  const activeGates = useContext(ActiveGatesContext);

  return (
    <div className="rhombus g-center">
      <p className="label">G</p>
      {renderGates(gates, activeGates)}
    </div>
  );
};

export default GCenter;
