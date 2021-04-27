import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import uploads from './uploads';
import user from './user';

export const reducers = combineReducers({ posts, auth, uploads, user });
