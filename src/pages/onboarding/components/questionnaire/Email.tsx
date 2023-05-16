import React, {FormEventHandler, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import TextInput from '@/components/TextInput';
import {OnBoardingContentProps} from '@/pages/onboarding/types';
import {GradientButton} from '@/components';
import {UserDataContext} from '@/pages/onboarding/OnBoarding';

const Email = ({goForward}: OnBoardingContentProps) => {
  const {t} = useTranslation();
  const {changeUserData, userData: {email}, userData } = useContext(UserDataContext); // prettier-ignore
  const isAbleToContinue = email.length >= 5
  const onSubmit : FormEventHandler<HTMLFormElement> = (e ) => {
    e.preventDefault();
    if(isAbleToContinue) goForward()
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>{t('onboarding.questionnaire.email.title')}</h1>
      <div className="onboarding-content__description">
        <p>{t('onboarding.questionnaire.email.description')}</p>
      </div>
      <TextInput
        type="email"
        value={email}
        onChange={e => changeUserData('email', e.target.value)}
        placeholder={t('onboarding.questionnaire.email.input_placeholder') || ''}
      />
      <GradientButton onClick={()=>console.log(userData)}>{t('common.next')}</GradientButton>
    </form>
  );
};

export default Email;
