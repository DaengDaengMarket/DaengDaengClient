import { blame } from './index.js';

function insertBlame(blameList) {
  return blame.post('/', blameList);
}

function getBlame(blameID) {
  return blame.get(`/?id=${blameID}`);
}

export { insertBlame, getBlame };
