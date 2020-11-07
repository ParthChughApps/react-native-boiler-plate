import actionTypes from './actionTypes';
import firestore from '@react-native-firebase/firestore';

export function isLoggedIn(isUserLoggedIn) {
  return {
    type: actionTypes.UPDATE_LOGGED_IN,
    payload: isUserLoggedIn,
  };
}

export function updateBlogs(blogs) {
  return {
    type: actionTypes.UPDATE_BLOGS,
    payload: blogs,
  };
}

export function updateQuiz(quiz) {
  return {
    type: actionTypes.UPDATE_QUIZ,
    payload: quiz,
  };
}

export function updateResponse(response) {
  return {
    type: actionTypes.UPDATE_RESPONSE,
    payload: response,
  };
}

export function updateUserDetails(response) {
  return {
    type: actionTypes.UPDATE_USER_DETAILS,
    payload: response,
  };
}

export function upateUniversities(response) {
  return {
    type: actionTypes.UPDATE_UNIVERSITIES,
    payload: response,
  };
}

export function upateColleges(response) {
  return {
    type: actionTypes.UPDATE_COLLEGES,
    payload: response,
  };
}

export function updateInternships(response) {
  return {
    type: actionTypes.UPDATE_INTERNSHIPS,
    payload: response,
  };
}

export function updateCompetitions(response) {
  return {
    type: actionTypes.UPDATE_COMPETITIONS,
    payload: response,
  };
}

export function updateSubjects(response) {
  return {
    type: actionTypes.UPDATE_SUBJECTS,
    payload: response,
  };
}

export function handleLocaleChange(locale) {
  return dispatch => {
    dispatch({type: actionTypes.CHOOSE_LOCALE, payload: locale});
  };
}


export function getBlogsAndArticles({callbackFunction}) {
  return (dispatch) => {  
    return firestore()
      .collection('blogs')
      .get()
      .then(querySnapshot => {
        const blogs = []
        querySnapshot.forEach(documentSnapshot =>  {
          const data = {}
          data[documentSnapshot.id] = documentSnapshot.data();
          blogs.push(data)              
          }
        );
        dispatch(updateBlogs(blogs));
        callbackFunction(blogs);
      })
      .catch(el => console.log(el));
  };
}

export function getInternships({callbackFunction}) {
  return (dispatch) => {  
    return firestore()
      .collection('internships')
      .get()
      .then(querySnapshot => {
        const internships = []
        querySnapshot.forEach(documentSnapshot =>  {
            const data = {}
            data[documentSnapshot.id] = documentSnapshot.data();
            data[documentSnapshot.id]["ref"] = documentSnapshot.ref
            internships.push(data)              
          }
        );
        dispatch(updateInternships(internships));
        callbackFunction(internships);
      })
      .catch(el => console.log(el));
  };
}

export function getCompetitions({callbackFunction}) {
  return (dispatch) => {  
    return firestore()
      .collection('competition')
      .get()
      .then(querySnapshot => {
        const competitions = []
        querySnapshot.forEach(documentSnapshot =>  {
          const data = {}
          data[documentSnapshot.id] = documentSnapshot.data();
          competitions.push(data)              
          }
        );
        dispatch(updateCompetitions(competitions));
        callbackFunction(competitions);
      })
      .catch(el => console.log(el));
  };
}

export function getQuiz({callbackFunction}) {
  return (dispatch) => {  
    return firestore()
      .collection('quiz')
      .get()
      .then(querySnapshot => {
        const quiz = []
        querySnapshot.forEach(documentSnapshot =>  {
          const data = {}
          data[documentSnapshot.id] = documentSnapshot.data();
          quiz.push(data)
          }
        );
        dispatch(updateQuiz(quiz));
        callbackFunction(quiz);
      })
      .catch(el => console.log(el));
  };
}

export function getSubjects({callbackFunction}) {
  return (dispatch) => {  
    return firestore()
      .collection('subjects')
      .get()
      .then(querySnapshot => {
        const subjects = []
        querySnapshot.forEach(documentSnapshot => {
          const data = {}
          data[documentSnapshot.id] = documentSnapshot.data();
          subjects.push(data)
          }
        );

        dispatch(updateSubjects(subjects));
        callbackFunction(subjects);
      })
      .catch(el => console.log(el));
  };
}

export function getFilteredSubjects({selectedSubject,callbackFunction}) {
  return (dispatch) => {  
    return firestore()
      .collection('subjects')
      .doc(selectedSubject)
      .get()
      .then(querySnapshot => {
        callbackFunction([{[selectedSubject]: querySnapshot.data()}]);
      })
      .catch(el => console.log(el));
  };
}
