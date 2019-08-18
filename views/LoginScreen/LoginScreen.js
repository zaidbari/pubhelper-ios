import React from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { LoginScreenWrapper } from './LoginScreen.styles';
import { Form, Item, Input, Label, Icon, Button, Text, Toast } from 'native-base';
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import * as EmailValidator from 'email-validator';
import { AuthConsumer } from '../../helpers/AuthContext';
class LoginScreen extends React.Component {
  constructor ( props ) {
    super( props );
    this.state = {
      secure: true,
      email: '',
      error: null,
      showToast: false,
      data: null,
      loginIn: false,
      disabled: true
    }

    this._changeIcon = this._changeIcon.bind( this )
    this._handleChange = this._handleChange.bind( this )
  }

  _handleChange ( text, name ) {
    this.setState( {
      [ name ]: text
    } )
  }
  _handelValidation () {
    if ( EmailValidator.validate( this.state.email ) ) {
      this.setState( { disabled: false } )
    } else {
      this.setState( { disabled: true } )
      Toast.show( {
        text: "Please input a valid email address",
        buttonText: "Okay",
        position: "top",
        type: "danger",
        duration: 3000

      } )
    }
  }

  _changeIcon () {
    this.setState( prevState => ( {
      icon: prevState.icon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      secure: !prevState.secure
    } ) )
  }

  render () {
    return (
      <AuthConsumer>
        { ( { login, isLoading } ) => (
          <>
            
            <HeaderComponent title="Login" />

            <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
              <LoginScreenWrapper>
                <Image
                  source={ require( '../../assets/bg.png' ) }
                  style={ { position: 'absolute', top: -600, right: -160, width: 300 } }
                  resizeMode="contain"
                />
                <Form style={ { width: 300, paddingTop: 30 } }>
                  <Item floatingLabel>
                    <Label >Email</Label>
                    <Input
                      type="email"
                      onChangeText={ ( text ) => this._handleChange( text, 'email' ) }
                      name="email"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      onSubmitEditing={ Keyboard.dismiss }
                      autoCorrect={ false }
                      required
                      onBlur={ ( text ) => this._handelValidation( text ) }
                    />
                    <Icon style={ { color: '#2096F3' } } name="ios-mail" />
                  </Item>
                  <Button
                    bordered
                    rounded
                    block
                    iconRight
                    style={ {
                      marginTop: 30,
                      width: '60%',
                      marginLeft: '20%',
                      opacity: this.state.disabled ? 0.6 : 1,
                      backgroundColor: this.state.disabled ? '#999' : '#2096F3'
                    } }
                    onPress={ () => login(this.state.email, this.props.navigation) }
                    disabled={ this.state.disabled }
                  >
                    { !isLoading ? <Text style={ { color: "#fff" } }>Login</Text> : <ActivityIndicator size="large" color="#fff" /> }
                    { !isLoading ? <Icon name='ios-log-in' style={ { color: "#fff" } } /> : null }

                  </Button>
                </Form>
              </LoginScreenWrapper>
            </TouchableWithoutFeedback>
          </>
        ) }
      </AuthConsumer>
    );
  }
}

export default LoginScreen;
