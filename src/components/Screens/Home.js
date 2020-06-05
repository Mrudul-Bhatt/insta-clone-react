import React, { useState, useEffect, useContext, useCallback } from 'react';
import { LinearProgress } from '@material-ui/core';
import { userContext } from '../../App';

import {
	Button,
	IconButton,
	Dialog,
	DialogActions,
	DialogTitle,
} from '@material-ui/core';
import {
	Favorite as FavoriteIcon,
	Chat as ChatIcon,
	Delete as DeleteIcon,
	SettingsInputComponentSharp,
} from '@material-ui/icons';

const Home = () => {
	const [open, setOpen] = useState(false);
	const [data, setData] = useState([]);
	const [loader, setLoader] = useState(false);
	// const [postId, setPostId] = useState(false);
	const [comment, setComment] = useState('');

	const { state, dispatch } = useContext(userContext);

	useEffect(() => {
		setLoader(true);
		fetch('/allpost', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
		})
			.then((res) => res.json())
			.then((result) => {
				setData(result.posts);
				console.log(result);
				setLoader(false);
			})
			.catch((error) => {
				console.log(error);
				setLoader(false);
			});
	}, [data, setData]);

	const likePost = (id) => {
		fetch('/like', {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify({
				postId: id,
			}),
		})
			.then((res) => res.json())
			.then((result) => {
				//console.log(result);
				const newData = data.map((item) => {
					if (item._id === result._id) {
						return result;
					} else {
						return item;
					}
				});
				setData(newData);
			})
			.catch((error) => console.log(error));
	};

	const unlikePost = useCallback(
		(id) => {
			fetch('/unlike', {
				method: 'put',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('jwt'),
				},
				body: JSON.stringify({
					postId: id,
				}),
			})
				.then((res) => res.json())
				.then((result) => {
					//console.log(result);
					const newData = data.map((item) => {
						if (item._id === result._id) {
							return result;
						} else {
							return item;
						}
					});
					setData(newData);
				})
				.catch((error) => console.log(error));
		},
		[data, setData]
	);

	const postComment = useCallback(
		(postId) => {
			fetch('/comments', {
				method: 'put',
				headers: {
					'Content-type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('jwt'),
				},
				body: JSON.stringify({
					text: comment,
					postId,
				}),
			})
				.then((res) => res.json())
				.then((result) => {
					console.log(result);
					const newData = data.map((item) => {
						if (item._id === result._id) {
							return result;
						} else {
							return item;
						}
					});
					setData(newData);
					setComment('');
				})
				.catch((error) => console.log(error));
		},
		[data, setData]
	);

	const deletePost = useCallback(
		(postId) => {
			fetch(`/deletepost/${postId}`, {
				method: 'delete',
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('jwt'),
				},
			})
				.then((res) => res.json())
				.then((value) => {
					console.log(value);
					const newData = data.filter((item) => {
						return item._id !== value.result._id;
					});
					setData(newData);
				})
				.catch((error) => console.log(error));
		},
		[setData, data]
	);

	const ConfirmDeletePost = useCallback(
		(id) => {
			return (
				<Dialog
					open={open}
					onClose={setOpen(false)}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
				>
					<DialogTitle id='alert-dialog-title'>
						{'Do you want to delete this post?'}
					</DialogTitle>
					<DialogActions>
						<Button onClick={setOpen(false)} color='primary'>
							Cancel
						</Button>
						<Button
							onClick={() => {
								deletePost(id);
								setOpen(false);
							}}
							color='primary'
							autoFocus
						>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			);
		},
		[open, setOpen]
	);

	return (
		<div>
			{loader ? <LinearProgress /> : null}
			<div className='home'>
				{data.map((item) => {
					return (
						<div className='card home-card' key={item._id}>
							<h5>
								{item.postedBy.name}
								<span style={{ float: 'right' }}>
									{state.user._id === item.postedBy._id && (
										<IconButton aria-label='delete' onClick={setOpen(true)}>
											<DeleteIcon fontSize='small' />
											<ConfirmDeletePost id={item._id} />
										</IconButton>
									)}
								</span>
							</h5>
							<div className='card-image'>
								<img src={item.imageUrl} alt='' />
							</div>
							<div className='card-content'>
								{/* <i className='material-icons' style={{ color: 'red' }}>
							favorite
						</i> */}
								{item.likes.includes(state.user._id) ? (
									<i
										className='material-icons'
										style={{ color: 'red' }}
										onClick={() => unlikePost(item._id)}
									>
										thumb_down
									</i>
								) : (
									<i
										className='material-icons'
										style={{ color: 'blue' }}
										onClick={() => likePost(item._id)}
									>
										thumb_up
									</i>
								)}

								<h6>
									{item.likes.length} <FavoriteIcon />{' '}
									<span>
										{item.comments.length} <ChatIcon />
									</span>
								</h6>
								<h6>{item.title}</h6>
								<p>{item.body}</p>
								{item.comments.map((record) => {
									return (
										<h6 key={record._id}>
											<span>
												<strong>{record.postedBy.name}</strong>
											</span>{' '}
											{record.text}
										</h6>
									);
								})}
								<input
									type='text'
									placeholder='Add a comment'
									value={comment}
									onChange={(e) => setComment(e.target.value)}
								/>
								<Button
									/*variant='outlined'*/

									color='primary'
									onClick={() => postComment(item._id)}
								>
									Add
								</Button>
								<Button
									/*variant='outlined'*/

									color='secondary'
									onClick={() => setComment('')}
								>
									Cancel
								</Button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Home;
