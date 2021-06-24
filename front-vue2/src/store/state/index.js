import stateMenu from './menus.js';
import stateColor from './colors.js';
import stateTest from './test.js';
import stateBoard from './board.js';

const state = {
	...stateMenu,
	...stateColor,
	...stateTest,
	...stateBoard,
};

export default state;
