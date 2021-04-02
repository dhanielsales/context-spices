export interface Action<Type = any> {
    type: Type;
    payload?: any;
}
interface ActionTypes {
    [key: string]: string;
}
interface ReducerPayload {
    [key: string]: string[];
}
export declare const createActions: <ActionPayload>(actionTypes: ActionTypes, reducerPayload: ReducerPayload) => ActionPayload;
export {};
