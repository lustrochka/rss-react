import { Layout } from './components/layout';
import { DetailedPage } from './components/detailedPage/detailedPage';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.scss';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<DetailedPage />}></Route>
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
