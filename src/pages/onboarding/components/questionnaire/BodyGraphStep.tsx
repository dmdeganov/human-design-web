import React, {useContext} from 'react';
import {useFetchBodyGraph} from '@/pages/onboarding/hooks/useFetchBodyGraph';
import {UserDataContext} from '@/pages/onboarding/OnBoarding';
import BodyGraph from '@/modules/body-graph/BodyGraph';

const clientLanguage = (['ru', 'en'].includes(navigator.language) ? navigator.language : 'en') as 'ru' | 'en';

export interface Params {
  language: 'ru' | 'en';
  lat: number;
  lon: number;
  date: Date;
}

const BodyGraphStep = () => {
  const {userData} = useContext(UserDataContext);
  const {birthDate, birthTime, birthPlace: {lat, lon} } = userData; // prettier-ignore
  const {year, monthIndex, day} = birthDate!;
  const {hour, minute, period} = birthTime || {};
  const birthDateAndTime = new Date(year, monthIndex, day, hour && (period === 'AM' ? hour : hour + 12), minute);

  const {data, isLoading, isSuccess} = useFetchBodyGraph({language: clientLanguage, lat, lon, date: birthDateAndTime});
  const channels = isSuccess ? data.channels : null;
  console.log(channels)
  return (
    <div>
      <BodyGraph channels={channels} />
    </div>
  );
};

export default BodyGraphStep;
