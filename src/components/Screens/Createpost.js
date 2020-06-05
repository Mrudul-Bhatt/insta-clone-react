import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { useHistory } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

const Createpost = () => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [image, setImage] = useState('');
	const [url, setUrl] = useState('');
	const [loader, setLoader] = useState(false);

	const history = useHistory();

	useEffect(() => {
		if (url) {
			fetch('/createpost', {
				method: 'post',
				headers: {
					'Content-type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('jwt'),
				},
				body: JSON.stringify({
					title,
					body,
					imageUrl: url,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					if (data.error) {
						M.toast({ html: data.error, classes: 'red' });
					} else {
						M.toast({ html: 'Post created successfully', classes: 'green' });
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

	const addPost = () => {
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
				setUrl(data.url);
			})
			.catch((error) => console.log(error));
	};

	return (
		<div>
			{loader ? <LinearProgress /> : null}
			<div
				className='card input-filed'
				style={{
					margin: '10px auto',
					maxWidth: '500px',
					padding: '20px',
					textAlign: 'center',
					marginTop: '80px',
				}}
			>
				<input
					type='text'
					placeholder='Title'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Body'
					value={body}
					onChange={(e) => setBody(e.target.value)}
				/>

				<div className='file-field input-field'>
					<div className='btn waves-effect waves-light blue darken-1'>
						<span>Image</span>
						<input type='file' onChange={(e) => setImage(e.target.files[0])} />
					</div>
					<div className='file-path-wrapper'>
						<input className='file-path validate' type='text' />
					</div>
				</div>
				<button
					className='btn waves-effect waves-light blue darken-1'
					onClick={addPost}
				>
					Post
				</button>
			</div>
		</div>
	);
};

export default Createpost;
