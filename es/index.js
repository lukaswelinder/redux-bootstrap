import { render as renderToDOM } from "react-dom";
import { useRouterHistory } from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";
import { LOCATION_CHANGE, syncHistoryWithStore, routerMiddleware } from "react-router-redux";
import { combineReducers } from "redux-immutable";
import { createSelector } from "reselect";
import * as Immutable from "immutable";
import getRoot from "./containers/root";
import configureStore from "./store/configure_store";
const initialRouterReducerState = Immutable.fromJS({
    locationBeforeTransitions: null
});
const routerReducer = (state = initialRouterReducerState, action) => {
    if (action.type === LOCATION_CHANGE) {
        return state.merge({
            locationBeforeTransitions: action.payload
        });
    }
    return state;
};
const getRouting = (state) => state.get("routing");
function bootstrap(options) {
    if (options === undefined) {
        throw new TypeError("Null argument options.");
    }
    ;
    if (options.routes === undefined) {
        throw new TypeError("Invalid configuration field: routes.");
    }
    ;
    if (options.reducers === undefined) {
        throw new TypeError("Invalid configuration field: reducers.");
    }
    ;
    let routes = options.routes;
    let reducers = options.reducers;
    let container = options.container || "root";
    const createHistory = options.createHistory || createBrowserHistory;
    const historyOptions = options.historyOptions || {};
    let initialState = options.initialState || {};
    let immutableInitialState = Immutable.fromJS(initialState);
    let middlewares = options.middlewares || [];
    const render = options.render || renderToDOM;
    reducers.routing = routerReducer;
    let rootReducer = combineReducers(reducers);
    const routerHistory = useRouterHistory(createHistory)(historyOptions);
    let routerMddlwr = routerMiddleware(routerHistory);
    let devToolsOptions = options.devToolsOptions || {
        serialize: {
            immutable: Immutable
        }
    };
    const store = configureStore([...middlewares, routerMddlwr], rootReducer, immutableInitialState, devToolsOptions);
    const history = syncHistoryWithStore(routerHistory, store, {
        selectLocationState: createSelector(getRouting, (routing) => routing.toJS())
    });
    let root = getRoot(store, history, routes, options.routerProps);
    let renderArgs = [root];
    if (typeof document !== "undefined") {
        renderArgs.push(document.getElementById(container));
    }
    const output = render(...renderArgs);
    return {
        store,
        history,
        output,
        root
    };
}
export { bootstrap };
