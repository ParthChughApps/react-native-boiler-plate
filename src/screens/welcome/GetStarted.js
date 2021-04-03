import React, {useContext, useState} from 'react';
import {UserContext} from '../../contexts/user';
import {StyleSheet, Dimensions} from 'react-native';
import {
  View,
  Text,
  Colors,
  Button,
  TouchableOpacity,
} from 'react-native-ui-lib';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const GetStartedView = props => {
  const {
    navigation: {navigate},
    route,
  } = props;

  const [loginType, setLoginType] = useState('');
  const {userDispatch} = useContext(UserContext);

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

  const CardDisplay = data.map((item, key) => {
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
                <Text style={styles.demoUserText}>{item.text}</Text>
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
    <View style={styles.container}>
      <Header />
      <View>
        {CardDisplay}
        <View style={{marginTop: '8%'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              userDispatch({type: 'LOGIN_TYPE', payload: loginType});
              navigate('authentication', {params: loginType});
            }}>
            <Text style={styles.buttonText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </View>
  );
};

export default GetStartedView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 25,
    fontFamily: 'SofiaProRegular',
    color: '#ffffff',
    alignSelf: 'center',
  },
});
