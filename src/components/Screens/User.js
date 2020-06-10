import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { UnfoldLessTwoTone } from '@material-ui/icons';
import * as actions from '../../store/actions/user';
import Button from '@material-ui/core/Button';

const User = () => {
	const [userProfile, setProfile] = useState(null);
	const user = useSelector((state) => state.user);
	const { userId } = useParams();
	// const followers = useSelector((state) => state.followers);
	// const following = useSelector((state) => state.following);
	//console.log(state.user);

	useEffect(() => {
		fetch(`/user/${userId}`, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
		})
			.then((res) => res.json())
			.then((data) => {
				//console.log(data);
				setProfile(data);
			})
			.catch((error) => console.log(error));
	}, []);

	const follow = () => {
		fetch('/follow', {
			method: 'put',
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify({
				followId: userId,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				localStorage.setItem('user', JSON.stringify(data));
				setProfile((prevState) => {
					return {
						...prevState,
						user: {
							...prevState.user,
							followers: [...prevState.user.followers, data._id],
						},
					};
				});
				//actions.follow();
			});
	};
	const unfollow = () => {
		fetch('/unfollow', {
			method: 'put',
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify({
				unfollowId: userId,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				localStorage.setItem('user', JSON.stringify(data));
				// const newFollowers = userProfile.user.followers.filter((id) => {
				// 	return id !== data._id;
				// });
				setProfile((prevState) => {
					const newFollowers = prevState.user.followers.filter(
						(id) => id !== data._id
					);
					return {
						...prevState,
						user: {
							...prevState.user,
							followers: newFollowers,
						},
					};
				});
				//actions.follow();
			});
	};

	return (
		<div style={{ maxWidth: '550px', margin: '0px auto' }}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-around',
					margin: '18px 0px',
					borderBottom: '1px solid grey',
				}}
			>
				<div>
					<img
						style={{ width: '160px', height: '160px', borderRadius: '80px' }}
						src='https://images.unsplash.com/photo-1581362232694-329367e2b2d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'
						alt='person'
					/>
				</div>
				<div>
					<h4>{userProfile ? userProfile.user.name : null}</h4>
					<h5>{userProfile ? userProfile.user.email : null}</h5>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							width: '108%',
						}}
					>
						<h6>{userProfile ? userProfile.posts.length : null} posts</h6>
						<h6>
							{userProfile ? userProfile.user.followers.length : null} followers
						</h6>
						<h6>
							{userProfile ? userProfile.user.following.length : null} following
						</h6>
						{userProfile ? (
							userProfile.user.followers.includes(user._id) ? (
								<Button
									/*variant='outlined'*/
									size='large'
									color='primary'
									onClick={() => unfollow()}
								>
									Unfollow
								</Button>
							) : (
								<Button
									/*variant='outlined'*/
									size='large'
									color='primary'
									onClick={() => follow()}
								>
									Follow
								</Button>
							)
						) : null}
					</div>
				</div>
			</div>
			<div className='gallery'>
				{userProfile &&
					userProfile.posts.map((item) => {
						return (
							<img
								className='item'
								src={item.imageUrl}
								alt='pics'
								key={item._id}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default User;
