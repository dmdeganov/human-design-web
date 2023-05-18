import React from 'react';
import BlackGradientTile from '@/components/BlackGradientTile';
import {useTranslation} from 'react-i18next';
import {HumanDesignIcon} from '@/assets/svg';
import {GradientButton} from '@/components';
import {OnBoardingContentProps} from "@/types/@onboarding";


const WhatIsHumanDesign = ({goForward}: OnBoardingContentProps) => {
  const {t} = useTranslation();

  return (
    <>
      <BlackGradientTile>
        <HumanDesignIcon />
      </BlackGradientTile>
      <h1>{t('onboarding.intro.human_design.title')}</h1>
      <div className="onboarding-content__description">
        <p>{t('onboarding.intro.human_design.description_first_line')}</p>
        <p>{t('onboarding.intro.human_design.description_second_line')}</p>
        <p>{t('onboarding.intro.human_design.description_third_line')}</p>
      </div>
      <GradientButton onClick={goForward}>
        {t('common.next')}
      </GradientButton>
    </>
  );
};

export default WhatIsHumanDesign;
