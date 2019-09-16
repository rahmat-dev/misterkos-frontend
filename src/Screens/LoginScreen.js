import React, { Component } from 'react';
import { Image, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  View,
  Button,
  Item,
  Form,
  Input,
  Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import axios from 'axios';

import config from '../config';
import Circle from '../Components/Circle'

import { styles } from '../Assets/Styles/login';
import { primaryColor } from '../Assets/Styles/colors';

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  login = () => {
    const { username, password } = this.state

    axios.post(`${config.API_URL}/login`, { username, password }).then((res) => {
      if (res.data.valid) {
        AsyncStorage.setItem('token', res.data.token)
        this.props.navigation.navigate('Home')
      } else {
        alert(res.data.message)
      }
    })
  }

  render() {
    return (
      <Container style={{ position: 'relative' }}>
        <StatusBar backgroundColor={primaryColor} />

        <Circle position='absolute' width={140} height={140} bgColor={primaryColor} top={0} right={0} bottomLeftRad={140} />

        <View style={{ flex: 1 }}>
          <Image source={require('../Assets/Images/logo.png')} style={styles.logo} />
        </View>

        <View style={{ flex: 3, alignItems: 'center', zIndex: 99 }}>
          <Form style={{ flex: 1, marginTop: 40 }}>
            <Item style={styles.itemInput} >
              <Icon name='person' size={18} color='gray' />
              <Input placeholder='Username' placeholderTextColor='gray' onChangeText={(username) => this.setState({ username })} />
            </Item>

            <Item style={[styles.itemInput, { marginTop: 16 }]} >
              <Icon name='lock' size={18} color='gray' />
              <Input placeholder='Password' placeholderTextColor='gray' secureTextEntry={true} onChangeText={(password) => this.setState({ password })} />
            </Item>

            <Button full success style={styles.btnLogin} onPress={() => this.login()}>
              <Text>Login</Text>
            </Button>

            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
              <Text style={{ fontSize: 14 }}>Belum Punya Akun? </Text>
              <Text onPress={() => this.props.navigation.navigate('Register')} style={styles.registerNow}>Daftar Sekarang</Text>
            </View>
          </Form>
        </View>

        <Circle position='absolute' width={100} height={100} bgColor={primaryColor} bottom={0} left={0} topRightRad={100} />
        <Circle position='absolute' width={60} height={120} bgColor={primaryColor} bottom={20} right={0} topLeftRad={120} bottomLeftRad={120} />

      </Container>
    );
  }
}
