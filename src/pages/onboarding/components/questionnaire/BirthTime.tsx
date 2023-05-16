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
  const { changeUserData } = useContext(UserDataContext); // prettier-ignore
  const timeRef = useRef<PickedTime & {isAnimationActive: boolean}>({
    hour: 12,
    minute: 0,
    period: 'AM',
    isAnimationActive: false,
  });
  const onTimeConfirm = () => {
    if (timeRef.current.isAnimationActive) return;
    const {hour, minute, period, isAnimationActive} = timeRef.current;
    console.log({hour, minute, period, isAnimationActive});
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
      <TimePicker timeRef={timeRef} />
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
