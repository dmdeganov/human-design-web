import React from 'react';
import Name from './Name';
import BirthDate from './BirthDate';
import BirthTime from './BirthTime';
import BirthPlace from './BirthPlace';
import Email from './Email';
import {OnBoardingContentProps} from '@/pages/onboarding/types';

type StepsMap = {
  [num: number]: ({onStepForward}: OnBoardingContentProps) => JSX.Element;
};

export const questionnaireSteps: StepsMap = {
  0: Name,
  1: BirthDate,
  2: BirthTime,
  3: BirthPlace,
  4: Email,
};
