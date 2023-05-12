import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import TextInput from '@/components/TextInput';
import {OnBoardingContentProps} from "@/pages/onboarding/types";
import {GradientButton} from "@/components";

const Name = ({onStepForward}: OnBoardingContentProps) => {
  const {t} = useTranslation();
  const [name, setName] = useState('');

  return (
    <>
      <h1 >{t('onboarding.questionnaire.name.title')}</h1>
      <div className="onboarding-content__description">
        <p>{t('onboarding.questionnaire.name.description')}</p>
      </div>
      <TextInput value={name} onChange={e => setName(e.target.value)} placeholder={t('onboarding.questionnaire.name.name') || ''}/>
      <GradientButton onClick={onStepForward}>
        {t('common.next')}
      </GradientButton>
    </>
  );
};

export default Name;
