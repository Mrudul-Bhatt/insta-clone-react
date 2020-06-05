export const initialState = { user: null };

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'USER':
			return {
				...state,
				user: action.payload,
			};
		case 'CLEAR':
			return {
				...state,
				user: null,
			};
	}
};
