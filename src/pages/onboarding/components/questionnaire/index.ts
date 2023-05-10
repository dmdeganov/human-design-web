import React from 'react';
import Name from './Name';
import BirthDate from './BirthDate';

type StepsMap = {
  [num : number] : React.FC
}
export const questionnaireSteps : StepsMap = {
  0: Name,
  1: BirthDate,
};
