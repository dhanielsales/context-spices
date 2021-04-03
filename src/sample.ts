import { Action, createActions, createReducer } from './index';

/*********************************** ACTION ***********************************/

enum TypesNames {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
}

interface LoginSuccessAction extends Action<TypesNames.LOGIN_SUCCESS> {
  email: string;
  token: string;
}

const actions = createActions<{
  loginSuccess: (email: string, token: string) => LoginSuccessAction;
}>({ loginSuccess: TypesNames.LOGIN_SUCCESS }, { loginSuccess: ['email', 'token'] });

const { loginSuccess } = actions;

const INITIAL_STATE = {
  user: {
    email: '',
    token: '',
  },
};

type State = typeof INITIAL_STATE;

const loginSuccessReducer = (state: State, payload: LoginSuccessAction): State => {
  return {
    ...state,
    user: {
      email: payload.email,
      token: payload.token,
    },
  };
};

const reducerTypes = {
  [TypesNames.LOGIN_SUCCESS]: loginSuccessReducer,
};

const mainReducer = (state: State, action: Action) =>
  createReducer<State>(state, action, reducerTypes);

/*********************************** RUNNING ***********************************/

console.log(
  loginSuccess(
    'email@domain.com',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIi...',
  ),
);
console.log(
  mainReducer(
    INITIAL_STATE,
    loginSuccess('email@domain.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMj...'),
  ),
);
