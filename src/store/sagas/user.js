import { put, call } from 'redux-saga/effects';
import * as actions from '../actions/user';
import { emailRegex } from '../../regex';
import M from 'materialize-css';

export function* sagaLogout(action) {
	yield call([localStorage, 'removeItem'], 'jwt');
	yield call([localStorage, 'removeItem'], 'user');
	yield put(actions.logoutSuccess());
}

const signup = (data) => {
	//console.log('signin start');
	return fetch('/signup', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: data.name,
			email: data.email,
			password: data.password,
		}),
	})
		.then((res) => res.json())
		.then((response) => ({
			response,
		}))
		.catch((error) => ({
			//console.log('error');
			error,
		}));
};

export function* sagaSignup(action) {
	yield put(actions.signupStart());
	const signupData = {
		name: action.name,
		email: action.email,
		password: action.password,
	};

	if (!emailRegex.test(signupData.email)) {
		if (!signupData.email || !signupData.password || !signupData.name) {
			M.toast({ html: 'Please fill all fields', classes: 'red' });
			yield put(actions.signupFail('Please fill all details'));
		} else {
			M.toast({ html: 'Invalid Email', classes: 'red' });
			yield put(actions.signupFail('Invalid Email'));
		}
		//yield put(actions.signupClicked());
		return;
	}

	const { response, error } = yield call(signup, signupData);

	if (response.error) {
		M.toast({ html: response.error, classes: 'red' });
		yield put(actions.signupFail(response.error));
	} else if (error) {
		M.toast({ html: 'Server is down, try again later', classes: 'red' });
		yield put(actions.signupFail('Server is down, try again later'));
	} else {
		M.toast({ html: response.message, classes: 'green' });
		//history.push('/signin');
		yield put(actions.signupSuccess(response));
		yield put(actions.signupClicked());
	}
}

const signin = (data) => {
	//console.log('signin start');
	return fetch('http://localhost:5000/signin', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: data.email,
			password: data.password,
		}),
	})
		.then((res) => res.json())
		.then((response) => ({
			response,
		}))
		.catch((error) => ({
			//console.log('error');
			error,
		}));
};

export function* sagaSignin(action) {
	//console.log('start');
	yield put(actions.signinStart());

	const signinData = { email: action.email, password: action.password };

	if (!emailRegex.test(signinData.email)) {
		if (!signinData.email || !signinData.password) {
			M.toast({ html: 'Please fill all fields', classes: 'red' });
			yield put(actions.signinFail('Please fill all details'));
		} else {
			M.toast({ html: 'Invalid Email', classes: 'red' });
			yield put(actions.signinFail('Invalid Email'));
		}
		//yield put(actions.signinClicked());
		return;
	}
	//console.log('dispatch');
	const { response, error } = yield call(signin, signinData);
	yield console.log(response.error);
	yield console.log(error);

	if (response.error) {
		M.toast({ html: response.error, classes: 'red' });
		yield put(actions.signinFail(response.error));
	} else if (error) {
		M.toast({ html: 'Server is down, try again later', classes: 'red' });
		yield put(actions.signinFail('Server is down, try again later'));
	} else {
		M.toast({ html: response.message, classes: 'green' });
		yield localStorage.setItem('jwt', response.token);
		yield localStorage.setItem('user', JSON.stringify(response.user));
		yield put(actions.signinSuccess(response));
		//yield put(actions.follow(response));
	}
	//yield put(actions.signinClicked());
}

export function* sagaCheckAuth(action) {
	const token = yield localStorage.getItem('jwt');
	if (!token) {
		yield put(actions.logoutSuccess());
	} else {
		const user = yield JSON.parse(localStorage.getItem('user'));
		const response = { user: user, token: token };
		yield put(actions.checkAuthSuccess(response));
	}
}

const fetchAll = (data) => {
	return fetch('/allpost', {
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('jwt'),
		},
	})
		.then((res) => res.json())
		.then((response) => ({
			response,
		}))
		.catch((error) => ({
			//console.log('error');
			error,
		}));
};

export function* sagaFetchAll(action) {
	yield put(actions.fetchAllStart());
	const { response, error } = yield call(fetchAll);

	if (response.error) {
		yield put(actions.fetchAllFail(response.error));
	} else if (error) {
		yield put(actions.fetchAllFail('Server is down, try again later'));
	} else {
		yield put(actions.fetchAllSuccess(response.posts));
	}
}

