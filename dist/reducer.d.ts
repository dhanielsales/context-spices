import { Action } from './action';
export declare const createReducer: <State>(state: State, action: Action, reducerTypes: {
    [key: string]: (state: State, payload?: any) => State;
}) => State;
