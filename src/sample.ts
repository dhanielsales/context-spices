import { Action, createActions, createReducer } from './index';

/*********************************** ACTION ***********************************/

enum TypesNames {
  TEST = 'TEST',
}

interface TestAction extends Action<TypesNames.TEST> {
  text: string;
}

const actions = createActions<{ test: (text: string) => TestAction }>(
  { test: TypesNames.TEST },
  { test: ['text'] },
);

const { test } = actions;

const INITIAL_STATE = {
  myText: 'Hello World',
};

type State = typeof INITIAL_STATE;

const testReducer = (state: State, payload: TestAction): State => {
  return {
    ...state,
    myText: payload.text,
  };
};

const reducerTypes = {
  [TypesNames.TEST]: testReducer,
};

const mainReducer = (state: State, action: Action) =>
  createReducer<State>(state, action, reducerTypes);

/*********************************** RUNNING ***********************************/

console.log(test('This is a test action'));
console.log(mainReducer(INITIAL_STATE, test('This is a test action')));
