import React, {useContext} from 'react';
import {renderGates} from './renderGates';
import {BodyGraphContext} from '../../BodyGraph';
import {centerColors, inactiveCenterColor} from '@/modules/bodygraph/static/colors';

const gates = [[21, 51, 26], [40]];
const centerId = 7;

const Heart = () => {
  const {centers} = useContext(BodyGraphContext);
  console.log({centers});
  const backgroundColor = centers[centerId].isActive ? centerColors[centerId] : inactiveCenterColor;

  return (
    <div className="heart" style={{backgroundColor}}>
      <p className="label">Heart</p>
      {renderGates(gates, [], 'column')}
    </div>
  );
};

export default Heart;
