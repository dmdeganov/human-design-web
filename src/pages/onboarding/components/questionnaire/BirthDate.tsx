import DatePicker from '@/components/wheel-pickers/DatePicker';
import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {PickedDate} from '@/components/wheel-pickers/types';
import {currentYear, months} from '@/components/wheel-pickers/static';

const BirthDate = () => {
  const {t} = useTranslation();
  const dateRef = useRef<PickedDate>({day: 1, month: months[0], year: currentYear});

  return (
    <>
      <h1 className="questionnaire-name__title">{t('onboarding.questionnaire.birth_date.title')}</h1>
      <div className="onboarding-content__description">
        <p>{`James, ${t('onboarding.questionnaire.birth_date.description')}`}</p>
      </div>
      <DatePicker dateRef={dateRef} />
    </>
  );
};

export default BirthDate;
