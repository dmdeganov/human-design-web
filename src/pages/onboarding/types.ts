import React from 'react';

export type Stage = 'intro' | 'questionnaire';
export interface OnBoardingContentProps {
  onStepForward: () => void;
}

export interface UserDataI {
  gender: string;
  name: string;
  birthDate: string;
  birthTime: string;
  lat: number;
  lon: number;
  email: string;
}
export interface OnBoardingContextI {
  userData: UserDataI;
  setUserData: React.Dispatch<React.SetStateAction<UserDataI>>;
}
