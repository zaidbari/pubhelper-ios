import React from 'react'
import axios from 'axios'
import { Toast } from 'native-base'
const AuthContext = React.createContext()

class AuthProviders extends React.Component {
  constructor () {
    super()
    this.state = {
      isAuth: false,
      user: null,
      isLoading: false
    }
    this.login = this.login.bind( this )
    this.logout = this.logout.bind( this )
  }
  login ( email, redirect ) {
    this.setState({isLoading: true})
    axios.post( 'http://pubhelper.objapptive.com/login/pwdless ', JSON.stringify( { email: email } ) )
      .then( response => {
        if ( response.data.success !== undefined ) {
          console.log(response.data.success)
          this.setState(
            {
              user: response.data.success,
              isAuth: true,
              isLoading: false
            }
          )
          redirect.navigate( 'Dashboard' )
        }
        else {
          this.setState( { error: response.data.error, showToast: true, disabled: true, isLoading: false }, () => {
            Toast.show( {
              text: "Input correct email address",
              buttonText: "Okay",
              position: "top",
              type: "warning",
              duration: 3000
            } )
          } )
        }
      } )
      .catch( error => {
        console.log( error );
        this.setState( { error: "Something Went wrong. Please contact Administartor", showToast: true, isLoading: false }, () => {
          Toast.show( {
            text: this.state.error,
            buttonText: "Okay",
            position: "top",
            type: "danger",
            duration: 3000
          } )
        } )
      } )
  }
  logout (redirect) {
    this.setState( { isAuth: false, user: null }, () => redirect.navigate('Home') )
  }
  render () {
    return (
      <AuthContext.Provider
        value={ {
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout,
          user: this.state.user,
          isLoading: this.state.isLoading
        } }
      >
        { this.props.children }
      </AuthContext.Provider>
    )
  }
}
const AuthConsumer = AuthContext.Consumer
const AuthProvider = AuthProviders
export { AuthProvider, AuthConsumer }


