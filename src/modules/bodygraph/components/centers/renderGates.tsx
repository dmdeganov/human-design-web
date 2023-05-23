import React from 'react';

export const renderGates = (gates: number[][], activeGates: number[], flexDirection = 'row') =>
  gates.map(gatesGroup => (
    <div key={gatesGroup.join('')} className={`${flexDirection === 'row' ? 'gates-row' : 'gates-column'}`}>
      {gatesGroup.map(gate => (
        <span key={gate} id={`gate${gate}`} className={activeGates.includes(gate) ? 'gate-active' : ''}>
          {gate}
        </span>
      ))}
    </div>
  ));
