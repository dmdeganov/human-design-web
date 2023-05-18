import React, {useContext} from 'react';
import {renderGates} from './renderGates';
import {ActiveGatesContext} from '../../BodyGraph';

const gates = [[48, 18], [57, 28], [44, 32], [50]];

const Spleen = () => {
  const activeGates = useContext(ActiveGatesContext);

  return (
    <div className="triangle-big triangle-big--right spleen">
      <p className="label">Spleen</p>
      {renderGates(gates, activeGates, 'column')}
    </div>
  );
};

export default Spleen;
