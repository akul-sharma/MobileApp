/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './components/redux/Store'
import { PaperProvider } from 'react-native-paper';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';

const persistor=persistStore(store);


const AppRedux = () =>(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider>
          <App/>
        </PaperProvider>
      </PersistGate>
    </Provider>
)

AppRegistry.registerComponent(appName, () => AppRedux);
