export const initialState = {
	user: null,
	loading: false,
	token: null,
	data: [],
	clicked: false,
	signinClicked: false,
	signupClicked: false,
	modalId: null,
	path: '/landing',
	error: null,
	message: null,
};

//pass server error as message on backend in catch block

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SIGNUP_START':
			return {
				...state,
				//signupMessage: null,
				//signupError: null,
				signupClicked: false,
				loading: true,
			};
		case 'SIGNUP_SUCCESS':
			return {
				...state,
				//signupMessage: action.message,
				loading: false,
			};
		case 'SIGNUP_FAIL':
			return {
				...state,
				//signupError: action.error,
				loading: false,
			};
		case 'SIGNIN_START':
			return {
				...state,

				loading: true,
			};
		case 'SIGNIN_SUCCESS':
			return {
				...state,
				//signinMessage: action.message,
				token: action.token,
				user: action.user,
				loading: false,
				path: '/',
			};
		case 'SIGNIN_FAIL':
			return {
				...state,
				//signinError: action.error,
				loading: false,
			};
		case 'LOGOUT_SUCCESS':
			return {
				...state,
				message: null,
				error: null,
				token: null,
				user: null,
				data: [],
				path: '/landing',
			};

		case 'FETCH_ALL_START':
			return {
				...state,
				error: null,
				loading: true,
			};
		case 'FETCH_ALL_SUCCESS':
			return {
				...state,
				data: action.data,
				loading: false,
			};
		case 'FETCH_ALL_FAIL':
			return {
				...state,
				error: action.error,
				loading: false,
			};
		case 'CLICKED':
			return {
				...state,
				clicked: !state.clicked,
			};
		case 'SIGNIN_CLICKED':
			return {
				...state,
				signinClicked: !state.signinClicked,
			};
		case 'SIGNUP_CLICKED':
			return {
				...state,
				signupClicked: !state.signupClicked,
			};
		case 'SET_ID':
			return {
				...state,
				modalId: action.id,
			};
		case 'CHECK_AUTH_SUCCESS':
			return {
				...state,
				token: action.token,
				user: action.user,
				path: '/',
			};
		// case 'FOLLOW':
		// 	return {
		// 		...state,
		// 		followers: action.followers,
		// 		following: action.following,
		// 	};
		default:
			return state;
	}
};
