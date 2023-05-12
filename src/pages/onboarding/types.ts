import React from 'react';

export type Stage = 'intro' | 'questionnaire';
export interface OnBoardingContentProps {
  goForward: () => void;
}

export interface UserDataI {
  gender: string;
  name: string;
  birthDate: {
    year: number;
    monthIndex: number;
    day: number;
  } | null;
  birthTime: {
    hour: number;
    minute: number;
    period: string;
  } | null;
  lat: number;
  lon: number;
  email: string;
}
export type  ChangeUserDataFn = (fieldName: keyof UserDataI, value: string | number | {[key: string]: number | string}) => void
export interface UserDataContextI {
  userData: UserDataI;
  changeUserData: ChangeUserDataFn;
}