const fetchSubAll = (data) => {
	return fetch('/allsubpost', {
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('jwt'),
		},
	})
		.then((res) => res.json())
		.then((response) => ({
			response,
		}))
		.catch((error) => ({
			//console.log('error');
			error,
		}));
};

export function* sagaFetchSubAll(action) {
	yield put(actions.fetchAllStart());
	const { response, error } = yield call(fetchSubAll);

	if (response.error) {
		yield put(actions.fetchAllFail(response.error));
	} else if (error) {
		yield put(actions.fetchAllFail('Server is down, try again later'));
	} else {
		yield put(actions.fetchAllSuccess(response.posts));
	}
}

const like = (data) => {
	return fetch('/like', {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('jwt'),
		},
		body: JSON.stringify({ postId: data.postId }),
	})
		.then((res) => res.json())
		.then((response) => ({
			response,
		}))
		.catch((error) => ({
			//console.log('error');
			error,
		}));
};

export function* sagaLike(action) {
	//yield put(actions.fetchAllStart());

	const likeData = {
		postId: action.postId,
	};
	const { response, error } = yield call(like, likeData);

	if (response.error) {
		M.toast({ html: 'Server is down, try again later', classes: 'red' });
		yield put(actions.fetchAllFail('server error'));
	} else if (error) {
		M.toast({ html: 'Server is down, try again later', classes: 'red' });
		yield put(actions.fetchAllFail('Server is down, try again later'));
	} else {
		const newData = yield action.data.map((item) => {
			if (item._id === response._id) {
				return response;
			} else {
				return item;
			}
		});

		yield put(actions.fetchAllSuccess(newData));
	}
	yield put(actions.clickedChange());
}

const unlike = (data) => {
	return fetch('/unlike', {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('jwt'),
		},
		body: JSON.stringify({ postId: data.postId }),
	})
		.then((res) => res.json())
		.then((response) => ({
			response,
		}))
		.catch((error) => ({
			//console.log('error');
			error,
		}));
};

export function* sagaUnlike(action) {
	//yield put(actions.fetchAllStart());

	const unlikeData = {
		postId: action.postId,
	};
	const { response, error } = yield call(unlike, unlikeData);

	if (response.error) {
		M.toast({ html: 'Server is down, try again later', classes: 'red' });
		yield put(actions.fetchAllFail('server down'));
	} else if (error) {
		M.toast({ html: 'Server is down, try again later', classes: 'red' });
		yield put(actions.fetchAllFail('Server is down, try again later'));
	} else {
		const newData = yield action.data.map((item) => {
			if (item._id === response._id) {
				return response;
			} else {
				return item;
			}
		});

		yield put(actions.fetchAllSuccess(newData));
	}

	yield put(actions.clickedChange());
}

const comment = (data) => {
	return fetch('/comments', {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem('jwt'),
		},
		body: JSON.stringify({ text: data.text, postId: data.postId }),
	})
		.then((res) => res.json())
		.then((response) => ({
			response,
		}))
		.catch((error) => ({
			//console.log('error');
			error,
		}));
};

export function* sagaComment(action) {
	yield put(actions.fetchAllStart());

	const commentData = {
		text: action.comment,
		postId: action.postId,
	};

	const { response, error } = yield call(comment, commentData);

	if (response.error) {
		yield put(actions.fetchAllFail(response.error));
	} else if (error) {
		yield put(actions.fetchAllFail('Server is down, try again later'));
	} else {
		const newData = yield action.data.map((item) => {
			if (item._id === response._id) {
				return response;
			} else {
				return item;
			}
		});

		yield put(actions.fetchAllSuccess(newData));
	}
}

const deletePost = (data) => {
	return fetch(`/deletepost/${data.postId}`, {
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('jwt'),
		},
	})
		.then((res) => res.json())
		.then((response) => ({
			response,
		}))
		.catch((error) => ({
			//console.log('error');
			error,
		}));
};

export function* sagaDeletePost(action) {
	//yield put(actions.fetchAllStart());

	const deleteData = {
		postId: action.postId,
	};

	const { response, error } = yield call(deletePost, deleteData);

	if (response.error) {
		yield put(actions.fetchAllFail(response.error));
	} else if (error) {
		yield put(actions.fetchAllFail('Server is down, try again later'));
	} else {
		const newData = yield action.data.filter((item) => {
			return item._id !== response.result._id;
		});

		yield put(actions.fetchAllSuccess(newData));
	}

	yield put(actions.clickedChange());
	//yield put(actions.setId(null));
}
