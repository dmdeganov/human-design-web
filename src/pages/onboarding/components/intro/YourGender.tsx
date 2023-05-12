import React, {useContext} from 'react';
import BlackGradientTile from '@/components/BlackGradientTile';
import {GenderIcon, FemaleIcon, MaleIcon, NonBinaryIcon} from '@/assets/svg';
import {useTranslation} from 'react-i18next';
import {OnBoardingContentProps} from "@/pages/onboarding/types";
import {GradientButton} from "@/components";


const WhatIsHumanDesign = ({onStepForward}: OnBoardingContentProps) => {
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
        <button className="gender-icon">
          <MaleIcon/>
          {t('onboarding.intro.gender.male')}
        </button>
        <button className="gender-icon">
          <FemaleIcon/>
          {t('onboarding.intro.gender.female')}
        </button>
        <button className="gender-icon">
          <NonBinaryIcon/>
          {t('onboarding.intro.gender.non_binary')}
        </button>
      </div>
      <GradientButton onClick={onStepForward}>
        {t('common.next')}
      </GradientButton>
    </>
  );
};

export default WhatIsHumanDesign;
