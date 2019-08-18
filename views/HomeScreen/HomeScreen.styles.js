import styled from 'styled-components/native';

export const HomeScreenWrapper = styled.View`
 flex: 1;
 align-items: center;
`;

// export const ButtonWrapper = styled.View`
//  flex: 1;
//  flex-direction: row;

//  justify-content: center;
//  align-items: center;
//  `;

 export const ButtonLeft = styled.TouchableOpacity`
  background-color: #2096F3;
  border-radius: 100px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 30px;
  padding-left: 30px;
  margin: 20px
  position: absolute;
  bottom: 30px;
  left: 10px;
  width: 150px
 `;
 export const ButtonRight = styled.TouchableOpacity`
  background-color: #2096F3;
  border-radius: 100px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 30px;
  padding-left: 30px;
  margin: 20px
  position: absolute;
  bottom: 30px;
  right: 10px;
  width: 150px

 `;

 
export const HomeCard = styled.View`
width: 320px;
padding-top: 25px;
padding-bottom: 25px;
padding-left: 30px;
padding-right: 30px;
elevation: 15;
border-radius: 15px;
background-color: #ffffff;
margin-bottom: 30px
`;