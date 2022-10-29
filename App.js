import React from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {COLORS} from '@constants/index';
import AppNavigator from './src/navigation';
import {StyledText} from '@components/atoms';
import {getStore, getPersistor} from '@redux/index';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  const store = getStore();
  const persistor = getPersistor();

  const onBeforeLift = () => {
    //Do some stuff that when redux has initialized
  };

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate
          loading={<StyledText>Loading...</StyledText>}
          persistor={persistor}
          onBeforeLift={onBeforeLift}>
          <StatusBar
            barStyle="light-content"
            animated
            backgroundColor={COLORS.BACKGROUND}
          />
          <AppNavigator />
          <FlashMessage position="bottom" />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
