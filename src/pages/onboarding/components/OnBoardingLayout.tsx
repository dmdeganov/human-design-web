import React, {Dispatch, SetStateAction, useMemo, useRef} from 'react';
import {BackIcon, GatesCircleSVG, ZodiacCircleSVG} from '@/assets/svg';
import {useTranslation} from 'react-i18next';
import {Stage} from '@/types/@onboarding';
import {useWindowSize} from '@/hooks/useWindowSize';
import {mobileMaxWidth} from '@/static';
import {chakrasMobileStyles} from '@/pages/onboarding/components/static';
import {introSteps} from '@/pages/onboarding/components/intro';
import {questionnaireSteps} from '@/pages/onboarding/components/questionnaire';

interface Props {
  step: number;
  stage: Stage;
  setStage: Dispatch<SetStateAction<Stage>>;
  setStep: Dispatch<SetStateAction<number>>;
}

const stages = {
  intro: introSteps,
  questionnaire: questionnaireSteps,
};

const OnBoardingLayout: React.FC<Props> = ({step, setStep, stage, setStage}) => {
  const {t} = useTranslation();
  const {windowWidth} = useWindowSize();
  const isMobileWidth = windowWidth <= mobileMaxWidth;
  const stepsAmount = Object.keys(stages[stage]).length;
  const stepPoints = useMemo(() => new Array(stepsAmount).fill(null).map((_, index) => index), [stepsAmount]);
  const Content = step in stages[stage] ? stages[stage][step] : null;

  const onBoardingContentRef = useRef<HTMLDivElement>(null);
  const goBack = () => setStep(step - 1);

  const goForward = () => {
    const contentInner = onBoardingContentRef.current as HTMLDivElement;
    contentInner.style.opacity = '0';
    setTimeout(() => {
      contentInner.style.opacity = '1';
      if (stage === 'intro' && step === stepsAmount - 1) {
        setStage('questionnaire');
        setStep(0);
        return;
      }
      setStep(step + 1);
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

  const getChakrasMobileStyles = (): React.CSSProperties => {
    if (stage !== 'questionnaire' || step === 0 || !isMobileWidth) return {};
    const {scale, top} = chakrasMobileStyles[(step <= 3 ? step : 3) as 1 | 2 | 3];
    return {
      transform: `scale(${scale})`,
      top: `calc(${top}% - 1230px*${(100 - top) / 100}/2)`,
    };
  };

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
            {Content && <Content goForward={goForward} />}
          </div>
        </div>
        <div className="onboarding__stepper stepper">
          {stepPoints.map(stepPoint => (
            <div key={stepPoint} className={`stepper__dot${stepPoint === step ? ' stepper__dot--active' : ''}`} />
          ))}
        </div>
      </div>
      {isMobileWidth && <div className="onboarding__gradient-ellipse" />}
    </main>
  );
};

export default OnBoardingLayout;
