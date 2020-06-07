import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions/user';
const Navbar = () => {
	const dispatch = useDispatch();
	const logout = useCallback(() => dispatch(actions.logout()), [dispatch]);
	console.log('executed navbar');
	//const user = localStorage.getItem('user');

	const navChange = useSelector((state) => state.navChange);

	const history = useHistory();

	const Navnames = () => {
		return (
			<div
				className='nav-wrapper white'
				style={{
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<div>
					<Link to={navChange ? '/' : '/landing'} className='brand-logo'>
						Instagram
					</Link>
				</div>

				<div>
					<ul id='nav-mobile' className='right '>
						{navChange ? (
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
		);
	};

	return (
		<nav>
			{Navnames()}
			{/* <div
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
			</div> */}
		</nav>
	);
};

export default Navbar;
