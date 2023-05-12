import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import TextInput from '@/components/TextInput';
import {OnBoardingContentProps} from "@/pages/onboarding/types";
import {GradientButton} from "@/components";

const BirthPlace = ({onStepForward}: OnBoardingContentProps) => {
  const {t} = useTranslation();
  const [birthPlace, setBirthPlace] = useState('');

  return (
    <>
      <h1 >{t('onboarding.questionnaire.birth_place.title')}</h1>
      <div className="onboarding-content__description">
        <p>{t('onboarding.questionnaire.birth_place.description')}</p>
      </div>
      <TextInput value={birthPlace} onChange={e => setBirthPlace(e.target.value)} placeholder={t('onboarding.questionnaire.birth_place.input_placeholder') || ''}/>
      <GradientButton onClick={onStepForward}>
        {t('common.next')}
      </GradientButton>
    </>
  );
};

export default BirthPlace;
