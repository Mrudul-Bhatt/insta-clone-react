import React, { useState, useEffect, useRef } from 'react';
import * as actions from '../../store/actions/user';
import { Button, Avatar, Tooltip, LinearProgress } from '@material-ui/core';
import { Favorite as FavoriteIcon, Chat as ChatIcon } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import M from 'materialize-css';
import { Link } from 'react-router-dom';

const Home = () => {
	const deleteModal = useRef(null);
	const [id, setId] = useState(null);
	const [comment, setComment] = useState('');
	const dispatch = useDispatch();
	const fetchAll = () => dispatch(actions.fetchAll());
	const like = (id, data) => dispatch(actions.like(id, data));
	const unlike = (id, data) => dispatch(actions.unlike(id, data));
	const postComment = (id, data, comment) =>
		dispatch(actions.comment(id, data, comment));
	const deletePost = (id, data) => dispatch(actions.deletePost(id, data));
	const clickChange = () => dispatch(actions.clickedChange());
	const data = useSelector((state) => state.data);
	const loading = useSelector((state) => state.loading);
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		fetchAll();
		//console.log(data);
	}, []);

	useEffect(() => {
		M.Modal.init(deleteModal.current);
	}, []);

	return (
		<div>
			{loading ? <LinearProgress /> : null}
			<div className='home'>
				<div
					id='modal2'
					className='modal'
					ref={deleteModal}
					style={{ color: 'black' }}
				>
					<div className='modal-content'>
						<h4>Do you want to delete this post ?</h4>
					</div>
					<div className='modal-footer'>
						<button
							style={{ color: 'red' }}
							className='modal-close waves-effect waves-green btn-flat'
							onClick={() => {
								setId(null);
								M.Modal.getInstance(deleteModal.current).close();
							}}
						>
							Cancel
						</button>
						<button
							style={{ color: 'blue' }}
							className='modal-close waves-effect waves-green btn-flat'
							onClick={() => {
								deletePost(id, data);
								M.Modal.getInstance(deleteModal.current).close();
							}}
						>
							Delete
						</button>
					</div>
				</div>
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
								<span style={{ float: 'right' }}>
									{user._id === item.postedBy._id ? (
										<Tooltip title='Delete'>
											<i
												data-target='modal2'
												className='material-icons modal-trigger'
												onClick={() => {
													setId(item._id);
												}}
											>
												delete
											</i>
										</Tooltip>
									) : null}
								</span>
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
