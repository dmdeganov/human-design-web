import DatePicker from '@/components/wheel-pickers/DatePicker';
import React, {useContext, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {PickedDate} from '@/components/wheel-pickers/types';
import {dateConfig, initialYear, months} from '@/components/wheel-pickers/static';
import {OnBoardingContentProps} from '@/types/@onboarding';
import {GradientButton} from '@/components';
import {UserDataContext} from '@/pages/onboarding/OnBoarding';

const BirthDate = ({goForward}: OnBoardingContentProps) => {
  const {t} = useTranslation();
  const {changeUserData, userData: {birthDate} } = useContext(UserDataContext); // prettier-ignore
  const {year, monthIndex, day} = birthDate || {};
  console.log({year, monthIndex, day});

  const dateRef = useRef<PickedDate & {isAnimationActive: boolean}>({
    day: day || 1,
    month: monthIndex ? months[monthIndex] : months[0],
    year: year || initialYear,
    isAnimationActive: false,
  });

  const onDateConfirm = () => {
    if (dateRef.current.isAnimationActive) return;
    const {year, month, day} = dateRef.current;
    changeUserData('birthDate', {year, monthIndex: months.findIndex(m => m === month), day});
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
        initialYearIndex={year ? year - dateConfig.minYear : initialYear - dateConfig.minYear}
        initialMonthIndex={monthIndex}
        initialDayIndex={day && day - 1}
      />
      <GradientButton onClick={onDateConfirm}>{t('common.next')}</GradientButton>
    </>
  );
};

export default BirthDate;
