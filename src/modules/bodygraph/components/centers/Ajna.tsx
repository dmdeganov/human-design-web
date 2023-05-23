import React, {useContext} from 'react';
import {renderGates} from './renderGates';
import {BodyGraphContext} from '../../BodyGraph';
import {centerColors, inactiveCenterColor} from '@/modules/bodygraph/static/colors';

const gates = [[47, 24, 4], [17, 11], [43]];
const centerId = 2;

const Ajna = () => {
  const {centers} = useContext(BodyGraphContext);
  const backgroundColor = centers[centerId].isActive ? centerColors[centerId] : inactiveCenterColor;

  return (
    <div className="triangle triangle--down ajna" style={{backgroundColor}}>
      <p className="label">ajna</p>
      {renderGates(gates, [])}
    </div>
  );
};

export default Ajna;
