"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
/*********************************** ACTION ***********************************/
var TypesNames;
(function (TypesNames) {
    TypesNames["LOGIN_SUCCESS"] = "LOGIN_SUCCESS";
})(TypesNames || (TypesNames = {}));
var actions = index_1.createActions({ loginSuccess: TypesNames.LOGIN_SUCCESS }, { loginSuccess: ['email', 'token'] });
var loginSuccess = actions.loginSuccess;
var INITIAL_STATE = {
    user: {
        email: '',
        token: '',
    },
};
var loginSuccessReducer = function (state, payload) {
    return __assign(__assign({}, state), { user: {
            email: payload.email,
            token: payload.token,
        } });
};
var reducerTypes = (_a = {},
    _a[TypesNames.LOGIN_SUCCESS] = loginSuccessReducer,
    _a);
var mainReducer = function (state, action) {
    return index_1.createReducer(state, action, reducerTypes);
};
/*********************************** RUNNING ***********************************/
console.log(loginSuccess('email@domain.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIi...'));
console.log(mainReducer(INITIAL_STATE, loginSuccess('email@domain.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMj...')));
