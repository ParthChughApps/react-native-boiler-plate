import React from 'react'
import { ImageBackground,ScrollView, Text, TextInput,View, ToastAndroid } from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import { withTranslation } from 'react-i18next';
import authFirebase from '@react-native-firebase/auth';
import {Button} from 'native-base';
import background from '../../../assets/background.png'
import styles from './styles';

const ForgetPassword = (props) => {
  
  const {t, navigation: {navigate}} = props;
  const {control, handleSubmit, errors} = useForm();
  const onSubmit = ({email}) => {
    
    authFirebase()
      .sendPasswordResetEmail(email)
        .then(function (user) {
          // ToastAndroid.showWithGravityAndOffset(
          //   "Please check your email...",
          //   ToastAndroid.LONG,
          //   ToastAndroid.BOTTOM,
          // );

        }).catch(function (e) {
          // ToastAndroid.showWithGravityAndOffset(
          //   "Email is not registered with excelegal",
          //   ToastAndroid.LONG,
          //   ToastAndroid.BOTTOM,
          // );
        })  
    }

  const navigateToSignUp = () => {
    navigate('SignUp', {topBar: t('Sign up')})
  }

  return (
    <ImageBackground source={background} style={styles.imageBackground}>  
      <ScrollView style={styles.overlay}>
        <View style={{alignItems: 'center'}}>
          <Text style={{marginTop: 100, marginBottom: 50, fontSize: 25, fontWeight: 'bold'}}>
            {t('Enter your Email')}
          </Text>
          <Text style={{paddingBottom: 30}}>{t("We'll send you a link to reset your password")}.</Text>
          <Controller
            as={<TextInput placeholderTextColor = "#FFFFFF" />}
            control={control}
            rules={{required: true}}
            style={[styles.input]}
            name="email"
            placeholder={t('Email')}
            onChange={args => args[0].nativeEvent.text}
            defaultValue=""
          />
          {errors.email ? (
            <Text style={{color: 'red', marginBottom: 5}}>
              {t('This is required')}
            </Text> 
          ) : <Text style={{marginBottom: 5}} />}
          <Button
            style={styles.submit_btn}
            testID="language-chooser-en-btn"
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.txt_sign_up}>
              {t('Send reset link')}
            </Text>
          </Button>
          <View style={{marginTop: 100}}>
            <Text style={{fontSize: 20}}>{t('New Here? ')}<Text style={{fontWeight: 'bold'}} onPress={navigateToSignUp}>{t('Create an account')}</Text></Text>
          </View>
        </View>
        
      </ScrollView>
    </ImageBackground>
  )

}

export default withTranslation()(ForgetPassword)