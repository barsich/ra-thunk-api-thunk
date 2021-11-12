import {
  DELETE_SERVICE_REQUEST,
  DELETE_SERVICE_FAILURE,
  DELETE_SERVICE_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
};

export default function serviceDeleteReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_SERVICE_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case DELETE_SERVICE_FAILURE:
      const { error } = action.payload;
      return {
        loading: false,
        error,
      };
    case DELETE_SERVICE_SUCCESS:
      return {
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
