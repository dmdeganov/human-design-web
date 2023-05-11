import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {PickedTime} from '@/components/wheel-pickers/types';
import TimePicker from '@/components/wheel-pickers/TimePicker';
import OutlinedButton from '@/components/OutlinedButton';

const Birthtime = () => {
  const {t} = useTranslation();
  const timeRef = useRef<PickedTime>({hour: 12, minute: 0, period: 'AM'});

  return (
    <>
      <h1 className="questionnaire-name__title">{t('onboarding.questionnaire.birth_time.title')}</h1>
      <div className="onboarding-content__description">
        <p>{t('onboarding.questionnaire.birth_time.description')}</p>
      </div>
      <TimePicker timeRef={timeRef} />
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <OutlinedButton className="mb-3">I don't know for sure</OutlinedButton>
    </>
  );
};

export default Birthtime;
