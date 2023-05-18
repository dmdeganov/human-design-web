import React, {useState} from 'react';
import {OnBoardingLayout} from './components';
import {UserDataContextI, Stage, UserDataI, ChangeUserDataFn} from '@/types/@onboarding';

// const userDataInitialState = {
//   gender: '',
//   name: '',
//   birthDate: null,
//   birthTime: null,
//   birthPlace: {
//     lat: 0,
//     lon: 0,
//     name: '',
//   },
//   email: '',
// };
const userDataInitialState = {
  gender: '',
  name: 'james',
  birthDate: {
    year: 1981,
    monthIndex: 1,
    day: 14,
  },
  birthTime: {
    hour: 11,
    minute: 30,
    period: 'AM' as const,
  },
  birthPlace: {
    lat: 55.755826,
    lon: 37.6173,
    name: 'Москва, Россия',
  },
  email: 'adsfasdf@dsfsdf',
};

export const UserDataContext = React.createContext<UserDataContextI>({} as UserDataContextI);

const OnBoarding = () => {
  const [stage, setStage] = useState<Stage>('questionnaire');
  const [step, setStep] = useState<number>(5);
  const [userData, setUserData] = useState<UserDataI>(userDataInitialState);
  const changeUserData: ChangeUserDataFn = (fieldName, value) => setUserData(user => ({...user, [fieldName]: value}));

  return (
    <UserDataContext.Provider value={{userData, changeUserData}}>
      <OnBoardingLayout step={step} setStep={setStep} stage={stage} setStage={setStage} />
    </UserDataContext.Provider>
  );
};

export default OnBoarding;
