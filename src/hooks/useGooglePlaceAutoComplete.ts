// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const useGooglePlaceAutoComplete = () => {
  const initAutoComplete = async (input, callback) => {
    const autoComplete = new window.google.maps.places.Autocomplete(input, {
      fields: ['address_component', 'geometry'],
      types: ['(cities)'],
    });
    autoComplete.addListener('place_changed', callback);

    return autoComplete;
  };

  const getPlaceInfo = autoComplete => {

    const place = autoComplete.getPlace();
    let locality, country;

    for (const component of place.address_components) {
      const componentType = component.types[0];

      if (componentType === 'locality') {
        locality = component.long_name;
      }

      if (componentType === 'country') {
        country = component.long_name;
      }
    }

    const birthPlaceName = `${locality}, ${country}`;
    return {
      lat: place.geometry.location.lat() as number,
      lon: place.geometry.location.lng() as number,
      name: birthPlaceName,
    };
  };

  return {
    initAutoComplete,
    getPlaceInfo,
  };
};

export default useGooglePlaceAutoComplete;
