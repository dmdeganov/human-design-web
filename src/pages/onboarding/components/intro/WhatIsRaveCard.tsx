import React from 'react';
import BlackGradientTile from '@/components/BlackGradientTile';
import {useTranslation} from 'react-i18next';
import {BodyGraphIcon} from "@/assets/svg";
import {OnBoardingContentProps} from "@/types/@onboarding";
import {GradientButton} from "@/components";

const WhatIsHumanDesign = ({goForward}: OnBoardingContentProps) => {
  const {t} = useTranslation();

  return (
    <>
      <BlackGradientTile>
        <BodyGraphIcon />
      </BlackGradientTile>
      <h1>{t('onboarding.intro.rave_card.title')}</h1>
      <div className="onboarding-content__description">
        <p>{t('onboarding.intro.rave_card.description_first_line')}</p>
        <p>{t('onboarding.intro.rave_card.description_second_line')}</p>
        <p>{t('onboarding.intro.rave_card.description_third_line')}</p>
      </div>
      <GradientButton onClick={goForward}>
        {t('common.next')}
      </GradientButton>
    </>
  );
};

export default WhatIsHumanDesign;
