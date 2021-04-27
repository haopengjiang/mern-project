import { FETCHUPLOADS, FETCHUPLOADBYID, UPLOAD, DELETEUPLOAD,LIKEUPLOAD, UPDATEUPLOAD } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUploads = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUploads();

    dispatch({ type: FETCHUPLOADS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUploadById = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchUploadById(id);

    dispatch({ type: FETCHUPLOADBYID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createUploads = (document) => async (dispatch) => {
  try {
    const { data } = await api.upLoad(document);
    dispatch({ type: UPLOAD, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUpload = (id) => async (dispatch) => {
  try {
    await api.deleteUpload(id);

    dispatch({ type: DELETEUPLOAD, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likeUpload = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeUpload(id);
    dispatch({ type: LIKEUPLOAD, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUpload = (id, upload) => async (dispatch) => {
  try {
    const { data } = await api.updateUpload(id, upload);

    dispatch({ type: UPDATEUPLOAD, payload: data });
  } catch (error) {
    console.log(error);
  }
};