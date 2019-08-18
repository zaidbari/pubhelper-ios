import React, { PureComponent } from 'react';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign  from 'react-native-vector-icons/AntDesign'
import { ServiceCard, ButtonBottom } from './ServicesScreen.styles';
import { Dimensions, Image, View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
var { height, width } = Dimensions.get( 'window' )

class ServicesScreen extends PureComponent {
  constructor ( props ) {
    super( props );
    this.state = {
      hasError: false,
    };
  }
  render () {
    return (
      <View style={ { position: 'relative' } }>
        <Image
          source={ require( '../../assets/bg.png' ) }
          style={ { position: 'absolute', top: -600, right: -160, width: 300 } }
          resizeMode="contain"
        />
        <HeaderComponent title="Service" />
        <ScrollView>
          <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', paddingVerticle: 50 }}>
            <ServiceCard>
              <FontAwesome color="#2096F3" size={ 35 } style={{marginRight: 20}} name={ `pie-chart` } />
              <Text style={ { fontSize: 16 } }>{ `Biostatistics` }</Text>
            </ServiceCard>
            <ServiceCard>
              <FontAwesome color="#2096F3" size={ 35 } style={{marginRight: 20}} name={ `handshake-o` } />
              <Text style={ { fontSize: 16 } }>{ `Publishing Support` }</Text>
            </ServiceCard>
            <ServiceCard>
              <Entypo color="#2096F3" size={ 35 } style={{marginRight: 20}} name={ `text-document` } />
              <Text style={ { fontSize: 16 } }>{ `Data Services` }</Text>
            </ServiceCard>
            <ServiceCard>
              <FontAwesome color="#2096F3" size={ 35 } style={{marginRight: 20}} name={ `pencil` } />
              <Text style={ { fontSize: 16 } }>{ `Editing and Writing Service` }</Text>
            </ServiceCard>
            <ServiceCard>
              <Entypo color="#2096F3" size={ 35 } style={{marginRight: 20}} name={ `flow-tree` } />
              <Text style={ { fontSize: 16 } }>{ `Methodology` }</Text>
            </ServiceCard>
            <ServiceCard>
              <AntDesign  color="#2096F3" size={ 35 } style={{marginRight: 20}} name={ `solution1` } />
              <Text style={ { fontSize: 16 } }>{ `Conference Paper Assistance` }</Text>
            </ServiceCard>
            <ServiceCard style={{marginBottom: 170}}>
              <Entypo  color="#2096F3" size={ 35 } style={{marginRight: 20}} name={ `lab-flask` } />
              <Text style={ { fontSize: 16 } }>{ `Participate in a research` }</Text>
            </ServiceCard> 
          </View>
        </ScrollView>
        <ButtonBottom  onPress={() => this.props.navigation.navigate('Contact')} style={ { left: ( width / 2 ) - 75, top: height - 120 } }>
          <Text style={ { color: '#fff', fontSize: 14, textAlign: 'center' } }>Order now</Text>
        </ButtonBottom>
      </View>
    );
  }
}


export default ServicesScreen;
