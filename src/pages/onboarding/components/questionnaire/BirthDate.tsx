import DatePicker from '@/components/wheel-pickers/DatePicker';
import React, {useContext, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {PickedDate} from '@/components/wheel-pickers/types';
import {dateConfig, initialYear, months} from '@/components/wheel-pickers/static';
import {OnBoardingContentProps} from '@/pages/onboarding/types';
import {GradientButton} from '@/components';
import {UserDataContext} from '@/pages/onboarding/OnBoarding';

const BirthDate = ({goForward}: OnBoardingContentProps) => {
  const {t} = useTranslation();
  const {changeUserData } = useContext(UserDataContext); // prettier-ignore

  const dateRef = useRef<PickedDate & {isAnimationActive: boolean}>({
    day: 1,
    month: months[0],
    year: initialYear,
    isAnimationActive: false,
  });
  const onDateConfirm = () => {
    if (dateRef.current.isAnimationActive) return;
    const {year, month, day} = dateRef.current;
    console.log({year, month, day})
    changeUserData('birthDate', {year, month, day});
    goForward();
  };

  return (
    <>
      <h1>{t('onboarding.questionnaire.birth_date.title')}</h1>
      <div className="onboarding-content__description">
        <p>{`James, ${t('onboarding.questionnaire.birth_date.description')}`}</p>
      </div>
      <DatePicker
        dateRef={dateRef}
        initialYearIndex={initialYear - dateConfig.minYear}
      />
      <GradientButton onClick={onDateConfirm} >
        {t('common.next')}
      </GradientButton>
    </>
  );
};

export default BirthDate;
