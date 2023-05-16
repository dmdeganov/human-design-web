import React, {FormEventHandler, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import TextInput from '@/components/TextInput';
import {BirthPlaceType, OnBoardingContentProps} from '@/pages/onboarding/types';
import {GradientButton} from '@/components';
import {UserDataContext} from '@/pages/onboarding/OnBoarding';
import Modal from '@/components/modal/Modal';
import useModal from '@/hooks/useModal';
import AutoComplete from '@/components/AutoComplete';
import {BackIcon} from '@/assets/svg';

const BirthPlace = ({goForward}: OnBoardingContentProps) => {
  const {t} = useTranslation();
  const {isOpen, close, open} = useModal();
  const {changeUserData, userData: {birthPlace} } = useContext(UserDataContext); // prettier-ignore
  const onSelectPlace = (birthPlaceInfo: BirthPlaceType) => {
    changeUserData('birthPlace', birthPlaceInfo);
    close();
  };
  const isAbleToContinue = birthPlace.lat && birthPlace.lon && birthPlace.name;

  const onSubmit : FormEventHandler<HTMLFormElement> = (e ) => {
    e.preventDefault();
    if(isAbleToContinue) goForward()
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>{t('onboarding.questionnaire.birth_place.title')}</h1>
      <div className="onboarding-content__description">
        <p>{t('onboarding.questionnaire.birth_place.description')}</p>
      </div>
      <TextInput
        value={birthPlace.name}
        onChange={() => {}}
        onFocus={open}
        placeholder={t('onboarding.questionnaire.birth_place.input_placeholder') || ''}
      />
      <GradientButton onClick={goForward} disabled={!isAbleToContinue}>{t('common.next')}</GradientButton>
      <Modal close={() => close()} isOpen={isOpen} fullScreenContent className="autocomplete-modal">
        <div className="autocomplete-modal__header">
          <BackIcon className="autocomplete-modal__back" onClick={close} />
          <AutoComplete placeholder="Search" onSelect={onSelectPlace} focusOnMount />
        </div>
      </Modal>
    </form>
  );
};

export default BirthPlace;
