import {StyleSheet} from 'react-native';
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
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    borderRadius: 5,
    margin: 10,
    paddingLeft: 10, 
    marginTop: 40,
    elevation: 5
  },
};
