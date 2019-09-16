const initialState = {
  data: {},
  isLoading: false
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        isLoading: false
      }

    case 'SET_USER':
      return {
        ...state,
        data: action.payload,
        isLoading: false
      }
  
    default:
      return state
  }
}

export default users