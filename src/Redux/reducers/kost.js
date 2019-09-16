const initialState = {
  isLoading: false,
  isDetailLoading: false,
  error: null,
  data: [],
  detail: {}
}

const kost = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_KOST':
      return {
        ...state,
        isLoading: false,
        data: action.payload
      }

    case 'GET_KOST_PENDING':
      return {
        ...state,
        isLoading: true
      }

    case 'GET_DETAIL_KOST':
      return {
        ...state,
        isDetailLoading: false,
        detail: action.payload
      }

    case 'GET_DETAIL_KOST_PENDING':
      return {
        ...state,
        isDetailLoading: true
      }

    default:
      return state
  }
}

export default kost