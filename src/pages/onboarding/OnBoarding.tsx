import React, {useState} from 'react';
import {OnBoardingLayout} from './components';
import {UserDataContextI, Stage, UserDataI, ChangeUserDataFn} from '@/pages/onboarding/types';

const userDataInitialState = {
  gender: '',
  name: '',
  birthDate: null,
  birthTime: null,
  lat: 0,
  lon: 0,
  email: '',
};
export const UserDataContext = React.createContext<UserDataContextI>({
  userData: userDataInitialState,
  changeUserData: (fieldName, value) => {},
});

type Field = keyof UserDataI;

const OnBoarding = () => {
  const [stage, setStage] = useState<Stage>('questionnaire');
  const [step, setStep] = useState<number>(1);
  const [userData, setUserData] = useState<UserDataI>(userDataInitialState);
  const changeUserData: ChangeUserDataFn = (fieldName, value) => setUserData(user => ({...user, [fieldName]: value}));

  return (
    <UserDataContext.Provider value={{userData, changeUserData}}>
      <OnBoardingLayout step={step} setStep={setStep} stage={stage} setStage={setStage} />
    </UserDataContext.Provider>
  );
};

export default OnBoarding;
