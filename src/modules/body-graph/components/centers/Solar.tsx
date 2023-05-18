import React, {useContext} from 'react';
import {renderGates} from './renderGates';
import {ActiveGatesContext} from '../../BodyGraph';

const gates = [[6], [49, 37], [55, 22], [30, 36]];

const Spleen = () => {
  const activeGates = useContext(ActiveGatesContext);

  return (
    <div className="triangle-big triangle-big--left solar">
      <p className="label">Solar</p>
      {renderGates(gates, activeGates, 'column')}
    </div>
  );
};

export default Spleen;
