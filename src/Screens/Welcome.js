import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

export default class Welcome extends Component {
  constructor() {
    super()
    this.hasToken()
  }

  hasToken = async () => {
    try {
      let token = await AsyncStorage.getItem('token')
      if (token) {
        setTimeout(() => {
          this.props.navigation.navigate('Home')
        }, 3000)
      } else {
        this.props.navigation.navigate('Auth')
      }
    } catch (error) {
      this.props.navigation.navigate('Auth')
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../Assets/Images/logo.png')} style={{width: '80%', resizeMode: 'contain'}} />
      </View>
    )
  }
}
