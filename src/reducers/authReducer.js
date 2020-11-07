import {fromJS} from 'immutable';
import actionTypes from '../actions/actionTypes';
import i18n from '../../i18n';

const INIT_STATE = {
  response: { },
  locale: 'en_IN',
  userLoggedIn: false,
  userDetails: {},
  universities: [],
  colleges: {},
  blogs: [],
  competitions: [],
  internships: [],
  quiz: [],
  subjects: []
};

const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
}

const auth = (state = fromJS(INIT_STATE), action) => {
  switch (action.type) {
    case actionTypes.UPDATE_LOGGED_IN:
      return state.merge({
        userLoggedIn: action.payload,
      });
    case actionTypes.UPDATE_RESPONSE:
      return state.merge({
        response: fromJS(action.payload),
      });
    case actionTypes.UPDATE_USER_DETAILS:
      return state.merge({
        userDetails: fromJS(action.payload),
      });
    case actionTypes.UPDATE_UNIVERSITIES:
      return state.merge({
        universities: fromJS(action.payload),
      });
    case actionTypes.UPDATE_COLLEGES:
      return state.merge({
        colleges: fromJS(action.payload),
      });
    case actionTypes.UPDATE_BLOGS:
      return state.merge({
        blogs: fromJS(action.payload),
      });
    case actionTypes.UPDATE_INTERNSHIPS:
      return state.merge({
        internships: fromJS(action.payload),
      });
    case actionTypes.UPDATE_COMPETITIONS:
      return state.merge({
        competitions: fromJS(action.payload),
      });
    case actionTypes.UPDATE_SUBJECTS:
      return state.merge({
        subjects: fromJS(action.payload),
      });
    case actionTypes.UPDATE_QUIZ:
      return state.merge({
        quiz: fromJS(action.payload),
      });
    case actionTypes.CHOOSE_LOCALE:
      changeLanguage(action.payload)
      return state.set('locale', action.payload);
    default:
      return state;
  }
};

export default auth;
