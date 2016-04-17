/// <reference path="../src/interfaces/interfaces.d.ts" />

import "./dom";
import { expect } from "chai";
import thunk from "redux-thunk";
import * as createLogger from "redux-logger";
import bootstrap from "../src/index";
import { routes, usersReducer, reposReducer } from "./stubs";

describe("redux-bootstrap", () => {

    it("Should throw if the wrong configuration is used", () => {

        let b: any = bootstrap;

        let throw1 = () => { b(); };

        let throw2 = () => {
            b({
                routes: routes
            });
        };

        let throw3 = () => {
            b({
                reducers: {
                    repos: reposReducer,
                    users: usersReducer
                }
            });
        };

        let notThrow = () => {
            bootstrap({
                reducers: {
                    repos: reposReducer,
                    users: usersReducer
                },
                routes: routes
            });
        };

        expect(throw1).to.throw("Null argument options.");
        expect(throw2).to.throw("Invalid configuration field: reducers.");
        expect(throw3).to.throw("Invalid configuration field: routes.");
        expect(notThrow).not.to.throw();

    });

    it("Should be able to bootstrap applications", () => {

        bootstrap({
            container: "root",
            initialState: {},
            middlewares: [thunk, createLogger()],
            reducers: {
                repos: reposReducer,
                users: usersReducer,
            },
            routes: routes
        });

        // console.log(document.getElementById("user_count").innerHTML);

    });

});