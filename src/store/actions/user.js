export const signupSuccess = (error) => {
	return {
		type: 'SIGNUP_SUCCESS',
		error: error,
	};
};

export const signupFail = (error) => {
	return {
		type: 'SIGNUP_FAIL',
		error: error,
	};
};

export const signupStart = () => {
	return {
		type: 'SIGNUP_START',
	};
};

export const signup = (name, email, password) => {
	return {
		type: 'SIGNUP',
		name: name,
		email: email,
		password: password,
	};
};

export const signinSuccess = ({ error, token, user }) => {
	return {
		type: 'SIGNIN_SUCCESS',
		error: error,
		token: token,
		user: user,
	};
};

export const signinFail = (error) => {
	return {
		type: 'SIGNIN_FAIL',
		error: error,
	};
};

export const signinStart = () => {
	return {
		type: 'SIGNIN_START',
	};
};

export const signin = (email, password) => {
	return {
		type: 'SIGNIN',
		email: email,
		password: password,
	};
};

export const logout = () => {
	return {
		type: 'LOGOUT',
	};
};

export const logoutSuccess = () => {
	return {
		type: 'LOGOUT_SUCCESS',
	};
};

export const checkAuth = () => {
	return {
		type: 'CHECK_AUTH',
	};
};

export const fetchAll = () => {
	return {
		type: 'FETCH_ALL',
	};
};

export const fetchAllStart = () => {
	return {
		type: 'FETCH_ALL_START',
	};
};

export const fetchAllSuccess = (data) => {
	return {
		type: 'FETCH_ALL_SUCCESS',
		data: data,
	};
};

export const fetchAllFail = (error) => {
	return {
		type: 'FETCH_ALL_FAIL',
		error: error,
	};
};

export const like = (postId, data) => {
	return {
		type: 'LIKE',
		postId: postId,
		data: data,
	};
};

export const unlike = (postId, data) => {
	return {
		type: 'UNLIKE',
		postId: postId,
		data: data,
	};
};

export const comment = (postId, data, comment) => {
	return {
		type: 'COMMENT',
		postId: postId,
		data: data,
		comment: comment,
	};
};
export const deletePost = (postId, data) => {
	return {
		type: 'DELETE_POST',
		postId: postId,
		data: data,
	};
};

export const clickedChange = () => {
	return {
		type: 'CLICKED',
	};
};

export const setId = (id) => {
	return {
		type: 'SET_ID',
		id: id,
	};
};
