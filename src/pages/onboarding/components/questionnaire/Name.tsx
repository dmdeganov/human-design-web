import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import TextInput from '@/components/TextInput';

const Name = () => {
  const {t} = useTranslation();
  const [name, setName] = useState('');

  return (
    <>
      <h1 className="questionnaire-name__title">{t('onboarding.questionnaire.name.title')}</h1>
      <div className="onboarding-content__description">
        <p>{t('onboarding.questionnaire.name.description')}</p>
      </div>
      <TextInput value={name} onChange={e => setName(e.target.value)} placeholder={t('onboarding.questionnaire.name.name') || ''}/>
    </>
  );
};

export default Name;
