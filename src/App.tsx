import React from 'react';
import {createBrowserRouter, redirect, RouterProvider} from 'react-router-dom';
import {QueryClientProvider, QueryClient} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import OnBoarding from '@/pages/onboarding/OnBoarding';
import DatePicker from '@/components/wheel-pickers/DatePicker';
import TestPage from "@/pages/test/TestPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      refetchOnWindowFocus: false,
    },
  },
});

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
    element: <TestPage />,
  },
  {
    path: '*',
    loader,
    element: null,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/*<ReactQueryDevtools />*/}
    </QueryClientProvider>
  );
};

export default App;
