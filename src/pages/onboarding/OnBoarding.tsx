import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {OnBoardingLayout, introSteps, questionnaireSteps} from './components';
import {Stage} from '@/pages/onboarding/types';

const stages = {
  intro: introSteps,
  questionnaire: questionnaireSteps,
};

const OnBoarding = () => {
  const [stage, setStage] = useState<Stage>('intro');
  const [step, setStep] = useState<number>(0);
  const stepsAmount = Object.keys(stages[stage]).length;
  const Content = step in stages[stage] ? stages[stage][step] : null;

  const {t} = useTranslation();

  return (
    <OnBoardingLayout
      stepsAmount={stepsAmount}
      step={step}
      setStep={setStep}
      stage={stage}
      setStage={setStage}
    >
      {Content && <Content />}
    </OnBoardingLayout>
  );
};

export default OnBoarding;
