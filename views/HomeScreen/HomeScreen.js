import React, { Component } from 'react';
import { Image, } from 'react-native';
import { Text } from 'native-base'
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import { HomeScreenWrapper, ButtonLeft, ButtonRight } from './HomeScreen.styles';

class HomeScreen extends Component { 

  render () {
    return (
      <>
        <HeaderComponent title="Home" />
        <Image
          source={ require( '../../assets/bg.png' ) }
          style={ { position: 'absolute', top: -600, right: -160, width: 300 } }
          resizeMode="contain"
        />
          <HomeScreenWrapper>
              <Image source={ require( '../../assets/nav__icon.png' ) } style={ { width: 300, height: 300, marginTop: 40 } } resizeMode="contain" />
          </HomeScreenWrapper>
            <ButtonLeft onPress={() => this.props.navigation.navigate('Services')}>
              <Text style={{color: '#fff', fontSize: 14, textAlign: 'center'}}>Services</Text>
            </ButtonLeft>
            <ButtonRight onPress={() => this.props.navigation.navigate('Contact')}>
              <Text style={{color: '#fff', fontSize: 14, textAlign: 'center'}}>Order now</Text>
            </ButtonRight>
      </>
    );
  }
}

export default HomeScreen;
