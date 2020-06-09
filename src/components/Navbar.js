import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions/user';
const Navbar = () => {
	const dispatch = useDispatch();
	const logout = () => dispatch(actions.logout());
	console.log('executed navbar');
	//const user = localStorage.getItem('user');
	const user = useSelector((state) => state.user);
	//const navChange = useSelector((state) => state.navChange);
	//const token = useSelector((state) => state.token !== null);
	//const navChangefn = () => dispatch(actions.navChange());

	// useEffect(() => {
	// 	console.log(navChange);
	// }, [navChange]);
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
					<Link to={user ? '/' : '/landing'} className='brand-logo'>
						Instagram
					</Link>
				</div>

				<div>
					<ul id='nav-mobile' className='right '>
						{user ? (
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
										onClick={() => {
											console.log('executed logout');
											logout();
											//navChangefn();
											history.push('/landing');
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
