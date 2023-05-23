import React, {useContext} from 'react';
import {renderGates} from './renderGates';
import {BodyGraphContext} from '../../BodyGraph';
import {centerColors, inactiveCenterColor} from '@/modules/bodygraph/static/colors';

const gates = [
  [53, 60, 52],
  [54, 19],
  [38, 39],
  [58, 41],
];
const centerId = 6;

const Root = () => {
  const {centers} = useContext(BodyGraphContext);
  const backgroundColor = centers[centerId].isActive ? centerColors[centerId] : inactiveCenterColor;

  return (
    <div className="square root" style={{backgroundColor}}>
      <p className="label">Root</p>
      {renderGates(gates, [])}
    </div>
  );
};

export default Root;
