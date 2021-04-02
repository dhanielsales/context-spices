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
    TypesNames["TEST"] = "TEST";
})(TypesNames || (TypesNames = {}));
var actions = index_1.createActions({ test: TypesNames.TEST }, { test: ['text'] });
var test = actions.test;
var INITIAL_STATE = {
    myText: 'Hello World',
};
var testReducer = function (state, payload) {
    return __assign(__assign({}, state), { myText: payload.text });
};
var reducerTypes = (_a = {},
    _a[TypesNames.TEST] = testReducer,
    _a);
var mainReducer = function (state, action) {
    return index_1.createReducer(state, action, reducerTypes);
};
/*********************************** RUNNING ***********************************/
console.log(test('This is a test action'));
console.log(mainReducer(INITIAL_STATE, test('This is a test action')));
