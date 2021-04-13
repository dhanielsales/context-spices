# context-spices

<img src='https://raw.githubusercontent.com/dhanielsales/context-spices/master/assets/context-spices.png' align='left' width='250px' height='250px' />

# What is it about?

Just a few tools for working with React Context API in small projects.

**Currently includes:**

1. `createReducer` - builds a structure for dispatch your Action Functions in each context.
1. `createActions` - builds your Action Functions and Types for this Actions at the same time.

# Installation

You just need node.js and Npm:

```shell
 npm install context-spices
```

or Yarn:

```shell
 yarn add context-spices
```

#### Demo - https://ducks-with-context.vercel.app/

#### Demo Repo - https://github.com/dhanielsales/ducks-with-context

# Sample

Below are examples of each function individually.

## createActions

Use the createActions function to build an object that contains as many actions as you need with their unique identifiers and their payloads.

```ts
enum TypesNames {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
}

interface LoginSuccessAction extends Action<TypesNames.LOGIN_SUCCESS> {
  email: string;
  token: string;
}

const actions = createActions<{
  loginSuccess: (email: string, token: string) => LoginSuccessAction;
}>(
  { loginSuccess: TypesNames.LOGIN_SUCCESS },
  { loginSuccess: ["email", "token"] }
);

const { loginSuccess } = actions;

console.log(
  loginSuccess(
    "email@domain.com",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMj..."
  )
);

// Outputs:
// {
//   type: 'LOGIN_SUCCESS',
//   payload: {
//     email: 'email@domain.com',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIi...',
//   },
// };
```

## createReducer

Use the createReducer function to build a function to dispatch the actions and change a State and returns the results.

### Normal Javascript Object

```ts
const INITIAL_STATE = {
  user: {
    email: "",
    token: "",
  },
};

type State = typeof INITIAL_STATE;

const loginSuccessReducer = (
  state: State,
  payload: LoginSuccessAction
): State => {
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

console.log(
  mainReducer(
    INITIAL_STATE,
    loginSuccess(
      "email@domain.com",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMj..."
    )
  )
);

// Outputs:
// {
//   user: {
//     email: 'email@domain.com',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIi...',
//   },
// };
```

### Immutable Objects

```ts
import produce from "immer";

const INITIAL_STATE = {
  user: {
    email: "",
    token: "",
  },
};

type State = typeof INITIAL_STATE;

const loginSuccessReducer = produce(
  (state: State, payload: LoginSuccessAction): State => {
    return {
      ...state,
      user: {
        email: payload.email,
        token: payload.token,
      },
    };
  }
);

const reducerTypes = {
  [TypesNames.LOGIN_SUCCESS]: loginSuccessReducer,
};

const mainReducer = (state: State, action: Action) =>
  createReducer<State>(state, action, reducerTypes);

console.log(
  mainReducer(
    INITIAL_STATE,
    loginSuccess(
      "email@domain.com",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMj..."
    )
  )
);

// Outputs:
// {
//   user: {
//     email: 'email@domain.com',
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIi...',
//   },
// };
```

# Fully Example

Below is a complete example of use with the React context API.

## Context

First, create a folder in the project to save the files context, action and reducer files:

Second, within a context file, create a structure for context and useReducer as below:

```ts
import React, { createContext, useContext, useReducer } from "react";
import { Action } from "context-spices";
import { CounterReducer } from "./ducks";

export interface State {
  count: number;
}

interface ContextProps {
  state: State;
  dispatch?: React.Dispatch<Action>;
}

const INITIAL_STATE: State = {
  count: 0,
};

const CounterContext = createContext<ContextProps>({
  state: INITIAL_STATE,
});

export const ButtonsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(CounterReducer, INITIAL_STATE);
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounters = () => useContext(CounterContext);
```

Third, create a file to save your actions and reducers that I will call the file `ducks.ts`.

Within this file, create a structure similar to this one, so that you can freely control its state:

```ts
import { Action, createActions, createReducer } from "context-spices";
import { State } from "./index"; // Context file

export enum TypesNames {
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
  SET_VALUE = "SET_VALUE",
}

export type Increment = Action<TypesNames.INCREMENT>;

export type Decrement = Action<TypesNames.DECREMENT>;

export interface SetValue extends Action<TypesNames.SET_VALUE> {
  value: number;
}

export const Creators = createActions<{
  increment: () => Increment;
  decrement: () => Decrement;
  setValue: (value: number) => SetValue;
}>(
  {
    increment: TypesNames.INCREMENT,
    decrement: TypesNames.DECREMENT,
    setValue: TypesNames.SET_VALUE,
  },
  {
    increment: null,
    decrement: null,
    setValue: ["value"],
  }
);

const setValueReducer = (state: State, { value }: SetValue): State => {
  return {
    ...state,
    count: value,
  };
};

const incrementReducer = (state: State): State => {
  return {
    ...state,
    count: state.count + 1,
  };
};

const decrementReducer = (state: State): State => {
  return {
    ...state,
    count: state.count - 1,
  };
};

const reducerTypes = {
  [TypesNames.INCREMENT]: incrementReducer,
  [TypesNames.DECREMENT]: decrementReducer,
  [TypesNames.SET_VALUE]: setValueReducer,
};

export const CounterReducer = (state: State, action: Action) =>
  createReducer<State>(state, action, reducerTypes);
```

# References

- [reduxsauce](https://www.npmjs.com/package/reduxsauce)
- [immer](https://immerjs.github.io/immer/)
- [React Context API](https://pt-br.reactjs.org/docs/context.html)
