import Form from './components/Form';
import FormWithHook from './components/FormWithHook';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function App() {
  return (
    <Provider store={store}>
      <Form></Form>
      <FormWithHook></FormWithHook>
    </Provider>
  );
}
