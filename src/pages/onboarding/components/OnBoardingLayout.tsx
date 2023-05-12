import React, {Dispatch, SetStateAction, useMemo, useRef} from 'react';
import {BackIcon, GatesCircleSVG, ZodiacCircleSVG} from '@/assets/svg';
import {GradientButton} from '@/components';
import {useTranslation} from 'react-i18next';
import {Stage} from '@/pages/onboarding/types';
import {useWindowSize} from '@/hooks/useWindowSize';
import {mobileMaxWidth} from '@/static';
import {chakrasMobileStyles} from '@/pages/onboarding/components/static';
import {createSecretKey} from 'crypto';

interface Props {
  stepsAmount: number;
  step: number;
  stage: Stage;
  setStage: Dispatch<SetStateAction<Stage>>;
  setStep: Dispatch<SetStateAction<number>>;
  children?: React.ReactNode;
}

const OnBoardingLayout: React.FC<Props> = ({stepsAmount, step, setStep, children, stage, setStage}) => {
  const {t} = useTranslation();
  const {windowWidth} = useWindowSize();
  const isMobileWidth = windowWidth <= mobileMaxWidth;
  const stepPoints = useMemo(() => new Array(stepsAmount).fill(null).map((_, index) => index), [stepsAmount]);

  const onBoardingContentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const goForward = () => setStep(step + 1);
  const goBack = () => setStep(step - 1);

  const onStepForward = () => {
    const contentInner = onBoardingContentRef.current as HTMLDivElement;
    const button = buttonRef.current as HTMLButtonElement;

    contentInner.style.opacity = '0';
    button.style.opacity = '0';
    setTimeout(() => {
      contentInner.style.opacity = '1';
      button.style.opacity = '1';
      if (stage === 'intro' && step === stepsAmount - 1) {
        setStage('questionnaire');
        setStep(0);
        return;
      }
      goForward();
    }, 200);
  };
  const isBackIconVisible = stage === 'questionnaire' && step > 0;

  const onStepBack = () => {
    const contentInner = onBoardingContentRef.current as HTMLDivElement;
    contentInner.style.opacity = '0';
    setTimeout(() => {
      goBack();
      contentInner.style.opacity = '1';
    }, 200);
  };
  const disabledToContinue = step === stepsAmount - 1 && stage === 'questionnaire';

  const getChakrasMobileStyles = (): React.CSSProperties => {
    if (stage !== 'questionnaire' || step === 0 || !isMobileWidth) return {};
    const {scale, top} = chakrasMobileStyles[(step <= 3 ? step : 3) as 1 | 2 | 3];
    return {
      transform: `scale(${scale})`,
      top: `calc(${top}% - 1230px*${(100 - top) / 100}/2)`,
    };
  };

  console.log(getChakrasMobileStyles());

  return (
    <main className="onboarding">
      <div className="onboarding__chakras" style={getChakrasMobileStyles()}>
        <GatesCircleSVG className="onboarding__outer-chakra" />
        <ZodiacCircleSVG className="onboarding__inner-chakra" />
      </div>
      <div className="onboarding__inner">
        {isBackIconVisible && <BackIcon className="onboarding__back-icon" onClick={onStepBack} />}
        {!isMobileWidth && (
          <>
            <div className="onboarding__gradient-circle" />
            <div className="onboarding__gradient-circle onboarding__gradient-circle--right" />
          </>
        )}
        <div className="onboarding__content onboarding-content">
          <div className="onboarding-content__inner" ref={onBoardingContentRef}>
            {children}
            {/*<h2>step {step}</h2>*/}
          </div>
          {!isMobileWidth && (
            <GradientButton onClick={onStepForward} disabled={disabledToContinue}>
              <span ref={buttonRef}>{t('common.next')}</span>
            </GradientButton>
          )}
        </div>
        <div className="onboarding__stepper stepper">
          {stepPoints.map(stepPoint => (
            <div key={stepPoint} className={`stepper__dot${stepPoint === step ? ' stepper__dot--active' : ''}`} />
          ))}
        </div>
        {isMobileWidth && (
          <GradientButton onClick={onStepForward} disabled={disabledToContinue}>
            <span ref={buttonRef}>{t('common.next')}</span>
          </GradientButton>
        )}
      </div>
      {isMobileWidth && <div className="onboarding__gradient-ellipse" />}
    </main>
  );
};

export default OnBoardingLayout;
