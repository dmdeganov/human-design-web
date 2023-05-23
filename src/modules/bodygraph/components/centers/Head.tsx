import React, {useContext} from 'react';
import {renderGates} from './renderGates';
import {BodyGraphContext} from '../../BodyGraph';
import {centerColors, inactiveCenterColor} from '@/modules/bodygraph/static/colors';

const gates = [[64, 61, 63]];
const centerId = 1;

const Head = () => {
  const {centers} = useContext(BodyGraphContext);
  const backgroundColor = centers[centerId].isActive ? centerColors[centerId] : inactiveCenterColor;

  return (
    <div className="triangle triangle--up head" style={{backgroundColor}}>
      <p className="label">head</p>
      {renderGates(gates, [])}
    </div>
  );
};

export default Head;
