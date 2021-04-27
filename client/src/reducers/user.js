import { UPDATEUSER } from '../constants/actionTypes';

const initialState = {
    user:{}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATEUSER:
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      return {...state, user: action.payload };
    default:
      return state;
  }
};