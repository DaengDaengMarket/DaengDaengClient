import { mypage } from './index.js';

// mypage를 위한 api 함수
function getMypage(userID) {
  return mypage.get(`/?id=${userID}`);
}
export { getMypage };
