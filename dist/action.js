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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActions = void 0;
// Return a object with actions to be called from dispatch.
var createActions = function (actionTypes, reducerPayload) {
    var actions = {};
    Object.entries(actionTypes).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        actions[key] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var propsArray = reducerPayload[key];
            var result = {
                type: value,
                payload: {},
            };
            if (propsArray) {
                propsArray === null || propsArray === void 0 ? void 0 : propsArray.forEach(function (val, index) {
                    var _a;
                    result.payload = __assign(__assign({}, result.payload), (_a = {}, _a[val] = args[index], _a));
                });
            }
            return result;
        };
    });
    return actions;
};
exports.createActions = createActions;
