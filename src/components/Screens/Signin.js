import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import LinearProgress from '@material-ui/core/LinearProgress';
import { emailRegex } from '../../regex';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/user';

const Signin = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();
	const loading = useSelector((state) => state.loading);
	const dispatch = useDispatch();
	const error = useSelector((state) => state.error);
	const signin = (email, password) => dispatch(actions.signin(email, password));

	const addPost = (props) => {
		if (!emailRegex.test(email)) {
			M.toast({ html: 'Invalid email', classes: 'red' });

			return;
		}

		signin(email, password);

		if (error) {
			M.toast({ html: error, classes: 'red' });
		} else {
			M.toast({ html: 'Signin Success', classes: 'green' });
			history.push('/');
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
						Signin
					</Button>
					<h5>
						<Link to='/signup'>Don't have an account?</Link>
					</h5>
				</div>
			</div>
		</div>
	);
};

export default Signin;
