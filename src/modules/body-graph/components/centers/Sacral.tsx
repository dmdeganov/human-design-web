import React, {useContext} from 'react';
import {renderGates} from './renderGates';
import {ActiveGatesContext} from '../../BodyGraph';

const gates = [[5, 14, 29], [34], [27, 59], [42, 3, 9]];

const Sacral = () => {
  const activeGates = useContext(ActiveGatesContext);

  return (
    <div className="square sacral">
      <p className="label">Sacral</p>
      {renderGates(gates, activeGates)}
    </div>
  );
};

export default Sacral;
