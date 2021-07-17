import {getAuthFromCookie,getUserFromCookie} from '../../utils/cookies';
const authState = {
	auth: {
		id:0,
		email: getUserFromCookie || '',
		token: getAuthFromCookie || '',
	},
};

export default authState;
