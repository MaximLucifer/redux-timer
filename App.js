import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './redux/store';
import Timer from './components/Timer';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Timer />
      </Provider>
    </GestureHandlerRootView>
  );
}
