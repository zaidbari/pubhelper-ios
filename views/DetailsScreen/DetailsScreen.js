import React, { PureComponent } from 'react';
import {RefreshControl, Image, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import { DetailsScreenWrapper, DetailsCard } from './DetailsScreen.styles';
import {NavigationEvents} from 'react-navigation';
var { width } = Dimensions.get( 'window' )
import { Content,Text } from 'native-base';
import axios from 'axios'
class DetailsScreen extends PureComponent { 
  constructor(props) {
    super( props );

    this.state = {
      leads: [],
      isLoading: true
    }
    this._onRefresh = this._onRefresh.bind( this )

    this._timeConverter = this._timeConverter.bind( this )
    this._servicesConverter = this._servicesConverter.bind( this )
    this._handleFetch = this._handleFetch.bind( this )

  }

  componentWillUnmount = () => {
    console.log('DetailsScreen will unmount');
  }

  _onRefresh = () => { 
    this._handleFetch()
  }

  _handleFetch = async () => {
    this.setState({leads: [], isLoading: true})

    const customerId = this.props.navigation.getParam('leadid')
    axios.get( `http://pubhelper.objapptive.com/leads/projects/${ customerId }` )
      .then( response => {
        this.setState( {
          leads: response.data,
          isLoading: false
        } )
      }
    )
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
    
      <>
        <NavigationEvents onDidFocus={ this._handleFetch } />
        { this.state.isLoading ?
          <DetailsScreenWrapper>
            <ActivityIndicator size="large" color="#2096f3" />
          </DetailsScreenWrapper> :
          <>
            <HeaderComponent title="Project Details" />
            <Image
              source={ require( '../../assets/bg.png' ) }
              style={ { position: 'absolute', top: -600, right: -160, width: 300 } }
              resizeMode="contain"
            />
            <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={ this.state.isLoading }
                onRefresh={ this._onRefresh }
              />
            }
            >
            <Content padder>
                { this.state.leads.filter(x => { return x.leadId == this.props.navigation.getParam('leadid') }).map( ( lead, index ) => (
                  <DetailsCard key={ index } style={ { marginLeft: ( width / 2 ) - 160 } }>
                    <Text style={ { color: "#2096f3", fontSize: 18 } }>
                      Created @:
                    <Text style={ { color: "#444" } }>{ ' ' }{ this._timeConverter( lead.createDate ) }</Text>
                    </Text>
                    <Text style={ { color: "#2096f3", fontSize: 18 } }>
                      Total Ammount:
                    <Text style={ { color: "#444" } }>{ ' ' }{ lead.totalAmount }</Text>
                    </Text>
                    <Text style={ { color: "#2096f3", fontSize: 18 } }>
                      Discount offered:
                    <Text style={ { color: "#444" } }>{ ' ' }{ lead.discount  }</Text>
                    </Text>
                    { lead.startDate !== null ? 
                      <>
                    <Text style={ { color: "#2096f3", fontSize: 18 } }>
                      Started @:
                    <Text style={ { color: "#444" } }>{ ' ' }{ this._timeConverter( lead.startDate ) }</Text>
                        </Text>
                   
                    </> :null
                    }
                    { lead.completeDate !== null ? 
                      <>
                    <Text style={ { color: "#2096f3", fontSize: 18 } }>
                      Completed @:
                    <Text style={ { color: "#444" } }>{ ' ' }{ this._timeConverter( lead.completeDate ) }</Text>
                        </Text>
                    <Text style={ { color: "#2096f3", fontSize: 18 } }>
                      Completing remarks:
                    <Text style={ { color: "#444" } }>{ ' ' }{  lead.completeRemarks }</Text>
                        </Text>
                    </> :null
                    }
                    { lead.closeDate !== null ? 
                      <>
                    <Text style={ { color: "#2096f3", fontSize: 18 } }>
                      Closed @:
                    <Text style={ { color: "#444" } }>{ ' ' }{ this._timeConverter( lead.closeDate ) }</Text>
                        </Text>
                    <Text style={ { color: "#2096f3", fontSize: 18 } }>
                      Completing remarks:
                    <Text style={ { color: "#444" } }>{ ' ' }{  lead.closeRemarks }</Text>
                        </Text>
                    </> :null
                    }
                    <Text style={ { color: "#2096f3", marginTop: 10 } }>
                      Required Services:
                    </Text>
                  
                    { lead.projectServices.map( ( service, index ) => (
                      <Text key={ index }>{ index + 1 }:{ ' ' }{ service.serviceName }</Text>
                    ))}
                    
                    <Text style={ {
                        color:
                          lead.status === "Pending Customer Approval" ? "#f0ad4e" : null ||
                            lead.status === "In Negotiation" ? "#62B1F6" : null ||
                              lead.status === "Initiated" ? "#5cb85c" : null ||
                                lead.status === "Project Initiated" ? "#5cb85c" : null ||
                                  lead.status === "Closed" ? "#d9534f" : null ||
                                    lead.status === "Completed" ? "#2096f3" : null
                        ,
                        marginTop: 20,
                        fontSize: 26
                        } }>
                        { lead.status }
                    </Text>
                  </DetailsCard>

                ) ) }

              </Content>
            </ScrollView>
          </>
        }
      </>
       
    );
  }
}


export default DetailsScreen;
