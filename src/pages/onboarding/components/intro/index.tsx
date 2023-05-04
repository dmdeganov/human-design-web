import WhatIsHumanDesign from './WhatIsHumanDesign';
import WhatIsRaveCard from './WhatIsRaveCard';
import YourGender from './YourGender';
import React from 'react';

type StepsMap = {
  [num: number]: React.FC;
};

export const introSteps: StepsMap = {
  0: WhatIsHumanDesign,
  1: WhatIsRaveCard,
  2: YourGender,
};
