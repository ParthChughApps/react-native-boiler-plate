import React,{useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, Platform} from 'react-native';
import PropTypes from 'prop-types';
import Layout from '../Layout';
import * as LoginActionCreators from '../../actions/LoginActions';
import { withTranslation } from 'react-i18next';
import {bindActionCreators} from 'redux';
import { toJS } from '../to-js'
import {connect} from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../Home/styles';
import Dialog from '../CustomDialog';
import Quiz from './quiz';
import FilerIcon from './noun_filter.png';
import {Picker} from 'native-base';

class ExamPortal extends React.Component {
 
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    LoginActions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      testsData: {},
      givenTests: [],
      selected: {0:'' ,1: ''},
      dialogVisible: false,
      onPressExam: () => {}
    }
    this.callbackFunction = this.callbackFunction.bind(this);
  }

  callbackFunction(data) {
    let allTests = {}
    const requests =  Object.values(data[0])[0].tests.map((data, index) => {
      return data.get().then((newData)=> {
        allTests[index] = { exam: newData.data(), ref: newData.ref }
      });
    });
    Promise.all(requests).then(() => {
      this.setState({testsData: allTests});  
    });
  }

  testGivenIdsMarks() {
    const {auth} = this.props; 
    // const {givenTests} = this.state;
    let updatedData = {}
    auth.response.user.submissions && auth.response.user.submissions.forEach(async (el,index) => {
      const data = await el.get();
      const id = data.data().testRef.id
      const submissionsData = data.data()
      if(typeof updatedData[id] === 'undefined') {
        updatedData = {...updatedData, [id]: `${submissionsData.correctAnwers}/${submissionsData.exam.total_questions}`}
        this.setState({givenTests: updatedData});
      } else {        
        const data = updatedData[id].split('/')
        if(data[0] < submissionsData.correctAnwers) {
          updatedData =  {...updatedData, [id]: `${submissionsData.correctAnwers}/${submissionsData.exam.total_questions}`}
          this.setState({givenTests: updatedData});
        }
      }
    })
  }

  componentDidMount() {
    const {LoginActions: { getSubjects }} = this.props; 
    getSubjects({callbackFunction: this.callbackFunction}); 
    this.testGivenIdsMarks()
  
  }
  render() {
    const {t} = this.props;
    const {selected, givenTests, testsData, } = this.state;
    const {auth, LoginActions: { getSubjects, getFilteredSubjects /*, updateUserDetails, upateUniversities */}, navigation, navigation: {navigate}} = this.props; 

    const onNavigateToExamPage = (el) => {
      navigate('Exam', {test: el.exam, locale: auth.locale, testRef: el.ref}) 
    }
  
    const filters = [{
      name: t('Subjects'), 
      options: auth.subjects.map((el, index) => ({name: Object.values(el)[0].name, index}))
    },
    //  { 
    //   name: t('Difficulty level'), 
    //   options: [ 
    //     {name: t('Basic')},
    //     {name: t('Intermediate')},
    //     {name: t('Difficult')}
    //   ]
    // }
    ]
  
    const onValueChange = (data, ranIndex) => {    
      if(ranIndex === 0) {
        const selectedSubject = auth.subjects[data]
        getFilteredSubjects({selectedSubject: Object.keys(selectedSubject)[0], callbackFunction: this.callbackFunction})
      }
      
      this.setState({selected: {...selected, [ranIndex]: data}})
    }

    
    return (
      <Layout style={{paddingHorizontal: 20}}>
         <Dialog
          title={t('Are you sure you want to start the test')}
          heading={t(`Caution`)}
          buttonText={t(`OK`)}
          isVisible={this.state.dialogVisible}
          onReject={()=> this.setState({dialogVisible: false, onPressExam: () => {}})}
          onAccept={() => {
            this.state.onPressExam()
            this.setState({dialogVisible: false, onPressExam: () => {}})
          }
          }
        />
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
              placeholder={filter.options ? filter.options[0].name[auth.locale] : ''}
              itemTextStyle={{ backgroundColor: Platform.select({android: '#000', ios: '#fff' }) , borderRadius: 5 }}
              placeholderStyle={{ color: "#000", borderRadius: 5 }}
              selectedValue={selected[ranIndex]}
              onValueChange={(data) => onValueChange(data,ranIndex)}
              placeholderIconColor="#007aff"
              style={{ backgroundColor: '#CECECE', color: 'black' , marginHorizontal: 10}}
            >
              {filter.options.map((option, index) => {
                return(
                  <Picker.Item label={typeof option.name === 'object' ?  option.name[auth.locale]: option.name} value={index} />
                )
              }
              )}
            </Picker>
            )
          } 
          )
        }
      </View>
      {auth.response.user.is_admin &&
      <TouchableOpacity style={{padding: 20, }} onPress={() => navigate('AddTest', {topBar: `Add Test in ${Object.values(auth.subjects[selected["0"] || 0])[0].name[auth.locale]}`, subject: auth.subjects[selected["0"] || 0]})}>
        <Text style={{color: 'white'}}>Add Test(only be seen to the admin)</Text>
      </TouchableOpacity>
      }
      <ScrollView>
        <View style={{marginVertical: 20}}>
          {
            Object.values(testsData).length > 0 ? Object.values(testsData).map((el,index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomColor: '#CECECE', borderBottomWidth: 1}}
                  onPress={() => this.setState({dialogVisible: true, onPressExam: () => onNavigateToExamPage(el)}) }
                >
                  <View style={{paddingBottom: 20, marginTop: 10}}>
                    <Text style={{fontSize: 16, paddingBottom: 10, color: 'white'}}>{el.exam.name[auth.locale]}</Text>
                    <Text style={{fontSize: 14, color: "#ABABAB"}}>{t('Quiz')}{"\n"}{el.exam.total_questions} {t('Questions')} - {el.exam.time / 60} {t('Minutes')} </Text>
                  </View>
                  <View>
                    {
                      typeof givenTests[el.ref.id] === 'undefined' ? 
                      <Text style={{color: '#326EA2', fontSize: 14}}>{t('not attempted')}</Text>
                      :
                      <View style={{alignItems: 'center'}}>
                        <View>
                          <Text style={{color: 'white', fontSize: 14,paddingHorizontal: 10,paddingVertical: 5, backgroundColor: '#08BB38', borderRadius: 5}}>{t('Passed')}</Text>
                        </View>
                        
                        <Text style={{color: '#08BB38',fontSize: 30,paddingHorizontal: 10,paddingVertical: 5,borderRadius: 5}}>{givenTests[el.ref.id]}</Text>
                      </View>
                      
                    }
                    
                  </View>
                </TouchableOpacity>
              )
            }
              
            ) : <Text>{t("No Tests Found")}</Text>
          } 
        </View>
      </ScrollView>

    </Layout>
    )
  }
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
)(toJS(withTranslation()(ExamPortal)));
