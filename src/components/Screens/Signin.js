import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import LinearProgress from '@material-ui/core/LinearProgress';
import { emailRegex } from '../../regex';
import { userContext } from '../../App';
import Button from '@material-ui/core/Button';

const Signin = () => {
	const { state, dispatch } = useContext(userContext);

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
		fetch('/signin', {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				//console.log(data);
				if (data.error) {
					M.toast({ html: data.error, classes: 'red' });
				} else {
					localStorage.setItem('jwt', data.token);
					//in localstorage we can store strings only
					localStorage.setItem('user', JSON.stringify(data.user));
					dispatch({ type: 'USER', payload: data.user });
					M.toast({ html: 'Signin Successfull', classes: 'green' });
					history.push('/');
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

// import React from 'react';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import {} from '@material-ui/core/Icon';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';

// function Copyright() {
// 	return (
// 		<Typography variant='body2' color='textSecondary' align='center'>
// 			{'Copyright © '}
// 			<Link color='inherit' href='https://material-ui.com/'>
// 				Your Website
// 			</Link>
// 			{new Date().getFullYear()}
// 			{'.'}
// 		</Typography>
// 	);
// }

// const useStyles = makeStyles((theme) => ({
// 	paper: {
// 		marginTop: theme.spacing(8),
// 		display: 'flex',
// 		flexDirection: 'column',
// 		alignItems: 'center',
// 	},
// 	avatar: {
// 		margin: theme.spacing(1),
// 		backgroundColor: theme.palette.secondary.main,
// 	},
// 	form: {
// 		width: '100%', // Fix IE 11 issue.
// 		marginTop: theme.spacing(1),
// 	},
// 	submit: {
// 		margin: theme.spacing(3, 0, 2),
// 	},
// }));

// export default function SignIn() {
// 	const classes = useStyles();

// 	return (
// 		<Container component='main' maxWidth='xs'>
// 			<CssBaseline />
// 			<div className={classes.paper}>
// 				<Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
// 				<Typography component='h1' variant='h5'>
// 					Sign in
// 				</Typography>
// 				<form className={classes.form} noValidate>
// 					<TextField
// 						variant='outlined'
// 						margin='normal'
// 						required
// 						fullWidth
// 						id='email'
// 						label='Email Address'
// 						name='email'
// 						autoComplete='email'
// 						autoFocus
// 					/>
// 					<TextField
// 						variant='outlined'
// 						margin='normal'
// 						required
// 						fullWidth
// 						name='password'
// 						label='Password'
// 						type='password'
// 						id='password'
// 						autoComplete='current-password'
// 					/>
// 					<FormControlLabel
// 						control={<Checkbox value='remember' color='primary' />}
// 						label='Remember me'
// 					/>
// 					<Button
// 						type='submit'
// 						fullWidth
// 						variant='contained'
// 						color='primary'
// 						className={classes.submit}
// 					>
// 						Sign In
// 					</Button>
// 					<Grid container>
// 						<Grid item xs>
// 							<Link href='#' variant='body2'>
// 								Forgot password?
// 							</Link>
// 						</Grid>
// 						<Grid item>
// 							<Link href='#' variant='body2'>
// 								{"Don't have an account? Sign Up"}
// 							</Link>
// 						</Grid>
// 					</Grid>
// 				</form>
// 			</div>
// 			<Box mt={8}>
// 				<Copyright />
// 			</Box>
// 		</Container>
// 	);
// }
