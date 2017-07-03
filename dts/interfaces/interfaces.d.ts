import * as History from "history";
import * as Redux from "redux";
declare namespace interfaces {
    interface ConfigureStore extends Function {
        (middlewares: Redux.Middleware[], rootReducer: Object, initialState: any): Redux.Store<any>;
    }
    interface BoostrapOptions {
        routes: JSX.Element;
        reducers: ReducersOption;
        createHistory?: History.CreateHistory<History.HistoryOptions, History.History>;
        historyOptions?: History.HistoryOptions;
        devToolsOptions?: DevToolsOptions;
        middlewares?: Redux.Middleware[];
        render?: Function;
        initialState?: any;
        container?: string;
        routerProps?: RouterProps;
    }
    interface BootstrapResult {
        store: Redux.Store<any>;
        history: History.History;
        output: any;
        root: JSX.Element;
    }
    interface ReducersOption {
        [index: string]: Redux.Reducer<any>;
    }
    interface RootComponentProps {
        store: Redux.Store<any>;
        history: History.History;
        routes: JSX.Element;
    }
    interface RouterProps {
        onError?: (error: any) => any;
        onUpdate?: () => any;
    }
    interface NodeModule {
        hot: {
            accept: (path: string, cb: () => void) => void;
        };
    }
    interface DevToolsOptions {
        name?: string;
        actionCreators?: Array<any> | Object;
        latency?: number;
        serialize?: boolean | Object;
        actionSanitizer?: Function;
        stateSanitizer?: Function;
        actionBlacklist?: string | Array<string>;
        actionWhitelist?: string | Array<string>;
        predicate?: Function;
        shouldRecordChanges?: boolean;
        pauseActionType?: string;
        autoPause?: boolean;
        shouldStartLocked?: boolean;
        shouldHotReload?: boolean;
        features?: Object;
    }
    interface Compose extends Function {
        <F extends Function>(f: F): F;
    }
    interface DevTools extends Function {
        (options: DevToolsOptions): Compose;
    }
}
export default interfaces;
