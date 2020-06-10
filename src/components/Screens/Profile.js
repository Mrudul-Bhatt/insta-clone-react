import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
	const [pics, setPics] = useState([]);
	const user = useSelector((state) => state.user);
	// const followers = useSelector((state) => state.followers);
	// const following = useSelector((state) => state.following);
	const data = JSON.parse(localStorage.getItem('user'));
	//console.log(state.user);

	useEffect(() => {
		fetch('/mypost', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
		})
			.then((res) => res.json())
			.then((data) => {
				//console.log(data);
				setPics(data.mypost);
			})
			.catch((error) => console.log(error));
	}, []);

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
					<h4>{user ? user.name : 'Loading...'}</h4>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							width: '108%',
						}}
					>
						<h6>{pics && pics.length} posts</h6>
						<h6>{data.followers.length} followers</h6>
						<h6>{data.following.length} following</h6>
					</div>
				</div>
			</div>
			<div className='gallery'>
				{pics.map((item) => {
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

export default Profile;
