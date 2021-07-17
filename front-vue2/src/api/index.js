import axios from 'axios';
import store from '@/store/index';
import { setInterceptors } from './common/interceptor';
// import { setInterceptors } from './common/interceptor';

// function createInstance() {
// 	const instance = axios.create({
// 		baseURL: process.env.VUE_APP_API_URL,
// 	});
// 	return setInterceptors(instance);
// }
// const instance = createInstance();

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    // cors로 인해 주석 처리
    // Authorization : store.state.auth.token,
  },
});

function loginUser(userData) {
  // const url = 'http://localhost:3080/login';
  return instance.post('login', userData);
}
function registerUser(userData) {
  // const url = 'http://localhost:3080/user';

  return instance.post('users', userData);
}
export { loginUser, registerUser };
// axios의 api 함수 구조화

function createInstanceWithAuth(url) {
  const instance = axios.create({
    // baseURL: `${process.env.VUE_APP_API_URL}api/${url}`,
    baseURL: `http://localhost:3002/${url}`,
  });
  return setInterceptors(instance);
}
function createInstanceWithAuth2(url) {
  const instance = axios.create({
    // baseURL: `${process.env.VUE_APP_API_URL}api/${url}`,
    baseURL: `http://localhost:3003/${url}`,
  });
  return setInterceptors(instance);
}
function createInstanceWithAuth3(url) {
  const instance = axios.create({
    // baseURL: `${process.env.VUE_APP_API_URL}api/${url}`,
    baseURL: `http://localhost:3004/${url}`,
  });
  return setInterceptors(instance);
}

function createPost(postData) {
  return axios.post('http://localhost:3002/notice', postData);
}

export const goods = createInstanceWithAuth('goods');
// 추후 리팩토링이 필요함(goods->items)
export const items = createInstanceWithAuth2('items');
export const wish = createInstanceWithAuth2('wish');
export const blame = createInstanceWithAuth2('blame');
export { createPost };
