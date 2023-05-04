import React from 'react';
import BlackGradientTile from '@/components/BlackGradientTile';
import {GenderIcon} from '@/assets/svg';
import {useTranslation} from 'react-i18next';

const WhatIsHumanDesign = () => {
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
        <div className="gender-icon">

          {t('onboarding.intro.gender.male')}
        </div>
        <div className="gender-icon">
          {t('onboarding.intro.gender.female')}

        </div>
        <div className="gender-icon">
          {t('onboarding.intro.gender.non_binary')}

        </div>
      </div>
    </>
  );
};

export default WhatIsHumanDesign;
