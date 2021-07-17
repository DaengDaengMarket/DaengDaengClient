import { wish } from './index.js';

function insertWish(wishList) {
  return wish.post('/', wishList);
}

function getWish(wishID) {
  return wish.get(`/?item_id=${wishID}`);
}

export { insertWish, getWish };
