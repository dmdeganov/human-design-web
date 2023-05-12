import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {PickedTime} from '@/components/wheel-pickers/types';
import TimePicker from '@/components/wheel-pickers/TimePicker';
import OutlinedButton from '@/components/OutlinedButton';
import {OnBoardingContentProps} from '@/pages/onboarding/types';
import {GradientButton} from '@/components';

const Birthtime = ({onStepForward}: OnBoardingContentProps) => {
  const {t} = useTranslation();
  const timeRef = useRef<PickedTime>({hour: 12, minute: 0, period: 'AM'});

  return (
    <>
      <h1>{t('onboarding.questionnaire.birth_time.title')}</h1>
      <div className="onboarding-content__description">
        <p>{t('onboarding.questionnaire.birth_time.description')}</p>
      </div>
      <TimePicker timeRef={timeRef} />
      <div className="onboarding-content__birth-time-buttons">
        <OutlinedButton>{t('onboarding.questionnaire.birth_time.dont_know')}</OutlinedButton>
        <GradientButton onClick={onStepForward}>{t('common.next')}</GradientButton>
      </div>
    </>
  );
};

export default Birthtime;
