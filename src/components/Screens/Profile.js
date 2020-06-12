import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, LinearProgress } from '@material-ui/core';
import { useHistory } from 'react-router';
import M from 'materialize-css';

const Profile = () => {
	const history = useHistory();
	const [pics, setPics] = useState([]);
	const user = useSelector((state) => state.user);
	const [image, setImage] = useState('');
	const [url, setUrl] = useState('');
	const [loader, setLoader] = useState(false);
	const data = JSON.parse(localStorage.getItem('user'));

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

	useEffect(() => {
		if (url) {
			setLoader(true);
			//console.log(url);
			fetch('/profileimg', {
				method: 'put',
				headers: {
					'Content-type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('jwt'),
				},
				body: JSON.stringify({
					postId: data._id,
					imageUrl: url,
				}),
			})
				.then((res) => res.json())
				.then((response) => {
					//console.log(response);
					if (response.error) {
						M.toast({ html: response.error, classes: 'red' });
					} else {
						localStorage.setItem('user', JSON.stringify(response.data));
						M.toast({ html: 'Image updated successfully', classes: 'green' });
						history.push('/');
					}
					setLoader(false);
				})
				.catch((error) => {
					console.log(error);
					setLoader(false);
				});
		}
	}, [url]);

	const addImage = () => {
		setLoader(true);
		const data = new FormData();
		data.append('file', image);
		data.append('upload_preset', 'insta-clone');
		data.append('cloud_name', 'dxediwgyn');
		fetch('	https://api.cloudinary.com/v1_1/dxediwgyn/image/upload ', {
			method: 'post',
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
				//console.log(data.url);
				setUrl(data.url);
			})
			.catch((error) => console.log(error));
	};

	return (
		<div>
			{loader ? <LinearProgress /> : null}
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
							src={data ? data.imageUrl : null}
							alt='person'
						/>
					</div>
					<div>
						<h4>{user ? user.name : null}</h4>
						<h5>{user ? user.email : null}</h5>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								width: '108%',
							}}
						>
							<h6>{pics ? pics.length : null} posts</h6>
							<h6>{data ? data.followers.length : null} followers</h6>
							<h6>{data ? data.following.length : null} following</h6>
						</div>
						<div className='file-field input-field'>
							<div className='btn waves-effect waves-light blue darken-1'>
								<span>Avatar</span>
								<input
									type='file'
									onChange={(e) => setImage(e.target.files[0])}
								/>
							</div>
							<div className='file-path-wrapper'>
								<input className='file-path validate' type='text' />
							</div>
						</div>
						<Button
							/*variant='outlined'*/
							size='large'
							color='primary'
							onClick={() => addImage()}
						>
							Upload Photo
						</Button>
					</div>
				</div>
				<div className='gallery'>
					{pics
						? pics.map((item) => {
								return (
									<img
										className='item'
										src={item.imageUrl}
										alt='pics'
										key={item._id}
									/>
								);
						  })
						: null}
				</div>
			</div>
		</div>
	);
};

export default Profile;
