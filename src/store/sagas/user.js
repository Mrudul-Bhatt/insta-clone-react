import { put, call } from 'redux-saga/effects';
import * as actions from '../actions/user';

export function* sagaLogout(action) {
	yield call([localStorage, 'removeItem'], 'jwt');
	yield call([localStorage, 'removeItem'], 'user');
	yield put(actions.logoutSuccess());
}

export function* sagaSignup(action) {
	yield put(actions.signupStart());
	const signupData = {
		name: action.name,
		email: action.email,
		password: action.password,
	};

	try {
		const response = yield fetch('/signup', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(signupData),
		});
		const value = yield response.json();

		yield put(actions.signupSuccess(value.error));
	} catch (error) {
		yield put(actions.signupFail(error));
	}
}

export function* sagaSignin(action) {
	yield put(actions.signinStart());
	const signinData = {
		email: action.email,
		password: action.password,
	};

	try {
		const response = yield fetch('/signin', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(signinData),
		});
		const value = yield response.json();
		//const value = yield JSON.parse(response);

		yield localStorage.setItem('jwt', value.token);
		yield localStorage.setItem('user', JSON.stringify(value.user));
		yield put(actions.signinSuccess(value.error, value.token, value.user));
	} catch (error) {
		yield put(actions.signinFail(error));
	}
}

export function* sagaCheckAuth(action) {
	const token = yield localStorage.getItem('jwt');
	if (!token) {
		yield put(actions.logoutSuccess());
	} else {
		const user = yield JSON.parse(localStorage.getItem('user'));
		yield put(actions.signinSuccess({ error: null, token, user }));
	}
}

export function* sagaFetchAll(action) {
	yield put(actions.fetchAllStart());

	try {
		const response = yield fetch('/allpost', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
		});
		const value = yield response.json();

		yield put(actions.fetchAllSuccess(value.posts));
		yield console.log(value.posts);
	} catch (error) {
		yield put(actions.fetchAllFail(error));
	}
}

export function* sagaLike(action) {
	//yield put(actions.fetchAllStart());

	const likeData = {
		postId: action.postId,
	};

	try {
		const response = yield fetch('/like', {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify(likeData),
		});
		const value = response.json();

		const newData = yield action.data.map((item) => {
			if (item._id === value._id) {
				return value;
			} else {
				return item;
			}
		});
		yield put(actions.fetchAllSuccess(newData));
		yield console.log('like saga finished');
	} catch (error) {
		yield put(actions.fetchAllFail(error));
	}
	yield put(actions.clickedChange());
}

export function* sagaUnlike(action) {
	//yield put(actions.fetchAllStart());

	const unlikeData = {
		postId: action.postId,
	};

	try {
		const response = yield fetch('/unlike', {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify(unlikeData),
		});
		const value = yield response.json();

		const newData = yield action.data.map((item) => {
			if (item._id === value._id) {
				return value;
			} else {
				return item;
			}
		});
		yield put(actions.fetchAllSuccess(newData));
		yield console.log('unlike saga finished');
	} catch (error) {
		yield put(actions.fetchAllFail(error));
	}
	yield put(actions.clickedChange());
}

export function* sagaComment(action) {
	yield put(actions.fetchAllStart());

	const commentData = {
		text: action.comment,
		postId: action.postId,
	};

	try {
		const response = yield fetch('/comments', {
			method: 'put',
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify(commentData),
		});
		const value = response.json();

		const newData = action.data.map((item) => {
			if (item._id === value._id) {
				return value;
			} else {
				return item;
			}
		});
		yield put(actions.fetchAllSuccess(newData));
	} catch (error) {
		yield put(actions.fetchAllFail(error));
	}
}

export function* sagaDeletePost(action) {
	//yield put(actions.fetchAllStart());

	try {
		const response = yield fetch(`/deletepost/${action.postId}`, {
			method: 'delete',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
		});
		const value = yield response.json();
		const newData = yield action.data.filter((item) => {
			return item._id !== value.result._id;
		});
		yield put(actions.fetchAllSuccess(newData));
		yield console.log('deletepost saga finished');
	} catch (error) {
		yield put(actions.fetchAllFail(error));
	}
	yield put(actions.clickedChange());
	yield put(actions.setId(null));
}
