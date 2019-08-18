import React, { PureComponent } from 'react';
import { Image, ScrollView, Text } from 'react-native';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import { AboutScreenWrapper, AboutCard } from '../AboutScreen/AboutScreen.styles';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'expo';

class ContactDetails extends PureComponent { 
  render () {
    return (
      <>
        <HeaderComponent title="Contact us" />
        <Image
          source={ require( '../../assets/bg.png' ) }
          style={ { position: 'absolute', top: -600, right: -160, width: 300 } }
          resizeMode="contain"
        />
        <ScrollView>
          <AboutScreenWrapper>
          <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/966539082900')}>
            <AboutCard style={ { marginTop: 10 } }>
                <Text style={ { fontSize: 20, color: '#2096F3' } }><FontAwesome name="whatsapp" size={ 25 } color='#2096F3' /> {` `}Whatsapp</Text>
                <Text style={ { fontSize: 14 } }>+966 53 908 2900</Text>
              </AboutCard>
          </TouchableOpacity>
            <AboutCard style={ { marginTop: 10 } }>
                <Text style={ { fontSize: 20, color: '#2096F3' } }><Entypo name="old-phone" size={ 25 } color='#2096F3' /> {` `}Landline</Text>
                {/* <Text style={ { fontSize: 14 } }></Text> */}
            </AboutCard>
            <AboutCard style={ { marginTop: 10 } }>
              <Text style={ { fontSize: 20, color: '#2096F3' } }><FontAwesome name="envelope-o" size={ 25 } color='#2096F3' /> {` `}Email address</Text>
                <Text style={ { fontSize: 14 } }>contact@pubhelper.com</Text>
            </AboutCard>
            <AboutCard style={ { marginTop: 20 } }>
                <Text style={ { fontSize: 20, color: '#2096F3' } }><Entypo name="location-pin" size={ 25 } color='#2096F3' /> {` `}Address</Text>
                <Text style={ { fontSize: 14 } }>Prince Mohamed Ben Saad Road,  Building #6427, First floor, office # 1&2, Al Malqa Neighborhood, P.O.Box 3254, post code:13524.  Riyadh, Kingdom of Saudi Arabia.</Text>
            </AboutCard>
          </AboutScreenWrapper>
        </ScrollView>
      </>
    );
  }
}


export default ContactDetails;
