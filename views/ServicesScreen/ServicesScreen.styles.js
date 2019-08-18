import styled from 'styled-components/native';

export const ServicesScreenWrapper = styled.View`
 flex: 1
`;

export const ServiceCard = styled.View`
  width: 320px;
  border-radius: 15px;
  background-color: #fff;
  elevation: 15;
  padding: 20px;
  flex: 1;
  align-items: center;
  flex-direction: row;
  margin-top: 20px;
  border: 1px solid #2096F3;
`;

export const ButtonLeft = styled.TouchableOpacity`
position: absolute;
left: 20px;
z-index: 4
`;

export const ButtonRight = styled.TouchableOpacity`
position: absolute;
right: 20px;
z-index: 4
`;

export const ButtonBottom = styled.TouchableOpacity`
  background-color: #2096F3;
  border-radius: 100px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 30px;
  padding-left: 30px;
  width: 150px;
  position: absolute;
  elevation: 5;
 `;
