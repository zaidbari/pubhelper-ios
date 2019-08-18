import React, { Component } from 'react';
import {
  Button,
  Icon
} from 'native-base';
import { HeaderComponentWrapper, Title } from './HeaderComponent.styles';
import { withNavigation } from 'react-navigation'

class HeaderComponent extends Component { 
  constructor(props) {
    super(props);
  }
  render () {
   
    return (
      <HeaderComponentWrapper>
          <Button transparent onPress={() => this.props.navigation.toggleDrawer() }>
            <Icon  style={{fontSize: 30, color: '#333333'}} name="md-menu" />
            <Title>{ this.props.title }</Title>
          </Button>
      </HeaderComponentWrapper>
    );
  }
}

export default withNavigation(HeaderComponent);
