import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  // AUTH
  'UPDATE_LOGGED_IN',
  'CHOOSE_LOCALE',
  'UPDATE_RESPONSE',
  'UPDATE_USER_DETAILS',
  'UPDATE_UNIVERSITIES',
  'UPDATE_COLLEGES',
  'UPDATE_BLOGS',
  'UPDATE_INTERNSHIPS',
  'UPDATE_COMPETITIONS',
  'UPDATE_QUIZ',
  'UPDATE_SUBJECTS',
  'UPDATE_LOCALES',
  'UPDATE_COORDINATES',
  'UPDATE_ORG',
  'UPDATE_NEAR_BY_ORGS',
  'GET_USER_ADDRESSES',
  'UPDATE_USER_ORDERS',
  'RESET'
]);

// actionTypes = {LOGIN_REQUEST: "LOGIN_REQUEST"}
// Notice how we don't have to duplicate LOGIN_REQUEST twice
// thanks to mirror-creator.
export default actionTypes;
