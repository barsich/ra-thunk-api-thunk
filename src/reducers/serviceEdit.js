import {
  EDIT_SERVICE_REQUEST,
  EDIT_SERVICE_FAILURE,
  EDIT_SERVICE_SUCCESS,
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

export default function serviceEditReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_SERVICE_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case EDIT_SERVICE_FAILURE:
      const { error } = action.payload;
      return {
        loading: false,
        error,
      };
    case EDIT_SERVICE_SUCCESS:
      const { service } = action.payload;
      return {
        service,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
