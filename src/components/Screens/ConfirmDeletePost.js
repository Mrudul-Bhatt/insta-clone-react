// import React, { useState } from 'react';
// import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

// const ConfirmDeletePost = (props) => {
// 	const [open, setOpen] = useState(props.toggle);
// 	return (
// 		<Dialog
// 			open={open}
// 			onClose={setOpen(false)}
// 			aria-labelledby='alert-dialog-title'
// 			aria-describedby='alert-dialog-description'
// 		>
// 			<DialogTitle id='alert-dialog-title'>
// 				{'Do you want to delete this post?'}
// 			</DialogTitle>
// 			<DialogActions>
// 				<Button onClick={setOpen(false)} color='primary'>
// 					Cancel
// 				</Button>
// 				<Button
// 					onClick={() => {
// 						props.deletePost(props.id);
// 						setOpen(false);
// 					}}
// 					color='primary'
// 					autoFocus
// 				>
// 					Delete
// 				</Button>
// 			</DialogActions>
// 		</Dialog>
// 	);
// };

// export default ConfirmDeletePost;
