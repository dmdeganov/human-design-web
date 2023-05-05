import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {OnBoardingLayout, introSteps, questionnaireSteps} from './components';
import {Stage} from "@/pages/onboarding/types";


type step = number;

const OnBoarding = () => {
  const {t} = useTranslation();

  const stages = {
    intro: introSteps,
    questionnaire: questionnaireSteps,
  };

  const [stage, setStage] = useState<Stage>('questionnaire');
  const [step, setStep] = useState<step>(1);
  const goForward = ()=> setStep(step + 1)
  const goBack = ()=> setStep(step - 1)
  const stepsAmount = Object.keys(stages[stage]).length;
  const Content = step in stages[stage] ? stages[stage][step] : null;

  return (
    <OnBoardingLayout stepsAmount={stepsAmount} currentStep={step} goForward={goForward} goBack={goBack} stage={stage} setStage={setStage}>
      {Content && <Content />}
    </OnBoardingLayout>
  );
};

export default OnBoarding;
