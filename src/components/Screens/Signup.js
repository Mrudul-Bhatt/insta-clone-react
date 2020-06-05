import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import LinearProgress from '@material-ui/core/LinearProgress';
import { emailRegex } from '../../regex';
import Button from '@material-ui/core/Button';

const Signup = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loader, setLoader] = useState(false);
	const history = useHistory();

	const addPost = (props) => {
		setLoader(true);
		if (!emailRegex.test(email)) {
			M.toast({ html: 'Invalid email', classes: 'red' });
			setLoader(false);
			return;
		}
		fetch('/signup', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					M.toast({ html: data.error, classes: 'red' });
				} else {
					M.toast({ html: data.message, classes: 'green' });
					history.push('/signin');
				}
				setLoader(false);
			})
			.catch((error) => {
				console.log(error);
				setLoader(false);
			});
	};

	return (
		<div>
			{loader ? <LinearProgress /> : null}
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
