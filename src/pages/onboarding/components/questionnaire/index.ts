import React from 'react';
import Name from './Name';
import BirthDate from './BirthDate';
import BirthTime from './BirthTime';
import BirthPlace from "./BirthPlace";
import Email from "./Email";

type StepsMap = {
  [num: number]: React.FC;
};
export const questionnaireSteps: StepsMap = {
  0: Name,
  1: BirthDate,
  2: BirthTime,
  3: BirthPlace,
  4: Email,
};
