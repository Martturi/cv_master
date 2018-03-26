const initialState = {
  view: 'browse',
  lastView: 'browse',
  userList: [],
  selectedUserID: '',
  cvList: [],
  selectedCVIndex: 0,
  loggedInUser: '',
  sections: [],
  searchFieldContents: '',
  previewHTML: '',
}

const getCVIndex = (state, action) => {
  const indexOutOfBounds = state.selectedCVIndex >= action.cvList.length
  const newSelectedCVIndex = (
    indexOutOfBounds ? (action.cvList.length - 1) : state.selectedCVIndex
  )
  return newSelectedCVIndex
}

const CVreducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_VIEW':
      return {
        ...state,
        lastView: state.view,
        view: action.view,
      }

    case 'UPDATE_USER_LIST':
      return {
        ...state,
        userList: action.userList,
        selectedUserID: action.selectedUserID,
      }

    case 'GET_CURRENT_USER':
      return {
        ...state,
        loggedInUser: action.loggedInUser,
      }

    case 'UPDATE_CV_LIST':
      return {
        ...state,
        cvList: action.cvList,
        selectedCVIndex: getCVIndex(state, action),
      }

    case 'UPDATE_SECTIONS':
      return {
        ...state,
        sections: action.sections,
      }

    case 'UPDATE_PREVIEW':
      return {
        ...state,
        previewHTML: action.previewHTML,
      }

    case 'SELECT_USER':
      return {
        ...state,
        selectedUser: action.userID,
      }

    case 'SELECT_CV_INDEX':
      return {
        ...state,
        selectedCVIndex: action.cvIndex,
      }

    case 'UPDATE_SEARCH_FIELD_CONTENTS':
      return {
        ...state,
        searchFieldContents: action.searchFieldContents,
      }

    default:
      return state
  }
}

export default CVreducer
