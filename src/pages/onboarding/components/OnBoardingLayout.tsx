import React, {Dispatch, SetStateAction, useRef} from 'react';
import {GatesCircleSVG, ZodiacCircleSVG} from '@/assets/svg';
import {GradientButton} from '@/components';
import {useTranslation} from 'react-i18next';
import {Stage} from '@/pages/onboarding/types';

interface Props {
  stepsAmount: number;
  currentStep: number;
  goForward: () => void;
  goBack: () => void;
  stage: Stage;
  setStage: Dispatch<SetStateAction<Stage>>;
  children?: React.ReactNode;
}

const OnBoardingLayout: React.FC<Props> = ({
  stepsAmount,
  currentStep,
  goForward,
  goBack,
  children,
  stage,
  setStage,
}) => {
  const {t} = useTranslation();
  const steps = new Array(stepsAmount).fill(null).map((_, index) => index);
  const onBoardingContentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onStepForward = () => {
    const contentInner = onBoardingContentRef.current as HTMLDivElement;
    const button = buttonRef.current as HTMLButtonElement;

    contentInner.style.opacity = '0';
    button.style.opacity = '0';
    setTimeout(() => {
      contentInner.style.opacity = '1';
      button.style.opacity = '1';
      if (stage === 'intro' && currentStep === stepsAmount - 1) {
        setStage('questionnaire');
        return;
      }
      goForward();
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
        <GatesCircleSVG className="onboarding__outer-chakra" />
        <ZodiacCircleSVG className="onboarding__inner-chakra" />
      </div>
      <div className="onboarding__content onboarding-content">
        <div className="onboarding-content__inner" ref={onBoardingContentRef}>
          {children}
        </div>
        <GradientButton onClick={onStepForward}>
          <span ref={buttonRef}>{t('common.next')}</span>{' '}
        </GradientButton>
      </div>
      <div className="onboarding__stepper stepper">
        {steps.map(step => (
          <div
            key={step}
            className={`stepper__dot${step === currentStep ? ' stepper__dot--active' : ''}`}
          />
        ))}
      </div>
    </main>
  );
};

export default OnBoardingLayout;
