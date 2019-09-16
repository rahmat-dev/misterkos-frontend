import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ChatScreen extends Component {
  static navigationOptions = {
    title: 'Chat',
    tabBarIcon: ({tintColor}) => (
      <View>
        <Icon name={tintColor == '#0baa56' ? 'chat-bubble' : 'chat-bubble-outline'} size={18} style={{color: tintColor}} />
      </View>
    )
  }

  render() {
    return(
      <Container>
        <Content style={{padding: 8}}>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../Assets/Images/logo.png')} />
              </Left>
              <Body>
                <Text style={{fontWeight: 'bold'}}>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../Assets/Images/logo.png')} />
              </Left>
              <Body>
                <Text style={{fontWeight: 'bold'}}>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../Assets/Images/logo.png')} />
              </Left>
              <Body>
                <Text style={{fontWeight: 'bold'}}>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../Assets/Images/logo.png')} />
              </Left>
              <Body>
                <Text style={{fontWeight: 'bold'}}>Kumar Pratik</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}