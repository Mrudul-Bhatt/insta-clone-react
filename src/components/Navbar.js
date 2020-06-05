import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userContext } from '../App';
import Button from '@material-ui/core/Button';

const Navbar = () => {
	const { state, dispatch } = useContext(userContext);
	console.log(state);
	const history = useHistory();

	return (
		<nav>
			<div
				className='nav-wrapper white'
				style={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<div>
					<Link to={state.user ? '/' : '/landing'} className='brand-logo'>
						Instagram
					</Link>
				</div>

				<div>
					<ul id='nav-mobile' className='right '>
						{state.user ? (
							<div>
								<li>
									<Link to='/'>Home</Link>
								</li>
								<li>
									<Link to='/create'>Add Post</Link>
								</li>
								<li>
									<Link to='/profile'>Profile</Link>
								</li>
								<li>
									<Button
										color='primary'
										// variant='outlined'
										//className='btn waves-effect waves-light grey darken-1'
										// style={{
										// 	backgroundColor: 'grey',
										// 	border: 'none',
										// 	color: 'white',
										// 	padding: '15px 32px',
										// 	textAlign: 'center',

										// 	display: 'inline-block',
										// 	fontSize: '16px',
										// }}
										onClick={() => {
											localStorage.clear();
											dispatch({ type: 'CLEAR' });
											console.log(state);
											history.replace('/landing');
										}}
									>
										Logout
									</Button>
								</li>
							</div>
						) : (
							<div>
								<li>
									<Link to='/signin'>Signin</Link>
								</li>
								<li>
									<Link to='/signup'>Signup</Link>
								</li>
							</div>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import { Link } from 'react-router-dom';
//  import MenuIcon from '@material-ui/icons/Menu';

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		flexGrow: 1,
// 	},
// 	menuButton: {
// 		marginRight: theme.spacing(2),
// 	},
// 	title: {
// 		flexGrow: 1,
// 	},
// }));

// const Navbar = (props) => {
// 	const classes = useStyles();

// 	return (
// 		<div className={classes.root}>
// 			<AppBar position='static'>
// 				<Toolbar>
// 					 <IconButton
// 						edge='start'
// 						className={classes.menuButton}
// 						color='inherit'
// 						aria-label='menu'
// 					>
// 						 <MenuIcon />
// 					</IconButton>
// 					<Link to='/' style={{ textDecoration: 'none' }}>
// 						<Typography variant='h6' className={classes.title}>
// 							Instagram
// 						</Typography>
// 					</Link>
// 					<Button color='inherit'>
// 						<Link style={{ textDecoration: 'none' }} to='/login'>
// 							Login
// 						</Link>
// 					</Button>
// 					<Button color='inherit'>
// 						<Link style={{ textDecoration: 'none' }} to='/signup'>
// 							Signup
// 						</Link>
// 					</Button>
// 					<Button color='inherit'>
// 						<Link style={{ textDecoration: 'none' }} to='/profile'>
// 							Profile
// 						</Link>
// 					</Button>
// 				</Toolbar>
// 			</AppBar>
// 		</div>
// 	);
// };

// export default Navbar;
