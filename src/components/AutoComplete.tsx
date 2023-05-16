import React, {useEffect, useRef} from 'react';
import useGooglePlaceAutoComplete from '@/hooks/useGooglePlaceAutoComplete';
import {MagnifyIcon} from '@/assets/svg';
import {BirthPlaceType} from '@/pages/onboarding/types';
import birthPlace from '@/pages/onboarding/components/questionnaire/BirthPlace';

interface Props {
  placeholder: string;
  onSelect: (birthPlace: BirthPlaceType) => void;
  focusOnMount: boolean;
}

const AutoComplete = ({placeholder, onSelect, focusOnMount}: Props) => {
  const {getPlaceInfo, initAutoComplete} = useGooglePlaceAutoComplete();

  let autoComplete = '';
  const birthPlaceRef = useRef<HTMLInputElement>(null);

  const handleAddressSelect = () => {
    const placeInfo = getPlaceInfo(autoComplete) as BirthPlaceType;
    onSelect(placeInfo);
  };

  useEffect(() => {
    async function loadGoogleMaps() {
      // initialize the Google Place Autocomplete widget and bind it to an input element.
      // eslint-disable-next-line
      autoComplete = await initAutoComplete(birthPlaceRef.current, handleAddressSelect);
    }
    loadGoogleMaps();
  }, []);
  useEffect(() => {
    if (focusOnMount) {
      birthPlaceRef.current?.focus()
    }
  }, [focusOnMount]);

  return (
    <div className="autocomplete-input-wrapper">
      <input ref={birthPlaceRef} placeholder={placeholder} className="autocomplete-input" />
      <MagnifyIcon className="autocomplete-input__search" />
    </div>
  );
};

export default AutoComplete;
