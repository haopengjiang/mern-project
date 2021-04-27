import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const fetchUploads = ()=> API.get('/document');
export const fetchUploadById = (id)=> API.get(`/document/${id}`);
export const upLoad = (formData)=> API.post('/document/upload',formData);
export const deleteUpload = (id) => API.delete(`/document/${id}`);
export const likeUpload = (id) => API.patch(`/document/${id}/likeUpload`);
export const updateUpload = (id, updateUpload) => API.patch(`/document/edit/${id}`,updateUpload);

export const updateUser = (id, updatedUser) => API.patch(`/user/${id}`, updatedUser);