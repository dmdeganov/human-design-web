import React, {useContext, useEffect, useState} from 'react';
import {UserDataContext} from '@/pages/onboarding/OnBoarding';
import BodyGraph from '@/modules/bodygraph/BodyGraph';
import {channels, centers} from '@/temp';
import {ChannelToDraw} from '@/types/@bodyGraph';
import {useTranslation} from 'react-i18next';
import {GradientButton} from '@/components';
import {OnBoardingContentProps} from '@/types/@onboarding';
import {useWindowSize} from '@/hooks/useWindowSize';
import {mobileMaxWidth} from '@/static';

const clientLanguage = (['ru', 'en'].includes(navigator.language) ? navigator.language : 'en') as 'ru' | 'en';

const BodyGraphStep = ({goForward}: OnBoardingContentProps) => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  const {userData} = useContext(UserDataContext);
  const {birthDate, birthTime, birthPlace: {lat, lon} } = userData; // prettier-ignore
  const {year, monthIndex, day} = birthDate!;
  const {hour, minute, period} = birthTime || {};
  const birthDateAndTime = new Date(year, monthIndex, day, hour && (period === 'AM' ? hour : hour + 12), minute);

  const {windowWidth} = useWindowSize();
  const isMobileWidth = windowWidth <= mobileMaxWidth;
  const size = isMobileWidth ? 'mob-sm' : 'desk-sm'

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  // const {data, isLoading, isSuccess} = useFetchBodyGraph({language: clientLanguage, lat, lon, date: birthDateAndTime});
  // const {channels = null, centers = null} = data && isSuccess ? parseBodyGraphResponse(data) : {};

  return (
    <>
      <h1>{t('onboarding.questionnaire.bodygraph.title')}</h1>
      {isLoading ? (
        <div className={`${`bodygraph-container--${size}`} center-content`}>
          <h2>Loading...</h2>
        </div>
      ) : (
        <BodyGraph
          channels={channels as ChannelToDraw[]}
          centers={centers}
          size={size}
          zoomOnMount
        />
      )}
      <div className="onboarding-content__description mt-3 mb-3">
        <p>{t('onboarding.questionnaire.bodygraph.description')}</p>
      </div>
      <GradientButton onClick={goForward}>{t('common.next')}</GradientButton>
    </>
  );
};

export default BodyGraphStep;
