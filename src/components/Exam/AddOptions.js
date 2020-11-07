import React, {useEffect, useState} from 'react';
import {View, TextInput,Text } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import Layout from '../Layout';


class AddOptions extends React.Component {
  constructor(props) {
    super(props);
    const {route: {params},} = props;
    this.state = {
      options: params.options,
      solution: params.question.solution,
    }
  }

  render() {
    const {route: {params},} = props;
    const {options, solution} = this.state

    const {updateOptions, question, questionIndex, updateSolution} = params;    
    
    const addNewOption = () => {
      this.setState({options: options.concat({})})
    }

    const removeFromStack = (index) => {
      const filteredData = options.filter((item, itemIndex) => index !== itemIndex);
      this.setState({options: filteredData})
      updateOptions(questionIndex, filteredData);
    }

    return (
      <Layout>
        <ScrollView>
        <Text>English: {question.question.en_IN}</Text>
        <Text style={{marginBottom: 20}}>Hindi: {question.question.hi_IN}</Text>
      {
        options.map((el, index) => {
          return(
            <View style={{borderWidth: 1, borderColor: 'gray', borderRadius: 10,marginBottom: 20}}>
              <Text style={{fontSize: 15, marginBottom: 10}}>Option {index + 1}</Text>
              <View style={{position: 'absolute', right: -10, top: -20}}>
                <TouchableOpacity onPress={() => removeFromStack(index)}>
                  <Icon name="close" size={30} color="#FFF" style={{margin:20, textAlign: 'center'}}/>
                </TouchableOpacity>
              </View>
              <View style={{alignItems: 'center'}}>
                <View>
                  <TextInput 
                    placeholderTextColor = "#FFFFFF" 
                    value={options[index].en_IN} 
                    placeholder={`Option ${index + 1} english`}
                    style={styles.input}
                    onChangeText={(text) => {
                      // const questionNumber = questions.filter(data => data.questionNo === el.questionNo);
                      options[index].en_IN  = text
                      this.setState({options})
                      updateOptions(questionIndex, options);
                    }}
                  />
                  {!options[index].en_IN ?
                  <Text style={{color: 'red'}}>This is required</Text>: <Text/>}
                </View>

                <View>
                  <TextInput 
                    placeholderTextColor = "#FFFFFF" 
                    value={options[index].hi_IN} 
                    placeholder={`Option ${index + 1} hindi`}
                    style={styles.input}
                    onChangeText={(text) => {
                      // const questionNumber = questions.filter(data => data.questionNo === el.questionNo);
                      options[index].hi_IN  = text
                      this.setState({options})
                      updateOptions(questionIndex, options);
                    }}
                  />
                    {!options[index].hi_IN ?
                    <Text style={{color: 'red'}}>This is required</Text>: <Text/>}
                </View>
                
              </View>
            </View>
          )
        }
          
        )
      }
      <View >
        <TouchableOpacity style={{backgroundColor: 'yellow', height: 50, justifyContent: 'center', borderRadius: 50,}} onPress={() => addNewOption()}>
          <Text style={{color: 'black', textAlign: 'center', fontSize: 24}}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems: 'center'}}>
        <View>
          <TextInput 
            placeholderTextColor = "#FFFFFF" 
            keyboardType="numeric"
            value={solution} 
            placeholder={`Solution index`}
            style={[styles.input, {marginTop: 20}]}
            onChangeText={(text) => {
              // const questionNumber = questions.filter(data => data.questionNo === el.questionNo);
              this.setState({solution: text})
              updateSolution(questionIndex, text);
            }}
          />

        {!solution ?
          <Text style={{color: 'red'}}>This is required</Text>: <Text/>}
        </View>
      </View>
      </ScrollView>
      </Layout>    
    )
  }
}

export default AddOptions;