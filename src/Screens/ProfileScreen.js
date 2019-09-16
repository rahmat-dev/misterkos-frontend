import React, { Component } from 'react';
import { ScrollView, Alert } from 'react-native';
import { Text, View, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

import * as actionUser from '../Redux/actions/user'

class ProfileScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <View>
        <Icon name={tintColor == '#0baa56' ? 'person' : 'person-outline'} size={18} style={{ color: tintColor }} />
      </View>
    )
  }

  constructor() {
    super();
  }

  componentDidMount() {
    try {
      console.log('masuk pak eko')
      this.props.getUser()
    }catch(er) {
      console.log('error :', er);
    }
  }

  logout() {
    Alert.alert(
      'Logout',
      'Yakin ingin keluar?',
      [
        { text: 'Batal', style: 'cancel' },
        {text: 'OK', onPress: () => {
          this.props.users.data = null
          AsyncStorage.clear()
          this.props.navigation.navigate('Auth')
        }},
      ]
    );
  }

  render() {
    const user = this.props.user.data;

    return (
      <ScrollView>
        <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#0baa56', padding: 16, paddingTop: 24 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='person' size={28} color='white' />
            <Text style={{ fontWeight: 'bold', marginLeft: 4, color: 'white' }}>{user.name}</Text>
          </View>
          <Right style={{ flex: 1}}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white' }} onPress={() => alert('edit')}>Edit Profile</Text>
          </Right>
        </View>

        <View style={{height: 60, backgroundColor: '#0baa56', borderBottomLeftRadius: 20, borderBottomRightRadius: 20}} />

        <View style={{ padding: 16, marginTop: -84 }}>
          <View style={{ marginTop: 16, backgroundColor: 'white', borderRadius: 10, elevation: 4 }}>
            <View style={{ marginTop: 14, marginLeft: 18 }}>
              <Text style={{ fontSize: 12 }}>Kost Saya</Text>
            </View>
            <View style={{ marginTop: 18, flexDirection: 'row', borderRadius: 10, backgroundColor: 'white' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, width: 40, height: 55, marginBottom: 14 }}>
                <Icon size={26} color='#0baa56' name='assignment' />
                <Text style={{ fontSize: 10 }}>Kontrak</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, width: 40, height: 55 }}>
                <Icon size={26} color='#0baa56' name='receipt' />
                <Text style={{ fontSize: 10 }}>Tagihan</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, width: 40, height: 55 }}>
                <Icon size={26} color='#0baa56' name='build' />
                <View>
                  <Text style={{ fontSize: 10 }}>Komplain</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, width: 40, height: 55 }}>
                <Icon size={26} color='#0baa56' name='store' />
                <Text style={{ fontSize: 10 }}>Kios</Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 16, backgroundColor: 'white', elevation: 4, borderRadius: 8, paddingVertical: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
              <Icon style={{ paddingLeft: 12 }} color='#0baa56' name='history' size={22} />
              <Text style={{ paddingLeft: 20 }}>History Booking</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
              <Icon style={{ paddingLeft: 12 }} color='#0baa56' name='shopping-cart' size={22} />
              <Text style={{ paddingLeft: 20 }}>Barang dan Jasa</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
              <Icon style={{ paddingLeft: 12 }} color='#0baa56' name='portrait' size={22} />
              <Text style={{ paddingLeft: 20 }}>Verifikasi Akun</Text>
            </View>
          </View>


          <View style={{ marginTop: 16, paddingHorizontal: 8 }}>
            <View style={{ borderBottomWidth: 0.3, backgroundColor: 'white', flexDirection: 'row', height: 45, alignItems: 'center'}}>
              <Icon style={{ paddingLeft: 12 }} color='#0baa56' name='settings' size={22} /><Text style={{ paddingLeft: 20 }}>Pengaturan</Text>
            </View>

            <View style={{ borderBottomWidth: 0.3, backgroundColor: 'white', flexDirection: 'row', height: 45, alignItems: 'center' }}>
              <Icon style={{ paddingLeft: 12 }} color='#0baa56' name='call' size={22} /><Text style={{ paddingLeft: 20 }}>Hubungi CS</Text>
            </View>

            <View style={{ backgroundColor: 'white', flexDirection: 'row', height: 45, alignItems: 'center' }}>
              <Icon style={{ paddingLeft: 12 }} color='#0baa56' name='exit-to-app' size={22} onPress={() => this.logout()} />
              <Text style={{ paddingLeft: 20 }} onPress={() => this.logout()}>Keluar</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(actionUser.getUser()),
    setUser: user => dispatch(actionUser.setUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)