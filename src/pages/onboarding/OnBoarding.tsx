import React, {useState} from 'react';
import {OnBoardingLayout} from './components';
import {OnBoardingContextI, Stage, UserDataI} from '@/pages/onboarding/types';

const userDataInitialState = {
  gender: '',
  name: '',
  birthDate: '',
  birthTime: '',
  lat: 0,
  lon: 0,
  email: '',
};
export const OnBoardingContext = React.createContext<OnBoardingContextI | null>(null);

const OnBoarding = () => {
  const [stage, setStage] = useState<Stage>('intro');
  const [step, setStep] = useState<number>(0);
  const [userData, setUserData] = useState<UserDataI>(userDataInitialState);

  return (
    <OnBoardingContext.Provider value={{userData, setUserData}}>
      <OnBoardingLayout step={step} setStep={setStep} stage={stage} setStage={setStage} />
    </OnBoardingContext.Provider>
  );
};

export default OnBoarding;
