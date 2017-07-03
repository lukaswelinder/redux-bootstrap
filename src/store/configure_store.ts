import { createStore, applyMiddleware, compose } from "redux";
import * as Redux from "redux";
import interfaces from "../interfaces/interfaces";

function configureStore(
    middlewares: Redux.Middleware[],
    rootReducer: Redux.Reducer<any>,
    initialState: any,
    devToolsOptions: interfaces.DevToolsOptions
): Redux.Store<any> {

    let devTools: interfaces.DevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

    let useDevTools: boolean = !!devTools;
    if(process.env.NODE_ENV === 'production' && !process.env.DEBUG) {
        useDevTools = false;
    }

    const composeEnhancers = useDevTools ? devTools(devToolsOptions) : compose;

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(...middlewares)
        )
    );

}

export default configureStore;
