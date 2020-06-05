import React, {
	useEffect,
	useContext,
	createContext,
	useReducer,
	useCallback,
	useMemo,
} from 'react';

import './App.css';

import { Route, useHistory, Switch } from 'react-router-dom';
import Home from './components/Screens/Home';
import Signup from './components/Screens/Signup';
import Signin from './components/Screens/Signin';
import Profile from './components/Screens/Profile';
import Navbar from './components/Navbar';
import Createpost from './components/Screens/Createpost';
import LandingPage from './components/Screens/LandingPage';
import { initialState, reducer } from './reducers/user';
//import { initialState as is2, reducer as r2 } from './reducers/user';

//export const userContext = createContext();
//export const confirmContext = createContext();

const Routing = () => {
	const history = useHistory();
	const { dispatch } = useContext(userContext);
	//console.log(state);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			dispatch({ type: 'USER', payload: user });
		} else {
			history.push('/landing');
		}
	}, [dispatch]);
	return (
		<Switch>
			<Route path='/' exact component={Home} />
			<Route path='/landing' component={LandingPage} />
			<Route path='/create' component={Createpost} />
			<Route path='/signup' component={Signup} />
			<Route path='/signin' component={Signin} />
			<Route path='/profile' component={Profile} />
		</Switch>
	);
};

const App = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<userContext.Provider value={{ state, dispatch }}>
			<Navbar />
			<Routing />
		</userContext.Provider>
	);
};

export default App;
