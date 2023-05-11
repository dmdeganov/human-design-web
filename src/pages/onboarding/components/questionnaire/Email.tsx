import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import TextInput from '@/components/TextInput';

const Email = () => {
  const {t} = useTranslation();
  const [email, setEmail] = useState('');

  return (
    <>
      <h1 className="questionnaire-name__title">{t('onboarding.questionnaire.email.title')}</h1>
      <div className="onboarding-content__description">
        <p>{t('onboarding.questionnaire.email.description')}</p>
      </div>
      <TextInput value={email} onChange={e => setEmail(e.target.value)} placeholder={t('onboarding.questionnaire.email.input_placeholder') || ''}/>
    </>
  );
};

export default Email;
