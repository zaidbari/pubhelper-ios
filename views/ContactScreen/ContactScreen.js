import React from 'react';
import { View, ScrollView, Image, Keyboard, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios'
import { NavigationEvents } from 'react-navigation';

import { ContactScreenWrapper } from './ContactScreen.styles'
import {
  Toast,
  Body,
  Content,
  Icon,
  Form,
  Item,
  Picker,
  Label,
  Input,
  Text,
  ListItem,
  CheckBox,
  Button
} from 'native-base'
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import { AboutCard, AboutScreenWrapper } from '../AboutScreen/AboutScreen.styles';
import { AuthConsumer } from '../../helpers/AuthContext';
class ContactScreen extends React.Component {
  constructor ( props ) {
    super( props );
    this.state = {
      title: 'Mr',
      firstName: '',
      middleName: '',
      lastName: '',
      primaryEmail: '',
      city: '',
      secondaryEmail: '',
      phone: '',
      contactBy: '',
      suitableTime: '',
      placeOfWork: '',
      message: [],
      serviceRequired: [],
      services: [],
      isLoading: true,
      showToast: false,
      disabled: false,
    };
    this._handleValueChange = this._handleValueChange.bind( this )
    this._handleCheckboxChange = this._handleCheckboxChange.bind( this );
    this._handleSubmit = this._handleSubmit.bind( this );
    this._handleFetch = this._handleFetch.bind( this )

  }

  _handleFetch (user) {
    console.log(user)
    if ( user !== null ) {
      axios.get( `http://pubhelper.objapptive.com/customers/${ user.customerId }` ).then( response => {

        const user = response.data
        console.log(user)
        this.setState( {
          title: user.title,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          primaryEmail: user.primaryEmail,
          phone: user.phone,
          placeOfWork: user.placeOfWork,
          city: user.city,
          secondaryEmail: user.secondaryEmail
        })
      })
    }
    
    axios.get( 'http://pubhelper.objapptive.com/services' )
    .then( response => {
      this.setState( { services: response.data, isLoading: false } );
    } )
    .catch( e => {
      console.log( e );
    } )
  }

  _handleValueChange ( value, name ) {
    this.setState( {
      [ name ]: value
    } );
  }
  _handleCheckboxChange ( value ) {
console.log(this.state.serviceRequired)
    if ( this.state.serviceRequired.filter( e => e === value ) != value )
      this.setState( prevState => ( {
        serviceRequired: [ ...prevState.serviceRequired, value ],
      } ) );
    else {
      this.setState( {
        serviceRequired: this.state.serviceRequired.filter( e => e !== value )
      } );
    }
  }

  _handleSubmit ( ) {
    var body = this.state

    if ( !this.state.serviceRequired.length ) {
      Toast.show( {
        text: "Please check atleast one service",
        buttonText: "Okay",
        position: "top",
        type: "danger",
        duration: 10000

      } )
    }
    else
    axios( {
      method: 'post',
      url: 'http://pubhelper.objapptive.com/customers',
      data: JSON.stringify( body ),

    } )
      .then( response => {
        console.log( response.data )
        if ( response.data.error && response.data.error !== null ) {
          Toast.show( {
            text: response.data.error,
            buttonText: "Okay",
            position: "top",
            type: "danger",
            duration: 10000

          } )
        }
        else {
          this.setState( { disabled: true } )
          Alert.alert(
            'Success',
            'Thankyou for contacting us. We will get in touch with you soon.',
            [
              {
                text: 'Ok', onPress: () => this.setState( {
                  title: 'Mr',
                  firstName: '',
                  middleName: '',
                  lastName: '',
                  primaryEmail: '',
                  city: '',
                  secondaryEmail: '',
                  phone: '',
                  contactBy: '',
                  suitableTime: '',
                  placeOfWork: '',
                  message: [],
                  serviceRequired: [],
                }, () => this.props.navigation.navigate( 'Home' ) )
              },
            ],
            { cancelable: false },
          )
        }
      } )
      .catch( error => {
        console.log( error );
      } );
  }
  render () {
    return (
      <AuthConsumer>
        { ( { user } ) => (
          <>
              <NavigationEvents onDidFocus={ () => this._handleFetch( user ) } /> 
            { this.state.isLoading ?
              <ContactScreenWrapper>
                <ActivityIndicator size="large" color="#2096f3" />
              </ContactScreenWrapper> :
              <View style={ { paddingBottom: 80 } }>
                <HeaderComponent title="Order now" />
                <Image
                  source={ require( '../../assets/bg.png' ) }
                  style={ { position: 'absolute', top: -600, right: -160, width: 300 } }
                  resizeMode="contain"
                />
                <ScrollView>
                  <AboutScreenWrapper>
                    <AboutCard style={ { width: 350, marginTop: 20 } }>
                      <Form>
                        <Content padder>
                          <Item picker>
                            <Picker
                              mode="dropdown"
                              iosIcon={ <Icon name="arrow-down" /> }
                              style={ { width: "100%" } }
                              placeholder="Title"
                              placeholderStyle={ { color: "#bfc6ea" } }
                              placeholderIconColor="#007aff"
                              selectedValue={ this.state.title }
                              onValueChange={ ( value ) => this._handleValueChange( value, 'title' ) }
                            >
                              <Picker.Item label="Mr." value="Mr." />
                              <Picker.Item label="Ms." value="Ms." />
                              <Picker.Item label="Dr." value="Dr." />
                              <Picker.Item label="Medical Intern" value="Medical Intern" />
                              <Picker.Item label="Student" value="Student" />
                              <Picker.Item label="Lecturer/Demonstrator" value="Lecturer/Demonstrator" />
                              <Picker.Item label="Assistant Professor" value="Assistant Professor" />
                              <Picker.Item label="Professor" value="Professor" />
                              <Picker.Item label="Other" value="Other" />
                            </Picker>
                          </Item>
                        </Content>
                        <Item floatingLabel>
                          <Label>First Name*</Label>
                          <Input
                            
                            value={ this.state.firstName }
                            type="text"
                            onChangeText={ ( value ) => this._handleValueChange( value, 'firstName' ) }
                            onSubmitEditing={ Keyboard.dismiss }
                            autoCorrect={ false }
                            name="firstName"
                          />
                        </Item>
                        <Item floatingLabel>
                          <Label>Middle Name</Label>
                          <Input
                            value={ this.state.middleName }

                            type="text"
                            onChangeText={ ( value ) => this._handleValueChange( value, 'middleName' ) }
                            onSubmitEditing={ Keyboard.dismiss }
                            autoCorrect={ false }
                            name="middleName"
                          />
                        </Item>
                        <Item floatingLabel>
                          <Label>Last Name*</Label>
                          <Input
                            value={ this.state.lastName }

                            type="text"
                            onChangeText={ ( value ) => this._handleValueChange( value, 'lastName' ) }
                            onSubmitEditing={ Keyboard.dismiss }
                            autoCorrect={ false }
                            name="lastName"
                          />
                        </Item>
                        <Item floatingLabel>
                          <Label>Affiliation/Place of Work</Label>
                          <Input
                            value={ this.state.placeOfWork }

                            type="text"
                            onChangeText={ ( value ) => this._handleValueChange( value, 'placeOfWork' ) }
                            onSubmitEditing={ Keyboard.dismiss }
                            autoCorrect={ false }
                            name="placeOfWork"
                          />
                        </Item>
                        <Item floatingLabel>
                          <Label>City</Label>
                          <Input
                            value={ this.state.city }

                            type="text"
                            onChangeText={ ( value ) => this._handleValueChange( value, 'city' ) }
                            onSubmitEditing={ Keyboard.dismiss }
                            autoCorrect={ false }
                            name="city"
                          />
                        </Item>
                        <Item floatingLabel>
                          <Label>Phone Number*</Label>
                          <Input
                            value={ this.state.phone }

                            type="text"
                            onChangeText={ ( value ) => this._handleValueChange( value, 'phone' ) }
                            onSubmitEditing={ Keyboard.dismiss }
                            autoCorrect={ false }
                            name="phone"
                            keyboardType="number-pad"

                          />
                        </Item>
                        <Item floatingLabel>
                          <Label>Primary Email*</Label>
                          <Input
                            value={ this.state.primaryEmail }

                            type="text"
                            onChangeText={ ( value ) => this._handleValueChange( value, 'primaryEmail' ) }
                            onSubmitEditing={ Keyboard.dismiss }
                            autoCorrect={ false }
                            name="primaryEmail"
                            keyboardType="email-address"

                          />
                        </Item>
                        <Item floatingLabel>
                          <Label>Secondary Email</Label>
                          <Input
                            value={ this.state.secondaryEmail }

                            type="text"
                            keyboardType="email-address"
                            onChangeText={ ( value ) => this._handleValueChange( value, 'secondaryEmail' ) }
                            onSubmitEditing={ Keyboard.dismiss }
                            autoCorrect={ false }
                            name="secondaryEmail"
                          />
                        </Item>
                        <Content padder>
                          <Item picker>
                            <Picker
                              mode="dropdown"
                              iosIcon={ <Icon name="arrow-down" /> }
                              style={ { width: "100%" } }
                              placeholder="How can we contact you?"
                              placeholderStyle={ { color: "#bfc6ea" } }
                              placeholderIconColor="#007aff"
                              selectedValue={ this.state.contactBy }
                              onValueChange={ ( value ) => this._handleValueChange( value, 'contactBy' ) }
                            >
                              <Picker.Item label="How can we contact you?*" value="how" />
                              <Picker.Item label="Phone" value="Phone" />
                              <Picker.Item label="Email" value="Email" />

                            </Picker>
                          </Item>
                        </Content>
                        <Content padder>
                          <Item picker>
                            <Picker
                              mode="dropdown"
                              iosIcon={ <Icon name="arrow-down" /> }
                              style={ { width: "100%" } }
                              placeholder="How can we contact you?"
                              placeholderStyle={ { color: "#bfc6ea" } }
                              placeholderIconColor="#007aff"
                              selectedValue={ this.state.suitableTime }
                              onValueChange={ ( value ) => this._handleValueChange( value, 'suitableTime' ) }
                            >
                              <Picker.Item label="Suitable time to contact you?*" value="mor" />
                              <Picker.Item label="Morning" value="Morning" />
                              <Picker.Item label="Evening" value="Evening" />

                            </Picker>
                          </Item>
                          <Text style={ { fontSize: 20 } }>Select a service</Text>
                        </Content>
                        { this.state.services.filter( x => {
                          return x.parentId == null
                        } ).map( ( service, index ) => (
                          <ListItem key={ index } onPress={ () => this._handleCheckboxChange( service.name ) } >
                            <CheckBox
                              value={ service.name }
                              onPress={ () => this._handleCheckboxChange( service.name ) }
                              checked={ this.state.serviceRequired.filter( e => e === service.name )[ 0 ] === service.name }
                            />
                            <Body>
                              <Text>{ service.name }</Text>
                            </Body>
                          </ListItem>
                        ) )
                        }
                        <ListItem onPress={ () => this._handleCheckboxChange( 'Participate in a research' ) } >
                          <CheckBox value={ `Participate in a research` }
                            checked={ this.state.serviceRequired.filter( e => e === 'Participate in a research' )[ 0 ] === 'Participate in a research' }
                          />
                          <Body>
                            <Text>{ `Participate in a research` }</Text>
                          </Body>
                        </ListItem>
                        <Button disabled={ this.state.disabled } full rounded style={ { backgroundColor: '#2096F3', marginTop: 10 } } onPress={ this._handleSubmit }><Text>Submit</Text></Button>
                      </Form>
                    </AboutCard>
                  </AboutScreenWrapper>
                </ScrollView>
              </View> }

          </>
        ) }
      </AuthConsumer>
    );
  }
}


export default ContactScreen;
