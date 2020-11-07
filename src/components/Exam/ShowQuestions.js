import React, {useEffect, useState} from 'react';
import {View, TextInput,Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';


class ShowQuestions extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionsStack: 0,
    }
  }
  render() {
    const {navigation: {navigate}, updateTest} = this.props; 
    const {questions, questionsStack} = this.state;

    const addNewQuestion = () => {
      this.setState({questions: questions.concat({
        "questionNo": questionsStack + 1,
        options: [],
        question: {},
        solution: ''
      })})
      this.setState({questionsStack: questionsStack + 1})
    }
  
    const removeFromStack = (questionNo) => {
      const filteredData = questions.filter((item) => item.questionNo !== questionNo);
      this.setState({questions: filteredData})
    }
  
    const updateOptions = (questionIndex, data) => {
      questions[questionIndex].options = data;
      this.setState({questions: questions})
      updateTest(questions)
    }

    const updateSolution = (questionIndex, data) => {
      questions[questionIndex].solution = data;
      this.setState({questions: questions}) 
      updateTest(questions)
    }
    
    return (
      <View>
      {
        questions.map((el, index) => {
          return(
            <View style={{borderWidth: 1, borderColor: 'gray', borderRadius: 10,marginBottom: 20}}>
              <Text style={{fontSize: 15, marginBottom: 10, paddingLeft: 20}}>Question {index + 1}</Text>
              <View style={{position: 'absolute', right: -10, top: -20}}>
                <TouchableOpacity onPress={() => removeFromStack(el.questionNo)}>
                  <Icon name="close" size={30} color="#FFF" style={{margin:20, textAlign: 'center'}}/>
                </TouchableOpacity>
              </View>
              <View style={{alignItems: 'center'}}>
                <View>
                  <TextInput 
                    placeholderTextColor = "#FFFFFF" 
                    value={questions[index].question.en_IN} 
                    placeholder={`Question ${index + 1} english`}
                    style={styles.input}
                    onChangeText={(text) => {
                      // const questionNumber = questions.filter(data => data.questionNo === el.questionNo);
                      questions[index].question.en_IN  = text
                      this.setState({questions: questions})
                      updateTest(questions)
                    }}
                  />
                  {!questions[index].question.en_IN ? (
                    <Text style={{color: 'red', marginBottom: 5}}>
                      This is required
                    </Text> 
                  ) : <Text style={{marginBottom: 5}} />}
                </View>
                
                <View>
                  <TextInput 
                    placeholderTextColor = "#FFFFFF" 
                    value={questions[index].question.hi_IN} 
                    placeholder={`Question ${index + 1} hindi`}
                    style={styles.input}
                    onChangeText={(text) => {
                      // const questionNumber = questions.filter(data => data.questionNo === el.questionNo);
                      questions[index].question.hi_IN  = text
                      this.setState({questions: questions})
                      updateTest(questions)
                    }}
                  />
                  {!questions[index].question.hi_IN ? (
                    <Text style={{color: 'red', marginBottom: 5}}>
                      This is required
                    </Text> 
                  ) : <Text style={{marginBottom: 5}} />}
                </View>
                <TouchableOpacity onPress={() => navigate('AddOptions', {topBar: 'Add Options', options: el.options, question: el, updateOptions, questionIndex: index, updateSolution})}>
                  <Text  style={{margin:20, textAlign: 'center'}}>Add Options</Text>
                </TouchableOpacity>
              </View> 
            </View> 
          )
        }
        )
      }
      <View>
        <TouchableOpacity style={{backgroundColor: 'yellow', height: 50, justifyContent: 'center', borderRadius: 50, padding: 30}} onPress={() => addNewQuestion()}>
          <Text style={{color: 'black', textAlign: 'center', fontSize: 24}}>+</Text>
        </TouchableOpacity>
      </View>        
    </View>    
    ) 
    
  }
}

export default ShowQuestions;