import React, {useContext} from 'react';
import {renderGates} from './renderGates';
import {BodyGraphContext} from '../../BodyGraph';
import {centerColors, inactiveCenterColor} from '@/modules/bodygraph/static/colors';

const gates = [[62, 23, 56], [16, 35], [12], [20, 45], [31, 8, 33]];
const centerId = 3;

const Throat = () => {
  const {centers} = useContext(BodyGraphContext);
  const backgroundColor = centers[centerId].isActive ? centerColors[centerId] : inactiveCenterColor;

  return (
    <div className="square throat" style={{backgroundColor}}>
      <p className="label">Throat</p>
      {renderGates(gates, [])}
    </div>
  );
};

export default Throat;
