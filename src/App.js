import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './store/actions/user';
import './App.css';
import { Route, useHistory, Switch, Redirect } from 'react-router-dom';
import Home from './components/Screens/Home';
import Signup from './components/Screens/Signup';
import Signin from './components/Screens/Signin';
import Profile from './components/Screens/Profile';
import Navbar from './components/Navbar';
import Createpost from './components/Screens/Createpost';
import LandingPage from './components/Screens/LandingPage';
//import { Router } from '@material-ui/icons';
import User from './components/Screens/User';

const App = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const user = JSON.parse(localStorage.getItem('user'));
	const path = useSelector((state) => state.path);
	const autoLogin = () => dispatch(actions.checkAuth());
	//const result = useSelector((state) => state.result);
	//console.log(result);
	// const error = useSelector((state) => state.error);
	// const message = useSelector((state) => state.message);
	// const signinClicked = useSelector((state) => state.signinClicked);

	// if (!user) {
	// 	history.push('/landing');
	// }
	//console.log(error, message);
	useEffect(() => {
		autoLogin();
		//console.log(result);

		history.push(path);
	}, [path]);

	// useEffect(()=>{
	// 	const user = JSON.parse(localStorage.getItem("user"))
	// 	if(user){
	// 	  dispatch({type:"USER",payload:user})
	// 	}else{
	// 	  if(!history.location.pathname.startsWith('/reset'))
	// 		   history.push('/signin')
	// 	}
	//   },[])

	let routes = (
		<Switch>
			<Route path='/landing' component={LandingPage} />
			<Route path='/signup' component={Signup} />
			<Route path='/signin' component={Signin} />
		</Switch>
	);

	if (user) {
		routes = (
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/create' component={Createpost} />
				<Route path='/profile' component={Profile} />
				<Route path='/user/:userId' component={User} />
			</Switch>
		);
	}

	return (
		<div>
			<Navbar />
			{routes}
		</div>
	);
};

export default App;
