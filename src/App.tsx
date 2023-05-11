import React from 'react';
import {createBrowserRouter, redirect, RouterProvider} from 'react-router-dom';
import OnBoarding from '@/pages/onboarding/OnBoarding';
import DatePicker from '@/components/wheel-pickers/DatePicker';

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
        <DatePicker />
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
