import * as Redux from "redux";
import interfaces from "../interfaces/interfaces";
declare function configureStore(middlewares: Redux.Middleware[], rootReducer: Redux.Reducer<any>, initialState: any, devToolsOptions: interfaces.DevToolsOptions): Redux.Store<any>;
export default configureStore;
