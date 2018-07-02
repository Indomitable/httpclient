import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import rootReducer from './app.state';

export default function configureStore(history, initialState) {
    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }

    const store = createStore(
        connectRouter(history)(rootReducer),
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );

    if (isDevelopment && module.hot) {
        module.hot.accept('./app.state', () => {
            const nextRootReducer = require('./app.state');
            store.replaceReducer(connectRouter(history)(nextRootReducer));
        });
    }
    
    return store;
}
