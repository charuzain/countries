import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import HomePage from './pages/HomePage';
import CountryDetail from './pages/CountryDetailPage/CountryDetail';
import Layout from './components/Layout/Layout';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';
import { useEffect } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      {
        path: '/:name',
        element: <CountryDetail />,
      },
    ],
  },
]);

function App() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(mode);
  }, [mode]);
  return <RouterProvider router={router} />;
}

export default App;
