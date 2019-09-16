import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Picker, Alert } from 'react-native';
import { Container, Header, Content, Left, Icon, Body, Title, Button, List, ListItem, Thumbnail, Right } from 'native-base';
import { connect } from 'react-redux';

import DateComponent from '../Components/Date'
import priceFormat from '../Utils/priceFormat';

class BookingScreen extends Component {
  static navigationOptions = {
    title: 'Booking'
  }

  constructor() {
    super()
    this.state = {
      duration: 1
    }
  }

  confirmBooking() {
    Alert.alert(
      'Booking',
      'Apakah data sudah benar?\nYakin akan membooking?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Ya', onPress: () => {
            this.props.navigation.navigate('DetailBooking')
          }
        },
      ]
    );
  }

  render() {
    const kost = this.props.navigation.getParam('kost')
    const user = this.props.user.data;

    return (
      <Container>
        <Content style={{ padding: 12 }}>
          <View style={{ flexDirection: 'row' }}>
            <DateComponent title='Tanggak Masuk' />

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text>Waktu Penginapan</Text>
              <Picker
                selectedValue={this.state.duration}
                style={{ alignItems: 'flex-end', width: 140 }}
                onValueChange={value => this.setState({ duration: value })}
              >
                <Picker.Item label='1 bulan' value={1} />
                <Picker.Item label='2 bulan' value={2} />
                <Picker.Item label='3 bulan' value={3} />
                <Picker.Item label='4 bulan' value={4} />
                <Picker.Item label='5 bulan' value={5} />
                <Picker.Item label='6 bulan' value={6} />
                <Picker.Item label='7 bulan' value={7} />
                <Picker.Item label='8 bulan' value={8} />
                <Picker.Item label='9 bulan' value={9} />
                <Picker.Item label='10 bulan' value={10} />
                <Picker.Item label='11 bulan' value={11} />
                <Picker.Item label='12 bulan' value={12} />
              </Picker>
            </View>
          </View>

          <View style={{ borderTopWidth: 0.5, borderBottomWidth: 0.5 }}>
            <List>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={{ uri: `${config.IMAGE_URL}/kost/${kost.image1}` }} style={{ width: 80 }} />
                </Left>
                <Body>
                  <Text style={{ fontWeight: 'bold' }}>{kost.title}</Text>
                  <Text note numberOfLines={1}>{kost.description}</Text>
                  <Text style={{ fontWeight: 'bold' }}>{priceFormat(kost.price)}</Text>
                </Body>
              </ListItem>
            </List>
          </View>

          <View style={{ borderBottomWidth: 0.5 }}>
            <View style={{ marginVertical: 12, flexDirection: 'row' }}>
              <View >
                <Text style={{ fontWeight: 'bold' }}>Data Penghuni </Text>
              </View>
              {/* <Right>
                <Text style={{ fontWeight: 'bold', color: 'red' }}>Ubah</Text>
              </Right> */}
            </View>

            <View style={{ marginVertical: 12, flexDirection: 'row' }}>
              <View >
                <Text >Nama Lengkap </Text>
              </View>
              <Right>
                <Text style={{ fontWeight: 'bold' }}>{user.name}</Text>
              </Right>
            </View>

            <View style={{ marginVertical: 12, flexDirection: 'row' }}>
              <View >
                <Text >Jenis Kelamin </Text>
              </View>
              <Right>
                <Text style={{ fontWeight: 'bold' }}>{user.gender == 'L' ? 'Laki-laki' : 'Perempuan'}</Text>
              </Right>
            </View>

            <View style={{ marginVertical: 12, flexDirection: 'row' }}>
              <View >
                <Text >No Handphone </Text>
              </View>
              <Right>
                <Text style={{ fontWeight: 'bold' }}>{user.phone}</Text>
              </Right>
            </View>

            <View style={{ marginVertical: 12, flexDirection: 'row' }}>
              <View>
                <Text>Pekerjaan</Text>
              </View>
              <Right>
                <Text style={{ fontWeight: 'bold' }}>Mahasiswa</Text>
              </Right>
            </View>

            <Button style={{ justifyContent: 'center', backgroundColor: '#0baa56' }} onPress={() => this.confirmBooking()}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Book</Text>
            </Button>
          </View>

        </Content>

      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(BookingScreen)