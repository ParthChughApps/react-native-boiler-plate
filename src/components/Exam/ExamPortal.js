import React,{useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import Layout from '../Layout';
import * as LoginActionCreators from '../../actions/LoginActions';
import { withTranslation } from 'react-i18next';
import {bindActionCreators} from 'redux';
import { toJS } from '../to-js'
import {connect} from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../Home/styles';
import Quiz from './quiz';
import FilerIcon from './noun_filter.png';
import {Picker} from 'native-base';

const Home = props => {
  Home.propTypes = {
    navigation: PropTypes.object.isRequired,
    LoginActions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };
  const {t} = props;
 
  const [testsData, updateTestsData] = useState({});
  const [givenTests, updateGivenTests] = useState([]);
  const [selected, updateSelected] = useState({0:'' ,1: ''});
  
  const {auth, LoginActions: { getSubjects, getFilteredSubjects /*, updateUserDetails, upateUniversities */}, navigation, navigation: {navigate}} = props; 

  const callbackFunction = (data) => {
    Object.values(data[0])[0].tests.forEach(async(data, index) => {
      const newData = await data.get();
      updateTestsData({...testsData, [index]: {exam: newData.data(), ref: newData.ref},})
    });

  }

  const onNavigateToExamPage = (el) => {
    navigate('Exam', {test: el.exam, locale: auth.locale, testRef: el.ref}) 
  }

  const filters = [{
    name: t('Subjects'), 
    options: auth.subjects.map((el, index) => ({name: Object.values(el)[0].name, index}))
  }, { 
    name: t('Difficulty level'), 
    options: [ 
      {name: t('Basic')},
      {name: t('Intermediate')},
      {name: t('Difficult')}
    ]
  }]

  const testGivenIdsMarks = () => {
    const data = {}
    auth.response.user.submissions.forEach(async (el,index) => {
      const data = await el.get();
      console.log(givenTests);
      console.log(data.data().testRef.id);
      if(typeof givenTests[data.data().testRef.id] === 'undefined') {
        console.log('-----')
        updateGivenTests({...givenTests, [data.data().testRef.id]: `${data.data().correctAnwers}/${data.data().exam.total_questions}`})
      } else {
        const data = givenTests[el.id].split('/')
        console.log(data);
        if(data[0] < data.data().correctAnwers) {
          updateGivenTests({...givenTests, [data.data().testRef.id]: `${data.data().correctAnwers}/${data.data().exam.total_questions}`})
        }
      }
    })
  }

  useEffect(()=> {    
    getSubjects({callbackFunction}); 
    testGivenIdsMarks()
  },[]);

  const onValueChange = (data, ranIndex) => {    
    getFilteredSubjects({callbackFunction})
    updateSelected({...selected, [ranIndex]: data})
  }
  
  return (
    <Layout style={{paddingHorizontal: 20}}>
      <Quiz 
        navigation={navigation}
      />
      <Text style={{fontSize: 20,marginVertical: 20}}>{t('All tests')}</Text>
      
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={FilerIcon} style={{width: 22, height: 18}}/>
        {
          filters.map((filter, ranIndex) => {
            return(
            <Picker
              key={ranIndex}
              mode="dropdown"
              itemTextStyle={{ backgroundColor: '#000', borderRadius: 5 }}
              placeholderStyle={{ color: "#bfc6ea", borderRadius: 5 }}
              selectedValue={selected[ranIndex]}
              onValueChange={(data) => onValueChange(data,ranIndex)}
              placeholderIconColor="#007aff"
              style={{ backgroundColor: '#CECECE', color: 'black' , marginHorizontal: 10}}
            >
              {filter.options.map((option, index) => {
                return(
                  <Picker.Item color="black" label={typeof option.name === 'object' ?  option.name[auth.locale]: option.name} value={index} />
                )
              }
              )}
            </Picker>
            )
          } 
          )
        }
      </View>
      <View style={{marginVertical: 20}}>
        {
          Object.values(testsData).map((el,index) => (
            <TouchableOpacity
              key={index}
              style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomColor: '#CECECE', borderBottomWidth: 1}}
              onPress={() => onNavigateToExamPage(el)}
            >
              <View style={{paddingBottom: 20}}>
                <Text style={{fontSize: 16, paddingBottom: 10}}>{el.exam.name[auth.locale]}</Text>
                <Text style={{fontSize: 14, color: "#ABABAB"}}>{t('Quiz')} - {el.exam.total_questions} {t('Questions')} - {el.exam.time / 60} {t('Minutes')} </Text>
              </View>
              <View>
                {
                  typeof givenTests[el.ref.id] === 'undefined' ?
                  <Text style={{color: '#326EA2', fontSize: 14}}>{t('not attempted')}</Text>
                  :
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                      <Text style={{color: 'white', fontSize: 14,paddingHorizontal: 10,paddingVertical: 5, backgroundColor: '#08BB38', borderRadius: 5}}>{t('Passed')}</Text>
                    </View>
                    
                    <Text style={{color: '#08BB38',fontSize: 30,paddingHorizontal: 10,paddingVertical: 5,borderRadius: 5}}>{givenTests[el.ref.id]}</Text>
                  </View>
                  
                }
                
              </View>
            </TouchableOpacity>
          ))
        }
      </View>

    </Layout>
  );
};

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
)(toJS(withTranslation()(Home)));
