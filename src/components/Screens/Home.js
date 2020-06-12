import React, { useState, useEffect } from 'react';
import * as actions from '../../store/actions/user';
import { Button, Avatar, LinearProgress, Tooltip } from '@material-ui/core';
import { Favorite as FavoriteIcon, Chat as ChatIcon } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
	const [comment, setComment] = useState('');
	const dispatch = useDispatch();
	const fetchSubAll = () => dispatch(actions.fetchSubAll());
	const like = (id, data) => dispatch(actions.like(id, data));
	const unlike = (id, data) => dispatch(actions.unlike(id, data));
	const postComment = (id, data, comment) =>
		dispatch(actions.comment(id, data, comment));
	const clickChange = () => dispatch(actions.clickedChange());
	const data = useSelector((state) => state.data);
	const click = useSelector((state) => state.clicked);
	const loading = useSelector((state) => state.loading);
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		fetchSubAll();
		//console.log(data);
	}, [click]);

	return (
		<div>
			{loading ? <LinearProgress /> : null}
			<div className='home'>
				{data.map((item) => {
					return (
						<div className='card home-card' key={item._id}>
							<h5>
								<Link
									to={
										user._id !== item.postedBy._id
											? '/user/' + item.postedBy._id
											: '/profile'
									}
								>
									<div>
										<Avatar
											alt='Cindy Baker'
											src={item.postedBy.imageUrl}
											style={{ display: 'inline-block', margin: '5px' }}
										/>

										<h5
											style={{
												display: 'inline-block',
												margin: '10px',
											}}
										>
											{item.postedBy.name}
										</h5>
									</div>
								</Link>
							</h5>
							<div className='card-image'>
								<img src={item.imageUrl} alt='' />
							</div>
							<div className='card-content'>
								{item.likes.includes(user._id) ? (
									<Tooltip title='Dislike'>
										<i
											className='material-icons'
											style={{ color: 'red' }}
											onClick={() => {
												unlike(item._id, data);
											}}
										>
											thumb_down
										</i>
									</Tooltip>
								) : (
									<Tooltip title='Like'>
										<i
											className='material-icons'
											style={{ color: 'blue' }}
											onClick={() => {
												like(item._id, data);
											}}
										>
											thumb_up
										</i>
									</Tooltip>
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
										//console.log('add comment');
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
