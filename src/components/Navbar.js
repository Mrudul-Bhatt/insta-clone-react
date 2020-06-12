import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Link, useHistory, NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions/user';
import SearchIcon from '@material-ui/icons/Search';
import M from 'materialize-css';

const Navbar = () => {
	const searchModal = useRef(null);
	const [search, setSearch] = useState('');
	const [users, setUsers] = useState([]);
	const dispatch = useDispatch();
	//const [SUA, setSUA] = useState(null);
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

	useEffect(() => {
		M.Modal.init(searchModal.current);
	}, []);

	const searchUsers = (query) => {
		setSearch(query);
		fetch('/search', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify({
				query,
			}),
		})
			.then((res) => res.json())
			.then((value) => {
				console.log(value);
				setUsers(value.result);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<nav>
			<div
				id='modal1'
				className='modal'
				ref={searchModal}
				style={{ color: 'black' }}
			>
				<div className='modal-content'>
					<input
						type='text'
						placeholder='Search'
						value={search}
						onChange={(e) => searchUsers(e.target.value)}
					/>
					<ul className='collection'>
						{users
							? users.map((item) => {
									return (
										<Link
											key={item._id}
											to={
												item._id !== user._id ? '/user/' + item._id : '/profile'
											}
											onClick={() => {
												M.Modal.getInstance(searchModal.current).close();
												setSearch('');
											}}
										>
											<li className='collection-item'>{item.email}</li>
										</Link>
									);
							  })
							: null}
					</ul>
				</div>
				<div className='modal-footer'>
					<button
						onClick={() => setSearch('')}
						className='modal-close waves-effect waves-green btn-flat'
					>
						Done
					</button>
				</div>
			</div>
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
									<i
										className='large material-icons modal-trigger'
										data-target='modal1'
										style={{ color: 'blue', fontSize: '30px' }}
									>
										search
									</i>
								</li>
								<li>
									<Link to='/home'>Home</Link>
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
