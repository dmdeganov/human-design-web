import React from 'react';
import BlackGradientTile from '@/components/BlackGradientTile';
import {ReactComponent as BodygraphIcon} from '@/assets/svg/bodygraph.svg';
import {useTranslation} from 'react-i18next';

const WhatIsHumanDesign = () => {
  const {t} = useTranslation();

  return (
    <>
      <BlackGradientTile>
        <BodygraphIcon />
      </BlackGradientTile>
      <h1>{t('onboarding.intro.rave_card.title')}</h1>
      <div className="onboarding-content__description">
        <p>{t('onboarding.intro.rave_card.description_first_line')}</p>
        <p>{t('onboarding.intro.rave_card.description_second_line')}</p>
        <p>{t('onboarding.intro.rave_card.description_third_line')}</p>
      </div>
    </>
  );
};

export default WhatIsHumanDesign;
