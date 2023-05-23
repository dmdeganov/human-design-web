import React, {useContext} from 'react';
import {renderGates} from './renderGates';
import {BodyGraphContext} from '../../BodyGraph';
import {centerColors, inactiveCenterColor} from '@/modules/bodygraph/static/colors';

const gates = [[6], [37, 49], [22, 55], [36, 30]];
const centerId = 9;

const Spleen = () => {
  const {centers} = useContext(BodyGraphContext);
  const backgroundColor = centers[centerId].isActive ? centerColors[centerId] : inactiveCenterColor;

  return (
    <div className="triangle-big triangle-big--left solar" style={{backgroundColor}}>
      <p className="label">Solar</p>
      {renderGates(gates, [], 'column')}
    </div>
  );
};

export default Spleen;
