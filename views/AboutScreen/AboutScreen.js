import React, { PureComponent } from 'react';
import { Image, ScrollView, Text } from 'react-native';
import { AboutScreenWrapper, AboutCard } from './AboutScreen.styles';
import HeaderComponent from '../HeaderComponent/HeaderComponent';

class AboutScreen extends PureComponent {
  render () {
    return (
      <>
        <HeaderComponent title="About us" />
        <Image
          source={ require( '../../assets/bg.png' ) }
          style={ { position: 'absolute', top: -600, right: -160, width: 300 } }
          resizeMode="contain"
        />
        <ScrollView>
          <AboutScreenWrapper>
            <AboutCard style={ { marginTop: 20 } }>
              <Text style={ { fontSize: 20, color: '#2096F3' } }>Our Mission</Text>
              <Text style={ { fontSize: 14 } }>We aim to allow any individual who is struggling with a practice aspect of research to surmount the problem. This is accomplished by not only providing a service that can tackle it for them but also to provide detailed reasons and explanations for each step so that in future, the individual has learnt enough to not make the same mistakes twice.</Text>
            </AboutCard>
            <AboutCard style={ { marginTop: 20 } }>
              <Text style={ { fontSize: 20, color: '#2096F3', marginTop: 10 } }>Our Vision</Text>
              <Text style={ { fontSize: 14 } }>To provide aspiring researchers with the skills and knowledge required to take on any future project with confidence</Text>
            </AboutCard>
            <AboutCard style={ { marginTop: 20 } }>
              <Text style={ { fontSize: 20, color: '#2096F3', marginTop: 10 } }>Company History</Text>
              <Text style={ { fontSize: 14 } }>Research is a difficult task to accomplish for even the most experienced scientist. The eleboration of the hypothesis alone can be challenging and time consuming needing to be pondered at length to assess its validity. When adding to this the creation of an appropriate testing method which requires precise and full proof tools to reach acceptable results; and the presentation of the experiment to the general public, which can be difficult to phrase at the best of times, leads many people to simply abandon the idea of conducting research.</Text>
              <Text style={ { fontSize: 14, marginTop: 10 } }>Our company was founded to try and teach aspiring researchers to convert the seemingly insurmountable obstacle into a manageable set of goals, a check-list if you will. There are 100 of companies that provide simple services for research. Their aim is to take the work or difficulties from individual and for a free, return the problem solved. This may be an effecient way to circumvent a problem but it doesnot solve it. Why was this test used? Why was this reference removed? These are the questions one should ask oneself so as to do better next time. And these are the questions we intend to answer.</Text>
            </AboutCard>
          </AboutScreenWrapper>
        </ScrollView>
      </>
    );
  }
}
export default AboutScreen;
