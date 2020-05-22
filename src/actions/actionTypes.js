import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  // AUTH
  'UPDATE_LOGGED_IN',
]);

// actionTypes = {LOGIN_REQUEST: "LOGIN_REQUEST"}
// Notice how we don't have to duplicate LOGIN_REQUEST twice
// thanks to mirror-creator.
export default actionTypes;
