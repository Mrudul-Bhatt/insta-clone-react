import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import LinearProgress from '@material-ui/core/LinearProgress';
import { emailRegex } from '../../regex';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/user';

const Signup = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();
	const dispatch = useDispatch();
	const error = useSelector((state) => state.error);
	const loading = useSelector((state) => state.loading);
	const signup = (name, email, password) =>
		dispatch(actions.signup(name, email, password));

	const addPost = (props) => {
		if (!emailRegex.test(email)) {
			M.toast({ html: 'Invalid email', classes: 'red' });
			return;
		}

		signup(name, email, password);
		if (error) {
			M.toast({ html: error, classes: 'red' });
		} else {
			M.toast({ html: 'Signup Success', classes: 'green' });
			history.push('/signin');
		}
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
