import React from 'react';
import {View, Text,processColor,} from 'react-native';
import { PieChart } from 'react-native-charts-wrapper';
import Layout from '../Layout'
import styles from './styles';
import * as LoginActionCreators from '../../actions/LoginActions';
import { withTranslation } from 'react-i18next';
import {bindActionCreators} from 'redux';
import { toJS } from '../to-js'
import {connect} from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';


class PerformanceReport extends React.Component {
  constructor() {
    super();

    this.state = {
      legend: {
        enabled: true,
        textSize: 15,
        form: 'CIRCLE',
        horizontalAlignment: "RIGHT",
        verticalAlignment: "CENTER",
        orientation: "VERTICAL",
        wordWrapEnabled: true
      },
      data: {
        dataSets: [{
          values: [{value: 70, label: 'Correct Answers'},
            {value: 30, label: 'Wrong Answers'}],
          label: '',
          config: {
            colors: [processColor('#08BB38'), processColor('#FF3434')],
            valueTextSize: 20,
            valueTextColor: processColor('green'),
            sliceSpace: 5,
            // selectionShift: 13,
            xValuePosition: "OUTSIDE_SLICE",
            yValuePosition: "OUTSIDE_SLICE",
            valueFormatter: "#.#'%'",
            valueLineColor: processColor('green'),
            valueLinePart1Length: 0.5,
          }
        }],
      },
      highlights: [{x:2}]
    };
  }
  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }
  }
  render() {
    const {t} = this.props;

    const tests = [{
      name: t('All tests'),
      totalCorrect: 1,
      totalWrong: 2,
      avgCorrectTime: 0.20,
      avgWrongTime: 0.20,
      avgTime: 0.15,

    }, {
      name: t('Basic tests'),
      totalCorrect: 1,
      totalWrong: 2,
      avgCorrectTime: 0.20,
      avgWrongTime: 0.20,
      avgTime: 0.15,
    }, {
      name: t('Intermediate tests'),
      totalCorrect: 1,
      totalWrong: 2,
      avgCorrectTime: 0.20,
      avgWrongTime: 0.20,
      avgTime: 0.15,
    }, {
      name: t('Advanced tests'),
      totalCorrect: 1,
      totalWrong: 2,
      avgCorrectTime: 0.20,
      avgWrongTime: 0.20,
      avgTime: 0.15,
    }]

    return (
      <Layout >
        <ScrollView style={{flex: 1, padding: 20}} contentContainerStyle={{alignItems: 'center'}} >
          <View style={styles.row}>
            <View>
              <Text style={{marginRight: 10}}>{t('Total Correct answers')}</Text>
              <Text style={[styles.textCorrect, {color: "#08BB38"}]}>222</Text>
            </View>
            <View>
              <Text style={{marginLeft: 10}}>{t('Total Wrong answers')}</Text>
              <Text style={[styles.textCorrect, {color: "#FF3434"}]}>24</Text>
            </View>
          </View>
          <PieChart
            style={styles.chart}
            // logEnabled={true}
            // chartDescription={this.state.description}
            data={this.state.data}
            // legend={this.state.legend}
            highlights={this.state.highlights}
            entryLabelColor={processColor('white')}
            entryLabelTextSize={20}
            drawEntryLabels={false}
            rotationEnabled={true}
            rotationAngle={265}
            usePercentValues={true}
            styledCenterText={{text: '70%', color: processColor('white'), size: 20}}
            centerTextRadiusPercent={100}
            holeRadius={50}
            holeColor={processColor('#000')}
            transparentCircleRadius={45}
            transparentCircleColor={processColor('#00f0f088')}
            maxAngle={360}
            onSelect={this.handleSelect.bind(this)}
            // onChange={(event) => console.log(event.nativeEvent)}
          />
          <Text style={{marginRight: 10}}>{t('Correct Answer Rate')}</Text>        
          {
            tests.map((el) => (
            <View style={{marginBottom: 20}}> 
              <Text style={[styles.text, {color: '#87ceeb', marginBottom: 20}]}>{el["name"]}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.text}>
                  {t("Total Correct answers")}:  
                </Text>
                <Text style={[styles.text,{color: '#08BB38'}]}>{el["totalCorrect"]}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.text}>
                  {t("Avg time per correct question")}:  
                </Text>
                <Text style={[styles.text,{color: '#08BB38'}]}>{el["avgCorrectTime"]}</Text>
              </View>
              
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.text}>
                  {t("Total Wrong answers")}:  
                </Text>
              <Text style={[styles.text,{color: '#FF3434'}]}>{el["totalWrong"]}</Text>
              </View>
              
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.text}>
                  {t("Avg time per wrong question")}:  
                </Text> 
              <Text style={[styles.text,{color: '#FF3434'}]}>{el["avgWrongTime"]}</Text>
              </View>
              
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text}>
                {t("Avg time per question")}: 
              </Text> 
              <Text style={[styles.text,{color: '#08BB38'}]}>{el["avgTime"]}</Text>
              </View>
            </View>
            ))
          }
          

        </ScrollView>
          
      </Layout>
    )
  }
}

// const mapStateToProps = state => {
//   const {auth} = state;
//   return {auth};
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     LoginActions: bindActionCreators(LoginActionCreators, dispatch),
//   };
// };

export default (withTranslation()(PerformanceReport));
