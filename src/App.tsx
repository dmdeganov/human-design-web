import React from 'react';
import {createBrowserRouter, redirect, RouterProvider} from 'react-router-dom';
import OnBoarding from '@/pages/onboarding/OnBoarding';
import {SlidingDatePicker} from '@/components/SlidingDatePicker';
import KeenSlider from "@/components/SlidingDatePicker/KeenSlider";

const loader = async () => {
  return redirect('/onboarding');
};
const router = createBrowserRouter([
  {
    path: '/onboarding',
    element: <OnBoarding />,
  },
  {
    path: '/test',
    element: (
      <div style={{background: 'black', padding: '50px'}}>
        <KeenSlider loop slidesPerView={7}/>
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
