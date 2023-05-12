import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import TextInput from '@/components/TextInput';
import {OnBoardingContentProps} from "@/pages/onboarding/types";
import {GradientButton} from "@/components";

const Email = ({goForward}: OnBoardingContentProps) => {
  const {t} = useTranslation();
  const [email, setEmail] = useState('');

  return (
    <>
      <h1 >{t('onboarding.questionnaire.email.title')}</h1>
      <div className="onboarding-content__description">
        <p>{t('onboarding.questionnaire.email.description')}</p>
      </div>
      <TextInput value={email} onChange={e => setEmail(e.target.value)} placeholder={t('onboarding.questionnaire.email.input_placeholder') || ''}/>
      <GradientButton onClick={goForward}>
        {t('common.next')}
      </GradientButton>
    </>
  );
};

export default Email;
