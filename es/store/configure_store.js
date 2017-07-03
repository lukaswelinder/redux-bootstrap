import { createStore, applyMiddleware, compose } from "redux";
function configureStore(middlewares, rootReducer, initialState, devToolsOptions) {
    let devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    let useDevTools = !!devTools;
    if (process.env.NODE_ENV === "production" && !process.env.DEBUG) {
        useDevTools = false;
    }
    const composeEnhancers = useDevTools ? devTools(devToolsOptions) : compose;
    return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));
}
export default configureStore;
