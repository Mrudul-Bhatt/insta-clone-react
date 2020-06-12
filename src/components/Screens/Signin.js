import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/user';

const Signin = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [toggle, setToggle] = useState(false);

	const addPost = () => {
		//console.log('signin');
		props.signin(email, password);
	};

	return (
		<div>
			{props.loading ? <LinearProgress /> : null}
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
						onClick={() => {
							addPost();
							setToggle(!toggle);
						}}
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

const mapStateToProps = (state) => {
	return {
		loading: state.loading,
		error: state.error,
		message: state.message,
		signinClicked: state.signinClicked,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signin: (email, password) => dispatch(actions.signin(email, password)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
