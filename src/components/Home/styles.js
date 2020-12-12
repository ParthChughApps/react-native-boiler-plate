import {StyleSheet, Dimensions} from 'react-native';
import {SMALL_PLACEHOLDER} from '../../fontSize'
import {PLACEHOLDER_COLOR, APP_COLOR} from '../../colors'
export default {
  appLogoCenter: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    marginTop: 40,
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
  },
  textBold: {
    fontWeight: 'bold',
    alignSelf: 'center',
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  iconStyle: {
    padding: 10,
    color: 'grey',
  },
  navigationIcon: {
    fontSize: 20,
    color: 'grey',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  padding10: {
    paddingHorizontal: 10,
  },
  cardStyle: {
    width: '100%',
    borderRadius: 10,
  },
  cardItemStyle: {
    flexDirection: 'column',
    display: 'flex',
    borderRadius: 10,
  },
  drawerNavigationItems: {
    width: '100%',
    borderRadius: 10,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  studentContainer: {
    flex: 1,
  },
  container: {
    // padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  squareButton: {
    backgroundColor: 'white',
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 15,
    margin: 10,
    paddingLeft: 10, 
    marginTop: 40,
    elevation: 5,
    marginHorizontal: 20
  },
  placeholder: {
    fontSize: SMALL_PLACEHOLDER,
    color: PLACEHOLDER_COLOR,
    marginLeft: 5,
    marginBottom: 5,
    fontWeight: 'bold'

  },
  submit_btn: {
    marginTop: 20,
    width: Dimensions.get('window').width ,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: APP_COLOR
  },
  txt_sign_up: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },
  submitButton: {
    justifyContent: 'flex-end'
  },
};
