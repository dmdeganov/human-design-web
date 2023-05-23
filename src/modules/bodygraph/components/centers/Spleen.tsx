import React, {useContext} from 'react';
import {renderGates} from './renderGates';
import {BodyGraphContext} from '../../BodyGraph';
import {centerColors, inactiveCenterColor} from '@/modules/bodygraph/static/colors';

const gates = [[48, 18], [57, 28], [44, 32], [50]];
const centerId = 8;

const Spleen = () => {
  const {centers} = useContext(BodyGraphContext);
  const backgroundColor = centers[centerId].isActive ? centerColors[centerId] : inactiveCenterColor;

  return (
    <div className="triangle-big triangle-big--right spleen" style={{backgroundColor}}>
      <p className="label">Spleen</p>
      {renderGates(gates, [], 'column')}
    </div>
  );
};

export default Spleen;
