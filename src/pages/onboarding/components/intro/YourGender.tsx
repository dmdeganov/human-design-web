import React, {useContext, useState} from 'react';
import BlackGradientTile from '@/components/BlackGradientTile';
import {GenderIcon, FemaleIcon, MaleIcon, NonBinaryIcon} from '@/assets/svg';
import {useTranslation} from 'react-i18next';
import {OnBoardingContentProps} from '@/types/@onboarding';
import {GradientButton} from '@/components';
import {UserDataContext} from '@/pages/onboarding/OnBoarding';

const WhatIsHumanDesign = ({goForward}: OnBoardingContentProps) => {
  const {
    userData: {gender},
    changeUserData,
  } = useContext(UserDataContext);
  const onGenderSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    changeUserData('gender', e.currentTarget.name);
  };
  const {t} = useTranslation();

  return (
    <>
      <BlackGradientTile>
        <GenderIcon />
      </BlackGradientTile>
      <h1>{t('onboarding.intro.gender.title')}</h1>
      <div className="onboarding-content__description">
        <p>{t('onboarding.intro.gender.description')}</p>
      </div>
      <div className="onboarding-content__gender-icons gender-icons">
        <button
          className={`gender-icon${gender === 'male' ? ' gender-icon--active' : ''}`}
          name="male"
          onClick={onGenderSelect}
        >
          <MaleIcon />
          {t('onboarding.intro.gender.male')}
        </button>
        <button
          className={`gender-icon${gender === 'female' ? ' gender-icon--active' : ''}`}
          name="female"
          onClick={onGenderSelect}
        >
          <FemaleIcon />
          {t('onboarding.intro.gender.female')}
        </button>
        <button
          className={`gender-icon${gender === 'non-binary' ? ' gender-icon--active' : ''}`}
          name="non-binary"
          onClick={onGenderSelect}
        >
          <NonBinaryIcon />
          {t('onboarding.intro.gender.non_binary')}
        </button>
      </div>
      <GradientButton onClick={goForward} disabled={!gender}>
        {t('common.next')}
      </GradientButton>
    </>
  );
};

export default WhatIsHumanDesign;
