import React, { useState, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import LinearProgress from '@material-ui/core/LinearProgress';
import { emailRegex } from '../../regex';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector, connect } from 'react-redux';
import * as actions from '../../store/actions/user';

const Signin = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();
	const [toggle, setToggle] = useState(false);
	const user = JSON.parse(localStorage.getItem('user'));

	// const loading = useSelector((state) => state.loading);
	// const dispatch = useDispatch();
	// const error = useSelector((state) => state.error);
	// const message = useSelector((state) => state.message);
	// //const navChange = () => dispatch(actions.navChange());
	// const signin = (email, password) => dispatch(actions.signin(email, password));
	const message = useSelector((state) => state.signinMessage);
	const error = useSelector((state) => state.signinError);
	const path = useSelector((state) => state.path);
	// useEffect(() => {
	// 	console.log(message);
	// 	if (error) {
	// 		M.toast({ html: error, classes: 'red' });
	// 		actions.signinStart();
	// 	}
	// 	// if (props.message) {
	// 	// 	console.log(props.message);
	// 	// 	M.toast({ html: props.message, classes: 'green' });
	// 	// 	history.push('/');
	// 	// }
	// 	console.log(props.signinClicked);
	// }, [props.signinClicked]);

	const addPost = () => {
		// if (!emailRegex.test(email)) {
		// 	M.toast({ html: 'Invalid email', classes: 'red' });
		// 	return;
		// }
		console.log('signin');
		props.signin(email, password);

		// if (props.error) {
		// 	M.toast({ html: props.error, classes: 'red' });
		// 	return;
		// }
		// if (props.message) {
		// 	M.toast({ html: props.message, classes: 'green' });
		// 	history.push('/');
		// }
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

//export default connect( Signin);
