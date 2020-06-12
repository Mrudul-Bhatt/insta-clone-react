import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, LinearProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/user';

const Signup = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const loading = useSelector((state) => state.loading);
	const signup = (name, email, password) =>
		dispatch(actions.signup(name, email, password));

	const addPost = () => {
		signup(name, email, password);
	};

	return (
		<div>
			{loading ? <LinearProgress /> : null}
			<div className='mycard'>
				<div className='card auth-card input-field'>
					<div>
						<i className='medium material-icons'>account_circle</i>
						<h2>Instagram</h2>
					</div>
					<input
						type='text'
						placeholder='Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type='text'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						/*variant='outlined'*/
						size='large'
						color='primary'
						onClick={() => addPost()}
					>
						Signup
					</Button>
					<h5>
						<Link to='/signin'> Already have account?</Link>
					</h5>
				</div>
			</div>
		</div>
	);
};

export default Signup;
