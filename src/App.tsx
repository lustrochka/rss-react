import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Form from './components/Form';
import FormWithHook from './components/FormWithHook';
import MainPage from './components/MainPage';
import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="form1" element={<Form />}></Route>
      <Route path="form2" element={<FormWithHook />}></Route>
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
