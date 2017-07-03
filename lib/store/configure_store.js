"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
function configureStore(middlewares, rootReducer, initialState, devToolsOptions) {
    var devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    var useDevTools = !!devTools;
    if (process.env.NODE_ENV === "production" && !process.env.DEBUG) {
        useDevTools = false;
    }
    var composeEnhancers = useDevTools ? devTools(devToolsOptions) : redux_1.compose;
    return redux_1.createStore(rootReducer, initialState, composeEnhancers(redux_1.applyMiddleware.apply(void 0, middlewares)));
}
exports.default = configureStore;
