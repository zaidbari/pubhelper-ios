import React from 'react';
import { ScrollView, ActivityIndicator, Dimensions, Image, View  } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import axios from 'axios';
import { Content, Text, Button } from 'native-base';

import { DashboardScreenWrapper, DashboardCard } from './DashboardScreen.styles';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import { AuthConsumer } from '../../helpers/AuthContext';
var { width } = Dimensions.get( 'window' )

class DashboardScreen extends React.Component {
  constructor ( props ) {
    super( props );
    this.state = {
      name: 'Customer',
      leads: [],
      isLoading: true,
      error: null
    }

    this._timeConverter = this._timeConverter.bind( this )
    this._servicesConverter = this._servicesConverter.bind( this )
    this._handleFetch = this._handleFetch.bind( this )
  }

  _handleFetch = async ( user, isAuth ) => {
    if ( !isAuth ) { this.props.navigation.navigate( 'Login' ) }
    else{
    this.setState( { leads: [], isLoading: true } )

    axios.get( `http://pubhelper.objapptive.com/customers/leads/${ user.customerId }` )
      .then( response => {
        console.log( response.data )
        if ( response.data.error ) {
          this.setState( {
            error: response.data.error,
            isLoading: false
          } )
        } else
          this.setState( {
            leads: response.data,
            isLoading: false
          } )
      } )}
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
      var time = date + '/' + month + '/' + year + ' @ ' + hour + ':' + min
      return time;
    }
  }
  _servicesConverter ( serviceList ) { return serviceList.split( ',' ) }

  render () {
    return (
      <AuthConsumer>
        { ( { user, logout, isAuth } ) => (
          <>
            <NavigationEvents onDidFocus={ () => this._handleFetch( user, isAuth ) } />

            { this.state.isLoading ?
              <DashboardScreenWrapper>
                <ActivityIndicator size="large" color="#2096f3" />
              </DashboardScreenWrapper> :
              <>
                <Image
                  source={ require( '../../assets/bg.png' ) }
                  style={ { position: 'absolute', top: -600, right: -160, width: 300 } }
                  resizeMode="contain"
                />
                <HeaderComponent title="Dashboard" />
                <ScrollView>

                  <Content padder style={{marginBottom: 50}}>
                    { this.state.error !== null ?
                      <DashboardCard style={ { marginLeft: ( width / 2 ) - 160 } }>
                        <Text style={ { color: "#2096f3", fontSize: 18 } }>
                          Order recieved. We will get back to you soon.
                        </Text>
                      </DashboardCard> :
                      <>
                        { this.state.leads.map( ( lead, index ) => (
                          <DashboardCard key={ index } style={ { marginLeft: ( width / 2 ) - 160 } }>
                            <Text style={ { color: "#2096f3", fontSize: 18 } }>
                              Created @:
                              <Text style={ { color: "#444" } }>{ ' ' }{ this._timeConverter( lead.createDate ) }</Text>
                            </Text>

                            <Text style={ { color: "#2096f3", marginTop: 10 } }>
                              Required Services:
                            </Text>

                            { this._servicesConverter( lead.message ).map( ( service, index ) => (
                              <Text key={ index } style={ { color: "#444" } }>{ index + 1 }:{ ' ' }{ service }</Text>
                            ) )
                            }
                            <View style={ { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } }>

                              <Text style={ {
                                color:
                                  lead.status === "Pending" ? "#f0ad4e" : null ||
                                    lead.status === "In Negotiation" ? "#62B1F6" : null ||
                                      lead.status === "Project Initiat" ? "#5cb85c" : null ||
                                        lead.status === "Project Initiated" ? "#5cb85c" : null ||
                                          lead.status === "Closed" ? "#d9534f" : null ||
                                            lead.status === "Completed" ? "#2096f3" : null
                                ,
                                marginTop: 20,
                                fontSize: 26
                              } }>
                                { lead.status }
                              </Text>
                              <Button onPress={ () => this.props.navigation.navigate( 'Details', { leadid: lead.id } ) } style={ { backgroundColor: '#2096f3', marginTop: 20 } } small rounded>
                                <Text>Details</Text>
                              </Button>
                            </View>
                          </DashboardCard>

                        ) )
                        }
                      </>
                    }

                  </Content>
                </ScrollView>
              </>
            }
            <Button full style={{position: 'absolute', bottom: 0, width: width, backgroundColor: '#2096f3'}} onPress={ () => logout(this.props.navigation) }><Text>Logout</Text></Button>
          </>
        ) }
      </AuthConsumer>
    );
  }
}

export default DashboardScreen;
