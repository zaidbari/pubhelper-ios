import React, { PureComponent } from 'react';
import { Image, ScrollView, ActivityIndicator } from 'react-native';
import { DiscountScreenWrapper, DiscountCard } from './DiscountScreen.styles';
import { Text } from 'native-base'
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import axios from 'axios';
import { ContactScreenWrapper } from '../ContactScreen/ContactScreen.styles';

class DiscountScreen extends PureComponent { 
  constructor(props) {
    super( props );
    this.state = {
      offers: null,
      isLoading: true
    }
    this._timeConverter = this._timeConverter.bind(this)
  }

  componentDidMount = () => {
    axios.get( 'http://pubhelper.objapptive.com/offers' )
    .then( response => {
      this.setState( { offers: response.data, isLoading: false } );
    } )
    .catch( e => {
    console.log( e );
    }  )
  }

  _timeConverter ( UNIX_timestamp ) {
    if ( UNIX_timestamp == null ) { return "N/A" } else {
      var a = new Date( UNIX_timestamp * 1000 );
      var months = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' ];
      var year = a.getFullYear();
      var month = months[ a.getMonth() ];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      // var sec = a.getSeconds();
      if ( hour < 10 ) { hour = '0' + hour }
      if ( min < 10 ) { min = '0' + min }
      var time = date + '/' + month + '/' + year 
      return time;
    }
  }

  render () {
    return (
      <>
      { this.state.isLoading ?
        <ContactScreenWrapper>
          <ActivityIndicator size="large" color="#2096f3" />
        </ContactScreenWrapper> :
        <>
        <HeaderComponent title="Offers &amp; Discounts" />
        <Image
          source={ require( '../../assets/bg.png' ) }
          style={ { position: 'absolute', top: -600, right: -160, width: 300 } }
          resizeMode="contain"
        />
        <ScrollView>
          <DiscountScreenWrapper>
            { this.state.offers.filter( x => {
              return x.isActive == 1
            } ).map( ( offer, index ) => (
            <DiscountCard key={index} style={{marginVertical: 10}}>
              <Text style={ { fontSize: 20, color: '#2096F3' } }>{ offer.title }</Text>
              <Text style={{fontSize: 14}}>{ offer.description }</Text>
              <Text style={{fontSize: 14, color: '#2096F3', marginTop: 10}}>{ this._timeConverter(offer.endDate)}</Text>
            </DiscountCard>
            ))}
          </DiscountScreenWrapper>
        </ScrollView>
      </>
        }
      </>
    );
  }
}

export default DiscountScreen;
