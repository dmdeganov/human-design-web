import React from 'react';
import BlackGradientTile from '@/components/BlackGradientTile';
import {useTranslation} from 'react-i18next';
import {HumanDesignIcon} from '@/assets/svg';
import {GradientButton} from '@/components';
import {OnBoardingContentProps} from "@/pages/onboarding/types";


const WhatIsHumanDesign = ({onStepForward}: OnBoardingContentProps) => {
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
      <GradientButton onClick={onStepForward}>
        {t('common.next')}
      </GradientButton>
    </>
  );
};

export default WhatIsHumanDesign;
