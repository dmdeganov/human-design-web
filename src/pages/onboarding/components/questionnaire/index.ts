import React from 'react';
import Name from './Name';
import BirthDate from './BirthDate';
import BirthTime from './BirthTime';
import BirthPlace from './BirthPlace';
import Email from './Email';
import {OnBoardingContentProps} from '@/types/@onboarding';
import BodyGraphStep from "@/pages/onboarding/components/questionnaire/BodyGraphStep";

type StepsMap = {
  [num: number]: ({goForward}: OnBoardingContentProps) => JSX.Element;
};

export const questionnaireSteps: StepsMap = {
  0: Name,
  1: BirthDate,
  2: BirthTime,
  3: BirthPlace,
  4: Email,
  5: BodyGraphStep
};
