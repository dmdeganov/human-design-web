import React, {useContext, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {PickedTime} from '@/components/wheel-pickers/types';
import TimePicker from '@/components/wheel-pickers/TimePicker';
import OutlinedButton from '@/components/OutlinedButton';
import {OnBoardingContentProps} from '@/pages/onboarding/types';
import {GradientButton} from '@/components';
import {UserDataContext} from '@/pages/onboarding/OnBoarding';

const Birthtime = ({goForward}: OnBoardingContentProps) => {
  const {t} = useTranslation();
  const { changeUserData, userData: {birthTime} } = useContext(UserDataContext); // prettier-ignore
  const {hour, minute, period} = birthTime || {};

  const timeRef = useRef<PickedTime & {isAnimationActive: boolean}>({
    hour: hour || 12,
    minute: minute || 0,
    period: period || 'AM',
    isAnimationActive: false,
  });
  const onTimeConfirm = () => {
    if (timeRef.current.isAnimationActive) return;
    const {hour, minute, period} = timeRef.current;
    changeUserData('birthTime', {hour, minute, period});
    goForward();
  };
  const skipFillingBirthTime = () => {
    goForward();
  };

  return (
    <>
      <h1>{t('onboarding.questionnaire.birth_time.title')}</h1>
      <div className="onboarding-content__description">
        <p>{t('onboarding.questionnaire.birth_time.description')}</p>
      </div>
      <TimePicker
        timeRef={timeRef}
        initialHourIndex={hour && hour - 1}
        initialMinuteIndex={minute}
        initialPeriodIndex={period && period === 'AM' ? 0 : 1}
      />
      <div className="onboarding-content__birth-time-buttons">
        <OutlinedButton onClick={skipFillingBirthTime}>
          {t('onboarding.questionnaire.birth_time.dont_know')}
        </OutlinedButton>
        <GradientButton onClick={onTimeConfirm}>{t('common.next')}</GradientButton>
      </div>
    </>
  );
};

export default Birthtime;
