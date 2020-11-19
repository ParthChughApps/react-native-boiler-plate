import React,{useEffect, useState} from 'react';
import {View, TextInput,Text, ActivityIndicator, BackHandler, ToastAndroid} from 'react-native';
import PropTypes from 'prop-types';
import * as LoginActionCreators from '../../actions/LoginActions';
import { withTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { toJS } from '../to-js'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import {useForm, Controller} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import {DatePicker, CheckBox} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import {connect} from 'react-redux';
import Dialog from '../CustomDialog'
import styles from './styles';
import Layout from '../Layout';
import ShowQuestions from './ShowQuestions';

const Quiz = (props) => {
  Quiz.propTypes = {
    LoginActions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
  };
  
  const {auth, 
    t,
    navigation: { navigate },
    route: {params: {subject, topBar}},
    navigation,
    
  } = props; 
  const [backButtonDialogVisible, setBackButtonDialogVisible] = useState(false);
  
  navigation.setOptions({
    title: topBar
  })

  function handleBackButtonClick() {
    // navigation.goBack();
    setBackButtonDialogVisible(true)
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  const {control, handleSubmit, errors, watch} = useForm();
  const [dialogVisible, setDialogVisible] = useState(false);
  
  const [level, updateLevel] = useState([]);
  const [test, updateTest] = useState([]);
  const [testData, updateTestData] = useState([]);
  
  useEffect(() => {
    // updateVisible(true)
  }, [])
  
  const difficulties = ['basic', 'intermediate', 'hard'];

  const updateCheckbox = (data) => {
    if(level.includes(data)) {
      updateLevel(level.filter(e => e !== data))
    } else {
      updateLevel(level.concat(data))
    }
  }

  const onSubmit = () => {
    if(level.length === 0 ) {
      ToastAndroid.show("Please solve all the problems", ToastAndroid.SHORT);
    } else if(test.length === 0 ) {
      ToastAndroid.show("Please add one or more questions", ToastAndroid.SHORT);
    } else {
      firestore()
      .collection('tests')
      .add({
        name: {
          en_IN: testData.name_en,
          hi_IN: testData.name_hi,
        },
        time: parseInt(testData.time) * 60,
        total_questions: testData.total_questions,
        questions: test
      })
      .then((data) => {
        firestore()
          .collection('subjects')
          .doc(Object.keys(subject)[0])
          .update({ tests: firestore.FieldValue.arrayUnion(data)})
          .then(() => {       
            navigation.pop()
          });
      });
    }
  }

  const onSubmitTest = (data) => {
    updateTestData(data);
    setDialogVisible(true)
  }

  return (
    <Layout>
      <Dialog
        title={t('Are you sure you want to submit the test')}
        heading={t(`Add Test`)}
        buttonText={t(`OK`)}
        isVisible={dialogVisible}
        onReject={()=> setDialogVisible(false)}
        onAccept={() => {
          setDialogVisible(false)
          onSubmit()
        }
        }
      />
      <Dialog
        heading={"Caution"}
        title={'Are you sure you want to go back?'}
        buttonText={t('Ok')}
        isVisible={backButtonDialogVisible}
        onReject={()=> setBackButtonDialogVisible(false)}
        onAccept={() => {
          setBackButtonDialogVisible(false)
          navigation.goBack();
        }
        }
      />
      <ScrollView>
      <View style={{borderWidth: 1, borderColor: 'gray', borderRadius: 10,marginBottom: 20}}>
          <Text style={{paddingLeft: 30,marginBottom: 20}}>Basic Questions</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',marginBottom: 20}}>
              {difficulties.map(element => (
                <View style={{flexDirection: 'row'}}>
                  <CheckBox checked={level.includes(element)} style={{marginRight: 20}} onPress={() => updateCheckbox(element)} />
                  <Text style={{color: 'white'}}>{element}</Text>
                </View>
              ))}
              
            </View>
            {level.length === 0  ?
              <Text style={{color: 'red', marginBottom: 5, paddingLeft: 25}}>
                {t('This is required')}
              </Text>   
              : <Text />
            }
          <View style={{alignItems: 'center', }}>
          
            <View>
              <Controller
                as={<TextInput placeholderTextColor = "#FFFFFF" keyboardType="number-pad" />}
                control={control}
                rules={{required: true}}
                style={[styles.input]}
                name="time"
                placeholder={t('Time in minutes')}
                onChange={args => args[0].nativeEvent.text}
                defaultValue=""
              />
              {errors.time ? (
                  <Text style={{color: 'red', marginBottom: 5}}>
                    {t('This is required')}
                  </Text> 
                ) : <Text style={{marginBottom: 5}} />}
            </View>
            <View>
              <Controller
                as={<TextInput placeholderTextColor = "#FFFFFF" keyboardType="number-pad" />}
                control={control}
                rules={{required: true}}
                style={[styles.input]}
                name="total_questions"
                placeholder={t('Total Questions')}
                onChange={args => args[0].nativeEvent.text}
                defaultValue=""
              />
              {errors.total_questions ? (
                  <Text style={{color: 'red', marginBottom: 5}}>
                    {t('This is required')}
                  </Text> 
                ) : <Text style={{marginBottom: 5}} />}
            </View>
          
            </View>
          </View>
            
        <View style={{borderWidth: 1, borderColor: 'gray', borderRadius: 10}}>
          <Text style={{paddingLeft: 30,marginBottom: 10}}>Name</Text>
          
          <View style={{alignItems: 'center', }}>
            <View>
              <Controller
                as={<TextInput placeholderTextColor = "#FFFFFF"  />}
                control={control}
                rules={{required: true}}
                style={[styles.input]}
                name="name_en"
                placeholder={t('Name in english')}
                onChange={args => args[0].nativeEvent.text}
                defaultValue=""
              />
              {errors.name_en ? (
                <Text style={{color: 'red', marginBottom: 5}}>
                  {t('This is required')}
                </Text> 
              ) : <Text style={{marginBottom: 5}} />}
            </View>
            
            <View>
            <Controller
              as={<TextInput placeholderTextColor = "#FFFFFF" />}
              control={control}
              rules={{required: true}}
              style={[styles.input]}
              name="name_hi"
              placeholder={t('Name in hindi')}
              onChange={args => args[0].nativeEvent.text}
              defaultValue=""
            />
            {errors.name_hi ? (
              <Text style={{color: 'red', marginBottom: 5}}>
                {t('This is required')}
              </Text> 
            ) : <Text style={{marginBottom: 5}} />}
            </View>
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <ShowQuestions 
            navigation={navigation}
            updateTest={updateTest}
          />
        </View>
        <View>
          <TouchableOpacity style={{backgroundColor: 'white', height: 20, justifyContent: 'center', borderRadius: 50, padding: 20, marginTop: 20}} onPress={handleSubmit(onSubmitTest)}>
            <Text style={{color: 'black', textAlign: 'center', fontSize: 12}}>Add Test</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout> 
  )
}

const mapStateToProps = state => {
  const {auth} = state;
  return {auth};
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(withTranslation()(Quiz)));

