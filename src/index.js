import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import userReducer from './reducers/user';
const rootReducer = userReducer;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';

// import thunk from 'redux-thunk';

// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// import burgerBuilderReducer from './store/reducers/burgerBuilder';
// import orderReducer from './store/reducers/order';
// import authReducer from './store/reducers/auth';
// import { watchAuth, watchBurgerBuilder, watchOrder } from './store/sagas';

// // const composeEnhancers =
// //   process.env.NODE_ENV === "development"
// //     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// //     : null || compose;

// const rootReducer = combineReducers({
// 	burgerBuilder: burgerBuilderReducer,
// 	order: orderReducer,
// 	auth: authReducer,
// });

// const sagaMiddleware = createSagaMiddleware();

// const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

// sagaMiddleware.run(watchAuth);
// sagaMiddleware.run(watchBurgerBuilder);
// sagaMiddleware.run(watchOrder);

// const app = (
// 	<Provider store={store}>
// 		<BrowserRouter>
// 			<App />
// 		</BrowserRouter>
// 	</Provider>
// );

// ReactDOM.render(app, document.getElementById('root'));
// serviceWorker.unregister();
