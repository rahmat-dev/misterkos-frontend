import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableHighlight, StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  Container,
  Header,
  Content,
  View,
  Button,
  Item,
  Input
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

// CAROUSEL
import SliderEntry from '../Components/SliderEntry';
import { sliderWidth, itemWidth } from '../Assets/Styles/SliderEntry';

import CardImage from '../Components/CardImage';
import { bannerData } from '../Assets/Data/banner-data';

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchFor: 'Kos',
      slider1ActiveSlide: 0,
      userId: null
    };
  }

  static navigationOptions = {
    tabBarLabel: 'Explore',
    tabBarIcon: ({tintColor}) => (
      <View>
        <Icon name='search' size={18} style={{color: tintColor}} />
      </View>
    )
  }

  // componentDidMount() {
  //   axios.get(`http://192.168.0.36:3000/api/user/${this.props.navigation.}`)
  // }

  _renderItem ({item, index}) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  render() {
    return(
      <Container style={{backgroundColor: '#efefef', flex:1}}>
        {/* HEADER */}
        <View style={{backgroundColor: 'white', paddingHorizontal: 8}}>
          <Header style={{backgroundColor: 'white', height: 70, elevation: 0}} >
            <StatusBar backgroundColor='#0baa56' barStyle="light-content" />
            <View style={{flex: 1, marginTop: 12, flexDirection: 'row'}}>
              <Image source={require('../Assets/logo_mamikos_green.png')} style={{resizeMode: 'contain', width: 120, height: 40}} />
              {/* <Icon name='android' /> */}
              {/* <Text style={{color: '#0baa56', fontSize: 22}}>KasKos</Text> */}
            </View>
          </Header>

          {/* BUTTON FOR SEARCH */}
          <View style={{paddingHorizontal: 6, flexDirection: 'row', marginBottom: 10}}>
            <Button style={{backgroundColor: this.state.searchFor == 'Kos' ? '#eee' : 'transparent', elevation: 0, justifyContent: 'center', alignItems: 'center', marginHorizontal: 4, paddingHorizontal: 16, height: 32, borderRadius: 16, flex: this.state.searchFor == 'Kos' ? 0 : 1}} onPress={ () => {
              this.setState({
                searchFor: 'Kos',
              });
            }}>
              <Image source={require('../Assets/Icons/kos.png')} style={{width: 16, height: 16}} />
              { this.state.searchFor == 'Kos' ? <Text style={{color: '#0baa56', marginLeft: 8}}>{this.state.searchFor == 'Kos' ? 'Kos' : null}</Text> : null }              
            </Button>

            <Button style={{backgroundColor: this.state.searchFor == 'Apartemen' ? '#eee' : 'transparent', elevation: 0, justifyContent: 'center', alignItems: 'center', marginHorizontal: 4, paddingHorizontal: 16, height: 32, borderRadius: 16, flex: this.state.searchFor == 'Apartemen' ? 0 : 1}} onPress={ () => {
              this.setState({
                searchFor: 'Apartemen',
              });
            }}>
              <Image source={require('../Assets/Icons/apartemen.png')} style={{width: 16, height: 16}} />
              { this.state.searchFor == 'Apartemen' ? <Text style={{color: '#0baa56', marginLeft: 8}}>{this.state.searchFor == 'Apartemen' ? 'Apartemen' : null}</Text> : null }              
            </Button>
            
            <Button style={{backgroundColor: this.state.searchFor == 'Barang & Jasa' ? '#eee' : 'transparent', elevation: 0, justifyContent: 'center', alignItems: 'center', marginHorizontal: 4, paddingHorizontal: 16, height: 32, borderRadius: 16, flex: this.state.searchFor == 'Barang & Jasa' ? 0 : 1}} onPress={ () => {
              this.setState({
                searchFor: 'Barang & Jasa',
              });
            }}>
              <Image source={require('../Assets/Icons/barang-jasa.png')} style={{width: 16, height: 16}} />
              { this.state.searchFor == 'Barang & Jasa' ? <Text style={{color: '#0baa56', marginLeft: 8}}>{this.state.searchFor == 'Barang & Jasa' ? 'Barang & Jasa' : null}</Text> : null }              
            </Button>
            
            <Button style={{backgroundColor: this.state.searchFor == 'Lowongan Kerja' ? '#eee' : 'transparent', elevation: 0, justifyContent: 'center', alignItems: 'center', marginHorizontal: 4, paddingHorizontal: 16, height: 32, borderRadius: 16, flex: this.state.searchFor == 'Lowongan Kerja' ? 0 : 1}} onPress={ () => {
              this.setState({
                searchFor: 'Lowongan Kerja',
              });
            }}>
              <Image source={require('../Assets/Icons/loker.png')} style={{width: 16, height: 16}} />
              { this.state.searchFor == 'Lowongan Kerja' ? <Text style={{color: '#0baa56', marginLeft: 8}}>{this.state.searchFor == 'Lowongan Kerja' ? 'Lowongan Kerja' : null}</Text> : null }              
            </Button>
          </View>
        </View>

        {/* CONTENT */}
        <Content style={{backgroundColor: 'white'}}>
          {/* VIEW FOR SEARCH */}
          <View style={{marginVertical: 8, paddingHorizontal: 16}}>
            <Text style={{fontSize: 20}}>Hai, Rahmat</Text>
            <Text style={{fontSize: 20}}>Mau cari {this.state.searchFor} dimana ?</Text>
            <TouchableHighlight style={{backgroundColor: '#dedede', borderRadius: 8, marginVertical: 8, paddingHorizontal: 12}}>
              <Item onPress={() => this.props.navigation.navigate('ListKost')}>
                <Icon name='search' size={14} style={{marginRight: 6}} />
                <Input placeholder='Masukkan alamat atau nama tempat' style={{fontSize: 14}} disabled />
              </Item>
            </TouchableHighlight>
          </View>

          <View style={{height: 12, backgroundColor: '#efefef'}} />

          <View style={{padding: 16}}>
            {/* PROMO */}
            <Text style={{fontSize: 20}}>Promo</Text>
            <View style={{overflow: 'hidden', marginTop: -27, marginBottom: 16, paddingTop: 8}}>
              <Carousel
                ref={c => this._slider1Ref = c}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                loop={true}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                enableMomentum={true}
                activeSlideAlignment={'start'}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                activeAnimationType={'decay'}
                onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                renderItem={this._renderItem} data={bannerData}
                autoplay={true} />
              <Pagination
                dotsLength={bannerData.length}
                activeDotIndex={this.state.slider1ActiveSlide}
                dotColor={'#0baa56'}
                dotStyle={styles.paginationDot}
                containerStyle={{width: '100%', justifyContent: 'flex-start', paddingVertical: 8, paddingHorizontal: 0}}
                dotContainerStyle={{marginStart: 0}}
                inactiveDotColor={'black'}
                inactiveDotOpacity={0.2}
                inactiveDotScale={1}
                carouselRef={this._slider1Ref}
                tappableDots={!!this._slider1Ref}
              />
            </View>

            {/* CREATE ADS */}
            <View style={{flexDirection: 'row', marginBottom: 12}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>Punya sesuatu untuk di iklankan?</Text>
              </View>
              <TouchableHighlight style={{backgroundColor: '#0baa56', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8}} onPress={() => this.props.navigation.navigate('AddOffer')}>
                <Text style={{color: 'white'}}>Pasang Iklan</Text>
              </TouchableHighlight>
            </View>
            
            {/* KOTA POPULER */}
            <Text style={{fontSize: 20}}>Kota Populer</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingTop: 8}}>
              <CardImage imageUri={require('../Assets/Images/yogyakarta.jpg')} city='Yogyakarta' width={100} height={140} />
              <CardImage imageUri={require('../Assets/Images/jakarta.jpg')} city='Jakarta' width={100} height={140} />
              <CardImage imageUri={require('../Assets/Images/bandung.jpg')} city='Bandung' width={100} height={140} />
              <CardImage imageUri={require('../Assets/Images/surabaya.jpg')} city='Surabaya' width={100} height={140} />
              <CardImage imageUri={require('../Assets/Images/medan.jpg')} city='Medan' width={100} height={140} />
            </ScrollView>

          </View>
        </Content>
      </Container>
    );
  }
}

// STYLING
const styles = StyleSheet.create({
  slider: {
    marginTop: 15,
    overflow: 'visible'
  },
  sliderContentContainer: {
    paddingVertical: 10
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    // marginHorizontal: 8
  }
})
