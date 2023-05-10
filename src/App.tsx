import React from 'react';
import {createBrowserRouter, redirect, RouterProvider} from 'react-router-dom';
import OnBoarding from '@/pages/onboarding/OnBoarding';
import {BadSlider} from '@/components/WheelPicker';
import Wheel from '@/components/WheelPicker/Wheel';
import DatePicker from '@/components/WheelPicker/DatePicker';

const loader = async () => {
  return redirect('/onboarding');
};
const router = createBrowserRouter([
  {
    path: '/onboarding',
    element: <OnBoarding />,
  },
  {
    path: '/date-picker',
    element: (
      <div style={{background: 'black', padding: '50px'}}>

        <br />
        <DatePicker />
        {/*<br />*/}
        {/*<br />*/}
        {/*<br />*/}
        {/*<p> date picker with different line's height</p>*/}
        {/*<br />*/}
        {/*<DatePicker adjustLineHeight/>*/}
        {/*<br />*/}
        {/*<br />*/}
        {/*<br />*/}
        {/*<p> date picker with animated change of line's height</p>*/}
        {/*<br />*/}
        {/*<DatePicker adjustLineHeight animatedTextTranslation/>*/}




      </div>
    ),
  },
  {
    path: '*',
    loader,
    element: null,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
