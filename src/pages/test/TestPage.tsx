import React, {useEffect} from 'react';
import JsCanvas from '@/modules/bodygraph/components/JSCanvas';
import BodyGraph from '@/modules/bodygraph/BodyGraph';

const channels = {
  '1-8': {
    state: 'half-active',
    gate: '8',
  },
  '2-14': {
    state: 'half-active',
    gate: '14',
  },
  '9-52': {
    state: 'half-active',
    gate: '9',
  },
  '16-48': {
    state: 'half-active',
    gate: '48',
  },
  '18-58': {
    state: 'half-active',
    gate: '18',
  },
  '25-51': {
    state: 'active',
  },
  '28-38': {
    state: 'half-active',
    gate: '38',
  },
  '29-46': {
    state: 'half-active',
    gate: '46',
  },
  '37-40': {
    state: 'half-active',
    gate: '37',
  },
  '39-55': {
    state: 'half-active',
    gate: '55',
  },
  '47-64': {
    state: 'half-active',
    gate: '47',
  },
};
const TestPage = () => {
  // @ts-ignore
  return <BodyGraph channels={channels} />;
};

export default TestPage;
