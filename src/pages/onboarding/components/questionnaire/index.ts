import React from 'react';
import Name from './Name';
import Age from './Age';

type StepsMap = {
  [num : number] : React.FC
}
export const questionnaireSteps : StepsMap = {
  0: Name,
  1: Age,
};
