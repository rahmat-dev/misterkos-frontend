import React, { Component } from 'react'
import { View, Modal, TouchableOpacity, Image } from 'react-native';
import { Container, Button, Content, Form, Item, Input, Label } from 'native-base';
import { Text, TextInput, Checkbox, RadioButton } from 'react-native-paper';

import axios from 'axios';
import config from '../config';

import { primaryColor } from '../Assets/Styles/colors';
import AsyncStorage from '@react-native-community/async-storage';

export default class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: false,
      name: '',
      username: '',
      password: '',
      repassword: '',
      gender: '',
      phone: '',
      modalVisible: false,
      avatar: 'avatar.png'
    }
  }

  validate = (data) => {
    const { name, username, password, repassword, gender, phone } = data

    if (password != repassword) {
      return alert('Password harus sama dengan konfirmasi password!!')
    } else {
      this.register()
    }
  }

  

  register = async () => {
    const data = {...this.state}
    console.log(data);
    
    await axios.post(
      `${config.API_URL}/register`,
      data,
    ).then((res) => {
      res.data.error ? alert(res.data.message) :
        AsyncStorage.setItem('token', res.data.token)
        this.props.navigation.navigate('Home')
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    const { gender, checked, modalVisible } = this.state

    return (
      <Container style={{ paddingBottom: 0 }}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible} >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, .5)' }}>
            <View style={{ backgroundColor: 'white', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 32, elevation: 4 }}>
              <Text style={{ marginBottom: 16 }}>Registrasi berhasil!</Text>
              <Button style={{ backgroundColor: primaryColor, paddingHorizontal: 16 }} onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={{color: 'white'}}>Login</Text>
              </Button>
            </View>
          </View>
        </Modal>

        <Content style={{ paddingTop: 32 }}>
          <View style={{ paddingHorizontal: 32 }}>
            <Text style={{ textAlign: 'center', fontSize: 24, color: primaryColor }}>Daftar ke misterkos.com</Text>
            
            <Form style={{marginTop: 16}}>
              <View style={{marginVertical: 4}}>
                <TextInput mode='outlined' placeholder='Nama' onChangeText={(name) => this.setState({ name })} />
              </View>
              <View style={{marginVertical: 4}}>
                <TextInput mode='outlined' placeholder='Username' onChangeText={(username) => this.setState({ username })} />
              </View>
              <View style={{marginVertical: 4}}>
                <TextInput mode='outlined' placeholder='Password' onChangeText={(password) => this.setState({ password })} secureTextEntry={true}/>
              </View>
              <View style={{marginVertical: 4}}>
                <TextInput mode='outlined' placeholder='Konfirmasi Password' onChangeText={(repassword) => this.setState({ repassword })} secureTextEntry={true}/>
              </View>
              <View style={{marginTop: 12, borderWidth: 1, borderRadius: 8, borderColor: 'gray', position: 'relative', padding: 8}}>
                <Label style={{ fontSize: 14, color: 'gray', position: 'absolute', top: -10, left: 6, backgroundColor: 'white', paddingHorizontal: 4 }}>Jenis Kelamin</Label>
                <RadioButton.Group
                  onValueChange={gender => this.setState({ gender })}
                  value={this.state.gender}
                >
                  <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                    <RadioButton value="L" color='#0baa56'/>
                    <Text>Laki-laki</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton value="P" color='#0baa56'/>
                    <Text>Perempuan</Text>
                  </View>
                </RadioButton.Group>
              </View>
              <View style={{marginVertical: 4}}>
                <TextInput mode='outlined' placeholder='Nomor Telepon' onChangeText={(phone) => this.setState({ phone })} />
              </View>
            </Form>

            <View style={{ marginTop: 8, marginBottom: 48 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => this.setState({ checked: !checked })}
                  color={primaryColor}
                />
                <Text style={{ fontSize: 10 }}>Dengan menekan tombol dibawah, Anda telah menyetujui kebijakan Privacy dan Syarat & Ketentuan KasKos.com</Text>
              </View>
              <Button style={{ backgroundColor: checked ? primaryColor : 'gray', borderRadius: 50, justifyContent: 'center', marginBottom: 8 }} onPress={() => this.validate(this.state)} disabled={!checked}>
                <Text style={{color: checked ? 'white' : 'rgba(0,0,0,.3)', fontWeight: 'bold'}}>DAFTAR</Text>
              </Button>
              <Text style={{ textAlign: 'center' }}>Sudah punya akun? <Text style={{ color: primaryColor, textDecorationLine: 'underline' }} onPress={() => this.props.navigation.navigate('Login')}>Silahkan Login</Text></Text>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}