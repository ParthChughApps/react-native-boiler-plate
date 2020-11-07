import React, {useState, useEffect, Component} from 'react';
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import CountDown from 'react-native-countdown-component';
import { Text, Radio, CheckBox, Button } from 'native-base';
import { withTranslation } from 'react-i18next';
import {CommonActions, StackActions} from '@react-navigation/native';
import * as LoginActionCreators from '../../actions/LoginActions';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {bindActionCreators} from 'redux';
import { toJS } from '../to-js'
import Swiper from 'react-native-swiper'
import Layout from '../Layout';
import Dialog from '../CustomDialog';
import styles from './styles';

class Exam extends Component {
  constructor(props) {
    super(props);
    const {navigation: {
      state: {
        params,
      },
    } } = props;
    this.state = {
      submitExam: params.test,
      show: true,
      remainingTime: null,
      dialogVisible: false
    }
  }

  render() {
    const {auth,navigation: {
      dispatch,
      state: {
        params,
      },
    }, t, LoginActions: { updateResponse } } = this.props;
    const { submitExam, show, remainingTime } = this.state;
    
    const updateTest = (questionIndex, optionIndex) => {
      submitExam.questions[questionIndex]["choosedIndex"] = optionIndex
      this.setState({submitExam})
    }
    
    const clearResponse = (questionIndex) => {
      submitExam.questions[questionIndex]["choosedIndex"] = null
      this.setState({submitExam})
    }
    const checkReponse = (questionIndex, selected) => {
      submitExam.questions[questionIndex]["checkResponse"] = selected
      this.setState({submitExam})
    }
  
    const addSubmission = () => {
      const correctAnwers = submitExam.questions.filter((el) => el.choosedIndex === parseInt(el.solution)).length
      const filteredData = submitExam.questions.map((el) => el.choosedIndex);

      const filtered = filteredData.filter(function(x) {
        return x !== undefined;
      });

      firestore()
        .collection('Submissions')
        .add({
          exam: submitExam,
          remainingTime,
          correctAnwers,
          wrongAnswers: submitExam.questions.length - correctAnwers,
          avgCorrectTime: correctAnwers/(submitExam.time - remainingTime),
          avgWrongTime: (submitExam.questions.length - correctAnwers)/(submitExam.time - remainingTime),
          avgTimeQues: filtered.length/(submitExam.questions.filter((el) => typeof el.choosedIndex !== 'undefined').length),
          user: auth.response.userRef,
          testRef: params.testRef
        })
        .then((data) => {
          firestore()
            .collection('Users')
            .doc(auth.response.user.uid)
            .update({ submissions: firestore.FieldValue.arrayUnion(data)})
            .then(() => {
              firestore()
                .collection('Users')
                .doc(auth.response.user.uid)
                .get()
                .then(documentSnapshot => {
                  updateResponse({user: documentSnapshot.data()})
                })              
            });
        });
      }

    const onSubmitExam = () => {
      addSubmission()
      const resetAction = StackActions.reset({
        index: 0,
        key: null,
        actions: [
          CommonActions.navigate({
            routeName: 'Solution',
            params: {exam: submitExam, remainingTime}
          }),
        ],
      });
      dispatch(resetAction);
    }
    const onSubmit = () => {
      this.setState({
        dialogVisible: true
      })
      

      // Alert.alert(
      //   'Are you sure you want to Submit your Exam',
      //   'Plase press OK to Submit',
      //   [
      //     {
      //       text: 'Cancel',
      //       onPress: () => console.log('Cancel Pressed'),
      //       style: 'cancel'
      //     },
      //     { text: 'OK', onPress: () => {
      //       dispatch(resetAction);
      //     }}
      //   ],
      //   { cancelable: false }
      // );
    }
    return(
      <Layout>
        <Dialog
          title={t('Are you sure you want to submit the exam')}
          heading={t(`Submit the Exam`)}
          buttonText={t(`OK`)}
          isVisible={this.state.dialogVisible}
          onReject={()=> this.setState({dialogVisible: false})}
          onAccept={() => {
            this.setState({dialogVisible: false})
            onSubmitExam()
          }
          }
        />
        {
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', position: 'absolute', zIndex: 999, right: 0}}>
            <CountDown
              until={params.test.time}
              size={20}
              onFinish={() => onSubmit()}
              digitStyle={{backgroundColor: '#000'}}
              digitTxtStyle={{color: show ? '#1CC625' : '#000'}}
              timeLabelStyle={{color: show ? 'orange': '#000', fontWeight: 'bold'}}
              timeToShow={['M', 'S']}
              onChange={(data) => this.setState({remainingTime: data})}
              timeLabels={{m: 'MM', s: 'SS'}}
              style={{alignItems: 'flex-end'}}
            />
            <Text onPress={() => this.setState({show: !show})} style={{color: 'white', textAlign: 'right'}}>{show ? 'Hide': 'Show'}</Text>
          </View>
        }
         <Swiper 
            style={styles.wrapperExam} 
            showsButtons={true}
            loop={false}
            buttonWrapperStyle={{backgroundColor: 'transparent', flexDirection: 'row', position: 'absolute', top: 0, left: 0, flex: 1, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'flex-end'}}
            nextButton={<Text style={styles.buttonText}>{"next ›"}</Text>}
            prevButton={<Text style={styles.buttonText}>{"‹ previous"}</Text>}
          >
            {params.test.questions.map((el, questionIndex) => {
              return(
                <ScrollView style={{flex: 1, padding: 20}} key={questionIndex}>
                  <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{paddingRight: 20}}>
                        <CheckBox checked={submitExam.questions[questionIndex]["checkResponse"]} onPress={() => checkReponse(questionIndex,!submitExam.questions[questionIndex]["checkResponse"]) } color='red' />
                      </View>
                      <Text style={{ color: 'white',}}>{t("Review")}</Text>  
                    </View>
                    <TouchableOpacity onPress={()=> {clearResponse(questionIndex)}}>
                      <Text style={{ color: 'white',color: 'red', paddingLeft: 10, paddingTop: 10}}>{t("Clear your response")}</Text>
                    </TouchableOpacity>
                    
                  </View>
                  <Text style={{color: '#326EA2', fontSize: 18, marginTop: 10}}> {t("Question")} {questionIndex + 1} </Text>
                  <View style={styles.slide1}>
                    <Text style={{ color: 'white',fontSize: 20, paddingBottom: 10}}>
                      {el.question[auth.locale]}
                    </Text>
                    {el.options.map((option, optionIndex) => (
                      <TouchableOpacity key={optionIndex} onPress={() => updateTest(questionIndex, optionIndex)}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Radio
                            onPress={() => updateTest(questionIndex, optionIndex)} selected={submitExam.questions[questionIndex]["choosedIndex"] === optionIndex}  
                            style={{padding: 10}}
                            color={"#fff"}
                            selectedColor={"#fff"}
                          />
                          <Text style={{color: 'white',}} >{option[auth.locale]}</Text>
                        </View>
                      </TouchableOpacity>
                    ))
                    }      
                  </View>
                  {
                    params.test.questions.length - 1 === questionIndex &&
                    <Button  style={{marginBottom: 40}} success onPress={() => onSubmit()}>
                      <Text style={{ color: 'white',color: "white"}}>{t("Submit your Exam")}</Text>
                    </Button>
                  }
                </ScrollView>
                )
              }
            )
            }      
        </Swiper>
      </Layout>
    )
  }
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
)(toJS(withTranslation()(Exam)));
