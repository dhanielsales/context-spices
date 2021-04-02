"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReducer = void 0;
var createReducer = function (state, action, reducerTypes) {
    var reducer = reducerTypes[action.type];
    return reducer ? reducer(state, action.payload) : state;
};
exports.createReducer = createReducer;
