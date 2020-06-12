import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Button } from '@material-ui/core';

const User = () => {
	const [userProfile, setProfile] = useState(null);
	const user = useSelector((state) => state.user);
	const { userId } = useParams();

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
			.catch((error) => {
				console.log(error);
			});
	}, [userId]);

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
				//console.log(data);
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
				//console.log(data);
				localStorage.setItem('user', JSON.stringify(data));
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
			});
	};

	return (
		<div>
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
						{userProfile ? (
							<img
								style={{
									width: '160px',
									height: '160px',
									borderRadius: '80px',
								}}
								src={userProfile ? userProfile.user.imageUrl : null}
								alt='person'
							/>
						) : null}
					</div>
					<div>
						<h4>{userProfile ? userProfile.user.name : '...'}</h4>
						<h5>{userProfile ? userProfile.user.email : '...'}</h5>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								width: '108%',
							}}
						>
							<h6>{userProfile ? userProfile.posts.length : '...'} posts</h6>
							<h6>
								{userProfile ? userProfile.user.followers.length : '...'}{' '}
								followers
							</h6>
							<h6>
								{userProfile ? userProfile.user.following.length : '...'}{' '}
								following
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
		</div>
	);
};

export default User;
