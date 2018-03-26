import Api from './Api'
import history from './history'

export const changeView = (view) => {
  return {
    type: 'CHANGE_VIEW',
    view,
  }
}

export const updatePreview = (sections, username) => async (dispatch) => {
  const sectionsWithTemplate = sections.map((section) => {
    const text = section.showTemplate ? section.template : section.text
    return { title: section.title, id: section.id, text }
  })
  const previewHTML = await Api.loadPreview(sectionsWithTemplate, username)
  dispatch({
    type: 'UPDATE_PREVIEW',
    previewHTML,
  })
}

export const loadSections = cvID => async (dispatch) => {
  const sections = await Api.loadCV(cvID)
  const sectionsWithTemplateToggle = sections.map((section) => {
    return Object.assign({}, section, { showTemplate: false })
  })
  dispatch({
    type: 'UPDATE_SECTIONS',
    sections: sectionsWithTemplateToggle,
  })
  return sectionsWithTemplateToggle
}

export const updateSections = (sections) => {
  return {
    type: 'UPDATE_SECTIONS',
    sections,
  }
}

export const updateCVList = username => async (dispatch) => {
  const cvList = await Api.loadCVList(username)
  dispatch({
    type: 'UPDATE_CV_LIST',
    cvList,
  })
  return cvList
}

export const updateUserList = () => async (dispatch) => {
  const users = await Api.loadUserList()
  dispatch({
    type: 'UPDATE_USER_LIST',
    userList: users,
  })
  return users
}

export const getCurrentUser = () => async (dispatch) => {
  const loggedInUser = await Api.loadCurrentUser()
  dispatch({
    type: 'GET_CURRENT_USER',
    loggedInUser,
  })
  return loggedInUser
}


export const selectUser = (userID) => {
  return {
    type: 'SELECT_USER',
    userID,
  }
}

export const selectCVIndex = (cvIndex) => {
  return {
    type: 'SELECT_CV_INDEX',
    cvIndex,
  }
}

export const updateSearchFieldContents = (newContents) => {
  return {
    type: 'UPDATE_SEARCH_FIELD_CONTENTS',
    searchFieldContents: newContents,
  }
}

export const cvClickedCascade = (username, cvList, cvIndex) => async (dispatch) => {
  dispatch(selectCVIndex(cvIndex))
  const cvID = cvList[cvIndex].cv_id
  const sections = await loadSections(cvID)(dispatch)
  history.push(`/users/${username}/${cvID}`)
  updatePreview(sections, username)(dispatch)
}

export const userClickedCascade = userID => async (dispatch) => {
  dispatch(selectUser(userID))
  const username = userID
  const cvList = await updateCVList(username)(dispatch)
  const defaultCVIndex = 0
  cvClickedCascade(username, cvList, defaultCVIndex)(dispatch)
}
