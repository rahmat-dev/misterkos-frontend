import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import RootNavigation from './src/Navigations/RootNavigation';
import store from './src/Redux/store';

import { theme } from './src/Assets/Styles/theme'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <StatusBar backgroundColor='#0baa56' barStyle='light-content' />          
          <RootNavigation />
        </PaperProvider>
      </Provider>
    )
  }
}