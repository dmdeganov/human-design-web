import React, {useEffect, useRef} from 'react';
import {ReactComponent as OuterChakra} from '@/assets/svg/gates-circle.svg';
import {ReactComponent as InnerChakra} from '@/assets/svg/zodiac-circle.svg';
import {GradientButton} from '@/components';
import {useTranslation} from 'react-i18next';

interface Props {
  stepsAmount: number;
  activeStep: number;
  goForward: () => void;
  goBack: () => void;
  children?: React.ReactNode;
}

const OnBoardingLayout: React.FC<Props> = ({stepsAmount, activeStep, goForward, goBack, children}) => {
  const {t} = useTranslation();
  const steps = new Array(stepsAmount).fill(null).map((_, index) => index);
  const onBoardingContentRef = useRef<HTMLDivElement>(null);
  const onStepForward = () => {
    const contentInner = onBoardingContentRef.current as HTMLDivElement;
    contentInner.style.opacity = '0';
    setTimeout(() => {
      goForward();
      contentInner.style.opacity = '1';
    }, 200);
  };
  const onStepBack = () => {
    const contentInner = onBoardingContentRef.current as HTMLDivElement;
    contentInner.style.opacity = '0';
    setTimeout(() => {
      goBack();
      contentInner.style.opacity = '1';
    }, 200);
  };

  return (
    <main className="onboarding">
      <div className="onboarding__gradient-circle" />
      <div className="onboarding__gradient-circle onboarding__gradient-circle--right" />
      <div className="onboarding__chakras">
        <OuterChakra className="onboarding__outer-chakra" />
        <InnerChakra className="onboarding__inner-chakra" />
      </div>
      <div className="onboarding__content onboarding-content">
        <div className="onboarding-content__inner" ref={onBoardingContentRef}>
          {children}
        </div>
        <GradientButton text={t('common.next')} onClick={onStepForward} />
        <button onClick={onStepBack}>go back</button>
      </div>
      <div className="onboarding__stepper stepper">
        {steps.map(step => (
          <div key={step} className={`stepper__dot${step === activeStep ? ' stepper__dot--active' : ''}`} />
        ))}
      </div>
    </main>
  );
};

export default OnBoardingLayout;
