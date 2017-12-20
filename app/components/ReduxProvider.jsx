import React from 'react';
import ReactDOM from 'react-dom';
import GlobalState from './../reducers/reducers';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';

export default class ReduxProvider extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            selected: null,
            data: [],
            visible: [],
            favourites: [],
            isLoaded: false,
            error: false,
        };
        this.store = this.configureStore();
    }

    render() {
        return (
			<AppContainer warnings={false}>
				<Provider store={this.store}>
					<div style={{ height: '100%' }}>
						<App store={this.store} />
					</div>
				</Provider>
			</AppContainer>

        );
    }

    configureStore() {
        const store = createStore(GlobalState, this.initialState);
        if (module.hot) {
            module.hot.accept('./../reducers/reducers', () => {
                const nextRootReducer = require('./../reducers/reducers').default;
                store.replaceReducer(nextRootReducer);
            });
        }
        return store;
    }
}
