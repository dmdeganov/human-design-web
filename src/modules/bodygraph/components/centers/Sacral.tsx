import React, {useContext} from 'react';
import {renderGates} from './renderGates';
import {BodyGraphContext} from '../../BodyGraph';
import {centerColors, inactiveCenterColor} from "@/modules/bodygraph/static/colors";

const gates = [[5, 14, 29], [34], [27, 59], [42, 3, 9]];
const centerId = 5;

const Sacral = () => {
  const {centers} = useContext(BodyGraphContext);
  const backgroundColor = centers[centerId].isActive ? centerColors[centerId] : inactiveCenterColor;

  return (
    <div className="square sacral" style={{backgroundColor}}>
      <p className="label">Sacral</p>
      {renderGates(gates, [])}
    </div>
  );
};

export default Sacral;
