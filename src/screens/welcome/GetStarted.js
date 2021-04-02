import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/user'
import { StyleSheet, Dimensions } from 'react-native'
import {View, Text, Colors, Button, TouchableOpacity} from 'react-native-ui-lib';
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import {GetStarted} from '../../assets/svgs'
const height = Dimensions.get('window').height;
export default function GetStartedView(props) {
  const {navigation: {navigate}, route} = props;
  const [loginType, setLoginType] = useState('');
  const { userDispatch } = useContext(UserContext)
  const data = [
    {
      title: 'STUDENT',
      text: 'S',
      description: 'Registered Student of the class',
      borderColor: '#3087d9',
    },
    {
      title: 'PARENT',
      text: 'P',
      description: 'Parent of Registered Student of the class',
      borderColor: '#3087d9',
    },
    {
      title: 'DEMO USER',
      text: 'D',
      description: 'Demo users who want to experience & purchase courses',
      borderColor: '#3087d9',
    },
  ];

  let CardDisplay = data.map((item, key) => {
    return (
      <View>
        <TouchableOpacity
          key={key}
          onPress={() => {
            setLoginType(item.title);
          }}>
          <View
            style={
              item.title === loginType
                ? {
                    flexDirection: 'row',
                    width: '90.3%',
                    borderWidth: 1,
                    marginLeft: '6.3%',
                    marginTop: 25,
                    borderTopWidth: 6,
                    borderTopColor: Colors.baseColor,
                    borderLeftWidth: 6,
                    borderLeftColor: Colors.baseColor,
                  }
                : {
                    flexDirection: 'row',
                    width: '90.3%',
                    borderWidth: 1,
                    marginLeft: '6.3%',
                    marginTop: 25,
                    borderBottomWidth: 6,
                    borderBottomColor: item.borderColor,
                    borderRightWidth: 6,
                    borderRightColor: item.borderColor,
                  }
            }>
            {item.image ? (
              <Image source={item.image} style={styles.image} />
            ) : (
              <View style={styles.demoUser}>
                <Text style={styles.demoUserText}>D</Text>
              </View>
            )}

            <View style={styles.cardText}>
              <Text style={styles.userTitle}>{item.title}</Text>
              <Text style={styles.userDecription}>{item.description}</Text>
            </View>
            
          </View>
          
        </TouchableOpacity>
      </View>
    );
  });
  return (
    <View>
      <Header />
      {CardDisplay}
      <View style={{marginTop: '8%'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            userDispatch({type: "LOGIN_TYPE", payload: loginType})
            navigate('authentication', {params: loginType})
          }}>
            
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
  },
  image: {
    height: 78,
    width: 78,
    marginTop: 6,
    marginLeft: 3,
    marginBottom: 6.9,
  },
  headerText: {
    flex: 1,
    marginLeft: 20.1,
    marginRight: 20.1,
    width: '61.8%',
    marginTop: '5.1%',
  },
  seprator: {
    color: '#cbcbcb',
    marginTop: 35.7,
    marginLeft: 25.5,
    marginRight: 19.5,
    borderWidth: 0.3,
  },
  text: {
    marginTop: 20,
    alignSelf: 'center',
    color: '#4d4d4d',
    fontSize: 16,
    fontFamily: 'SofiaProRegular',
  },
  userTitle: {
    color: '#4d4d4d',
    fontSize: 22,
    fontFamily: 'SofiaProRegular',
  },
  userDecription: {
    color: '#4d4d4d',
    fontSize: 12.9,
    marginTop: 8.1,
    fontFamily: 'SofiaProRegular',
  },
  demoUser: {
    height: 78,
    width: 78,
    marginTop: 6,
    marginLeft: 3,
    marginBottom: 6.9,
  },
  demoUserText: {
    fontSize: 48,
    color: '#4d4d4d',
    marginTop: 6,
    marginLeft: 3,
    textAlign: 'center',
    marginBottom: 6.9,
  },
  card: {
    flexDirection: 'row',
    width: '90.3%',
    borderWidth: 1,
    marginLeft: '6.3%',
    marginTop: 48,
    borderBottomWidth: 6,
    borderBottomColor: '#3087d9',
    borderRightWidth: 6,
    borderRightColor: '#3087d9',
  },
  cardText: {
    flex: 1,
    marginLeft: 12,
    alignSelf: 'center',
  },
  button: {
    width: '90.3%',
    marginLeft: '6.3%',
    padding: 8,
    backgroundColor: '#3087d9',
  },
  buttonText: {
    fontSize: 24.9,
    fontFamily: 'SofiaProRegular',
    color: '#ffffff',
    alignSelf: 'center',
    
  },
});