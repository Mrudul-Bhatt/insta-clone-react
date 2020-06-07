export const initialState = {
	user: null,
	error: null,
	loading: false,
	token: null,
	data: [],
	clicked: false,
	modalId: null,
	path: '/landing',
	navChange: false,
};

//pass server error as message on backend in catch block

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SIGNUP_START':
			return {
				...state,
				error: null,
				loading: true,
			};
		case 'SIGNUP_SUCCESS':
			return {
				...state,
				error: action.error,
				loading: false,
			};
		case 'SIGNUP_FAIL':
			return {
				...state,
				error: action.error,
				loading: false,
			};
		case 'SIGNIN_START':
			return {
				...state,
				error: null,
				loading: true,
			};
		case 'SIGNIN_SUCCESS':
			return {
				...state,
				error: action.error,
				token: action.token,
				user: action.user,
				loading: false,
				path: '/',
				navChange: true,
			};
		case 'SIGNIN_FAIL':
			return {
				...state,
				error: action.error,
				loading: false,
			};
		case 'LOGOUT_SUCCESS':
			return {
				...state,
				token: null,
				user: null,
				data: [],
				path: '/landing',
				navChange: false,
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
		case 'SET_ID':
			return {
				...state,
				modalId: action.id,
			};
		default:
			return state;
	}
};
