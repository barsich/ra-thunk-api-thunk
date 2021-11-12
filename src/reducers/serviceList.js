import {
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
  REMOVE_SERVICE,
} from '../actions/actionTypes';

const initialState = {
  services: [],
  loading: false,
  error: null,
};

export default function serviceListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SERVICES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SERVICES_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case FETCH_SERVICES_SUCCESS:
      const { services } = action.payload;
      return {
        ...state,
        services,
        loading: false,
        error: null,
      };
    case REMOVE_SERVICE:
      const { id } = action.payload;
      return {
        ...state,
        services: state.services.filter((service) => service.id !== id),
      };
    default:
      return state;
  }
}
