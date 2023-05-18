import React from 'react';
import {shuffleArray} from '../utils/shuffleArray';
import {allGatesIds} from '../static/allPointsCoords';

type GenerateButtonProps = {
  setActiveGates: (gates: number[]) => void
}

const GenerateButton = ({setActiveGates}: GenerateButtonProps) => {
  const onGenerateRandomActiveGates = () => {
    setActiveGates([])

    let newActiveGatesAmount = 0;
    const activeGatesIds = shuffleArray(allGatesIds).filter(() => {
      if (newActiveGatesAmount >= 26) return;
      //"A Human Design Chart can have a maximum of 26 activations, which means potentially 26 activated Gates out of a total of 64 Gates". - Google
      if (Math.random() > 0.65) {
        newActiveGatesAmount++;
        return true;
      }
    });
    setActiveGates(activeGatesIds);
  };

  return (
    <button className="button-primary" onClick={onGenerateRandomActiveGates}>
      Generate
    </button>
  );
};

export default GenerateButton;
