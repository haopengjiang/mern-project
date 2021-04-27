import { FETCHUPLOADS, FETCHUPLOADBYID, UPLOAD, DELETEUPLOAD, LIKEUPLOAD, UPDATEUPLOAD} from '../constants/actionTypes';

const initialState = {
    uploads: [],
    selectedUpload: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHUPLOADS:
      return {
        ...state,
        uploads: action.payload
      };
    case FETCHUPLOADBYID: 
      return {
        ...state,
        selectedUpload: action.payload
      }
    case UPLOAD:
      return {
        ...state,
        uploads: [...state.uploads, action.payload]
      };
    case DELETEUPLOAD:
      return {
        ...state,
        uploads: state.uploads.filter((upload) => upload._id !== action.payload)
      };      
    case LIKEUPLOAD:
      return {
        ...state,
        uploads: state.uploads.map((upload) => (upload._id === action.payload._id ? action.payload : upload))
      };
    case UPDATEUPLOAD:
      return {
        ...state,
        uploads: state.uploads.map((upload) => (upload._id === action.payload._id ? action.payload: upload))
      };
    default:
      return state;
  }
};
