import React from 'react';

function onWindowSizeChange(onChange: () => void) {
  window.addEventListener('resize', onChange);

  return () => window.removeEventListener('resize', onChange);
}

const getWindowWidthSnapshot = () =>  window.innerWidth

const getWindowHeightSnapshot = () =>  window.innerHeight;

export function usePageSize() {
  const windowWidth = React.useSyncExternalStore(onWindowSizeChange, getWindowWidthSnapshot);

  const windowHeight = React.useSyncExternalStore(onWindowSizeChange, getWindowHeightSnapshot);

  return {width: windowWidth, height: windowHeight};
}
