import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

// Screens
import HomeScreen from '../Screens/HomeScreen';
import WhislistScreen from '../Screens/WhislistScreen';
import ChatScreen from '../Screens/ChatScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import AddOfferScreen from '../Screens/AddOfferScreen';
import ListKostScreen from '../Screens/ListKostScreen';
import DetailKostScreen from '../Screens/DetailKostScreen';
import BookingScreen from '../Screens/BookingScreen';
import DetailBookingScreen from '../Screens/DetailBookingScreen';
import ListBookingScreen from '../Screens/ListBookingScreen';
import ListOfferScreen from '../Screens/ListOfferScreen';

const BottomTab = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Whislist: { screen: WhislistScreen },
    Chat: { screen: ChatScreen },
    Profile: { screen: ProfileScreen },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: '#0baa56',
      style: {
        paddingTop: 12,
        paddingBottom: 8
      },
    },
  }
)

const StackNavigator = createStackNavigator(
  {
    Home: BottomTab,
    ListKost: ListKostScreen,
    AddOffer: AddOfferScreen,
    DetailKost: DetailKostScreen,
    Booking: BookingScreen,
    DetailBooking: DetailBookingScreen,
    ListBooking: ListBookingScreen,
    ListOffer: ListOfferScreen,
  },
  {
    initialRouteName: 'Home',
  }
)

export default createAppContainer(StackNavigator)