import React, { Component } from 'react';
import { Image, ScrollView, Dimensions, Share, ActivityIndicator } from 'react-native'
import { Container, Content, Footer, FooterTab, Button, View, Text, Right, Item } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { connect } from 'react-redux';

import config from '../config';
import * as actionKost from '../Redux/actions/kost';
import ImageDetail from '../Components/ImageDetail';
import priceFormat from '../Utils/priceFormat';

class DetailKost extends Component {
  static navigationOptions = {
    // header: null
    headerRight: (
      <View style={{ flexDirection: 'row' }}>
        <Icon
          onPress={() => Share.share({ message: 'Ini kos' })}
          name='share'
          size={24}
          style={{ marginEnd: 16 }}
        />
        <Icon
          onPress={() => alert('Berhasil ditambahkan ke favorit')}
          name='favorite-border'
          size={24}
          style={{ marginEnd: 16 }}
        />
      </View>
    ),
    // headerTransparent: true,
  }

  constructor() {
    super()

    this.state = {
      tabActive: 1,
      kost: {}
    }
  }

  render() {
    const kost = this.props.kost.detail
    const imageUri = [kost.image1, kost.image2, kost.image3]

    // console.log(kost)

    return (
      <Container style={{ position: 'relative' }}>
        <Content>
          <View>
            {this.state.tabActive == 1 ?
              <ImageDetail imageUri={imageUri} />
              :
              <MapView style={{ width: '100%', height: 240 }}
                region={{
                  latitude: parseFloat(kost.latitude),
                  longitude: parseFloat(kost.longitude),
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
                showsUserLocation
              >
                <Marker coordinate={{
                  latitude: parseFloat(kost.latitude),
                  longitude: parseFloat(kost.longitude),
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121
                }} image={{ uri: 'https://image.flaticon.com/icons/svg/25/25231.svg' }} />
              </MapView>
            }
          </View>

          <View style={{ flexDirection: 'row', backgroundColor: 'black' }}>
            <Button style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }} onPress={() => this.setState({ tabActive: 1 })}>
              <Icon name='photo-library' color='white' size={18} />
              <Text>Foto</Text>
            </Button>
            <Button style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center' }} onPress={() => this.setState({ tabActive: 2 })}>
              <Icon name='place' color='white' size={18} />
              <Text>Lokasi</Text>
            </Button>
          </View>

          <View style={{ paddingHorizontal: 12 }}>
            {/* ------------Judul Kos------------- */}
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <Text style={{ color: 'purple', fontWeight: 'bold', fontSize: 12 }}>{kost.type}</Text>
              <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 12, paddingHorizontal: 10 }}>Tersisa {kost.emptyRoom} Kamar</Text>
            </View>
            <View style={{ marginVertical: 8, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 16, color: 'black' }}>{kost.title}</Text>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end', width: 80, marginTop: -24 }}>
                <Icon name='stars' size={50} color='gold' />
              </View>
            </View>


            <View style={{ flexDirection: 'row', paddingVertical: 8, borderTopWidth: 0.5, borderBottomWidth: 0.5 }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='power' size={14} color={'gray'} />
                <Text style={{ color: 'gray', fontSize: 14 }}>Tidak termasuk listrik</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='money-off' size={14} color={'gray'} />
                <Text style={{ color: 'gray', fontSize: 14 }}>Tidak ada min. bayar</Text>
              </View>
            </View>

            <View>
              <View style={{ marginVertical: 8 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Luas Kamar</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name='zoom-out-map' size={28} color='green' />
                  <Text style={{ marginLeft: 10 }}>{kost.long} x {kost.wide} meter</Text>
                </View>
              </View>

              <View style={{ marginVertical: 8 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 4 }}>Fasilitas Lainnya</Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 6 }}>
                    <Icon name='airline-seat-individual-suite' size={24} color='#0baa56' /><Text style={{ color: '#0baa56', fontSize: 12 }}>Kasur</Text>
                  </View>
                  <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 6 }}>
                    <Icon name='wifi' size={24} color='#0baa56' /><Text style={{ color: '#0baa56', fontSize: 12 }}>Wifi - Internet</Text>
                  </View>
                  <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 6 }}>
                    <Icon name='hot-tub' size={24} color='#0baa56' /><Text style={{ color: '#0baa56', fontSize: 12 }}>Kamar Mandi</Text>
                  </View>
                  <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 6 }}>
                    <Icon name='kitchen' size={24} color='#0baa56' /><Text style={{ color: '#0baa56', fontSize: 12 }}>Dapur</Text>
                  </View>
                  <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 6 }}>
                    <Icon name='airline-seat-individual-suite' size={24} color='#0baa56' /><Text style={{ color: '#0baa56', fontSize: 12 }}>Kasur</Text>
                  </View >
                  <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 6 }}>
                    <Icon name='wifi' size={24} color='#0baa56' /><Text style={{ color: '#0baa56', fontSize: 12 }}>Wifi - Internet</Text>
                  </View>
                </ScrollView>
              </View>

              <View style={{ marginVertical: 8 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Deskripsi Kos</Text>
                <Text style={{ fontSize: 14 }}>{kost.description}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderTopWidth: 0.5, borderBottomWidth: 0.5, marginVertical: 8 }}>
              <Icon name='person' size={24} style={{ borderWidth: 1, padding: 4, borderRadius: 50, marginRight: 8 }} />
              <Text style={{ fontWeight: 'bold' }}>{this.props.kost.detail.created_by.name}</Text>
            </View>
          </View>


          <View style={{ paddingHorizontal: 12, marginTop: 4, marginBottom: 8 }}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 4 }}>Kos Menarik Lainnya</Text>
            </View>
            <View>
              <Image source={require('../Assets/Images/medan.jpg')} style={{ width: 100, height: 100 }} />
            </View>
          </View>
        </Content>

        <Footer>
          <FooterTab style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center', padding: 12, elevation: 8, paddingVertical: 8 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold' }}>{priceFormat(this.props.kost.detail.price)} / bulan</Text>
              <Text style={{ fontSize: 14 }}>Lihat semua harga</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Button style={{ flex: 1, marginRight: 2, backgroundColor: 'transparent', borderColor: '#0baa56', borderWidth: 2, elevation: 0, borderRadius: 4 }} onPress={() => alert('hubungi kos')}>
                <Text style={{ fontSize: 10, textAlign: 'center', color: '#0baa56' }}>Hubungi Kos</Text>
              </Button>
              <Button style={{ flex: 1, marginLeft: 2, backgroundColor: '#0baa56', borderColor: '#0baa56', borderWidth: 2, elevation: 0, justifyContent: 'center', borderRadius: 4 }} onPress={() => this.props.navigation.navigate('Booking', { kost })}>
                <Text style={{ fontSize: 10, textAlign: 'center', color: 'white' }}>Booking</Text>
              </Button>
            </View>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    kost: state.kost
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDetailKost: (kost) => dispatch(actionKost.getDetailKost(kost)),
    getDetailKostPending: () => dispatch(actionKost.getDetailKostPending())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailKost)