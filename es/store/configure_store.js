import { createStore, applyMiddleware, compose } from "redux";
function configureStore(middlewares, rootReducer, initialState, devToolsOptions) {
    let devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    const composeEnhancers = devTools ? devTools(devToolsOptions) : compose;
    return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));
}
export default configureStore;
