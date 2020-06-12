import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './store/actions/user';
import './App.css';
import { Route, useHistory, Switch } from 'react-router-dom';
import Home from './components/Screens/Home';
import Explore from './components/Screens/Explore';
import Signup from './components/Screens/Signup';
import Signin from './components/Screens/Signin';
import Profile from './components/Screens/Profile';
import Navbar from './components/Navbar';
import Createpost from './components/Screens/Createpost';
import LandingPage from './components/Screens/LandingPage';
import User from './components/Screens/User';

const App = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const user = JSON.parse(localStorage.getItem('user'));
	const path = useSelector((state) => state.path);
	const autoLogin = () => dispatch(actions.checkAuth());

	useEffect(() => {
		autoLogin();
		//console.log(result);

		history.push(path);
	}, [path]);

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
				<Route path='/' exact component={Explore} />
				<Route path='/create' component={Createpost} />
				<Route path='/profile' component={Profile} />
				<Route path='/user/:userId' component={User} />
				<Route path='/home' component={Home} />
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
