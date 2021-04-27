import { UPDATEUSER } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const updateUser = (id, user, router) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, user);
    dispatch({ type: UPDATEUSER, payload: data });

    router.push('/account');
  } catch (error) {
    console.log(error);
  }
};