import {
  SAVE_SERVICE_REQUEST,
  SAVE_SERVICE_FAILURE,
  SAVE_SERVICE_SUCCESS,
  CHANGE_SERVICE_FIELD,
} from '../actions/actionTypes';

const initialState = {
  service: {
    id: '',
    name: '',
    price: 0,
    content: '',
  },
  loading: false,
  error: null,
};

export default function serviceSaveReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SAVE_SERVICE_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case SAVE_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case CHANGE_SERVICE_FIELD:
      const { name, value } = action.payload;
      return {
        ...state,
        service: { ...state.service, [name]: value },
      };
    default:
      return state;
  }
}
