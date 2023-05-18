import React, {useContext} from 'react';
import {renderGates} from './renderGates';
import {ActiveGatesContext} from '../../BodyGraph';

const gates = [[21, 51, 26], [40]];

const Heart = () => {
  const activeGates = useContext(ActiveGatesContext);

  return (
    <div className="heart">
      <p className="label">Heart</p>
      {renderGates(gates, activeGates, 'column')}
    </div>
  );
};

export default Heart;
