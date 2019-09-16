import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// Navigator
import HomeNavigator from './HomeNav';
import AuthNavigator from './AuthNav';

import WelcomeScreen from '../Screens/Welcome';

const AppNavigator = createSwitchNavigator(
  {
    Welcome: WelcomeScreen,
    Auth: AuthNavigator,
    Home: HomeNavigator
  },
  {
    headerMode: 'none',
    defaultNavigationOptions: {
      header: null,
    },
  }
)

export default RootNavigation = createAppContainer(AppNavigator);