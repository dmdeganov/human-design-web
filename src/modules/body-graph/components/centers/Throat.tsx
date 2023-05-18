import React, {useContext} from 'react';
import {renderGates} from './renderGates';
import {ActiveGatesContext} from "../../BodyGraph";

const gates = [[62, 23, 56], [16, 35], [12], [20, 45], [31, 8, 33]];

const Throat = () => {
  const activeGates = useContext(ActiveGatesContext);

  return <div className="square throat">
    <p className="label">Throat</p>
    {renderGates(gates, activeGates)}</div>;
};

export default Throat;
