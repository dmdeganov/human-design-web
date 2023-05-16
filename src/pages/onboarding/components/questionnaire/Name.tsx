import React, {FormEventHandler, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import TextInput from '@/components/TextInput';
import {OnBoardingContentProps} from '@/pages/onboarding/types';
import {GradientButton} from '@/components';
import {UserDataContext} from '@/pages/onboarding/OnBoarding';

const Name = ({goForward}: OnBoardingContentProps) => {
  const {t} = useTranslation();
  const {userData: {name}, changeUserData } = useContext(UserDataContext); // prettier-ignore
  const isAbleToContinue = name.length >= 2
  const onSubmit : FormEventHandler<HTMLFormElement> = (e ) => {
    e.preventDefault();
    if(isAbleToContinue) goForward()
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>{t('onboarding.questionnaire.name.title')}</h1>
      <div className="onboarding-content__description">
        <p>{t('onboarding.questionnaire.name.description')}</p>
      </div>
      <TextInput
        value={name}
        onChange={e => changeUserData('name', e.target.value)}
        placeholder={t('onboarding.questionnaire.name.name') || ''}
      />
      <GradientButton onClick={goForward} disabled={name.length < 2}>
        {t('common.next')}
      </GradientButton>
    </form>
  );
};

export default Name;
