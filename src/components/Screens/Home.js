import React, { useState, useEffect, useCallback } from 'react';
import { LinearProgress } from '@material-ui/core';
import * as actions from '../../store/actions/user';
import ConfirmDeletePost from '../Screens/ConfirmDeletePost';
import { Button } from '@material-ui/core';
import { Favorite as FavoriteIcon, Chat as ChatIcon } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import M from 'materialize-css';

const Home = () => {
	const [comment, setComment] = useState('');
	const message = useSelector((state) => state.signinMessage);
	//const error = useSelector((state) => state.signinError);
	const dispatch = useDispatch();
	const fetchAll = () => dispatch(actions.fetchAll());
	const like = (id, data) => dispatch(actions.like(id, data));
	const unlike = (id, data) => dispatch(actions.unlike(id, data));
	const postComment = (id, data, comment) =>
		dispatch(actions.comment(id, data, comment));

	const setId = (id) => dispatch(actions.setId(id));
	const clickChange = () => dispatch(actions.clickedChange());
	const data = useSelector((state) => state.data);
	const click = useSelector((state) => state.clicked);
	const loading = useSelector((state) => state.loading);
	//const message = useSelector((state) => state.message);
	const signinClicked = useSelector((state) => state.signinClicked);
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		fetchAll();
		console.log(data);
	}, [click]);

	// useEffect(() => {
	// 	if (message) {
	// 		M.toast({ html: message, classes: 'green' });
	// 		actions.signinStart();
	// 	}
	// }, [signinClicked]);

	return (
		<div>
			{loading ? <LinearProgress /> : null}
			<div className='home'>
				<ConfirmDeletePost />
				{data.map((item) => {
					return (
						<div className='card home-card' key={item._id}>
							<h5>
								{item.postedBy.name}
								<span style={{ float: 'right' }}>
									{user._id === item.postedBy._id ? (
										<i
											className='material-icons'
											onClick={() => {
												setId(item._id);
											}}
										>
											delete
										</i>
									) : null}
								</span>
							</h5>
							<div className='card-image'>
								<img src={item.imageUrl} alt='' />
							</div>
							<div className='card-content'>
								{item.likes.includes(user._id) ? (
									<i
										className='material-icons'
										style={{ color: 'red' }}
										onClick={() => {
											unlike(item._id, data);
										}}
									>
										thumb_down
									</i>
								) : (
									<i
										className='material-icons'
										style={{ color: 'blue' }}
										onClick={() => {
											like(item._id, data);
										}}
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
									onClick={() => {
										postComment(item._id, data, comment);
										clickChange();
										setComment('');
										console.log('add comment');
									}}
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
