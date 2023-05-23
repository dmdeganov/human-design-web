import React, {useContext} from 'react';
import {renderGates} from './renderGates';
import {BodyGraphContext} from '../../BodyGraph';
import {centerColors, inactiveCenterColor} from "@/modules/bodygraph/static/colors";

const gates = [[1], [7, 13], [10, 25], [15, 46], [2]];
const centerId = 4;

const GCenter = () => {
  const {centers} = useContext(BodyGraphContext);
  const backgroundColor = centers[centerId].isActive ? centerColors[centerId] : inactiveCenterColor;

  return (
    <div className="rhombus g-center" style={{backgroundColor}}>
      <p className="label">G</p>
      {renderGates(gates, [])}
    </div>
  );
};

export default GCenter;
