import React from 'react';
import {createBrowserRouter, redirect, RouterProvider} from 'react-router-dom';
import OnBoarding from '@/pages/onboarding/OnBoarding';

const loader = async () => {
  return redirect('/onboarding');
};
const router = createBrowserRouter([
  {
    path: '/onboarding',
    element: <OnBoarding />,
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
