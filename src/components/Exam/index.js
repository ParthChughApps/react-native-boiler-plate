import React, {Component} from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import CountDown from 'react-native-countdown-component';
import { Text, CheckBox, Button } from 'native-base';
import { withTranslation } from 'react-i18next';
import * as LoginActionCreators from '../../actions/LoginActions';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {bindActionCreators} from 'redux';
import { toJS } from '../to-js'
import Swiper from 'react-native-swiper'
import Layout from '../Layout';
import Dialog from '../CustomDialog';
import BackHandler from './BackHandler'
import styles from './styles';

class Exam extends Component {
  constructor(props) {
    super(props);
    const {route: {params}} = props;
    this.state = {
      submitExam: params.test,
      show: true,
      remainingTime: null,
      dialogVisible: false,
      backButtonDialogVisible: false,
      sliderIndex: 0
    }
    this.swiperRef = React.createRef()
  }

  render() {
    const { auth, route: {params}, t, LoginActions: { updateResponse }, navigation } = this.props;
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
    console.log(this.swiperRef.current,"this.swiperRef")
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
      navigation.navigate('Solution', {exam: submitExam, remainingTime})
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
        <BackHandler navigation={navigation} />
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
        <View style={{flex: 1/5,margin: 20, padding: 10, backgroundColor: 'rgba(128,128,128,0.2)', borderRadius: 20}}>
          <Text style={{color: 'white', textAlignVertical: 'center', padding: 20}}>{params.test.name[auth.locale]}</Text>
          {
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', position: 'absolute', zIndex: 999, right: 0}}>
              <CountDown
                until={params.test.time}
                size={30}
                onFinish={() => onSubmit()}
                digitStyle={{backgroundColor: 'transparent'}}
                digitTxtStyle={{color: show ? '#1CC625' : '#000'}}
                timeLabelStyle={{color: show ? 'orange': '#000', fontWeight: 'bold'}}
                timeToShow={['M', 'S']}
                onChange={(data) => this.setState({remainingTime: data})}
                timeLabels={{m: 'mm', s: 'ss'}}
                style={{alignItems: 'flex-end'}}
              />
              {/* <Text onPress={() => this.setState({show: !show})} style={{color: 'white', textAlign: 'right'}}>{show ? 'Hide': 'Show'}</Text> */}
            </View>
          }
        </View>
        <View style={{marginLeft: 20}}> 
          <ScrollView horizontal>
            <View style={{flexDirection: 'row'}}>
              {params.test.questions.map((el, index) => (
                <TouchableOpacity style={{
                    backgroundColor: this.state.sliderIndex === index ? 'green' : 'rgba(128,128,128, 0.1)', 
                    paddingVertical: 4, 
                    paddingHorizontal: 10, 
                    marginHorizontal: 5, 
                    borderRadius: 20
                  }}
                  onPress={() => {
                    this.swiperRef.current.setState({
                      index: index, // or any other index
                    })
                    this.setState({sliderIndex: index})
                  }}
                >
                  <Text style={{color: 'white'}}>{index}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <Swiper 
          style={styles.wrapperExam} 
          showsButtons={true}
          ref={this.swiperRef}
          onIndexChanged={(index) => {this.setState({sliderIndex: index})}}
          loop={false}
          buttonWrapperStyle={{backgroundColor: 'transparent', flexDirection: 'row',  flex: 1, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'flex-end'}}
          nextButton={
            <View style={styles.nextButton}>
              <Text style={styles.buttonText}>{"Next"}</Text>
            </View>
          }
          prevButton={
          <View style={styles.previousButton}>
            <Text style={styles.buttonText}>{"Previous"}</Text>
          </View>
          }
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
                <View style={[styles.slide1, {backgroundColor: 'rgba(128,128,128,0.1)', padding: 20}]}>
                  <Text style={{ color: 'white',fontSize: 20, paddingBottom: 10}}>
                    {questionIndex + 1}. {el.question[auth.locale]}
                  </Text>
                  <View>
                    {el.options.map((option, optionIndex) => (
                      <TouchableOpacity 
                        key={optionIndex} 
                        onPress={() => updateTest(questionIndex, optionIndex)} 
                        style={{
                          padding: 10, 
                          alignItems: 'center', 
                          backgroundColor: submitExam.questions[questionIndex]["choosedIndex"] === optionIndex ? 'green': 'rgba(128,128,128,0.2)', 
                          marginVertical: 10, 
                          borderRadius: 10, 
                          }}
                      >
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          {/* <Radio
                            onPress={() => updateTest(questionIndex, optionIndex)} 
                            selected={submitExam.questions[questionIndex]["choosedIndex"] === optionIndex}  
                            style={{padding: 10}}
                            color={"#fff"}
                            selectedColor={"#fff"}
                          /> */}
                          <Text style={{color: 'white', textAlign: 'center'}} >{option[auth.locale]}</Text>
                        </View>
                      </TouchableOpacity>
                    ))
                    }      
                  </View>
                  
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
