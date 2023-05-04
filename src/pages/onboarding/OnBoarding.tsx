import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {OnBoardingLayout, introSteps, questionnaireSteps} from './components';

type stage = 'intro' | 'questionnaire';
type step = number;

const OnBoarding = () => {
  const {t} = useTranslation();

  const stages = {
    intro: introSteps,
    questionnaire: questionnaireSteps,
  };

  const [stage, setStage] = useState<stage>('intro');
  const [step, setStep] = useState<step>(0);
  const goForward = ()=> setStep(step + 1)
  const goBack = ()=> setStep(step - 1)

  const stepsAmount = Object.keys(stages[stage]).length;

  const Content = step in stages[stage] ? stages[stage][step] : null;

  return (
    <OnBoardingLayout stepsAmount={stepsAmount} activeStep={step} goForward={goForward} goBack={goBack}>
      {Content && <Content />}
    </OnBoardingLayout>
  );
};

export default OnBoarding;
