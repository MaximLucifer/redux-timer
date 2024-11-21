import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Timer from './components/Timer'; // Убедитесь, что путь корректен

export default function App() {
  return (
    <Provider store={store}>
      <Timer />
    </Provider>
  );
}
