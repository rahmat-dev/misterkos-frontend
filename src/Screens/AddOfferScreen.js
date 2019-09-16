import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Searchbar, Button, TextInput, RadioButton } from 'react-native-paper'
import { Container, Form, Item, Input, Label, Content } from 'native-base';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage'

import KostService from '../Services/UserService';

import axios from 'axios';
import config from '../config';
import { styles as regis } from '../Assets/Styles/register';

export default class AddOffer extends Component {
  static navigationOptions = {
    title: 'Pasang Iklan',
  }

  constructor() {
    super()

    this.state = {
      searchCity: null,
      title: null,
      address: null,
      region: {
        latitude: -6.301576,
        longitude: 106.7351054,
      },
      type: null,
      long: null,
      wide: null,
      totalRoom: null,
      emptyRoom: null,
      price: null,
      facilities: null,
      bathroom: null,
      image1: null,
      image2: null,
      image3: null,
      description: null
    }
  }

  chooseImage = (options) => {
    ImagePicker.openPicker(options).then(image => {
      console.log('image : ', image)
      this.setState({
        image1: {...image[0]},
        image2: {...image[1]},
        image3: {...image[2]}
      })
      console.log(this.state.image1, this.state.image2, this.state.image3)
    })
  }

  addOffer = async () => {
    const { title, address, type, long, wide, totalRoom, emptyRoom, price, facilities, bathroom, image1, image2, image3, description } = this.state
    const {latitude, longitude} = this.state.region
    let token = await AsyncStorage.getItem('token')

    let ext1 = image1.mime.split('/')
    ext1 = ext1[ext1.length-1]
    let ext2 = image1.mime.split('/')
    ext2 = ext2[ext2.length-1]
    let ext3 = image1.mime.split('/')
    ext3 = ext3[ext3.length-1]

    // images = [
    //   Platform.OS === "android" ? image1.path : image1.path.replace("file://", ""),
    //   Platform.OS === "android" ? image2.path : image2.path.replace("file://", ""),
    //   Platform.OS === "android" ? image3.path : image3.path.replace("file://", "")
    // ]

    let formData = new FormData()
    formData.append('title', title)
    formData.append('address', address)
    formData.append('latitude', latitude)
    formData.append('longitude', longitude)
    formData.append('type', type)
    formData.append('long', long)
    formData.append('wide', wide)
    formData.append('totalRoom', totalRoom)
    formData.append('emptyRoom', emptyRoom)
    formData.append('price', price)
    formData.append('facilities', facilities)
    formData.append('bathroom', bathroom)
    formData.append('description', description)
    // formData.append('images', images)
    formData.append('image1', {
      uri: Platform.OS === "android" ? image1.path : image1.path.replace("file://", ""),
      type: image1.mime,
      name: `image1.${ext1}`
    })
    formData.append('image2', {
      uri: Platform.OS === "android" ? image2.path : image2.path.replace("file://", ""),
      type: image2.mime,
      name: `image2.${ext2}`
    })
    formData.append('image3', {
      uri: Platform.OS === "android" ? image3.path : image3.path.replace("file://", ""),
      type: image3.mime,
      name: `image3.${ext3}`
    })

    await axios.post(
      `${config.API_URL}/kost`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          authorization: `Bearer ${token}`
        }
      }
    ).then((res) => {
      if (res.data.status == 'success') {
        alert('Data berhasil di tambahkan')
        this.props.navigation.navigate('Home')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    const data = this.state
    const imageOptions = {
      width: 640,
      height: 420,
      cropping: true,
      includeBase64: true,
      multiple: true,
      maxFiles: 3
    }

    return (
      <Container>
        <StatusBar backgroundColor='#0baa56' barStyle='light-content' />
        <Content>
          <Form style={{paddingVertical: 8, paddingHorizontal: 16}}>
            <View style={{marginVertical: 4}}>
              <TextInput label='Judul Iklan' mode='outlined' onChangeText={(title) => this.setState({ title })} value={data.title} style={{backgroundColor: 'white'}}/>
            </View>

            <View style={{marginVertical: 4}}>
              <TextInput label='Alamat' mode='outlined' onChangeText={(address) => this.setState({ address })} value={data.address} style={{backgroundColor: 'white'}}/>
            </View>

            <View style={{width: '100%', height: 320, marginVertical: 4, flexDirection: 'row', justifyContent: 'space-between'}}>
              <MapView style={{ flex: 1 }}
                showsUserLocation
                region={{
                  ...this.state.region,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
                onPress={e => this.setState({
                  region: {
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude
                  }
                })}
              >
                <Marker
                  coordinate={this.state.region}
                  image={{ uri: 'https://image.flaticon.com/icons/svg/25/25231.svg' }}
                />
              </MapView>
            </View>

            {/* <View style={{marginVertical: 4, flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput label='Panjang' mode='outlined' onChangeText={(long) => this.setState({long})} value={data.long} style={{flex: .49, backgroundColor: 'white'}}/>
              <TextInput label='Lebar' mode='outlined' onChangeText={(wide) => this.setState({wide})} value={data.wide} style={{flex: .49, backgroundColor: 'white'}}/>
            </View> */}

            {/* Tipe Kost */}
            <View style={{marginTop: 12, borderWidth: 1, borderRadius: 8, borderColor: 'gray', position: 'relative', padding: 8}}>
              <Label style={{ fontSize: 14, color: 'gray', position: 'absolute', top: -10, left: 6, backgroundColor: 'white', paddingHorizontal: 4 }}>Tipe Kost</Label>
              <RadioButton.Group
                onValueChange={type => this.setState({ type })}
                value={data.type}
              >
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                  <RadioButton value="PUTRA" color='#0baa56' />
                  <Text>Putra</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="PUTRI" color='#0baa56' />
                  <Text>Putri</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="CAMPUR" color='#0baa56' />
                  <Text>Campur</Text>
                </View>
              </RadioButton.Group>
            </View>

            {/* Luas Kamar */}
            <View style={{marginTop: 12, borderWidth: 1, borderRadius: 8, borderColor: 'gray', position: 'relative', padding: 8}}>
              <Label style={{ fontSize: 14, color: 'gray', position: 'absolute', top: -10, left: 6, backgroundColor: 'white', paddingHorizontal: 4 }}>Luas Kamar</Label>
              <RadioButton.Group
                onValueChange={expansive => {
                  expansive = expansive.split(' x ')
                  this.setState({
                    long: expansive[0],
                    wide: expansive[1]
                  })
                }}
                value={data.long + ' x ' + data.wide}
              >
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                  <RadioButton value="3 x 3" color='#0baa56' />
                  <Text>3 x 3</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="3 x 4" color='#0baa56' />
                  <Text>3 x 4</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="4 x 4" color='#0baa56' />
                  <Text>4 x 4</Text>
                </View>
              </RadioButton.Group>
            </View>

            <View style={{marginVertical: 4}}>
              <TextInput label='Jumlah Kamar' mode='outlined' onChangeText={(totalRoom) => this.setState({ totalRoom })} value={data.totalRoom} style={{backgroundColor: 'white'}} keyboardType={'numeric'}/>
            </View>

            <View style={{marginVertical: 4}}>
              <TextInput label='Kamar kosong' mode='outlined' onChangeText={(emptyRoom) => this.setState({ emptyRoom })} value={data.emptyRoom} style={{backgroundColor: 'white'}} keyboardType={'numeric'}/>
            </View>

            <View style={{marginVertical: 4}}>
              <TextInput label='Harga per bulan' mode='outlined' onChangeText={(price) => this.setState({ price })} value={data.price} style={{backgroundColor: 'white'}} keyboardType={'numeric'}/>
            </View>

            {/* Kamar Mandi */}
            <View style={{marginTop: 12, borderWidth: 1, borderRadius: 8, borderColor: 'gray', position: 'relative', padding: 8}}>
              <Label style={{ fontSize: 14, color: 'gray', position: 'absolute', top: -10, left: 6, backgroundColor: 'white', paddingHorizontal: 4 }}>Kamar Mandi</Label>
              <RadioButton.Group
                onValueChange={bathroom => this.setState({ bathroom })}
                value={data.bathroom}
              >
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
                  <RadioButton value="LUAR" color='#0baa56' />
                  <Text>Di Luar</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value="DALAM" color='#0baa56' />
                  <Text>Di Dalam</Text>
                </View>
              </RadioButton.Group>
            </View>

            <View style={{marginVertical: 4}}>
              <TextInput label='Fasilitas Lainnya' mode='outlined' onChangeText={(facilities) => this.setState({ facilities })} value={data.facilities} style={{backgroundColor: 'white'}}/>
            </View>

            <View style={{marginVertical: 4}}>
              <TextInput label='Deskripsi' mode='outlined' onChangeText={(description) => this.setState({ description })} value={data.description} style={{backgroundColor: 'white'}} multiline={true} numberOfLines={4} />
            </View>

            <View style={{ marginTop: 8, alignItems: 'flex-start' }}>
              <TouchableOpacity style={regis.btnUpload} onPress={() => this.chooseImage(imageOptions)}>
                <Icon name='add-a-photo' size={18} style={{ marginRight: 8 }} />
                <Text>{data.image1 != null ? 'Ganti foto' : 'Upload foto'}</Text>
              </TouchableOpacity>
              {data.image1 != null && (
                <Image source={{ uri: data.image1.path }} style={{ marginVertical: 8, width: '100%', height: 180, maxWidth: '100%' }} />
              )}
              {data.image2 != null && (
                <Image source={{ uri: data.image2.path }} style={{ marginVertical: 8, width: '100%', height: 180, maxWidth: '100%' }} />
              )}
              {data.image3 != null && (
                <Image source={{ uri: data.image3.path }} style={{ marginVertical: 8, width: '100%', height: 180, maxWidth: '100%' }} />
              )}
            </View>

            <View style={{borderBottomWidth: 0}}>
              <Button mode='contained' style={{ width: '100%', backgroundColor: '#0baa56', marginVertical: 16, paddingVertical: 4 }} onPress={() => this.addOffer()}>
                Tambah Iklan
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  labelAddOffer: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14
  },
  inputAddOffer: {
    padding: 0,
  },
  inputLatitude: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, .2)',
    paddingLeft: 0
  },
  inputLongitude: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, .2)',
    paddingLeft: 0
  }
})