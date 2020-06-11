import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/user';

const ConfirmDeletePost = (props) => {
	const dispatch = useDispatch();

	const id = useSelector((state) => state.modalId);

	const data = useSelector((state) => state.data);
	const deletePost = (id, data) => dispatch(actions.deletePost(id, data));
	const setId = (id) => dispatch(actions.setId(id));

	const open = id ? true : false;

	return (
		<Dialog
			open={open}
			onClose={() => setId(null)}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>
				{'Do you want to delete this post?'}
			</DialogTitle>
			<DialogActions>
				<Button onClick={() => setId(null)} color='primary'>
					Cancel
				</Button>
				<Button
					onClick={() => {
						deletePost(id, data);
					}}
					color='primary'
					autoFocus
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDeletePost;
